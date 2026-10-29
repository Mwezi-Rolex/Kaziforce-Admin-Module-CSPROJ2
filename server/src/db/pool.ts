import { Pool } from 'pg'
import { env } from '../config/env'

// Application-runtime pool. Connects as kaziforce_app, whose grants are
// restricted by migrations/006 (audit_log is SELECT+INSERT only).
export const pool = new Pool({ connectionString: env.DATABASE_URL, max: 10 })
