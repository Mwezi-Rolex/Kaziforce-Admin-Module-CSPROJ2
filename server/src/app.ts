import cookieParser from 'cookie-parser'
import express from 'express'
import { env } from './config/env'
import { authRouter } from './routes/auth'
import { healthRouter } from './routes/health'
import { usersRouter } from './routes/users'
import { moderationRouter } from './routes/moderation'
import { auditRouter } from './routes/audit'
import { settingsRouter } from './routes/settings'
import { errorHandler, notFound } from './middleware/errors'
import { rateLimit } from './middleware/rateLimit'
import { correlation } from './middleware/correlation'

// Middleware pipeline order per Ch5 §3.4.5: authentication verification ->
// rate limiting -> RBAC -> controller. Authentication itself is per-route
// (requireAuth/requirePermission); rate limiting is global for /api/v1.
export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  // Behind Nginx the client IP arrives in X-Forwarded-For; without this the
  // rate limiter would bucket every request under the proxy address. Enabled
  // only when TRUST_PROXY is set, so direct/local runs are unaffected.
  if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1)
  app.use(express.json({ limit: '256kb' }))
  app.use(cookieParser())
  // Correlation id first: every later layer (audit ledger, error envelope)
  // refers to the request by this id.
  app.use(correlation)
  app.use('/api/v1', rateLimit)

  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/users', usersRouter)
  app.use('/api/v1/moderation', moderationRouter)
  app.use('/api/v1/audit', auditRouter)
  app.use('/api/v1/settings', settingsRouter)
  app.use('/api/v1', healthRouter)

  app.use(notFound)
  app.use(errorHandler)
  return app
}

export const _env = env // re-exported for tests
