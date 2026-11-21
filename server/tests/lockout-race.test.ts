import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Regression test for the login-lockout counter (SEMANTIC_MODEL.md BUG-6,
// audit branch fix/state-machine-bugs): the old authenticate() read the failed
// attempt counter, added 1 in Node, and wrote the absolute value back, so
// concurrent failed logins lost updates — 8 concurrent failures left the
// counter at 2 (measured) and the account never locked. The invariant:
// MAX_FAILED_ATTEMPTS concurrent failures lock the account exactly once, with
// exactly one 'Account Locked' audit event.

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

const EMAIL = 'viewer@kaziforce.local'

let pool: Pool
let app: Express

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
  await resetViewer()
})

afterAll(async () => {
  if (!hasDb) return
  await resetViewer()
  await pool.end()
})

async function resetViewer() {
  await pool.query(`UPDATE users SET locked_until = NULL, failed_login_attempts = 0 WHERE lower(email) = lower($1)`, [EMAIL])
}

d('BUG-6: concurrent failed logins lock exactly once', () => {
  it('locks the account after 8 concurrent failures with exactly one audit event', async () => {
    const locksBefore = await pool.query<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log WHERE action_type = 'Account Locked' AND target_entity_id = (SELECT id FROM users WHERE lower(email) = lower($1))`,
      [EMAIL],
    )
    const before = Number(locksBefore.rows[0].n)

    const results = await Promise.all(
      Array.from({ length: 8 }, () =>
        request(app).post('/api/v1/auth/login').send({ email: EMAIL, password: 'definitely-wrong' }),
      ),
    )
    // Every failure is refused with the same generic 401 (no enumeration).
    for (const r of results) expect(r.status).toBe(401)

    const { rows } = await pool.query(
      `SELECT failed_login_attempts AS "failedAttempts", locked_until AS "lockedUntil"
       FROM users WHERE lower(email) = lower($1)`,
      [EMAIL],
    )
    // The account is locked (5 failures is the policy maximum, 8 were fired).
    expect(rows[0].lockedUntil).not.toBeNull()
    expect(rows[0].failedAttempts).toBe(0)
    // Exactly one new 'Account Locked' audit event, no matter how the
    // requests interleaved.
    const locksAfter = await pool.query<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log WHERE action_type = 'Account Locked' AND target_entity_id = (SELECT id FROM users WHERE lower(email) = lower($1))`,
      [EMAIL],
    )
    expect(Number(locksAfter.rows[0].n) - before).toBe(1)

    // A locked account still answers with the generic 401, indistinguishable
    // from a wrong password (no disclosure of lock state).
    const locked = await request(app).post('/api/v1/auth/login').send({ email: EMAIL, password: 'ViewerDemo!2026' })
    expect(locked.status).toBe(401)
    expect(locked.body.error.code).toBe('AUTH-001')
  })
})
