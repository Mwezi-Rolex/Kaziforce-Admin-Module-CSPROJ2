import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Regression tests for role assignment (SEMANTIC_MODEL.md BUG-5 and BUG-11,
// audit branch fix/state-machine-bugs):
//   - assigning the role an account already holds is refused (409 USER-005)
//     and writes NO audit event (the old code rewrote the row and logged a
//     from==to assignment);
//   - concurrent role assignments leave exactly ONE user_roles row (the old
//     pool.query-based "transaction" could interleave across clients).

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let pool: Pool
let app: Express

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
  // Fixture reset: the sample platform accounts start with the seeded viewer
  // role, whatever earlier suites left behind.
  await pool.query(
    `DELETE FROM user_roles WHERE user_id IN (SELECT id FROM users WHERE email IN ('adwoa.mensah@example.com', 'moses.kato@example.com'))`,
  )
  await pool.query(
    `INSERT INTO user_roles (user_id, role_id)
     SELECT u.id, r.id FROM users u, roles r
     WHERE u.email IN ('adwoa.mensah@example.com', 'moses.kato@example.com') AND r.name = 'viewer'`,
  )
})

afterAll(async () => {
  if (hasDb) await pool.end()
})

async function loginSuperAdmin(): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email: 'superadmin@kaziforce.local', password: 'SuperDemo!2026' }).expect(200)
  return res.headers['set-cookie'][0]
}

async function userIdByEmail(email: string): Promise<string> {
  const { rows } = await pool.query<{ id: string }>(`SELECT id FROM users WHERE email = $1`, [email])
  return rows[0].id
}

async function roleRowCount(userId: string): Promise<number> {
  const { rows } = await pool.query<{ n: string }>(`SELECT count(*) AS n FROM user_roles WHERE user_id = $1`, [userId])
  return Number(rows[0].n)
}

d('BUG-11: no-op role assignment', () => {
  it('refuses assigning the current role with 409 and writes no audit event', async () => {
    const cookie = await loginSuperAdmin()
    const id = await userIdByEmail('adwoa.mensah@example.com')
    const before = await pool.query<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log WHERE action_type = 'Role Assigned' AND target_entity_id = $1`,
      [id],
    )
    const res = await request(app).post(`/api/v1/users/${id}/role`).set('Cookie', cookie).send({ role: 'viewer' })
    expect(res.status).toBe(409)
    expect(res.body.error.code).toBe('USER-005')
    const after = await pool.query<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log WHERE action_type = 'Role Assigned' AND target_entity_id = $1`,
      [id],
    )
    expect(Number(after.rows[0].n)).toBe(Number(before.rows[0].n))
    expect(await roleRowCount(id)).toBe(1)
  })
})

d('BUG-5: concurrent role assignments keep the single-role invariant', () => {
  it('leaves exactly one role row after 10 concurrent assignments', async () => {
    const cookie = await loginSuperAdmin()
    const id = await userIdByEmail('moses.kato@example.com')
    const roles = ['viewer', 'moderator', 'viewer', 'moderator', 'viewer', 'moderator', 'viewer', 'moderator', 'viewer', 'moderator']
    const results = await Promise.all(
      roles.map((role) => request(app).post(`/api/v1/users/${id}/role`).set('Cookie', cookie).send({ role })),
    )
    // Every request either applied or was refused as a no-op — nothing 500s.
    for (const r of results) expect([200, 409]).toContain(r.status)
    expect(await roleRowCount(id)).toBe(1)
    const { rows } = await pool.query(`SELECT r.name FROM user_roles ur JOIN roles r ON r.id = ur.role_id WHERE ur.user_id = $1`, [id])
    expect(['viewer', 'moderator']).toContain(rows[0].name)
    // Restore the seeded role for the sample account.
    await request(app).post(`/api/v1/users/${id}/role`).set('Cookie', cookie).send({ role: 'viewer' })
  })
})
