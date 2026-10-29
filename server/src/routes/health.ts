import { Router } from 'express'
import { pool } from '../db/pool'

// Health probe (BED Part V convention; GET /api/v1/health).
export const healthRouter = Router()

healthRouter.get('/health', async (_req, res, next) => {
  try {
    await pool.query('SELECT 1')
    res.json({ success: true, data: { status: 'ok', database: 'reachable' }, timestamp: new Date().toISOString() })
  } catch (err) {
    next(err)
  }
})
