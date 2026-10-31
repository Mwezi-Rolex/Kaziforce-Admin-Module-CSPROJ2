import bcrypt from 'bcryptjs'
import { pool } from '../db/pool'
import { ApiError } from '../middleware/errors'
import { writeEvent } from './auditLogger'

export type OperatorAccount = {
  id: string
  email: string
  fullName: string
  role: string
  permissions: string[]
  status: string
}

// Lockout policy lives in config/lockout.ts so tests can import it without
// pulling in the database pool. Re-exported here for existing callers.
export { MAX_FAILED_ATTEMPTS, LOCKOUT_MINUTES, lockoutIntervalMs } from '../config/lockout'
import { MAX_FAILED_ATTEMPTS, lockoutIntervalMs } from '../config/lockout'

// CON-AUTH-001/003 + OQ-12: bcrypt-verified credentials; suspended/terminated or
// soft-deleted operators never authenticate; consecutive failures lock the account.
//
// Enumeration safety: unknown account, wrong password and locked account all
// return the SAME generic 401 AUTH-001. A caller cannot learn from the response
// whether an address is registered, or whether it is currently locked.
export async function authenticate(email: string, password: string): Promise<OperatorAccount> {
  const { rows } = await pool.query(
    `SELECT u.id, u.email, u.password_hash, u.full_name, u.status,
            u.failed_login_attempts AS "failedAttempts",
            u.locked_until AS "lockedUntil",
            COALESCE(r.name, 'viewer') AS role
     FROM users u
     LEFT JOIN user_roles ur ON ur.user_id = u.id
     LEFT JOIN roles r ON r.id = ur.role_id
     WHERE lower(u.email) = lower($1) AND u.is_operator = true AND u.is_deleted = false`,
    [email],
  )
  const row = rows[0]
  // Same generic error for an unknown account (no account enumeration).
  if (!row || !row.password_hash) throw new ApiError(401, 'AUTH-001', 'Invalid credentials')

  // A live lock refuses login even with the correct password. Response shape is
  // identical to a wrong password so the lock state is not disclosed.
  const lockedUntil = row.lockedUntil ? new Date(row.lockedUntil) : null
  const isLocked = lockedUntil !== null && lockedUntil.getTime() > Date.now()
  if (isLocked) throw new ApiError(401, 'AUTH-001', 'Invalid credentials')

  const ok = await bcrypt.compare(password, row.password_hash)

  if (!ok) {
    const attempts = Number(row.failedAttempts) + 1
    if (attempts >= MAX_FAILED_ATTEMPTS) {
      // Lock reached: store the lock, clear the counter, audit the LOCK only.
      const until = new Date(Date.now() + lockoutIntervalMs())
      await pool.query(
        `UPDATE users SET locked_until = $2, failed_login_attempts = 0 WHERE id = $1`,
        [row.id, until],
      )
      await writeEvent({
        operatorId: null, // no authenticated actor: the lock is automatic
        actionType: 'Account Locked',
        targetEntityType: 'user',
        targetEntityId: row.id,
        metadata: { reason: 'consecutive_failed_logins', attempts, lockedUntil: until.toISOString() },
      })
    } else {
      // Ordinary failure: increment silently. Deliberately NOT audited, so a
      // password-guessing run cannot flood the ledger.
      await pool.query(`UPDATE users SET failed_login_attempts = $2 WHERE id = $1`, [row.id, attempts])
    }
    throw new ApiError(401, 'AUTH-001', 'Invalid credentials')
  }

  // Correct password. Re-check status only now, so a suspended account does not
  // leak its existence to an attacker who cannot authenticate as it.
  if (row.status !== 'Active') throw new ApiError(403, 'AUTH-003', 'Account is not active')

  // Success resets the consecutive-failure counter and clears any stale lock.
  if (Number(row.failedAttempts) !== 0 || row.lockedUntil !== null) {
    await pool.query(`UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE id = $1`, [row.id])
  }

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

/** Super Admin unlock (OQ-12): clears the lock and the failure counter, audited. */
export async function unlockAccount(actorId: string, targetId: string): Promise<{ id: string; wasLocked: boolean }> {
  const { rows } = await pool.query(
    `SELECT locked_until AS "lockedUntil", failed_login_attempts AS "failedAttempts"
     FROM users WHERE id = $1 AND is_deleted = false`,
    [targetId],
  )
  if (!rows[0]) throw new ApiError(404, 'USER-001', 'Account not found')
  const wasLocked =
    rows[0].lockedUntil !== null && new Date(rows[0].lockedUntil).getTime() > Date.now()

  await pool.query(`UPDATE users SET locked_until = NULL, failed_login_attempts = 0 WHERE id = $1`, [targetId])
  await writeEvent({
    operatorId: actorId,
    actionType: 'Account Unlocked',
    targetEntityType: 'user',
    targetEntityId: targetId,
    metadata: { wasLocked, clearedFailedAttempts: Number(rows[0].failedAttempts) },
  })
  return { id: targetId, wasLocked }
}
