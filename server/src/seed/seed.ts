import bcrypt from 'bcryptjs'
import { Pool } from 'pg'
import 'dotenv/config'

// Seed script — run as the schema owner (OWNER_DATABASE_URL).
//
// SAMPLE DATA notice: every row inserted here is synthetic sample data created
// for the capstone demo. Live platform data is under NDA and is never used
// (proposal §1.5.2). Demo operator credentials are printed to the console at
// the end of the run; they are for local development only.

const PERMISSIONS: Array<[string, string]> = [
  ['users.view', 'View and search account records'],
  ['users.suspend', 'Suspend platform accounts (Moderator+)'],
  ['users.assign_role', 'Assign operator roles (Super Admin)'],
  ['users.ban', 'Permanently ban accounts (Super Admin)'],
  ['moderation.decide', 'Approve, reject, or escalate flags (Moderator+)'],
  ['audit.view', 'View and filter the audit log'],
  ['audit.export', 'Download the audit log as CSV (Moderator+ — BRIEF restriction, CON-AUD-003)'],
  ['settings.manage', 'Modify system settings and feature toggles (Super Admin)'],
]

const ROLE_MATRIX: Record<string, string[]> = {
  viewer: ['users.view', 'audit.view'],
  moderator: ['users.view', 'users.suspend', 'moderation.decide', 'audit.view', 'audit.export'],
  super_admin: [
    'users.view',
    'users.suspend',
    'users.assign_role',
    'users.ban',
    'moderation.decide',
    'audit.view',
    'audit.export',
    'settings.manage',
  ],
}

const OPERATORS = [
  { email: 'viewer@kaziforce.local', name: 'Vera Operator (Demo)', role: 'viewer', password: 'ViewerDemo!2026' },
  { email: 'moderator@kaziforce.local', name: 'Marta Moderator (Demo)', role: 'moderator', password: 'ModeratorDemo!2026' },
  { email: 'superadmin@kaziforce.local', name: 'Sasha Super Admin (Demo)', role: 'super_admin', password: 'SuperDemo!2026' },
]

// Sample platform accounts mirroring the Figma export's seed rows (usr_*) — SAMPLE DATA.
const SAMPLE_USERS = [
  { email: 'adwoa.mensah@example.com', name: 'Adwoa Mensah (Sample)', role: 'viewer', status: 'Active' },
  { email: 'isaac.njeri@example.com', name: 'Isaac Njeri (Sample)', role: 'moderator', status: 'Suspended' },
  { email: 'zainab.okafor@example.com', name: 'Zainab Okafor (Sample)', role: 'viewer', status: 'Active' },
  { email: 'moses.kato@example.com', name: 'Moses Kato (Sample)', role: 'viewer', status: 'Active' },
]

const SAMPLE_CONTENT = [
  { type: 'Gig listing', ownerIdx: 0, flag: { severity: 'High', status: 'Pending', reason: 'Possible off-platform payment request' } },
  { type: 'Review', ownerIdx: 1, flag: { severity: 'Medium', status: 'Pending', reason: 'Review references undisclosed contact details' } },
  { type: 'Portfolio submission', ownerIdx: 2, flag: { severity: 'Low', status: 'Pending', reason: 'Portfolio item flagged for policy review' } },
  { type: 'Gig listing', ownerIdx: 3, flag: { severity: 'High', status: 'Escalated', reason: 'Repeated policy violations; escalated to Super Admin' } },
]

const SAMPLE_SETTINGS: Array<[string, string, boolean]> = [
  ['sample.moderation.queue_threshold', '20', false],
  ['sample.session.timeout_minutes', '480', false],
  ['sample.feature.auto_triage', 'false', true],
]

async function main() {
  const ownerUrl = process.env.OWNER_DATABASE_URL
  if (!ownerUrl) {
    console.error('OWNER_DATABASE_URL is required. Run `npm run bootstrap` first.')
    process.exit(1)
  }
  const pool = new Pool({ connectionString: ownerUrl })
  const conn = await pool.connect()
  try {
    await conn.query('BEGIN')

    const roleIds: Record<string, string> = {}
    for (const [name, description] of [
      ['viewer', 'Read-only operator: dashboards and audit log'],
      ['moderator', 'Queue decisions and account suspension'],
      ['super_admin', 'Full platform control: roles, bans, settings'],
    ]) {
      const { rows } = await conn.query(
        `INSERT INTO roles (name, description) VALUES ($1, $2)
         ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
         RETURNING id`,
        [name, description],
      )
      roleIds[name] = rows[0].id
    }

    const permIds: Record<string, string> = {}
    for (const [key, description] of PERMISSIONS) {
      const { rows } = await conn.query(
        `INSERT INTO permissions (key, description) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET description = EXCLUDED.description
         RETURNING id`,
        [key, description],
      )
      permIds[key] = rows[0].id
    }

    await conn.query('DELETE FROM role_permissions')
    for (const [role, keys] of Object.entries(ROLE_MATRIX)) {
      for (const key of keys) {
        await conn.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)', [
          roleIds[role],
          permIds[key],
        ])
      }
    }

    const upsertUser = async (email: string, name: string, role: string, status: string, passwordHash: string | null, isOperator: boolean) => {
      const { rows } = await conn.query(
        `INSERT INTO users (email, password_hash, full_name, status, is_operator)
         VALUES (lower($1), $2, $3, $4, $5)
         ON CONFLICT (email) DO UPDATE
           SET password_hash = EXCLUDED.password_hash,
               full_name = EXCLUDED.full_name,
               status = EXCLUDED.status,
               is_operator = EXCLUDED.is_operator,
               is_deleted = false
         RETURNING id`,
        [email, passwordHash, name, status, isOperator],
      )
      await conn.query(
        `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)
         ON CONFLICT (user_id, role_id) DO NOTHING`,
        [rows[0].id, roleIds[role]],
      )
      return rows[0].id as string
    }

    for (const op of OPERATORS) {
      const hash = await bcrypt.hash(op.password, 12)
      await upsertUser(op.email, op.name, op.role, 'Active', hash, true)
    }
    for (const u of SAMPLE_USERS) {
      await upsertUser(u.email, u.name, u.role, u.status, null, false) // platform accounts never sign in here
    }

    // Sample content + flags (SAMPLE DATA)
    const userIds = await conn.query<{ id: string; email: string }>(
      `SELECT id, email FROM users WHERE lower(email) LIKE '%@example.com'`,
    )
    const byEmail = new Map(userIds.rows.map((r) => [r.email, r.id]))
    const ownerIds = SAMPLE_USERS.map((u) => byEmail.get(u.email.toLowerCase())!)
    const reporter = ownerIds[2]
    for (const item of SAMPLE_CONTENT) {
      const { rows } = await conn.query(
        `INSERT INTO content_items (content_type, owner_id)
         VALUES ($1, $2)
         RETURNING id`,
        [item.type, ownerIds[item.ownerIdx]],
      )
      await conn.query(
        `INSERT INTO flags (content_item_id, reported_by, severity, flag_status, reason)
         VALUES ($1, $2, $3, $4, $5)`,
        [rows[0].id, reporter, item.flag.severity, item.flag.status, item.flag.reason],
      )
    }

    for (const [key, value, toggle] of SAMPLE_SETTINGS) {
      await conn.query(
        `INSERT INTO system_settings (key, value, is_feature_toggle)
         VALUES ($1, $2, $3)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, is_feature_toggle = EXCLUDED.is_feature_toggle`,
        [key, value, toggle],
      )
    }

    await conn.query('COMMIT')
    console.log('seed complete — SAMPLE DATA inserted (roles, permissions, 3 demo operators, 4 sample accounts, 4 content items + flags, 3 settings keys)')
    console.log('demo operator credentials (local development only):')
    for (const op of OPERATORS) console.log(`  ${op.role.padEnd(12)} ${op.email}  /  ${op.password}`)
  } catch (err) {
    await conn.query('ROLLBACK')
    throw err
  } finally {
    conn.release()
    await pool.end()
  }
}

main().catch((err) => {
  console.error('seed failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
