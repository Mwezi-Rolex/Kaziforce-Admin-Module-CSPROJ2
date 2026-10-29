import bcrypt from 'bcryptjs'
import { pool } from '../db/pool'
import { ApiError } from '../middleware/errors'

export type OperatorAccount = {
  id: string
  email: string
  fullName: string
  role: string
  permissions: string[]
  status: string
}

// CON-AUTH-001/003: bcrypt-verified credentials; suspended/terminated or
// soft-deleted operators never authenticate.
export async function authenticate(email: string, password: string): Promise<OperatorAccount> {
  const { rows } = await pool.query(
    `SELECT u.id, u.email, u.password_hash, u.full_name, u.status,
            COALESCE(r.name, 'viewer') AS role
     FROM users u
     LEFT JOIN user_roles ur ON ur.user_id = u.id
     LEFT JOIN roles r ON r.id = ur.role_id
     WHERE lower(u.email) = lower($1) AND u.is_operator = true AND u.is_deleted = false`,
    [email],
  )
  const row = rows[0]
  // Same generic error for unknown account and wrong password (no account enumeration).
  if (!row || !row.password_hash) throw new ApiError(401, 'AUTH-001', 'Invalid credentials')
  const ok = await bcrypt.compare(password, row.password_hash)
  if (!ok) throw new ApiError(401, 'AUTH-001', 'Invalid credentials')
  if (row.status !== 'Active') throw new ApiError(403, 'AUTH-003', 'Account is not active')

  const perms = await pool.query<{ key: string }>(
    `SELECT DISTINCT p.key
     FROM role_permissions rp
     JOIN permissions p ON p.id = rp.permission_id
     JOIN roles r ON r.id = rp.role_id
     JOIN user_roles ur ON ur.role_id = r.id
     WHERE ur.user_id = $1`,
    [row.id],
  )
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    permissions: perms.rows.map((p) => p.key),
    status: row.status,
  }
}
