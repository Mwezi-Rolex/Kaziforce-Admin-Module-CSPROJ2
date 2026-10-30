import { Router } from 'express'
import { z } from 'zod'
import { pool } from '../db/pool'
import { requireAuth, type AuthedRequest } from '../middleware/auth'
import { requirePermission } from '../middleware/requirePermission'
import { ApiError } from '../middleware/errors'
import { writeEvent } from '../services/auditLogger'
import { createModelClient, type PredictInput, type SuggestionResult } from '../services/modelClient'

const modelClient = createModelClient()

// Moderation queue API (CON-MOD-001…004; Ch5 §3.6.4; Note 8 UC3–UC6 + activity diagram).
// Every decision writes an immutable audit event (Ch5 §3.6.5). The model never
// decides — the moderator does (AGENTS.md ML rules); ML suggestions arrive in slice 8.

export const moderationRouter = Router()
moderationRouter.use(requireAuth)

const FLAG_SELECT = `
  SELECT f.id, f.content_item_id AS "contentItemId", f.severity, f.flag_status AS "flagStatus",
         f.reason, f.reported_by AS "reportedBy", f.created_at AS "createdAt",
         f.decided_by AS "decidedBy", f.decided_at AS "decidedAt",
         c.content_type AS "contentType", c.owner_id AS "ownerId",
         reporter.email AS "reporterEmail"
  FROM flags f
  JOIN content_items c ON c.id = f.content_item_id
  LEFT JOIN users reporter ON reporter.id = f.reported_by`

const SEVERITY_RANK = `CASE f.severity WHEN 'High' THEN 3 WHEN 'Medium' THEN 2 ELSE 1 END`

const listSchema = z.object({
  severity: z.enum(['All', 'High', 'Medium', 'Low']).optional().default('All'),
  status: z.enum(['All', 'Pending', 'Approved', 'Rejected', 'Escalated']).optional().default('All'),
  page: z.coerce.number().int().min(1).optional().default(1),
  size: z.coerce.number().int().min(1).max(100).optional().default(20),
})

// Queue listing is read-only and open to every operator (Viewer sees the
// read-only view, per the export); decisions are gated per-route below.
moderationRouter.get('/queue', async (req: AuthedRequest, res, next) => {
  try {
    const parsed = listSchema.safeParse(req.query)
    if (!parsed.success) throw new ApiError(422, 'VALIDATION', parsed.error.issues[0]?.message ?? 'Invalid query')
    const { severity, status, page, size } = parsed.data
    const filters: string[] = []
    const params: unknown[] = []
    if (severity !== 'All') {
      params.push(severity)
      filters.push(`f.severity = $${params.length}`)
    }
    if (status !== 'All') {
      params.push(status)
      filters.push(`f.flag_status = $${params.length}`)
    }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
    const count = await pool.query<{ total: string }>(`SELECT count(*) AS total FROM flags f ${where}`, params)
    params.push(size, (page - 1) * size)
    const { rows } = await pool.query(
      // Rule-based priority: severity rank desc, then oldest first (Ch5 §3.2.1 routing logic).
      `${FLAG_SELECT} ${where} ORDER BY ${SEVERITY_RANK} DESC, f.created_at ASC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
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

const DECISION_TO_STATUS: Record<string, string> = {
  approve: 'Approved',
  reject: 'Rejected',
  escalate: 'Escalated',
}
const DECISION_TO_AUDIT: Record<string, string> = {
  approve: 'Content Approved',
  reject: 'Content Rejected',
  escalate: 'Content Escalated',
}

// Build the feature payload the model service expects (ml/generate_data.py
// features). Everything is derived from the database; nothing is trusted from
// the client. Reporter history and prior flags are counted as at flag creation.
async function buildPredictionInput(flagId: string): Promise<PredictInput | null> {
  const { rows } = await pool.query(
    `SELECT f.reason, f.reason_category AS "reasonCategory", f.created_at AS "createdAt",
            f.reported_by AS "reportedBy",
            c.content_type AS "contentType", c.owner_id AS "ownerId",
            owner.created_at AS "ownerCreatedAt",
            (SELECT count(*) FROM flags rf WHERE rf.reported_by = f.reported_by AND rf.created_at < f.created_at) AS "reporterHistory",
            (SELECT count(*) FROM flags pf JOIN content_items pc ON pc.id = pf.content_item_id
               WHERE pc.owner_id = c.owner_id AND pf.created_at < f.created_at) AS "priorFlagsAccount"
     FROM flags f
     JOIN content_items c ON c.id = f.content_item_id
     LEFT JOIN users owner ON owner.id = c.owner_id
     WHERE f.id = $1`,
    [flagId],
  )
  const row = rows[0]
  if (!row) return null
  const ageDays = row.ownerCreatedAt
    ? Math.max(0, Math.round((new Date(row.createdAt).getTime() - new Date(row.ownerCreatedAt).getTime()) / 86_400_000))
    : 0
  return {
    reason_category: row.reasonCategory ?? 'other',
    content_type: row.contentType,
    report_text: row.reason ?? '',
    reporter_history: Number(row.reporterHistory) || 0,
    account_age_days: ageDays,
    prior_flags_account: Number(row.priorFlagsAccount) || 0,
  }
}

// GET a suggestion for one flag (fail-safe: unavailable on any model error).
moderationRouter.get('/flags/:id/suggestion', async (req: AuthedRequest, res, next) => {
  try {
    const flagId = z.string().uuid('Flag ID must be a UUID').parse(req.params.id)
    const input = await buildPredictionInput(flagId)
    if (!input) throw new ApiError(404, 'FLAG-001', 'Flag not found')
    const suggestion = await modelClient.predict(input)
    res.json({ success: true, data: suggestion, timestamp: new Date().toISOString() })
  } catch (err) {
    next(err)
  }
})

const suggestionsSchema = z.object({ flagIds: z.array(z.string().uuid()).min(1).max(100) })

// Batch suggestions for the queue view. Each flag resolves independently and
// fails safe, so one model failure never blocks the moderation workflow.
moderationRouter.post('/suggestions', async (req: AuthedRequest, res, next) => {
  try {
    const parsed = suggestionsSchema.safeParse(req.body)
    if (!parsed.success) throw new ApiError(422, 'VALIDATION', 'flagIds must be a non-empty array of UUIDs')
    const entries = await Promise.all(
      parsed.data.flagIds.map(async (id) => {
        const input = await buildPredictionInput(id)
        if (!input) return [id, { available: false, reason: 'flag not found' } satisfies SuggestionResult] as const
        return [id, await modelClient.predict(input)] as const
      }),
    )
    res.json({
      success: true,
      data: Object.fromEntries(entries),
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

async function decideFlag(actorId: string, flagId: string, decision: keyof typeof DECISION_TO_STATUS) {
  const { rows } = await pool.query(
    `SELECT f.id, f.flag_status AS "flagStatus", f.content_item_id AS "contentItemId", c.owner_id AS "ownerId"
     FROM flags f JOIN content_items c ON c.id = f.content_item_id WHERE f.id = $1`,
    [flagId],
  )
  const flag = rows[0]
  if (!flag) throw new ApiError(404, 'FLAG-001', 'Flag not found')
  if (flag.flagStatus !== 'Pending') {
    throw new ApiError(409, 'FLAG-002', `Flag is already ${flag.flagStatus}; only Pending flags can be decided`)
  }
  // Record the model's suggestion, its version, and whether the moderator
  // followed or overrode it. Fail-safe: the decision is never blocked by the model.
  const input = await buildPredictionInput(flagId)
  const suggestion = input ? await modelClient.predict(input) : ({ available: false, reason: 'no input' } as SuggestionResult)
  const suggestionMeta = suggestion.available
    ? {
        available: true,
        severity: suggestion.severity,
        action: suggestion.action,
        confidence: suggestion.confidence,
        modelVersion: suggestion.modelVersion,
        followed: suggestion.action === decision,
      }
    : { available: false, reason: suggestion.reason }

  await pool.query(`UPDATE flags SET flag_status = $2, decided_by = $3, decided_at = now() WHERE id = $1`, [
    flagId,
    DECISION_TO_STATUS[decision],
    actorId,
  ])
  await writeEvent({
    operatorId: actorId,
    actionType: DECISION_TO_AUDIT[decision],
    targetEntityType: 'flag',
    targetEntityId: flagId,
    metadata: { decision, contentItemId: flag.contentItemId, ownerId: flag.ownerId, suggestion: suggestionMeta },
  })
}

const decisionSchema = z.object({ decision: z.enum(['approve', 'reject', 'escalate']) })

moderationRouter.post(
  '/flags/:id/decision',
  requirePermission('moderation.decide'),
  async (req: AuthedRequest, res, next) => {
    try {
      const flagId = z.string().uuid('Flag ID must be a UUID').parse(req.params.id)
      const parsed = decisionSchema.safeParse(req.body)
      if (!parsed.success) throw new ApiError(422, 'VALIDATION', 'Decision must be approve, reject, or escalate')
      await decideFlag(req.user!.id, flagId, parsed.data.decision)
      res.json({ success: true, data: { id: flagId, status: DECISION_TO_STATUS[parsed.data.decision] }, timestamp: new Date().toISOString() })
    } catch (err) {
      next(err)
    }
  },
)

const bulkSchema = z.object({
  flagIds: z.array(z.string().uuid()).min(1).max(100),
  decision: z.enum(['approve', 'reject', 'escalate']),
})

// Bulk approve/reject/escalate (CON-MOD-003). Each state change gets its own
// audit event (the export's bulk-confirmation copy is explicit about this).
moderationRouter.post('/bulk', requirePermission('moderation.decide'), async (req: AuthedRequest, res, next) => {
  try {
    const parsed = bulkSchema.safeParse(req.body)
    if (!parsed.success) throw new ApiError(422, 'VALIDATION', parsed.error.issues[0]?.message ?? 'Invalid bulk request')
    const { flagIds, decision } = parsed.data
    const client = await pool.connect()
    const applied: string[] = []
    const failed: Array<{ id: string; reason: string }> = []
    try {
      for (const id of flagIds) {
        try {
          await decideFlag(req.user!.id, id, decision)
          applied.push(id)
        } catch (e) {
          failed.push({ id, reason: e instanceof ApiError ? e.message : 'Failed' })
        }
      }
    } finally {
      client.release()
    }
    res.json({
      success: true,
      data: { applied, failed, decision },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

// Super Admin escalation lane (CON-MOD-004; Note 8 activity diagram):
// overrule -> flag & content approved; uphold and ban -> content owner Terminated.
const escalationSchema = z.object({ resolution: z.enum(['overrule', 'uphold']) })

moderationRouter.post(
  '/flags/:id/escalation',
  requirePermission('moderation.escalation'),
  async (req: AuthedRequest, res, next) => {
    try {
      const flagId = z.string().uuid('Flag ID must be a UUID').parse(req.params.id)
      const parsed = escalationSchema.safeParse(req.body)
      if (!parsed.success) throw new ApiError(422, 'VALIDATION', 'Resolution must be overrule or uphold')
      const { rows } = await pool.query(
        `SELECT f.flag_status AS "flagStatus", f.content_item_id AS "contentItemId", c.owner_id AS "ownerId"
         FROM flags f JOIN content_items c ON c.id = f.content_item_id WHERE f.id = $1`,
        [flagId],
      )
      const flag = rows[0]
      if (!flag) throw new ApiError(404, 'FLAG-001', 'Flag not found')
      if (flag.flagStatus !== 'Escalated') {
        throw new ApiError(409, 'FLAG-003', 'Only escalated flags can be resolved in the escalation lane')
      }

      if (parsed.data.resolution === 'overrule') {
        await pool.query(`UPDATE flags SET flag_status = 'Approved', decided_by = $2, decided_at = now() WHERE id = $1`, [
          flagId,
          req.user!.id,
        ])
        await writeEvent({
          operatorId: req.user!.id,
          actionType: 'Flag Overruled',
          targetEntityType: 'flag',
          targetEntityId: flagId,
          metadata: { resolution: 'overrule', contentItemId: flag.contentItemId },
        })
        return res.json({ success: true, data: { id: flagId, status: 'Approved' }, timestamp: new Date().toISOString() })
      }

      // uphold: ban the content owner (Set User: Terminated in the activity diagram).
      if (!flag.ownerId) throw new ApiError(409, 'FLAG-004', 'Flagged content has no owner to ban')
      const { rows: owner } = await pool.query(`SELECT status FROM users WHERE id = $1`, [flag.ownerId])
      if (!owner[0]) throw new ApiError(404, 'USER-001', 'Content owner not found')
      if (owner[0].status === 'Terminated') throw new ApiError(409, 'USER-003', 'Content owner is already terminated')
      await pool.query(`UPDATE users SET status = 'Terminated' WHERE id = $1`, [flag.ownerId])
      await writeEvent({
        operatorId: req.user!.id,
        actionType: 'Account Terminated',
        targetEntityType: 'user',
        targetEntityId: flag.ownerId,
        metadata: { resolution: 'uphold', flagId, contentItemId: flag.contentItemId },
      })
      await writeEvent({
        operatorId: req.user!.id,
        actionType: 'Escalation Upheld',
        targetEntityType: 'flag',
        targetEntityId: flagId,
        metadata: { bannedUserId: flag.ownerId },
      })
      res.json({ success: true, data: { id: flagId, status: 'Escalated', ownerBanned: true }, timestamp: new Date().toISOString() })
    } catch (err) {
      next(err)
    }
  },
)
