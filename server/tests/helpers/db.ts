// Shared test helpers.
//
// `hasDb` is computed at import time from the environment and is safe to read
// without a database. `createPool` is called from `beforeAll` in database-backed
// suites rather than importing `src/db/pool`, because that module validates the
// environment at import time and would make the whole suite fail — instead of
// skipping — on a machine that has not run `npm run bootstrap`.
//
// This matters for the first-run experience: a fresh clone should report
// "skipped" with a readable message, not eight failing suites.
import { Pool } from 'pg'

export const hasDb = Boolean(process.env.DATABASE_URL && process.env.JWT_SECRET)

export function createPool(): Pool {
  if (!hasDb) throw new Error('createPool() called without DATABASE_URL/JWT_SECRET in the environment')
  return new Pool({ connectionString: process.env.DATABASE_URL })
}

/** Standard message shown when a database-backed suite skips. */
export const SKIP_REASON =
  'no database configured — run `cd server && npm run bootstrap && npm run migrate && npm run seed` (see README.md)'
