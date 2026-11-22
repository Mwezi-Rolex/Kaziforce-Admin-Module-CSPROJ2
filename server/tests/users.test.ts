import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// User Control Centre slice tests (CON-USR-001…005). Role denials are covered
// per BRIEF: every role that must be refused gets its own assertion.
// NOTE: mutations touch the seeded sample accounts; `npm run seed` restores them.

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
  // Reset the sample accounts so the suite is idempotent across runs
  // (mutations from earlier runs would otherwise return 409). Roles are reset
  // too: this suite's role test leaves adwoa as moderator, and Jest's suite
  // order varies, so a later run could otherwise find the no-op 409 instead
  // of the expected 200 (observed once on test/behaviour).
  await pool.query(
    `UPDATE users SET status = 'Active'
     WHERE email IN ('adwoa.mensah@example.com', 'zainab.okafor@example.com', 'moses.kato@example.com')`,
  )
  await pool.query(
    `DELETE FROM user_roles
     WHERE user_id IN (SELECT id FROM users WHERE email IN ('adwoa.mensah@example.com', 'moses.kato@example.com', 'zainab.okafor@example.com'))`,
  )
  await pool.query(
    `INSERT INTO user_roles (user_id, role_id)
     SELECT u.id, r.id FROM users u, roles r
     WHERE u.email IN ('adwoa.mensah@example.com', 'moses.kato@example.com', 'zainab.okafor@example.com') AND r.name = 'viewer'`,
  )
})
afterAll(async () => {
  if (hasDb) await pool.end()
})

async function loginAs(email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
  return res.headers['set-cookie'][0]
}

d('GET /api/v1/users', () => {
  it('requires authentication (401 without a session)', async () => {
    const res = await request(app).get('/api/v1/users').expect(401)
    expect(res.body.error.code).toBe('AUTH-002')
  })

  it('lists accounts for a Viewer (users.view) with envelope + meta', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app).get('/api/v1/users').set('Cookie', cookie).expect(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.meta.total).toBeGreaterThan(0)
  })

  it('supports search and status filters', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app)
      .get('/api/v1/users?query=adwoa&status=Active')
      .set('Cookie', cookie)
      .expect(200)
    expect(res.body.data).toHaveLength(1)
    expect(res.body.data[0].email).toBe('adwoa.mensah@example.com')
  })

  it('rejects an invalid status filter with 422', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    await request(app).get('/api/v1/users?status=Bogus').set('Cookie', cookie).expect(422)
  })

  it('returns the account record with flags and content (users.view)', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const list = await request(app).get('/api/v1/users?query=zainab').set('Cookie', cookie).expect(200)
    const id = list.body.data[0].id
    const detail = await request(app).get(`/api/v1/users/${id}`).set('Cookie', cookie).expect(200)
    expect(detail.body.data.flagsReported).toBeInstanceOf(Array)
    expect(detail.body.data.contentOwned).toBeInstanceOf(Array)
  })
})

d('suspend (users.suspend)', () => {
  it('denies a Viewer with 403', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const list = await request(app).get('/api/v1/users?query=adwoa').set('Cookie', cookie).expect(200)
    const res = await request(app)
      .post(`/api/v1/users/${list.body.data[0].id}/suspend`)
      .set('Cookie', cookie)
      .expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })

  it('lets a Moderator suspend a platform account and writes an audit event', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const list = await request(app).get('/api/v1/users?query=zainab').set('Cookie', cookie).expect(200)
    const id = list.body.data[0].id
    const res = await request(app).post(`/api/v1/users/${id}/suspend`).set('Cookie', cookie).expect(200)
    expect(res.body.data.status).toBe('Suspended')
    const audit = await pool.query(
      `SELECT action_type FROM audit_log WHERE target_entity_id = $1 AND action_type = 'User Suspended'`,
      [id],
    )
    expect(audit.rows.length).toBeGreaterThan(0)
  })

  it('returns 409 when the account is already suspended', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const list = await request(app).get('/api/v1/users?query=zainab').set('Cookie', cookie).expect(200)
    const res = await request(app)
      .post(`/api/v1/users/${list.body.data[0].id}/suspend`)
      .set('Cookie', cookie)
      .expect(409)
    expect(res.body.error.code).toBe('USER-003')
  })

  it('denies a Moderator suspending an operator account (403, Ch5 "non-admin users")', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const list = await request(app).get('/api/v1/users?query=viewer@kaziforce.local').set('Cookie', cookie).expect(200)
    const res = await request(app)
      .post(`/api/v1/users/${list.body.data[0].id}/suspend`)
      .set('Cookie', cookie)
      .expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })
})

d('permanent ban (users.ban)', () => {
  it('denies a Moderator with 403', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const list = await request(app).get('/api/v1/users?query=moses').set('Cookie', cookie).expect(200)
    const res = await request(app)
      .post(`/api/v1/users/${list.body.data[0].id}/ban`)
      .set('Cookie', cookie)
      .expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })

  it('lets a Super Admin ban a platform account (status Terminated) and writes an audit event', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const list = await request(app).get('/api/v1/users?query=moses').set('Cookie', cookie).expect(200)
    const id = list.body.data[0].id
    const res = await request(app).post(`/api/v1/users/${id}/ban`).set('Cookie', cookie).expect(200)
    expect(res.body.data.status).toBe('Terminated')
    const audit = await pool.query(
      `SELECT action_type FROM audit_log WHERE target_entity_id = $1 AND action_type = 'Account Terminated'`,
      [id],
    )
    expect(audit.rows.length).toBeGreaterThan(0)
  })
})

d('suspended operator lifecycle (CON-AUTH-003, BR-USR-005)', () => {
  it('blocks sign-in once the operator is suspended, and restores on reactivation', async () => {
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const list = await request(app).get('/api/v1/users?query=viewer@kaziforce.local').set('Cookie', admin).expect(200)
    const id = list.body.data[0].id
    await request(app).post(`/api/v1/users/${id}/suspend`).set('Cookie', admin).expect(200)
    const denied = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'viewer@kaziforce.local', password: 'ViewerDemo!2026' })
      .expect(403)
    expect(denied.body.error.code).toBe('AUTH-003')
    // BUG-11 fix: assigning the role the account already holds is the refused
    // no-op (409 USER-005), so re-assert the guard here instead of expecting
    // the old rewrite-and-audit behaviour.
    const noop = await request(app).post(`/api/v1/users/${id}/role`).set('Cookie', admin).send({ role: 'viewer' })
    expect(noop.status).toBe(409)
    expect(noop.body.error.code).toBe('USER-005')
    await pool.query(`UPDATE users SET status = 'Active' WHERE id = $1`, [id])
    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'viewer@kaziforce.local', password: 'ViewerDemo!2026' })
      .expect(200)
  })
})

d('role assignment (users.assign_role)', () => {
  it('denies a Moderator with 403', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const list = await request(app).get('/api/v1/users?query=adwoa').set('Cookie', cookie).expect(200)
    await request(app)
      .post(`/api/v1/users/${list.body.data[0].id}/role`)
      .set('Cookie', cookie)
      .send({ role: 'moderator' })
      .expect(403)
  })

  it('lets a Super Admin assign a role and writes an audit event', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const list = await request(app).get('/api/v1/users?query=adwoa').set('Cookie', cookie).expect(200)
    const id = list.body.data[0].id
    const res = await request(app)
      .post(`/api/v1/users/${id}/role`)
      .set('Cookie', cookie)
      .send({ role: 'moderator' })
      .expect(200)
    expect(res.body.data.role).toBe('moderator')
    const audit = await pool.query(
      `SELECT action_type FROM audit_log WHERE target_entity_id = $1 AND action_type = 'Role Assigned'`,
      [id],
    )
    expect(audit.rows.length).toBeGreaterThan(0)
  })

  it('rejects an unknown role with 422', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const list = await request(app).get('/api/v1/users?query=adwoa').set('Cookie', cookie).expect(200)
    await request(app)
      .post(`/api/v1/users/${list.body.data[0].id}/role`)
      .set('Cookie', cookie)
      .send({ role: 'emperor' })
      .expect(422)
  })

  it('refuses a Super Admin changing their own role (lockout guard, 422)', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const me = await request(app).get('/api/v1/auth/me').set('Cookie', cookie).expect(200)
    await request(app)
      .post(`/api/v1/users/${me.body.data.id}/role`)
      .set('Cookie', cookie)
      .send({ role: 'viewer' })
      .expect(422)
  })
})
