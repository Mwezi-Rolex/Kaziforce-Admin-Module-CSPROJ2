import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Regression tests for the account status machine (SEMANTIC_MODEL.md BUG-3,
// audit branch fix/state-machine-bugs):
//   - suspend is legal only FROM Active: a Terminated (banned) account can
//     never be flipped back by a Moderator (the old code accepted it, letting
//     users.suspend reverse a users.ban sanction);
//   - ban is legal from Active and Suspended only;
//   - concurrent status changes apply exactly once (guarded UPDATE).
//
// Fixture discipline mirrors users.test.ts: sample accounts are restored to
// Active in beforeAll; each test owns a distinct sample account.

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let pool: Pool
let app: Express

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
  await pool.query(
    `UPDATE users SET status = 'Active'
     WHERE email IN ('adwoa.mensah@example.com', 'zainab.okafor@example.com', 'moses.kato@example.com')`,
  )
})

afterAll(async () => {
  if (!hasDb) return
  await pool.query(
    `UPDATE users SET status = 'Active'
     WHERE email IN ('adwoa.mensah@example.com', 'zainab.okafor@example.com', 'moses.kato@example.com')`,
  )
  await pool.end()
})

async function loginAs(email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
  return res.headers['set-cookie'][0]
}

async function userIdByEmail(email: string): Promise<string> {
  const { rows } = await pool.query<{ id: string }>(`SELECT id FROM users WHERE email = $1`, [email])
  return rows[0].id
}

async function statusOf(id: string): Promise<string> {
  const { rows } = await pool.query<{ status: string }>(`SELECT status FROM users WHERE id = $1`, [id])
  return rows[0].status
}

async function auditDelta(actionType: string, userId: string, before: number): Promise<number> {
  const { rows } = await pool.query<{ n: string }>(
    `SELECT count(*) AS n FROM audit_log WHERE action_type = $1 AND target_entity_id = $2`,
    [actionType, userId],
  )
  return Number(rows[0].n) - before
}

async function auditCount(actionType: string, userId: string): Promise<number> {
  const { rows } = await pool.query<{ n: string }>(
    `SELECT count(*) AS n FROM audit_log WHERE action_type = $1 AND target_entity_id = $2`,
    [actionType, userId],
  )
  return Number(rows[0].n)
}

d('BUG-3: the suspend/ban transition machine', () => {
  it('refuses to suspend a Terminated account (a Moderator cannot reverse a ban)', async () => {
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const id = await userIdByEmail('moses.kato@example.com')
    await request(app).post(`/api/v1/users/${id}/ban`).set('Cookie', admin).expect(200)

    const bansBefore = await auditCount('User Suspended', id)
    const res = await request(app).post(`/api/v1/users/${id}/suspend`).set('Cookie', moderator)
    expect(res.status).toBe(409)
    expect(res.body.error.code).toBe('USER-003')
    expect(await statusOf(id)).toBe('Terminated')
    expect(await auditDelta('User Suspended', id, bansBefore)).toBe(0)
  })

  it('bans an account from Suspended (legal transition)', async () => {
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const id = await userIdByEmail('zainab.okafor@example.com')
    await request(app).post(`/api/v1/users/${id}/suspend`).set('Cookie', moderator).expect(200)
    const res = await request(app).post(`/api/v1/users/${id}/ban`).set('Cookie', admin).expect(200)
    expect(res.body.data.status).toBe('Terminated')
    expect(await statusOf(id)).toBe('Terminated')
  })

  it('refuses to ban a Terminated account again with a clear 409', async () => {
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const id = await userIdByEmail('zainab.okafor@example.com') // Terminated by the previous test
    const res = await request(app).post(`/api/v1/users/${id}/ban`).set('Cookie', admin)
    expect(res.status).toBe(409)
    expect(res.body.error.code).toBe('USER-003')
    expect(res.body.error.message).toMatch(/already Terminated/i)
  })

  it('applies concurrent suspends exactly once (one 200, one 409, one audit event)', async () => {
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const id = await userIdByEmail('adwoa.mensah@example.com')
    const suspendsBefore = await auditCount('User Suspended', id)

    // Deterministic interleaving: hold the account row's lock so both requests
    // read Active before either can write.
    const barrier = await pool.connect()
    let statuses: number[]
    try {
      await barrier.query('BEGIN')
      await barrier.query(`SELECT status FROM users WHERE id = $1 FOR UPDATE`, [id])
      const pending = Promise.all([
        request(app).post(`/api/v1/users/${id}/suspend`).set('Cookie', moderator),
        request(app).post(`/api/v1/users/${id}/suspend`).set('Cookie', moderator),
      ])
      await new Promise((r) => setTimeout(r, 500))
      await barrier.query('COMMIT')
      statuses = (await pending).map((r) => r.status).sort((a, b) => a - b)
    } finally {
      barrier.release()
    }
    expect(statuses).toEqual([200, 409])
    expect(await statusOf(id)).toBe('Suspended')
    expect(await auditDelta('User Suspended', id, suspendsBefore)).toBe(1)
  })
})
