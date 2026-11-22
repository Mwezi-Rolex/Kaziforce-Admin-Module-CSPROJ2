import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Regression test for the audit CSV export cap (SEMANTIC_MODEL.md BUG-8,
// audit branch fix/state-machine-bugs): the export used to cut off at a fixed
// LIMIT 10000 silently — an auditor could treat a truncated file as complete.
// The fixed contract: the cap is configurable (AUDIT_EXPORT_MAX_ROWS), the
// response carries X-Total-Matching-Rows, and when the cap truncates the
// result the CSV ends with an explicit 'Export Truncated' marker row carrying
// the totals in its metadata.
//
// This file sets AUDIT_EXPORT_MAX_ROWS=2 BEFORE the app module is imported
// (dynamically, in beforeAll), so config/env parses the small cap for THIS
// suite only — each Jest file has its own module registry.

process.env.AUDIT_EXPORT_MAX_ROWS = '2'

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

const PROBE = `Export Probe ${Date.now()}`

let pool: Pool
let app: Express

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
  // Three probe rows with the exact same action type (the export filter is an
  // exact match), one more than the cap.
  for (let i = 0; i < 3; i++) {
    await pool.query(
      `INSERT INTO audit_log (operator_id, action_type, target_entity_type, target_entity_id, outcome, metadata)
       VALUES (NULL, $1, 'audit_export_probe', NULL, 'Success', $2)`,
      [PROBE, JSON.stringify({ probe: PROBE, n: i + 1 })],
    )
  }
})

afterAll(async () => {
  // The probe audit rows stay: audit_log is append-only by design (the app
  // role has no DELETE grant). They are labelled with a unique action type so
  // they never interfere with other suites' expectations.
  if (hasDb) await pool.end()
})

async function loginAs(email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
  return res.headers['set-cookie'][0]
}

d('BUG-8: a truncated export says so', () => {
  it('caps the CSV at the configured rows and appends an explicit marker', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app)
      .get(`/api/v1/audit/export.csv?action=${encodeURIComponent(PROBE)}`)
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /text\/csv/)

    // The header discloses the true total (3 matching rows, cap 2).
    expect(res.headers['x-total-matching-rows']).toBe('3')

    const lines = res.text.split('\r\n').filter((l) => l.length > 0)
    // Header + 2 data rows + 1 truncation marker.
    expect(lines).toHaveLength(4)
    const dataRows = lines.slice(1)
    expect(dataRows.filter((l) => l.includes(PROBE))).toHaveLength(2)
    const marker = dataRows.find((l) => l.includes('Export Truncated'))
    expect(marker).toBeDefined()
    // The marker's metadata (RFC 4180-escaped JSON) carries both totals: 3
    // rows matched, 2 were returned under the cap of 2.
    expect(marker).toContain('""totalMatching"":3')
    expect(marker).toContain('""returned"":2')
    expect(marker).toContain('""maxRows"":2')
  })
})
