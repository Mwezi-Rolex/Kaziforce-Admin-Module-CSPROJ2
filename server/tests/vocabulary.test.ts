import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'
import { AUDIT_OUTCOMES, PERMISSION_KEYS, ROLE_NAMES } from '../src/lib/vocabulary'

// Regression guard for the vocabulary single-sourcing (refactor/deepen-modules):
// server/src/lib/vocabulary.ts is now the one place permission keys and role
// names are written; the seed writes the database from it. If someone edits the
// vocabulary without re-seeding — or edits the seed by hand — this test fails
// and points at the drift. Smallest breaking input: rename any key in
// PERMISSION_KEYS (or in seed.ts's PERMISSIONS list) without re-seeding.
//
// This is the "trust me" item of the refactor made provable: the substitution
// itself is mechanical, but only the live database can prove the seed still
// writes exactly what the vocabulary claims.

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let pool: Pool

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
})

afterAll(async () => {
  if (hasDb) await pool.end()
})

d('vocabulary ↔ database (single-source guard)', () => {
  it('the permissions table contains exactly the vocabulary permission keys', async () => {
    const { rows } = await pool.query<{ key: string }>(`SELECT key FROM permissions ORDER BY key`)
    expect(rows.map((r) => r.key).sort()).toEqual(Object.values(PERMISSION_KEYS).slice().sort())
  })

  it('the roles table contains exactly the vocabulary role names', async () => {
    const { rows } = await pool.query<{ name: string }>(`SELECT name FROM roles ORDER BY name`)
    expect(rows.map((r) => r.name).sort()).toEqual([...ROLE_NAMES].sort())
  })

  it('every audit outcome written by the API is inside the vocabulary outcomes', async () => {
    const { rows } = await pool.query<{ outcome: string }>(
      `SELECT DISTINCT outcome FROM audit_log WHERE outcome IS NOT NULL`,
    )
    for (const r of rows) expect(AUDIT_OUTCOMES).toContain(r.outcome)
  })
})
