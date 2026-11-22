import type { NextFunction, Request, Response } from 'express'
import { env } from '../config/env'
import { ERROR_CODES } from '../lib/vocabulary'

// Ch5 §3.4.5 pipeline: authentication -> rate limiting -> RBAC -> controller.
// In-memory fixed window (D-018); Redis sliding window is the documented
// upgrade path when the deployment scales beyond one process.
const buckets = new Map<string, { count: number; windowStart: number }>()

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = req.ip ?? 'unknown'
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || now - bucket.windowStart >= env.RATE_LIMIT_WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now })
    return next()
  }
  bucket.count += 1
  if (bucket.count > env.RATE_LIMIT_MAX) {
    res.status(429).json({
      success: false,
      error: { code: ERROR_CODES.rateLimited, message: 'Too many requests. Retry later.' },
      timestamp: new Date().toISOString(),
    })
    return
  }
  next()
}

// Opportunistic cleanup so the map cannot grow unbounded.
setInterval(() => {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart >= env.RATE_LIMIT_WINDOW_MS) buckets.delete(key)
  }
}, env.RATE_LIMIT_WINDOW_MS).unref()
