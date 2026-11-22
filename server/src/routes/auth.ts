import { Router } from 'express'
import { z } from 'zod'
import { SESSION_COOKIE, requireAuth, signSessionToken, type AuthedRequest } from '../middleware/auth'
import { ApiError } from '../middleware/errors'
import { writeEvent, auditContext } from '../services/auditLogger'
import { authenticate } from '../services/authService'

export const authRouter = Router()

const loginSchema = z.object({
  email: z.string().trim().email('A valid email address is required'),
  password: z.string().min(1, 'Password is required').max(200),
})

function sessionCookieOptions(maxAgeMs: number) {
  const secure = process.env.NODE_ENV === 'production'
  return { httpOnly: true, sameSite: 'lax' as const, secure, path: '/', maxAge: maxAgeMs }
}

authRouter.post('/login', async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(422, 'VALIDATION', parsed.error.issues[0]?.message ?? 'Invalid input')
    }
    const account = await authenticate(parsed.data.email, parsed.data.password, auditContext(req))
    const ttlHours = Number(process.env.JWT_TTL_HOURS || 8)
    // Subject and email only (SEMANTIC_MODEL.md BUG-12, fixed): role and
    // permissions live in the database and are re-read on every request.
    const token = signSessionToken({
      sub: account.id,
      email: account.email,
    })
    res.cookie(SESSION_COOKIE, token, sessionCookieOptions(ttlHours * 3600_000))
    await writeEvent({
      operatorId: account.id,
      actionType: 'Operator Login',
      targetEntityType: 'operator',
      targetEntityId: account.id,
      outcome: 'Success',
      ...auditContext(req),
      metadata: { role: account.role },
    })
    res.json({
      success: true,
      data: { id: account.id, email: account.email, fullName: account.fullName, role: account.role, permissions: account.permissions },
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

authRouter.post('/logout', requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    await writeEvent({
      operatorId: req.user!.id,
      actionType: 'Operator Logout',
      targetEntityType: 'operator',
      targetEntityId: req.user!.id,
      outcome: 'Success',
      ...auditContext(req),
    })
    res.clearCookie(SESSION_COOKIE, { path: '/' })
    res.json({ success: true, data: null, timestamp: new Date().toISOString() })
  } catch (err) {
    next(err)
  }
})

authRouter.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json({
    success: true,
    data: {
      id: req.user!.id,
      email: req.user!.email,
      fullName: req.user!.fullName,
      role: req.user!.role,
      permissions: req.user!.permissions,
    },
    timestamp: new Date().toISOString(),
  })
})

