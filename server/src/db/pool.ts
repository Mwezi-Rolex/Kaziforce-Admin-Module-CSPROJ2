import { Pool } from 'pg'
import { env } from '../config/env'

// Application-runtime pool. Connects as kaziforce_app, whose grants are
// restricted by migrations/006 (audit_log is SELECT+INSERT only).
//
// allowExitOnIdle (test runs only): every Jest suite imports createApp, which
// creates this module-level pool, and no suite can end it — the idle clients
// kept the process alive past test completion ("Jest did not exit one second
// after the test run has completed", diagnosed on test/behaviour). Under Jest,
// NODE_ENV is 'test', so idle clients are unref'd and the runner can exit.
// In development/production the pool behaves normally.
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  allowExitOnIdle: env.NODE_ENV === 'test',
})
