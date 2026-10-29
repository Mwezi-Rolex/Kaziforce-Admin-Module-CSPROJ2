import { Pool } from 'pg'

// CON-AUD-004 (BRIEF never-cut): adversarial database-level proof that the
// application role cannot mutate the audit ledger. Mirrors Ch5 §3.3 ("Database
// level tests intentionally issue unauthorized modification commands against
// the audit log table to confirm the write-once constraint").
//
// Requires a bootstrapped database (kaziforce_app credentials in server/.env).

const hasDb = Boolean(process.env.DATABASE_URL)
const d = hasDb ? describe : describe.skip

;(hasDb ? describe : describe.skip)('audit_log immutability (application role)', () => {
  let pool: Pool

  beforeAll(() => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL })
  })
  afterAll(async () => {
    await pool.end()
  })

  it('can INSERT and SELECT audit rows', async () => {
    const insert = await pool.query(
      `INSERT INTO audit_log (operator_id, action_type, target_entity_type, target_entity_id)
       SELECT id, 'Test Event', 'test', id FROM users WHERE is_operator = true LIMIT 1
       RETURNING id`,
    )
    expect(insert.rows).toHaveLength(1)
    const read = await pool.query('SELECT action_type FROM audit_log WHERE id = $1', [insert.rows[0].id])
    expect(read.rows[0].action_type).toBe('Test Event')
    // Clean up via the app role is impossible (no DELETE) — this row is sample
    // test data and stays as an audit row; the reseed is the cleanup path.
  })

  it('cannot UPDATE audit rows (permission denied)', async () => {
    await expect(pool.query(`UPDATE audit_log SET action_type = 'tampered'`)).rejects.toMatchObject({
      code: '42501',
    })
  })

  it('cannot DELETE audit rows (permission denied)', async () => {
    await expect(pool.query('DELETE FROM audit_log')).rejects.toMatchObject({ code: '42501' })
  })

  it('cannot TRUNCATE audit rows (permission denied)', async () => {
    await expect(pool.query('TRUNCATE audit_log')).rejects.toMatchObject({ code: '42501' })
  })
})
