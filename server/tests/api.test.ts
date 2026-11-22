import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createRequire } from 'module'
import { createPool, hasDb as envHasDb } from './helpers/db'

const require2 = createRequire('C:/Users/smmwe/Documents/OpenCode Projects/CS Project II v2/server/package.json')

// Skips cleanly when the database has not been bootstrapped yet (CI/dev without
// server/.env). Runs once `npm run bootstrap && npm run migrate && npm run seed` completed.
const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let app: Express
let pool: Pool

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
})

afterAll(async () => {
  if (hasDb) await pool.end()
})

d('GET /api/v1/health', () => {
  it('returns ok with database reachable', async () => {
    const res = await request(app).get('/api/v1/health').expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('ok')
    expect(res.body.data.database).toBe('reachable')
  })
})

d('auth', () => {
  it('rejects bad credentials with 401 and a generic message', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody@kaziforce.local', password: 'wrong-password' })
      .expect(401)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('AUTH-001')
    expect(res.body.error.message).toBe('Invalid credentials') // no account enumeration
  })

  it('rejects malformed bodies with 422', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'not-an-email' }).expect(422)
    expect(res.body.error.code).toBe('VALIDATION')
  })

  it('logs the demo super admin in, issues the session cookie, and exposes /me', async () => {
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'superadmin@kaziforce.local', password: 'SuperDemo!2026' })
      .expect(200)
    expect(login.body.data.role).toBe('super_admin')
    expect(login.body.data.permissions).toContain('settings.manage')
    const setCookie = login.headers['set-cookie'] as unknown as string[]
    expect(setCookie[0]).toMatch(/kz_session=/)
    expect(setCookie[0]).toMatch(/HttpOnly/i)

    const me = await request(app).get('/api/v1/auth/me').set('Cookie', setCookie).expect(200)
    expect(me.body.data.email).toBe('superadmin@kaziforce.local')
  })

  it('denies /me without a session (401)', async () => {
    const res = await request(app).get('/api/v1/auth/me').expect(401)
    expect(res.body.error.code).toBe('AUTH-002')
  })

  it('rejects an expired session token (401 AUTH-002) — sessions really expire', async () => {
    // SEMANTIC_MODEL.md M4: the session state machine's expiry transition. A
    // token signed with the real secret but already past its exp must be
    // refused exactly like an invalid one — expiry is not just cosmetic.
    const jwt = require2('jsonwebtoken')
    const operator = await pool.query<{ id: string }>(
      `SELECT id FROM users WHERE email = 'moderator@kaziforce.local'`,
    )
    const expired = jwt.sign(
      { sub: operator.rows[0].id, email: 'moderator@kaziforce.local' },
      process.env.JWT_SECRET,
      { expiresIn: '-1s', issuer: 'kaziforce-auth', audience: 'kaziforce-api' },
    )
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Cookie', `kz_session=${expired}`)
      .expect(401)
    expect(res.body.error.code).toBe('AUTH-002')
  })

  it('logout clears the session cookie and writes the Operator Logout audit row', async () => {
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'moderator@kaziforce.local', password: 'ModeratorDemo!2026' })
      .expect(200)
    const cookie = login.headers['set-cookie'][0]
    const res = await request(app).post('/api/v1/auth/logout').set('Cookie', cookie).expect(200)
    const cleared = res.headers['set-cookie'] as unknown as string[]
    expect(cleared.join(';')).toMatch(/kz_session=;/)
    const audited = await pool.query(
      `SELECT 1 FROM audit_log WHERE action_type = 'Operator Logout' AND operator_id = $1`,
      [login.body.data.id],
    )
    expect(audited.rows.length).toBeGreaterThan(0)
  })
})

d('route hygiene', () => {
  it('returns the error envelope for unknown routes (404)', async () => {
    const res = await request(app).get('/api/v1/nope').expect(404)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('NOT_FOUND')
  })
})
