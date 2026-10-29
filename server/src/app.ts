import cookieParser from 'cookie-parser'
import express from 'express'
import { env } from './config/env'
import { authRouter } from './routes/auth'
import { healthRouter } from './routes/health'
import { errorHandler, notFound } from './middleware/errors'
import { rateLimit } from './middleware/rateLimit'

// Middleware pipeline order per Ch5 §3.4.5: authentication verification ->
// rate limiting -> RBAC -> controller. Authentication itself is per-route
// (requireAuth/requirePermission); rate limiting is global for /api/v1.
export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '256kb' }))
  app.use(cookieParser())
  app.use('/api/v1', rateLimit)

  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1', healthRouter)

  app.use(notFound)
  app.use(errorHandler)
  return app
}

export const _env = env // re-exported for tests
