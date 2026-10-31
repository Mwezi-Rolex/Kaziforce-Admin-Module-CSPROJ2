import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

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
})

d('route hygiene', () => {
  it('returns the error envelope for unknown routes (404)', async () => {
    const res = await request(app).get('/api/v1/nope').expect(404)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('NOT_FOUND')
  })
})
