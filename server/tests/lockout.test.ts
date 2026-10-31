import request from 'supertest'
import type { Express } from 'express'
import { pool } from '../src/db/pool'
import { LOCKOUT_MINUTES, MAX_FAILED_ATTEMPTS } from '../src/services/authService'

// Login lockout tests (OQ-12, SEC-AUTH-008). One test per stated rule:
//   1. lock after 5 consecutive failures
//   2. locked account cannot log in even with the correct password
//   3. the counter resets on a successful login
//   4. the same generic error whether or not the account exists
//   5. lock expires after 15 minutes
//   6. a Super Admin can unlock; Viewer and Moderator cannot
//   7. only lock/unlock events are audited — not each failed attempt
//
// The suite drives real HTTP requests against the seeded database and restores
// lock state in beforeAll/afterAll so it is order-independent and repeatable.

const hasDb = Boolean(process.env.DATABASE_URL && process.env.JWT_SECRET)
const d = hasDb ? describe : describe.skip

let app: Express
const VIEWER = { email: 'viewer@kaziforce.local', password: 'ViewerDemo!2026' }

async function clearLock(email: string) {
  await pool.query(`UPDATE users SET locked_until = NULL, failed_login_attempts = 0 WHERE lower(email) = lower($1)`, [email])
}

async function lockState(email: string) {
  const { rows } = await pool.query(
    `SELECT failed_login_attempts AS attempts, locked_until AS "lockedUntil" FROM users WHERE lower(email) = lower($1)`,
    [email],
  )
  return rows[0]
}

async function failLogin(email: string, times: number) {
  for (let i = 0; i < times; i++) {
    await request(app).post('/api/v1/auth/login').send({ email, password: 'definitely-wrong' })
  }
}

beforeAll(async () => {
  if (!hasDb) return
  const mod = await import('../src/app')
  app = mod.createApp()
  await clearLock(VIEWER.email)
})
afterAll(async () => {
  if (!hasDb) return
  await clearLock(VIEWER.email)
  await pool.end()
})

d('rule 1 — lock after the configured number of consecutive failures', () => {
  it(`locks the account after ${MAX_FAILED_ATTEMPTS} consecutive failures`, async () => {
    await clearLock(VIEWER.email)

    // One short of the threshold: still no lock.
    await failLogin(VIEWER.email, MAX_FAILED_ATTEMPTS - 1)
    let state = await lockState(VIEWER.email)
    expect(state.attempts).toBe(MAX_FAILED_ATTEMPTS - 1)
    expect(state.lockedUntil).toBeNull()

    // The next failure trips the lock.
    await failLogin(VIEWER.email, 1)
    state = await lockState(VIEWER.email)
    expect(state.lockedUntil).not.toBeNull()
    expect(new Date(state.lockedUntil).getTime()).toBeGreaterThan(Date.now())
  })

  it(`sets the lock for exactly ${LOCKOUT_MINUTES} minutes`, async () => {
    await clearLock(VIEWER.email)
    await failLogin(VIEWER.email, MAX_FAILED_ATTEMPTS)
    const state = await lockState(VIEWER.email)
    const minutes = (new Date(state.lockedUntil).getTime() - Date.now()) / 60000
    // Allow a small execution window either side of the nominal duration.
    expect(minutes).toBeGreaterThan(LOCKOUT_MINUTES - 1)
    expect(minutes).toBeLessThanOrEqual(LOCKOUT_MINUTES + 0.5)
  })
})

d('rule 2 — a locked account cannot log in, even with the correct password', () => {
  it('refuses the correct password while locked', async () => {
    await clearLock(VIEWER.email)
    await failLogin(VIEWER.email, MAX_FAILED_ATTEMPTS)
    const res = await request(app).post('/api/v1/auth/login').send(VIEWER).expect(401)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('AUTH-001')
  })

  it('does not extend the lock on further attempts', async () => {
    const before = await lockState(VIEWER.email)
    await request(app).post('/api/v1/auth/login').send(VIEWER)
    const after = await lockState(VIEWER.email)
    expect(new Date(after.lockedUntil).getTime()).toBe(new Date(before.lockedUntil).getTime())
  })
})

d('rule 3 — the failure counter resets on a successful login', () => {
  it('zeroes the counter after a success', async () => {
    await clearLock(VIEWER.email)
    await failLogin(VIEWER.email, MAX_FAILED_ATTEMPTS - 1)
    expect((await lockState(VIEWER.email)).attempts).toBe(MAX_FAILED_ATTEMPTS - 1)

    await request(app).post('/api/v1/auth/login').send(VIEWER).expect(200)
    const state = await lockState(VIEWER.email)
    expect(state.attempts).toBe(0)
    expect(state.lockedUntil).toBeNull()
  })

  it('a success between failures prevents the lock (failures are CONSECUTIVE)', async () => {
    await clearLock(VIEWER.email)
    await failLogin(VIEWER.email, 4)
    await request(app).post('/api/v1/auth/login').send(VIEWER).expect(200) // resets
    await failLogin(VIEWER.email, 4)
    const state = await lockState(VIEWER.email)
    expect(state.lockedUntil).toBeNull() // 4 after a reset is still under the threshold
  })
})

d('rule 4 — the response does not reveal whether the account exists', () => {
  it('returns an identical error for an unknown account and a wrong password', async () => {
    await clearLock(VIEWER.email)
    const unknown = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody-at-all@kaziforce.local', password: 'whatever' })
      .expect(401)
    const known = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: VIEWER.email, password: 'wrong-password' })
      .expect(401)
    // Compare the error payload, not the whole body: the envelope's timestamp
    // legitimately differs between two requests and is not part of the
    // information-disclosure surface.
    expect(unknown.body.error).toEqual(known.body.error)
    expect(unknown.body.success).toBe(known.body.success)
    expect(unknown.body.error.code).toBe('AUTH-001')
    expect(unknown.body.error.message).toBe('Invalid credentials')
    await clearLock(VIEWER.email)
  })

  it('returns the SAME generic error for a locked account (lock state is not disclosed)', async () => {
    await clearLock(VIEWER.email)
    await failLogin(VIEWER.email, MAX_FAILED_ATTEMPTS)
    const locked = await request(app).post('/api/v1/auth/login').send(VIEWER).expect(401)
    const unknown = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody-at-all@kaziforce.local', password: 'whatever' })
      .expect(401)
    expect(locked.body.error).toEqual(unknown.body.error)
  })
})

d('rule 5 — the lock expires', () => {
  it('allows login once the lock timestamp is in the past', async () => {
    await clearLock(VIEWER.email)
    // Simulate an elapsed lock rather than sleeping 15 minutes.
    await pool.query(
      `UPDATE users SET locked_until = now() - interval '1 second', failed_login_attempts = 0
       WHERE lower(email) = lower($1)`,
      [VIEWER.email],
    )
    await request(app).post('/api/v1/auth/login').send(VIEWER).expect(200)
    const state = await lockState(VIEWER.email)
    expect(state.lockedUntil).toBeNull()
    expect(state.attempts).toBe(0)
  })
})

d('rule 6 — a Super Admin can unlock; lower roles cannot', () => {
  async function loginAs(email: string, password: string): Promise<string> {
    const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
    return res.headers['set-cookie'][0]
  }

  it('denies a Viewer with 403', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const { rows } = await pool.query(`SELECT id FROM users WHERE lower(email) = lower($1)`, [VIEWER.email])
    const res = await request(app).post(`/api/v1/users/${rows[0].id}/unlock`).set('Cookie', cookie).expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })

  it('denies a Moderator with 403', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const { rows } = await pool.query(`SELECT id FROM users WHERE lower(email) = lower($1)`, [VIEWER.email])
    await request(app).post(`/api/v1/users/${rows[0].id}/unlock`).set('Cookie', cookie).expect(403)
  })

  it('lets a Super Admin unlock a locked account, and login then succeeds', async () => {
    await clearLock(VIEWER.email)
    await failLogin(VIEWER.email, MAX_FAILED_ATTEMPTS)
    expect((await lockState(VIEWER.email)).lockedUntil).not.toBeNull()

    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const { rows } = await pool.query(`SELECT id FROM users WHERE lower(email) = lower($1)`, [VIEWER.email])
    const res = await request(app)
      .post(`/api/v1/users/${rows[0].id}/unlock`)
      .set('Cookie', admin)
      .expect(200)
    expect(res.body.data.wasLocked).toBe(true)

    const state = await lockState(VIEWER.email)
    expect(state.lockedUntil).toBeNull()
    expect(state.attempts).toBe(0)
    await request(app).post('/api/v1/auth/login').send(VIEWER).expect(200)
  })

  it('returns 404 for an unknown account id', async () => {
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    await request(app)
      .post('/api/v1/users/00000000-0000-0000-0000-000000000000/unlock')
      .set('Cookie', admin)
      .expect(404)
  })
})

d('rule 7 — only lock and unlock are audited, not each failed attempt', () => {
  it('writes one Account Locked event and no per-attempt rows', async () => {
    await clearLock(VIEWER.email)
    const before = await pool.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type = 'Account Locked'`,
    )
    const failedBefore = await pool.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type ILIKE '%failed%' OR action_type ILIKE '%denied%'`,
    )

    // Five failures: the first four must leave no trace, the fifth locks.
    await failLogin(VIEWER.email, MAX_FAILED_ATTEMPTS)

    const after = await pool.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type = 'Account Locked'`,
    )
    const failedAfter = await pool.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type ILIKE '%failed%' OR action_type ILIKE '%denied%'`,
    )

    expect(after.rows[0].n).toBe(before.rows[0].n + 1)
    // No audit row was created for the individual failed attempts.
    expect(failedAfter.rows[0].n).toBe(failedBefore.rows[0].n)

    const { rows } = await pool.query(
      `SELECT metadata FROM audit_log WHERE action_type = 'Account Locked' ORDER BY created_at DESC LIMIT 1`,
    )
    expect(rows[0].metadata).toMatchObject({ reason: 'consecutive_failed_logins' })
    expect(rows[0].metadata.attempts).toBe(MAX_FAILED_ATTEMPTS)
  })

  it('writes an Account Unlocked event on unlock', async () => {
    const admin = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'superadmin@kaziforce.local', password: 'SuperDemo!2026' })
      .expect(200)
    const cookie = admin.headers['set-cookie'][0]
    const { rows } = await pool.query(`SELECT id FROM users WHERE lower(email) = lower($1)`, [VIEWER.email])
    const before = await pool.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type = 'Account Unlocked'`,
    )
    await request(app).post(`/api/v1/users/${rows[0].id}/unlock`).set('Cookie', cookie).expect(200)
    const after = await pool.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type = 'Account Unlocked'`,
    )
    expect(after.rows[0].n).toBe(before.rows[0].n + 1)
  })
})
