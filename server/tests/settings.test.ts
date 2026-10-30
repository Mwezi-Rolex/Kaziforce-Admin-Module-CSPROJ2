import request from 'supertest'
import type { Express } from 'express'
import { pool } from '../src/db/pool'

// Settings slice tests (CON-SET-001/002; FR-ADM-004/019/020/026/027/029/031).
// A Viewer and a Moderator must both be refused every mutation — BRIEF's
// role-enforcement rule, which the panel will probe.

const hasDb = Boolean(process.env.DATABASE_URL && process.env.JWT_SECRET)
const d = hasDb ? describe : describe.skip

let app: Express
beforeAll(async () => {
  if (!hasDb) return
  const mod = await import('../src/app')
  app = mod.createApp()
  // Reset the sample settings so the suite is idempotent.
  await pool.query(`UPDATE system_settings SET value = '20'    WHERE key = 'sample.moderation.queue_threshold'`)
  await pool.query(`UPDATE system_settings SET value = '480'   WHERE key = 'sample.session.timeout_minutes'`)
  await pool.query(`UPDATE system_settings SET value = 'false' WHERE key = 'sample.feature.auto_triage'`)
})
afterAll(async () => {
  await pool.end()
})

async function loginAs(email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
  return res.headers['set-cookie'][0]
}

d('GET /api/v1/settings', () => {
  it('requires authentication (401)', async () => {
    await request(app).get('/api/v1/settings').expect(401)
  })

  it('lets a Viewer read active configuration (FR-ADM-031)', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app).get('/api/v1/settings').set('Cookie', cookie).expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.length).toBeGreaterThan(0)
    expect(res.body.data.every((s: { key: string }) => s.key.includes('sample'))).toBe(true)
  })
})

d('PUT /api/v1/settings/:key (settings.manage — Super Admin only)', () => {
  it('DENIES a Viewer with 403', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app)
      .put('/api/v1/settings/sample.moderation.queue_threshold')
      .set('Cookie', cookie)
      .send({ value: '99' })
      .expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })

  it('DENIES a Moderator with 403', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app)
      .put('/api/v1/settings/sample.moderation.queue_threshold')
      .set('Cookie', cookie)
      .send({ value: '99' })
      .expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })

  it('ALLOWS a Super Admin and writes an audit event (FR-ADM-034, SEC-AUD-005)', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const res = await request(app)
      .put('/api/v1/settings/sample.moderation.queue_threshold')
      .set('Cookie', cookie)
      .send({ value: '35' })
      .expect(200)
    expect(res.body.data.value).toBe('35')
    const audit = await pool.query(
      `SELECT metadata FROM audit_log WHERE action_type = 'Configuration Updated' ORDER BY created_at DESC LIMIT 1`,
    )
    expect(audit.rows.length).toBeGreaterThan(0)
    expect(audit.rows[0].metadata).toMatchObject({ key: 'sample.moderation.queue_threshold', to: '35' })
  })

  it('rejects a malformed key with 422', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    await request(app).put('/api/v1/settings/BAD%20KEY!').set('Cookie', cookie).send({ value: 'x' }).expect(422)
  })

  it('returns 404 for an unknown key', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const res = await request(app)
      .put('/api/v1/settings/sample.does.not.exist')
      .set('Cookie', cookie)
      .send({ value: 'x' })
      .expect(404)
    expect(res.body.error.code).toBe('SETTING-001')
  })
})

d('POST /api/v1/settings/:key/toggle (feature flags, FR-ADM-026/029)', () => {
  it('DENIES a Moderator with 403', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    await request(app)
      .post('/api/v1/settings/sample.feature.auto_triage/toggle')
      .set('Cookie', cookie)
      .send({ enabled: true })
      .expect(403)
  })

  it('ALLOWS a Super Admin to enable, audited, and to roll back without redeploy (FR-ADM-029)', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const on = await request(app)
      .post('/api/v1/settings/sample.feature.auto_triage/toggle')
      .set('Cookie', cookie)
      .send({ enabled: true })
      .expect(200)
    expect(on.body.data.value).toBe('true')

    // Rollback = flip back; no redeployment involved.
    const off = await request(app)
      .post('/api/v1/settings/sample.feature.auto_triage/toggle')
      .set('Cookie', cookie)
      .send({ enabled: false })
      .expect(200)
    expect(off.body.data.value).toBe('false')

    const audit = await pool.query(
      `SELECT count(*)::int AS n FROM audit_log WHERE action_type = 'Feature Toggle Changed'`,
    )
    expect(audit.rows[0].n).toBeGreaterThanOrEqual(2)
  })

  it('refuses toggling a non-toggle key (409)', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const res = await request(app)
      .post('/api/v1/settings/sample.session.timeout_minutes/toggle')
      .set('Cookie', cookie)
      .send({ enabled: true })
      .expect(409)
    expect(res.body.error.code).toBe('SETTING-002')
  })

  it('rejects a non-boolean body with 422', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    await request(app)
      .post('/api/v1/settings/sample.feature.auto_triage/toggle')
      .set('Cookie', cookie)
      .send({ enabled: 'yes' })
      .expect(422)
  })
})
