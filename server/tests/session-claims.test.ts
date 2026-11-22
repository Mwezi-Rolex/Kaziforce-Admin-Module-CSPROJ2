import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Regression test for the session token contract (SEMANTIC_MODEL.md BUG-12,
// audit branch fix/state-machine-bugs): the JWT used to embed the operator's
// role and permission list, but the server reads only `sub` from the token and
// re-derives role + permissions from the database on every request. The stale
// snapshot in the cookie was one fact stored twice that could only drift.
// The fixed contract: the token carries ONLY the subject and email.
//
// Authorization continues to come from the fresh DB read (requireAuth), which
// the audit round verified directly: a demoted operator's old cookie loses its
// rights on the very next request.

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

d('BUG-12: the session token carries no role or permission claims', () => {
  it('signs only sub and email into the JWT', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'moderator@kaziforce.local', password: 'ModeratorDemo!2026' }).expect(200)
    const cookieHeader = res.headers['set-cookie'][0]
    const token = /kz_session=([^;]+)/.exec(cookieHeader)?.[1]
    expect(token).toBeDefined()

    const payload = JSON.parse(Buffer.from(token!.split('.')[1], 'base64url').toString('utf8'))
    expect(payload.sub).toBe(res.body.data.id)
    expect(payload.email).toBe('moderator@kaziforce.local')
    expect(payload).not.toHaveProperty('role')
    expect(payload).not.toHaveProperty('permissions')
  })

  it('still authenticates every request from the fresh DB read (session works)', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'moderator@kaziforce.local', password: 'ModeratorDemo!2026' }).expect(200)
    const cookie = res.headers['set-cookie'][0].split(';')[0]
    const me = await request(app).get('/api/v1/auth/me').set('Cookie', cookie).expect(200)
    expect(me.body.data.role).toBe('moderator')
    expect(Array.isArray(me.body.data.permissions)).toBe(true)
  })
})
