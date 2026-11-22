import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'
import { toCsv } from '../src/lib/csv'

// Audit Explorer slice tests (CON-AUD-002/003).
// The BRIEF restriction is the load-bearing behaviour here: a Viewer must get
// 403 on the CSV download, a Moderator must succeed. Read-only listing is open
// to every operator tier.

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

describe('toCsv (RFC 4180 escaping)', () => {
  it('escapes commas, quotes, and newlines', () => {
    const csv = toCsv(
      [{ a: 'plain', b: 'has,comma', c: 'has"quote', d: 'has\nnewline' }],
      ['a', 'b', 'c', 'd'],
    )
    expect(csv.startsWith('a,b,c,d\r\n')).toBe(true)
    expect(csv).toContain('"has,comma"')
    expect(csv).toContain('"has""quote"')
    expect(csv).toContain('"has\nnewline"')
  })

  it('serialises object metadata as JSON', () => {
    const csv = toCsv([{ m: { decision: 'approve' } }], ['m'])
    expect(csv).toContain('{""decision"":""approve""}')
  })
})

d('GET /api/v1/audit (audit.view — all tiers)', () => {
  it('requires authentication', async () => {
    await request(app).get('/api/v1/audit').expect(401)
  })

  it('lets a Viewer read the log', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app).get('/api/v1/audit').set('Cookie', cookie).expect(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.meta.total).toBeGreaterThan(0)
    expect(Array.isArray(res.body.meta.actionTypes)).toBe(true)
  })

  it('filters by actor and action type', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app)
      .get('/api/v1/audit?actor=superadmin&action=Operator%20Login')
      .set('Cookie', cookie)
      .expect(200)
    for (const row of res.body.data) {
      expect(row.actionType).toBe('Operator Login')
    }
  })

  it('rejects a malformed date filter with 422', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    await request(app).get('/api/v1/audit?from=17-09-2026').set('Cookie', cookie).expect(422)
  })
})

d('GET /api/v1/audit/export.csv (audit.export — Moderator+ only, CON-AUD-003)', () => {
  it('DENIES a Viewer with 403 (BRIEF override of Ch5 all-operator export)', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app).get('/api/v1/audit/export.csv').set('Cookie', cookie).expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
    expect(res.body.error.message).toContain('audit.export')
  })

  it('DENIES an anonymous caller with 401', async () => {
    await request(app).get('/api/v1/audit/export.csv').expect(401)
  })

  it('ALLOWS a Moderator and returns a CSV attachment', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app).get('/api/v1/audit/export.csv').set('Cookie', cookie).expect(200)
    expect(res.headers['content-type']).toContain('text/csv')
    expect(res.headers['content-disposition']).toContain('attachment')
    expect(res.text.split('\r\n')[0]).toBe(
      'id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,outcome,actorIp,correlationId,metadata',
    )
    expect(res.text.split('\r\n').length).toBeGreaterThan(1)
  })

  it('ALLOWS a Super Admin', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    await request(app).get('/api/v1/audit/export.csv').set('Cookie', cookie).expect(200)
  })

  it('writes createdAt as a clean ISO cell with no quote marks (DISCREPANCIES row 18)', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app).get('/api/v1/audit/export.csv').set('Cookie', cookie).expect(200)
    // The old defect (JSON.stringify on a Date) wrapped every createdAt in
    // triple-quote sequences. An ISO timestamp carries no CSV-special
    // characters, so each createdAt cell must be bare.
    expect(res.text).not.toContain('"""')
    expect(res.text).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  })

  it('prefixes a correlation id that would execute as a spreadsheet formula', async () => {
    const probe = `Formula Probe ${Date.now()}`
    await pool.query(
      `INSERT INTO audit_log (operator_id, action_type, target_entity_type, target_entity_id, outcome, correlation_id, metadata)
       VALUES (NULL, $1, 'audit_probe', NULL, 'Success', $2, '{}')`,
      [probe, '=-HYPERLINK("https://evil.example")'],
    )
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app)
      .get(`/api/v1/audit/export.csv?action=${encodeURIComponent(probe)}`)
      .set('Cookie', cookie)
      .expect(200)
    const dataLine = res.text.split('\r\n').find((l) => l.includes(probe))
    expect(dataLine).toBeDefined()
    // The cell must not begin with "=" — the guard prefix makes the
    // spreadsheet treat it as text. Quotes are RFC 4180-escaped after the
    // prefix, and the field is wrapped because it contains double quotes.
    expect(dataLine).not.toMatch(/,(=-)/)
    expect(dataLine).toContain('"\'=-HYPERLINK(""https://evil.example"")"')
  })
})

d('authorization denials are audited (SEC-AUD-002)', () => {
  it('records an Authorization Denied event when a Viewer attempts the CSV export', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const before = await pool.query(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type = 'Authorization Denied'`,
    )
    await request(app).get('/api/v1/audit/export.csv').set('Cookie', cookie).expect(403)
    const after = await pool.query(
      `SELECT metadata FROM audit_log WHERE action_type = 'Authorization Denied' ORDER BY created_at DESC LIMIT 1`,
    )
    const { rows } = await pool.query(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type = 'Authorization Denied'`,
    )
    expect(rows[0].n).toBeGreaterThan(before.rows[0].n)
    expect(after.rows[0].metadata).toMatchObject({ requiredPermission: 'audit.export', role: 'viewer' })
  })
})

// Audit provenance (BED §6.15 / DDD §28.2; migration 009): the ledger records
// where an action came from, how it ended, and the correlation id that ties the
// row to the API response.
d('audit provenance: outcome, source address and correlation id', () => {
  it('records outcome Success, the source address and a correlation id on login', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'viewer@kaziforce.local', password: 'ViewerDemo!2026' })
      .expect(200)
    const correlationId = res.headers['x-correlation-id']
    expect(typeof correlationId).toBe('string')
    expect(String(correlationId).length).toBeGreaterThan(7)

    const { rows } = await pool.query(
      `SELECT outcome, actor_ip AS "actorIp", correlation_id AS "correlationId"
       FROM audit_log WHERE action_type = 'Operator Login' ORDER BY created_at DESC LIMIT 1`,
    )
    expect(rows[0].outcome).toBe('Success')
    expect(rows[0].actorIp).not.toBeNull()
    expect(rows[0].correlationId).toBe(correlationId)
  })

  it('honours a client-supplied correlation id so a trace can span systems', async () => {
    const supplied = 'trace-abc-123456'
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('x-correlation-id', supplied)
      .send({ email: 'viewer@kaziforce.local', password: 'ViewerDemo!2026' })
      .expect(200)
    expect(res.headers['x-correlation-id']).toBe(supplied)
    const { rows } = await pool.query(
      `SELECT correlation_id AS "correlationId" FROM audit_log WHERE action_type = 'Operator Login'
       ORDER BY created_at DESC LIMIT 1`,
    )
    expect(rows[0].correlationId).toBe(supplied)
  })

  it('records outcome Blocked on an authorization denial', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    await request(app).get('/api/v1/audit/export.csv').set('Cookie', cookie).expect(403)
    const { rows } = await pool.query(
      `SELECT outcome FROM audit_log WHERE action_type = 'Authorization Denied' ORDER BY created_at DESC LIMIT 1`,
    )
    expect(rows[0].outcome).toBe('Blocked')
  })

  it('filters the log by outcome', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app)
      .get('/api/v1/audit?outcome=Blocked')
      .set('Cookie', cookie)
      .expect(200)
    for (const row of res.body.data) {
      expect(row.outcome).toBe('Blocked')
    }
  })

  it('rejects an unknown outcome filter with 422', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    await request(app).get('/api/v1/audit?outcome=Maybe').set('Cookie', cookie).expect(422)
  })
})
