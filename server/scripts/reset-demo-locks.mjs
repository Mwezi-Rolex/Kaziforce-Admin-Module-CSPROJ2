#!/usr/bin/env node
// Demo/support reset — clears login lockouts and failure counters.
//
//   cd server && npm run demo:reset
//
// Purpose: after demonstrating the lockout, the three demo operators may be
// left locked for 15 minutes. This clears that state immediately so the next
// demo run starts from a clean slate.
//
// It intentionally does NOT touch audit_log (the ledger is append-only and the
// history of a lock is evidence), and it does NOT reset passwords or roles.
//
// Uses the OWNER connection because it must be able to update any account.
import 'dotenv/config'
import pg from 'pg'

const url = process.env.OWNER_DATABASE_URL
if (!url) {
  console.error('OWNER_DATABASE_URL is not set. Run `npm run bootstrap` first (see README.md).')
  process.exit(1)
}

const pool = new pg.Pool({ connectionString: url })
try {
  const before = await pool.query(
    `SELECT email, failed_login_attempts, locked_until FROM users
     WHERE is_operator = true AND (locked_until IS NOT NULL OR failed_login_attempts > 0)
     ORDER BY email`,
  )
  if (before.rows.length === 0) {
    console.log('No locked accounts and no pending failure counters — nothing to reset.')
  } else {
    console.log('Before:')
    for (const r of before.rows) {
      console.log(`  ${r.email}  attempts=${r.failed_login_attempts}  locked_until=${r.locked_until ?? '-'}`)
    }
  }

  const result = await pool.query(
    `UPDATE users SET locked_until = NULL, failed_login_attempts = 0
     WHERE locked_until IS NOT NULL OR failed_login_attempts > 0`,
  )
  console.log(`Reset ${result.rowCount} account(s): locks cleared, failure counters zeroed.`)
  console.log('audit_log was not modified (append-only).')
} catch (err) {
  console.error('demo:reset failed:', err instanceof Error ? err.message : err)
  process.exitCode = 1
} finally {
  await pool.end()
}
