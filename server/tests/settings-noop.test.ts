import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Regression tests for the settings no-op guard (SEMANTIC_MODEL.md BUG-11,
// audit branch fix/state-machine-bugs): writing a configuration value or
// feature-toggle state that is ALREADY in force used to rewrite the row and
// append a from==to audit event. The fixed contract refuses the no-op with
// 409 SETTING-003 and writes nothing. Non-no-op writes keep working and keep
// being audited. Sample key values are restored in afterAll.

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

const VALUE_KEY = 'sample.moderation.queue_threshold'
const TOGGLE_KEY = 'sample.feature.auto_triage'

let pool: Pool
let app: Express

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
})

afterAll(async () => {
  if (!hasDb) return
  // Restore the seeded sample values (the tests below change both keys).
  await pool.query(`UPDATE system_settings SET value = '20' WHERE key = $1`, [VALUE_KEY])
  await pool.query(`UPDATE system_settings SET value = 'false' WHERE key = $1`, [TOGGLE_KEY])
  await pool.end()
})

async function loginSuperAdmin(): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email: 'superadmin@kaziforce.local', password: 'SuperDemo!2026' }).expect(200)
  return res.headers['set-cookie'][0]
}

async function auditCount(actionType: string, key: string): Promise<number> {
  const { rows } = await pool.query<{ n: string }>(
    `SELECT count(*) AS n FROM audit_log WHERE action_type = $1 AND metadata->>'key' = $2`,
    [actionType, key],
  )
  return Number(rows[0].n)
}

d('BUG-11 (settings): same-value writes are refused no-ops', () => {
  it('PUT with the current value -> 409 SETTING-003 and no audit event', async () => {
    const cookie = await loginSuperAdmin()
    const current = await request(app).get('/api/v1/settings').set('Cookie', cookie).expect(200)
    const row = current.body.data.find((s: { key: string }) => s.key === VALUE_KEY)
    const before = await auditCount('Configuration Updated', VALUE_KEY)

    const res = await request(app).put(`/api/v1/settings/${VALUE_KEY}`).set('Cookie', cookie).send({ value: row.value })
    expect(res.status).toBe(409)
    expect(res.body.error.code).toBe('SETTING-003')
    expect(await auditCount('Configuration Updated', VALUE_KEY)).toBe(before)
  })

  it('PUT with a new value still works and is audited', async () => {
    const cookie = await loginSuperAdmin()
    const before = await auditCount('Configuration Updated', VALUE_KEY)
    const res = await request(app).put(`/api/v1/settings/${VALUE_KEY}`).set('Cookie', cookie).send({ value: '77' }).expect(200)
    expect(res.body.data.value).toBe('77')
    expect(await auditCount('Configuration Updated', VALUE_KEY)).toBe(before + 1)
  })

  it('toggle with the state already in force -> 409 SETTING-003 and no audit event', async () => {
    const cookie = await loginSuperAdmin()
    const current = await request(app).get('/api/v1/settings').set('Cookie', cookie).expect(200)
    const row = current.body.data.find((s: { key: string }) => s.key === TOGGLE_KEY)
    const enabled = row.value === 'true'
    const before = await auditCount('Feature Toggle Changed', TOGGLE_KEY)

    const res = await request(app).post(`/api/v1/settings/${TOGGLE_KEY}/toggle`).set('Cookie', cookie).send({ enabled })
    expect(res.status).toBe(409)
    expect(res.body.error.code).toBe('SETTING-003')
    expect(await auditCount('Feature Toggle Changed', TOGGLE_KEY)).toBe(before)
  })

  it('toggle to the opposite state still works and is audited', async () => {
    const cookie = await loginSuperAdmin()
    const current = await request(app).get('/api/v1/settings').set('Cookie', cookie).expect(200)
    const row = current.body.data.find((s: { key: string }) => s.key === TOGGLE_KEY)
    const enabled = row.value !== 'true'
    const before = await auditCount('Feature Toggle Changed', TOGGLE_KEY)
    const res = await request(app).post(`/api/v1/settings/${TOGGLE_KEY}/toggle`).set('Cookie', cookie).send({ enabled }).expect(200)
    expect(res.body.data.value).toBe(enabled ? 'true' : 'false')
    expect(await auditCount('Feature Toggle Changed', TOGGLE_KEY)).toBe(before + 1)
  })
})
