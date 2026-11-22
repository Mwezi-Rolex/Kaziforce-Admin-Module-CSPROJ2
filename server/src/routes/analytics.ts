import { Router } from 'express'
import { pool } from '../db/pool'
import { requireAuth } from '../middleware/auth'
import { AUDIT_ACTIONS } from '../lib/vocabulary'

// Dashboard Analytics API (CON-DASH-001; FR-ADM-008/046; BED §4.33.7
// "GET /api/v1/analytics/dashboard" with role-based access).
//
// Chapter 5 Figure 4.6 defines the dashboard wireframe as "summary metric
// cards + recent activity feed". Until the 2026-11-23 user decision (D-098)
// the metric cards were deliberately unpopulated (OQ-2's default) because no
// document named a KPI set. The cards now show raw, live counts computed from
// the platform's own tables — never derived, projected or seeded figures, per
// the project's no-fabricated-metrics rule.
//
// Access: every operator tier (requireAuth, no extra permission) — Chapter 5
// §3.6.1 puts "read-only dashboard analytics" in the Viewer tier, and the
// route table in PLAN.md admits any operator to /console/dashboard.
//
// Read-only by construction: nothing here mutates state, so nothing is
// audited (only state-changing endpoints call AuditLogger). The counts reuse
// the indexed columns the other routes already query (PERFORMANCE.md §5/§6).

export const analyticsRouter = Router()
analyticsRouter.use(requireAuth)

analyticsRouter.get('/dashboard', async (_req, res, next) => {
  try {
    // One round trip per domain, each a single-row aggregate over an indexed
    // column set. count(*)::int keeps the pg driver returning numbers.
    const [accounts, queue, auditTotals, decisions, trend] = await Promise.all([
      pool.query<{
        total: number
        active: number
        suspended: number
        terminated: number
      }>(`SELECT count(*)::int AS total,
                 count(*) FILTER (WHERE status = 'Active')::int AS active,
                 count(*) FILTER (WHERE status = 'Suspended')::int AS suspended,
                 count(*) FILTER (WHERE status = 'Terminated')::int AS terminated
          FROM users WHERE is_deleted = false`),
      pool.query<{
        pending: number
        escalated: number
        highSeverityPending: number
        resolved: number
      }>(`SELECT count(*) FILTER (WHERE flag_status = 'Pending')::int AS pending,
                 count(*) FILTER (WHERE flag_status = 'Escalated')::int AS escalated,
                 count(*) FILTER (WHERE flag_status = 'Pending' AND severity = 'High')::int AS "highSeverityPending",
                 count(*) FILTER (WHERE flag_status IN ('Approved', 'Rejected'))::int AS resolved
          FROM flags`),
      pool.query<{ total: number; last24h: number; last7d: number }>(
        `SELECT count(*)::int AS total,
                count(*) FILTER (WHERE created_at >= now() - interval '24 hours')::int AS "last24h",
                count(*) FILTER (WHERE created_at >= now() - interval '7 days')::int AS "last7d"
         FROM audit_log`,
      ),
      // Operator decision activity over the last 7 days, straight from the
      // ledger's action vocabulary (not the flags table, whose status is the
      // durable state — the distinction between activity and state is kept).
      pool.query<{ actionType: string; n: number }>(
        `SELECT action_type AS "actionType", count(*)::int AS n
         FROM audit_log
         WHERE created_at >= now() - interval '7 days'
           AND action_type = ANY($1)
         GROUP BY action_type`,
        [[AUDIT_ACTIONS.contentApproved, AUDIT_ACTIONS.contentRejected, AUDIT_ACTIONS.contentEscalated]],
      ),
      // 14-day audit-event trend. generate_series produces every day bucket
      // (created_at::date, server time — the same bucketing the audit
      // explorer's date filters use) so zero days come back as real zeros
      // from the database, not from JS date arithmetic that could disagree
      // with the server's timezone about what "today" is.
      pool.query<{ day: string; events: number }>(
        `SELECT d::date::text AS day, count(a.id)::int AS events
         FROM generate_series(current_date - interval '13 days', current_date, interval '1 day') d
         LEFT JOIN audit_log a
           ON a.created_at >= current_date - interval '13 days'
          AND a.created_at <  current_date + interval '1 day'
          AND a.created_at::date = d::date
         GROUP BY 1 ORDER BY 1`,
      ),
    ])

    const decisionBy = new Map(decisions.rows.map((r) => [r.actionType, r.n]))
    const a = accounts.rows[0]
    const q = queue.rows[0]
    const at = auditTotals.rows[0]

    res.json({
      success: true,
      data: {
        accounts: a,
        queue: q,
        decisions7d: {
          approved: decisionBy.get(AUDIT_ACTIONS.contentApproved) ?? 0,
          rejected: decisionBy.get(AUDIT_ACTIONS.contentRejected) ?? 0,
          escalated: decisionBy.get(AUDIT_ACTIONS.contentEscalated) ?? 0,
        },
        audit: at,
        trend: trend.rows,
      },
      meta: { generatedAt: new Date().toISOString() },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})
