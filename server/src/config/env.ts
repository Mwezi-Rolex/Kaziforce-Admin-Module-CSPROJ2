import 'dotenv/config'
import { z } from 'zod'

// Fails fast with a clear message instead of leaking a bad state into handlers.
const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required (application role)'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_TTL_HOURS: z.coerce.number().int().positive().default(8),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(600),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(300_000),
  // Cap on one audit CSV export. When a filter matches more rows than this,
  // the export ends with an explicit 'Export Truncated' marker row and an
  // X-Total-Matching-Rows response header (SEMANTIC_MODEL.md BUG-8, fixed).
  AUDIT_EXPORT_MAX_ROWS: z.coerce.number().int().positive().default(10_000),
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  const detail = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
  throw new Error(`Invalid environment configuration — ${detail}. See server/.env.example.`)
}

export const env = parsed.data
export const isProduction = env.NODE_ENV === 'production'
