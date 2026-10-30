import { Router } from 'express'
import { z } from 'zod'
import { pool } from '../db/pool'
import { requireAuth, type AuthedRequest } from '../middleware/auth'
import { requirePermission } from '../middleware/requirePermission'
import { ApiError } from '../middleware/errors'

// Audit Explorer API (CON-AUD-002/003; Ch5 §3.6.5).
//
// Read-only by construction: the application database role holds SELECT +
// INSERT on audit_log and nothing else (migrations/006), so there is no update
// or delete path even if a handler tried. Listing requires `audit.view`, which
// every operator tier holds; CSV export requires `audit.export`, which per
// BRIEF is Moderator and Super Admin only — a Viewer receives 403 here, and the
// UI hides the control.

export const auditRouter = Router()
auditRouter.use(requireAuth)

const filterSchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'from must be YYYY-MM-DD').optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'to must be YYYY-MM-DD').optional(),
  actor: z.string().trim().max(120).optional().default(''),
  action: z.string().trim().max(120).optional().default(''),
  page: z.coerce.number().int().min(1).optional().default(1),
  size: z.coerce.number().int().min(1).max(200).optional().default(25),
})

type Filters = z.infer<typeof filterSchema>

function buildWhere(f: Filters) {
  const filters: string[] = []
  const params: unknown[] = []
  if (f.from) {
    params.push(f.from)
    filters.push(`a.created_at >= $${params.length}::date`)
  }
  if (f.to) {
    // inclusive end date: < (to + 1 day)
    params.push(f.to)
    filters.push(`a.created_at < ($${params.length}::date + interval '1 day')`)
  }
  if (f.actor) {
    params.push(`%${f.actor}%`)
    filters.push(`(op.email ILIKE $${params.length} OR a.operator_id::text ILIKE $${params.length})`)
  }
  if (f.action) {
    params.push(f.action)
    filters.push(`a.action_type = $${params.length}`)
  }
  return { where: filters.length ? `WHERE ${filters.join(' AND ')}` : '', params }
}

const SELECT_EVENTS = `
  SELECT a.id, a.operator_id AS "operatorId", op.email AS "operatorEmail",
         a.action_type AS "actionType", a.target_entity_type AS "targetEntityType",
         a.target_entity_id AS "targetEntityId", a.metadata, a.created_at AS "createdAt"
  FROM audit_log a
  LEFT JOIN users op ON op.id = a.operator_id`

function parseFilters(req: AuthedRequest): Filters {
  const parsed = filterSchema.safeParse(req.query)
  if (!parsed.success) throw new ApiError(422, 'VALIDATION', parsed.error.issues[0]?.message ?? 'Invalid filter')
  return parsed.data
}

// Read-only listing (audit.view — all operator tiers).
auditRouter.get('/', requirePermission('audit.view'), async (req: AuthedRequest, res, next) => {
  try {
    const f = parseFilters(req)
    const { where, params } = buildWhere(f)
    const count = await pool.query<{ total: string }>(
      `SELECT count(*) AS total FROM audit_log a LEFT JOIN users op ON op.id = a.operator_id ${where}`,
      params,
    )
    params.push(f.size, (f.page - 1) * f.size)
    const { rows } = await pool.query(
      `${SELECT_EVENTS} ${where} ORDER BY a.created_at DESC, a.id DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params,
    )
    // Distinct action types power the filter dropdown without inventing a taxonomy.
    const actions = await pool.query<{ actionType: string }>(
      `SELECT DISTINCT action_type AS "actionType" FROM audit_log ORDER BY 1`,
    )
    res.json({
      success: true,
      data: rows,
      meta: { page: f.page, size: f.size, total: Number(count.rows[0].total), actionTypes: actions.rows.map((r) => r.actionType) },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

// RFC 4180 CSV escaping: quote fields containing , " \r or \n; double any quote.
function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value)
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCsv(rows: Array<Record<string, unknown>>, columns: string[]): string {
  const header = columns.join(',')
  const lines = rows.map((row) => columns.map((c) => csvCell(row[c])).join(','))
  return [header, ...lines].join('\r\n') + '\r\n'
}

// CSV download — Moderator and Super Admin only (BRIEF override of Ch5 §3.6.5;
// tracked as CON-AUD-003). A Viewer is refused with 403 before any query runs.
auditRouter.get('/export.csv', requirePermission('audit.export'), async (req: AuthedRequest, res, next) => {
  try {
    const f = parseFilters(req)
    const { where, params } = buildWhere(f)
    const { rows } = await pool.query(
      `${SELECT_EVENTS} ${where} ORDER BY a.created_at DESC, a.id DESC LIMIT 10000`,
      params,
    )
    const csv = toCsv(rows as Array<Record<string, unknown>>, [
      'id',
      'createdAt',
      'operatorId',
      'operatorEmail',
      'actionType',
      'targetEntityType',
      'targetEntityId',
      'metadata',
    ])
    const stamp = new Date().toISOString().slice(0, 10)
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="kaziforce-audit-${stamp}.csv"`)
    res.send(csv)
  } catch (err) {
    next(err)
  }
})
