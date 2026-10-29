import type { NextFunction, Request, Response } from 'express'
import { ApiError } from './errors'
import type { AuthedRequest } from './auth'

// RBAC enforcement point (SEC-AUTZ-001…003): authorization happens before the
// handler, from permissions loaded fresh with the session. 403 never 404 for
// authenticated users missing a permission (BED-TEN-003 spirit).
export function requirePermission(key: string) {
  return (req: AuthedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, 'AUTH-002', 'Authentication required'))
    if (!req.user.permissions.includes(key)) {
      return next(new ApiError(403, 'AUTHZ-001', `Permission required: ${key}`))
    }
    next()
  }
}
