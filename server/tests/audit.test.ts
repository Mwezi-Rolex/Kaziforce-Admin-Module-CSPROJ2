import request from 'supertest'
import type { Express } from 'express'
import { pool } from '../src/db/pool'
import { toCsv } from '../src/routes/audit'

// Audit Explorer slice tests (CON-AUD-002/003).
// The BRIEF restriction is the load-bearing behaviour here: a Viewer must get
// 403 on the CSV download, a Moderator must succeed. Read-only listing is open
// to every operator tier.

const hasDb = Boolean(process.env.DATABASE_URL && process.env.JWT_SECRET)
const d = hasDb ? describe : describe.skip

let app: Express
beforeAll(async () => {
  if (!hasDb) return
  const mod = await import('../src/app')
  app = mod.createApp()
})
afterAll(async () => {
  await pool.end()
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
      'id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,metadata',
    )
    expect(res.text.split('\r\n').length).toBeGreaterThan(1)
  })

  it('ALLOWS a Super Admin', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    await request(app).get('/api/v1/audit/export.csv').set('Cookie', cookie).expect(200)
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
