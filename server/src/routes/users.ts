import { Router } from 'express'
import { z } from 'zod'
import { pool } from '../db/pool'
import { requireAuth, type AuthedRequest } from '../middleware/auth'
import { requirePermission } from '../middleware/requirePermission'
import { ApiError } from '../middleware/errors'
import { writeEvent, auditContext } from '../services/auditLogger'
import { unlockAccount } from '../services/authService'
import { assignRoleTransaction } from '../services/roleService'

// User Control Centre API (CON-USR-001…005; Ch5 §3.6.3).
// Accounts are viewed/suspended/banned/role-assigned — never created or
// deleted here (CON-USR-002): they originate in the marketplace platform.

export const usersRouter = Router()
usersRouter.use(requireAuth)

const accountSelect = `
  SELECT u.id, u.email, u.full_name AS "fullName", u.status, u.is_operator AS "isOperator",
         u.created_at AS "createdAt", u.locked_until AS "lockedUntil",
         u.failed_login_attempts AS "failedAttempts", COALESCE(r.name, 'viewer') AS role
  FROM users u
  LEFT JOIN user_roles ur ON ur.user_id = u.id
  LEFT JOIN roles r ON r.id = ur.role_id`

const listQuerySchema = z.object({
  query: z.string().trim().max(120).optional().default(''),
  status: z.enum(['All', 'Active', 'Suspended', 'Terminated']).optional().default('All'),
  role: z.enum(['All', 'viewer', 'moderator', 'super_admin']).optional().default('All'),
  page: z.coerce.number().int().min(1).optional().default(1),
  size: z.coerce.number().int().min(1).max(100).optional().default(20),
})

usersRouter.get('/', requirePermission('users.view'), async (req: AuthedRequest, res, next) => {
  try {
    const parsed = listQuerySchema.safeParse(req.query)
    if (!parsed.success) throw new ApiError(422, 'VALIDATION', parsed.error.issues[0]?.message ?? 'Invalid query')
    const { query, status, role, page, size } = parsed.data
    const like = `%${query}%`
    const filters = ['u.is_deleted = false']
    const params: unknown[] = []
    if (query) {
      params.push(like)
      filters.push(`(u.email ILIKE $${params.length} OR u.full_name ILIKE $${params.length} OR u.id::text ILIKE $${params.length})`)
    }
    if (status !== 'All') {
      params.push(status)
      filters.push(`u.status = $${params.length}`)
    }
    if (role !== 'All') {
      params.push(role)
      filters.push(`r.name = $${params.length}`)
    }
    const where = filters.join(' AND ')
    const count = await pool.query<{ total: string }>(`SELECT count(*) AS total FROM users u WHERE ${where}`, params)
    params.push(size, (page - 1) * size)
    const { rows } = await pool.query(
      `${accountSelect} WHERE ${where} ORDER BY u.created_at DESC, u.email LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params,
    )
    res.json({
      success: true,
      data: rows,
      meta: { page, size, total: Number(count.rows[0].total) },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

async function loadAccount(id: string) {
  const { rows } = await pool.query(`${accountSelect} WHERE u.id = $1 AND u.is_deleted = false`, [id])
  if (!rows[0]) throw new ApiError(404, 'USER-001', 'Account not found')
  return rows[0]
}

const uuidSchema = z.string().uuid('Account ID must be a UUID')

usersRouter.get('/:id', requirePermission('users.view'), async (req: AuthedRequest, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id)
    const account = await loadAccount(id)
    const flags = await pool.query(
      `SELECT f.id, f.severity, f.flag_status AS "flagStatus", f.reason, f.created_at AS "createdAt",
              c.content_type AS "contentType"
       FROM flags f JOIN content_items c ON c.id = f.content_item_id
       WHERE f.reported_by = $1 ORDER BY f.created_at DESC LIMIT 50`,
      [id],
    )
    const content = await pool.query(
      `SELECT c.id, c.content_type AS "contentType", c.created_at AS "createdAt"
       FROM content_items c WHERE c.owner_id = $1 ORDER BY c.created_at DESC LIMIT 50`,
      [id],
    )
    res.json({
      success: true,
      data: { ...account, flagsReported: flags.rows, contentOwned: content.rows },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

// The account status machine's single enforcement point (SEMANTIC_MODEL.md
// BUG-3, fixed). suspend and ban are only legal FROM these states; the UPDATE
// re-checks the status inside the statement, so concurrent or repeated calls
// cannot both apply, and a Terminated account can never leave Terminated.
const STATUS_TRANSITIONS: Record<'suspend' | 'ban', string[]> = {
  suspend: ['Active'],
  ban: ['Active', 'Suspended'],
}

async function mutateStatus(
  req: AuthedRequest,
  res: { json: (b: unknown) => void },
  id: string,
  action: 'suspend' | 'ban',
) {
  const target = await loadAccount(id)
  if (target.id === req.user!.id) throw new ApiError(422, 'USER-002', 'You cannot apply this action to your own account')
  if (action === 'suspend' && target.isOperator && req.user!.role !== 'super_admin') {
    // Ch5 §3.4: Moderators suspend non-admin users; operator accounts need Super Admin.
    throw new ApiError(403, 'AUTHZ-001', 'Only a Super Admin may suspend operator accounts')
  }
  const nextStatus = action === 'suspend' ? 'Suspended' : 'Terminated'
  const { rows } = await pool.query(
    `UPDATE users SET status = $2 WHERE id = $1 AND status = ANY($3::text[]) RETURNING id, email, status`,
    [id, nextStatus, STATUS_TRANSITIONS[action]],
  )
  if (!rows[0]) {
    const current = await pool.query(`SELECT status FROM users WHERE id = $1`, [id])
    if (!current.rows[0]) throw new ApiError(404, 'USER-001', 'Account not found')
    if (current.rows[0].status === nextStatus) {
      throw new ApiError(409, 'USER-003', `Account is already ${nextStatus}`)
    }
    throw new ApiError(409, 'USER-003', `A ${current.rows[0].status} account cannot be ${action === 'suspend' ? 'suspended' : 'banned'}`)
  }
  await writeEvent({
    operatorId: req.user!.id,
    actionType: action === 'suspend' ? 'User Suspended' : 'Account Terminated',
    targetEntityType: 'user',
    targetEntityId: id,
    outcome: 'Success',
    ...auditContext(req),
    metadata: { from: target.status, to: nextStatus, email: target.email },
  })
  res.json({ success: true, data: rows[0], timestamp: new Date().toISOString() })
}

const suspendSchema = z.object({}).strict()

usersRouter.post('/:id/suspend', requirePermission('users.suspend'), async (req: AuthedRequest, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id)
    const body = suspendSchema.safeParse(req.body ?? {})
    if (!body.success) throw new ApiError(422, 'VALIDATION', 'Unexpected request body')
    await mutateStatus(req, res, id, 'suspend')
  } catch (err) {
    next(err)
  }
})

usersRouter.post('/:id/ban', requirePermission('users.ban'), async (req: AuthedRequest, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id)
    const body = suspendSchema.safeParse(req.body ?? {})
    if (!body.success) throw new ApiError(422, 'VALIDATION', 'Unexpected request body')
    await mutateStatus(req, res, id, 'ban')
  } catch (err) {
    next(err)
  }
})

const roleSchema = z.object({
  role: z.enum(['viewer', 'moderator', 'super_admin']),
})

usersRouter.post('/:id/role', requirePermission('users.assign_role'), async (req: AuthedRequest, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id)
    const parsed = roleSchema.safeParse(req.body)
    if (!parsed.success) throw new ApiError(422, 'VALIDATION', 'Role must be viewer, moderator, or super_admin')
    if (id === req.user!.id) throw new ApiError(422, 'USER-004', 'You cannot change your own role')
    const target = await loadAccount(id)
    // No-op guard (SEMANTIC_MODEL.md BUG-11, fixed): assigning the role the
    // account already holds is refused instead of rewriting the row and
    // writing a from==to audit event.
    if (target.role === parsed.data.role) {
      throw new ApiError(409, 'USER-005', `Account already has the ${parsed.data.role} role`)
    }
    const { rows: roleRows } = await pool.query(`SELECT id FROM roles WHERE name = $1`, [parsed.data.role])
    if (!roleRows[0]) throw new ApiError(404, 'ROLE-001', 'Role not found')
    // The DELETE + INSERT run atomically on one client (SEMANTIC_MODEL.md
    // BUG-5, fixed): pool.query would check out a different client per call.
    // A concurrent identical assignment no-ops the INSERT; nothing changed, so
    // nothing is audited.
    const inserted = await assignRoleTransaction(pool, id, roleRows[0].id)
    if (!inserted) {
      return res.json({
        success: true,
        data: { id, role: parsed.data.role },
        timestamp: new Date().toISOString(),
      })
    }
    await writeEvent({
      operatorId: req.user!.id,
      actionType: 'Role Assigned',
      targetEntityType: 'user',
      targetEntityId: id,
      outcome: 'Success',
      ...auditContext(req),
      metadata: { from: target.role, to: parsed.data.role, email: target.email },
    })
    res.json({
      success: true,
      data: { id, role: parsed.data.role },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

// Login-lockout release (OQ-12). Super Admin only, audited as 'Account Unlocked'.
// Deliberately separate from suspend/ban: clearing a temporary lock is not a
// sanctions decision, so it gets its own permission.
usersRouter.post('/:id/unlock', requirePermission('users.unlock'), async (req: AuthedRequest, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id)
    const result = await unlockAccount(req.user!.id, id, auditContext(req))
    res.json({ success: true, data: result, timestamp: new Date().toISOString() })
  } catch (err) {
    next(err)
  }
})
