import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { pool } from '../db/pool'
import { ApiError } from './errors'

export const SESSION_COOKIE = 'kz_session'

export type SessionUser = {
  id: string
  email: string
  fullName: string
  role: string
  permissions: string[]
}

export type AuthedRequest = Request & { user?: SessionUser }

export function signSessionToken(payload: { sub: string; email: string; role: string; permissions: string[] }) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: `${env.JWT_TTL_HOURS}h`,
    issuer: 'kaziforce-auth',
    audience: 'kaziforce-api',
  })
}

// Every protected request: verify the signed JWT, then re-check the account
// state so suspension/termination takes effect immediately (CON-AUTH-003).
export async function requireAuth(req: AuthedRequest, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[SESSION_COOKIE]
    if (!token) throw new ApiError(401, 'AUTH-002', 'Authentication required')
    let claims: { sub: string; role: string; permissions: string[] }
    try {
      claims = jwt.verify(token, env.JWT_SECRET, {
        issuer: 'kaziforce-auth',
        audience: 'kaziforce-api',
      }) as typeof claims
    } catch {
      throw new ApiError(401, 'AUTH-002', 'Session invalid or expired')
    }
    const { rows } = await pool.query(
      `SELECT u.id, u.email, u.full_name, u.status, u.is_deleted, r.name AS role
       FROM users u
       LEFT JOIN user_roles ur ON ur.user_id = u.id
       LEFT JOIN roles r ON r.id = ur.role_id
       WHERE u.id = $1 AND u.is_operator = true`,
      [claims.sub],
    )
    const row = rows[0]
    if (!row || row.is_deleted) throw new ApiError(401, 'AUTH-002', 'Session invalid or expired')
    if (row.status !== 'Active') throw new ApiError(403, 'AUTH-003', 'Account is not active; access revoked')
    const perms = await pool.query<{ key: string }>(
      `SELECT DISTINCT p.key
       FROM role_permissions rp
       JOIN permissions p ON p.id = rp.permission_id
       JOIN roles r ON r.id = rp.role_id
       JOIN user_roles ur ON ur.role_id = r.id
       WHERE ur.user_id = $1`,
      [row.id],
    )
    req.user = {
      id: row.id,
      email: row.email,
      fullName: row.full_name,
      role: row.role ?? 'viewer',
      permissions: perms.rows.map((p) => p.key),
    }
    next()
  } catch (err) {
    next(err)
  }
}
