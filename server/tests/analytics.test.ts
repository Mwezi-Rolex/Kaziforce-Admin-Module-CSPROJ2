import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'
import { AUDIT_ACTIONS } from '../src/lib/vocabulary'

// Dashboard Analytics API tests (CON-DASH-001; FR-ADM-008/046; D-098).
//
// Claims under test:
//  - the endpoint exists behind authentication (401 without a session);
//  - every operator tier may read it (Viewer included — Ch5 §3.6.1 puts
//    "read-only dashboard analytics" in the Viewer tier);
//  - the payload is complete and well-typed (14-day trend, integer counts);
//  - every figure equals a direct SQL aggregate over the same tables — the
//    dashboard shows live counts computed from the database, nothing derived,
//    projected or hard-coded (the project's no-fabricated-metrics rule).

// A database is required for this suite. When one is not configured the suite
// SKIPS with a readable reason instead of failing at import time.
const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let pool: Pool
let app: Express
beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
})
afterAll(async () => {
  if (hasDb) await pool.end()
})

async function loginAs(email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
  return res.headers['set-cookie'][0]
}

d('GET /api/v1/analytics/dashboard', () => {
  it('requires authentication', async () => {
    await request(app).get('/api/v1/analytics/dashboard').expect(401)
  })

  it('serves a complete, well-typed payload to a Viewer', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app).get('/api/v1/analytics/dashboard').set('Cookie', cookie).expect(200)
    expect(res.body.success).toBe(true)
    const data = res.body.data
    for (const key of ['total', 'active', 'suspended', 'terminated']) {
      expect(Number.isInteger(data.accounts[key])).toBe(true)
    }
    for (const key of ['pending', 'escalated', 'highSeverityPending', 'resolved']) {
      expect(Number.isInteger(data.queue[key])).toBe(true)
    }
    for (const key of ['approved', 'rejected', 'escalated']) {
      expect(Number.isInteger(data.decisions7d[key])).toBe(true)
    }
    for (const key of ['total', 'last24h', 'last7d']) {
      expect(Number.isInteger(data.audit[key])).toBe(true)
    }
    expect(data.trend).toHaveLength(14)
    for (const point of data.trend as Array<{ day: string; events: number }>) {
      expect(point.day).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isInteger(point.events)).toBe(true)
      expect(point.events).toBeGreaterThanOrEqual(0)
    }
    expect(typeof res.body.meta.generatedAt).toBe('string')
  })

  it('reports aggregates that match direct SQL counts over the same tables', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    // Login itself appends an Operator Login row to the ledger, so the SQL
    // ground truth is measured after the login, immediately around the GET.
    const res = await request(app).get('/api/v1/analytics/dashboard').set('Cookie', cookie).expect(200)
    const data = res.body.data

    const accounts = await pool.query<{ total: string; active: string; suspended: string; terminated: string }>(
      `SELECT count(*) FILTER (WHERE status = 'Active') AS active,
              count(*) FILTER (WHERE status = 'Suspended') AS suspended,
              count(*) FILTER (WHERE status = 'Terminated') AS terminated,
              count(*) AS total
       FROM users WHERE is_deleted = false`,
    )
    expect(data.accounts.total).toBe(Number(accounts.rows[0].total))
    expect(data.accounts.active).toBe(Number(accounts.rows[0].active))
    expect(data.accounts.suspended).toBe(Number(accounts.rows[0].suspended))
    expect(data.accounts.terminated).toBe(Number(accounts.rows[0].terminated))

    const queue = await pool.query<{ pending: string; escalated: string; highPending: string; resolved: string }>(
      `SELECT count(*) FILTER (WHERE flag_status = 'Pending') AS pending,
              count(*) FILTER (WHERE flag_status = 'Escalated') AS escalated,
              count(*) FILTER (WHERE flag_status = 'Pending' AND severity = 'High') AS "highPending",
              count(*) FILTER (WHERE flag_status IN ('Approved', 'Rejected')) AS resolved
       FROM flags`,
    )
    expect(data.queue.pending).toBe(Number(queue.rows[0].pending))
    expect(data.queue.escalated).toBe(Number(queue.rows[0].escalated))
    expect(data.queue.highSeverityPending).toBe(Number(queue.rows[0].highPending))
    expect(data.queue.resolved).toBe(Number(queue.rows[0].resolved))

    const audit = await pool.query<{ total: string; last24h: string; last7d: string }>(
      `SELECT count(*) AS total,
              count(*) FILTER (WHERE created_at >= now() - interval '24 hours') AS "last24h",
              count(*) FILTER (WHERE created_at >= now() - interval '7 days') AS "last7d"
       FROM audit_log`,
    )
    expect(data.audit.total).toBe(Number(audit.rows[0].total))
    expect(data.audit.last24h).toBe(Number(audit.rows[0].last24h))
    expect(data.audit.last7d).toBe(Number(audit.rows[0].last7d))

    // The trend window in the route is [current_date - 13 days, current_date + 1 day);
    // the same predicate here, plus the series must sum to it.
    const window = await pool.query<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log
       WHERE created_at >= current_date - interval '13 days'
         AND created_at <  current_date + interval '1 day'`,
    )
    const trendSum = (data.trend as Array<{ events: number }>).reduce((s, p) => s + p.events, 0)
    expect(trendSum).toBe(Number(window.rows[0].n))

    // Trend ends on the database's own "today" (not a JS-assumed timezone).
    const today = await pool.query<{ d: string }>(`SELECT current_date::text AS d`)
    expect((data.trend as Array<{ day: string }>)[13].day).toBe(today.rows[0].d)

    // Decision activity mirrors the ledger's action vocabulary for the window.
    for (const [key, action] of [
      ['approved', AUDIT_ACTIONS.contentApproved],
      ['rejected', AUDIT_ACTIONS.contentRejected],
      ['escalated', AUDIT_ACTIONS.contentEscalated],
    ] as const) {
      const n = await pool.query<{ n: string }>(
        `SELECT count(*) AS n FROM audit_log
         WHERE action_type = $1 AND created_at >= now() - interval '7 days'`,
        [action],
      )
      expect(data.decisions7d[key]).toBe(Number(n.rows[0].n))
    }
  })
})
