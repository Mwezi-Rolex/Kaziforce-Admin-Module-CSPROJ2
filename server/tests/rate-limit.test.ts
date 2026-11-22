// Rate limiter behaviour at the trust boundary (rule-2 companion: unauthenticated
// traffic is throttled before it can hammer authentication). This suite sets a
// small cap BEFORE the app module is imported (each Jest file has its own module
// registry, so config/env parses RATE_LIMIT_MAX=3 for this suite only) and then
// asserts the limiter's observable contract over HTTP: requests inside the window
// pass, the next request is refused 429 with the RATE_LIMITED envelope.
//
// The production cap (600 per 5 minutes) is a deployment setting; what is tested
// here is the limiter's behaviour, not the configured number.

process.env.RATE_LIMIT_MAX = '3'

import request from 'supertest'
import type { Express } from 'express'
import { hasDb as envHasDb } from './helpers/db'

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let app: Express

beforeAll(async () => {
  if (!hasDb) return
  const mod = await import('../src/app')
  app = mod.createApp()
})

d('rate limiter (fixed window per IP)', () => {
  it('passes the first requests and answers 429 RATE_LIMITED once the cap is hit', async () => {
    for (let i = 0; i < 3; i++) {
      await request(app).get('/api/v1/health').expect(200)
    }
    const res = await request(app).get('/api/v1/health').expect(429)
    expect(res.body.error.code).toBe('RATE_LIMITED')
    expect(res.body.success).toBe(false)
  })
})
