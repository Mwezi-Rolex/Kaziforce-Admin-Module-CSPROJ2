import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Pool } from 'pg'
import 'dotenv/config'

// Migration runner. Connects as the schema-owner role (OWNER_DATABASE_URL) and
// applies pending server/migrations/*.sql in filename order, tracked in
// schema_migrations. Each file runs in its own transaction.

async function main() {
  const ownerUrl = process.env.OWNER_DATABASE_URL
  if (!ownerUrl) {
    console.error('OWNER_DATABASE_URL is required. Run `npm run bootstrap` first (see server/.env.example).')
    process.exit(1)
  }
  const pool = new Pool({ connectionString: ownerUrl })
  const conn = await pool.connect()
  try {
    await conn.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      filename text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )`)
    const dir = join(__dirname, '..', '..', 'migrations')
    const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()
    const { rows } = await conn.query<{ filename: string }>('SELECT filename FROM schema_migrations')
    const applied = new Set(rows.map((r) => r.filename))
    for (const file of files) {
      if (applied.has(file)) {
        console.log(`= ${file} (already applied)`)
        continue
      }
      const sql = readFileSync(join(dir, file), 'utf8')
      try {
        await conn.query('BEGIN')
        await conn.query(sql)
        await conn.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file])
        await conn.query('COMMIT')
        console.log(`+ ${file}`)
      } catch (err) {
        await conn.query('ROLLBACK')
        throw err
      }
    }
    console.log('migrations complete')
  } finally {
    conn.release()
    await pool.end()
  }
}

main().catch((err) => {
  console.error('migration failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
