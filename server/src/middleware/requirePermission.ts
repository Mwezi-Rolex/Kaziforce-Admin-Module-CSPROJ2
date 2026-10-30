import type { NextFunction, Response } from 'express'
import { ApiError } from './errors'
import type { AuthedRequest } from './auth'
import { writeEvent } from '../services/auditLogger'

// RBAC enforcement point (SEC-AUTZ-001…003): authorization happens before the
// handler, from permissions loaded fresh with the session. 403 never 404 for
// authenticated users missing a permission (BED-TEN-003 spirit).
//
// SEC-AUD-002: a refused authorization decision is itself a security event and
// is written to the ledger. The write is best-effort — if it fails, the request
// is still denied, because failing open here would be worse than a missing log.
export function requirePermission(key: string) {
  return (req: AuthedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, 'AUTH-002', 'Authentication required'))
    if (!req.user.permissions.includes(key)) {
      const denied = new ApiError(403, 'AUTHZ-001', `Permission required: ${key}`)
      void writeEvent({
        operatorId: req.user.id,
        actionType: 'Authorization Denied',
        targetEntityType: 'permission',
        targetEntityId: null,
        metadata: { requiredPermission: key, role: req.user.role, method: req.method, path: req.path },
      }).catch((err) => console.error('[audit] failed to record denial', err))
      return next(denied)
    }
    next()
  }
}
