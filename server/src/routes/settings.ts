import { Router } from 'express'
import { z } from 'zod'
import { pool } from '../db/pool'
import { requireAuth, type AuthedRequest } from '../middleware/auth'
import { requirePermission } from '../middleware/requirePermission'
import { ApiError } from '../middleware/errors'
import { writeEvent, auditContext } from '../services/auditLogger'

// System settings API (CON-SET-001/002; Ch5 §3.6.6).
//
// Super Admin only (`settings.manage`). Every change is audited, which also
// satisfies FR-ADM-034 (configuration changes recorded) and SEC-AUD-005
// (security configuration changes logged).
//
// Keys are NOT invented: the documents name no concrete settings keys (OQ-2),
// so the seed inserts clearly-labelled `sample.*` keys and the UI presents them
// as sample configuration. New keys are allowed — this is a key/value store —
// but nothing here pretends to be a real platform setting.

export const settingsRouter = Router()
settingsRouter.use(requireAuth)

// FR-ADM-031: visibility into active feature configurations is open to any
// authenticated operator (read-only); mutation is Super Admin only.
const SELECT_SETTINGS = `
  SELECT s.key, s.value, s.is_feature_toggle AS "isFeatureToggle",
         s.updated_at AS "updatedAt", u.email AS "updatedByEmail"
  FROM system_settings s
  LEFT JOIN users u ON u.id = s.updated_by`

settingsRouter.get('/', async (_req: AuthedRequest, res, next) => {
  try {
    const { rows } = await pool.query(`${SELECT_SETTINGS} ORDER BY s.is_feature_toggle DESC, s.key`)
    res.json({ success: true, data: rows, timestamp: new Date().toISOString() })
  } catch (err) {
    next(err)
  }
})

const keySchema = z
  .string()
  .trim()
  .min(1, 'Key is required')
  .max(120, 'Key is too long')
  .regex(/^[a-z0-9._-]+$/, 'Key may contain only lowercase letters, digits, dot, underscore and hyphen')

const valueSchema = z.object({ value: z.string().max(1000, 'Value is too long') })

// Create or update a configuration value (FR-ADM-019 configurable application
// settings, FR-ADM-020 configurable business rules).
settingsRouter.put(
  '/:key',
  requirePermission('settings.manage'),
  async (req: AuthedRequest, res, next) => {
    try {
      const key = keySchema.parse(req.params.key)
      const parsed = valueSchema.safeParse(req.body)
      if (!parsed.success) throw new ApiError(422, 'VALIDATION', parsed.error.issues[0]?.message ?? 'Invalid value')

      const existing = await pool.query(`SELECT value FROM system_settings WHERE key = $1`, [key])
      if (!existing.rows[0]) throw new ApiError(404, 'SETTING-001', 'No such configuration key')

      const { rows } = await pool.query(
        `UPDATE system_settings SET value = $2, updated_at = now(), updated_by = $3
         WHERE key = $1
         RETURNING key, value, is_feature_toggle AS "isFeatureToggle", updated_at AS "updatedAt"`,
        [key, parsed.data.value, req.user!.id],
      )
      await writeEvent({
        operatorId: req.user!.id,
        actionType: 'Configuration Updated',
        targetEntityType: 'system_setting',
        targetEntityId: null,
        outcome: 'Success',
        ...auditContext(req),
        metadata: { key, from: existing.rows[0].value, to: parsed.data.value },
      })
      res.json({ success: true, data: rows[0], timestamp: new Date().toISOString() })
    } catch (err) {
      next(err)
    }
  },
)

const toggleSchema = z.object({ enabled: z.boolean() })

// Feature toggle (FR-ADM-026 enable/disable features; FR-ADM-029 rollback
// without redeployment — flipping the flag back is the rollback).
settingsRouter.post(
  '/:key/toggle',
  requirePermission('settings.manage'),
  async (req: AuthedRequest, res, next) => {
    try {
      const key = keySchema.parse(req.params.key)
      const parsed = toggleSchema.safeParse(req.body)
      if (!parsed.success) throw new ApiError(422, 'VALIDATION', 'enabled must be a boolean')

      const existing = await pool.query(
        `SELECT value, is_feature_toggle AS "isFeatureToggle" FROM system_settings WHERE key = $1`,
        [key],
      )
      if (!existing.rows[0]) throw new ApiError(404, 'SETTING-001', 'No such configuration key')
      if (!existing.rows[0].isFeatureToggle) {
        throw new ApiError(409, 'SETTING-002', 'This key is a configuration value, not a feature toggle')
      }

      const nextValue = parsed.data.enabled ? 'true' : 'false'
      const { rows } = await pool.query(
        `UPDATE system_settings SET value = $2, updated_at = now(), updated_by = $3
         WHERE key = $1
         RETURNING key, value, is_feature_toggle AS "isFeatureToggle", updated_at AS "updatedAt"`,
        [key, nextValue, req.user!.id],
      )
      await writeEvent({
        operatorId: req.user!.id,
        actionType: 'Feature Toggle Changed',
        targetEntityType: 'system_setting',
        targetEntityId: null,
        outcome: 'Success',
        ...auditContext(req),
        metadata: { key, from: existing.rows[0].value, to: nextValue },
      })
      res.json({ success: true, data: rows[0], timestamp: new Date().toISOString() })
    } catch (err) {
      next(err)
    }
  },
)
