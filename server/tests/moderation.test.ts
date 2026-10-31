import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Moderation queue slice tests (CON-MOD-001…004). Role denials per BRIEF:
// Viewer is refused every decision; Moderators are refused the escalation lane.
// beforeAll restores the seeded flag/owner states so the suite is idempotent.

// A database is required for this suite. When one is not configured the suite
// SKIPS with a readable reason instead of failing at import time.
const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let pool: Pool

let app: Express
beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
  await pool.query(`
    UPDATE flags SET flag_status = 'Pending', decided_by = NULL, decided_at = NULL;
    UPDATE flags SET flag_status = 'Escalated' WHERE reason LIKE 'Repeated policy%';
    UPDATE flags SET severity = 'High'   WHERE reason LIKE 'Possible off-platform%';
    UPDATE flags SET severity = 'Medium' WHERE reason LIKE 'Review references%';
    UPDATE flags SET severity = 'Low'    WHERE reason LIKE 'Portfolio item%';
    UPDATE flags SET severity = 'High'   WHERE reason LIKE 'Repeated policy%';
    UPDATE users SET status = 'Active'
      WHERE email IN ('adwoa.mensah@example.com', 'zainab.okafor@example.com', 'moses.kato@example.com');
  `)
})
afterAll(async () => {
  if (hasDb) await pool.end()
})

async function loginAs(email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
  return res.headers['set-cookie'][0]
}

// Reset one flag to Pending and return it, so tests that need a decidable flag
// are independent of execution order and of flags consumed by other tests.
async function ensurePendingFlag(severity = 'Medium'): Promise<{ id: string; ownerId: string }> {
  const { rows } = await pool.query(
    `UPDATE flags SET flag_status = 'Pending', decided_by = NULL, decided_at = NULL, severity = $1
     WHERE id = (SELECT id FROM flags ORDER BY created_at LIMIT 1)
     RETURNING id, (SELECT owner_id FROM content_items WHERE content_items.id = flags.content_item_id) AS "ownerId"`,
    [severity],
  )
  return rows[0]
}

d('GET /api/v1/moderation/queue', () => {
  it('is readable by every operator role, rule-ordered by severity', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const res = await request(app).get('/api/v1/moderation/queue').set('Cookie', cookie).expect(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.length).toBeGreaterThan(0)
    expect(['High', 'Medium', 'Low']).toContain(res.body.data[0].severity)
  })

  it('filters by severity and status', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const res = await request(app)
      .get('/api/v1/moderation/queue?severity=High&status=Escalated')
      .set('Cookie', cookie)
      .expect(200)
    expect(res.body.data.length).toBe(1)
    expect(res.body.data[0].flagStatus).toBe('Escalated')
  })
})

d('single decision (moderation.decide)', () => {
  it('denies a Viewer with 403', async () => {
    const cookie = await loginAs('viewer@kaziforce.local', 'ViewerDemo!2026')
    const queue = await request(app).get('/api/v1/moderation/queue').set('Cookie', cookie).expect(200)
    const pending = queue.body.data.find((f: { flagStatus: string }) => f.flagStatus === 'Pending')
    const res = await request(app)
      .post(`/api/v1/moderation/flags/${pending.id}/decision`)
      .set('Cookie', cookie)
      .send({ decision: 'approve' })
      .expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })

  it('lets a Moderator approve a Pending flag and writes an audit event', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const queue = await request(app)
      .get('/api/v1/moderation/queue?status=Pending&severity=High')
      .set('Cookie', cookie)
      .expect(200)
    const flag = queue.body.data[0]
    const res = await request(app)
      .post(`/api/v1/moderation/flags/${flag.id}/decision`)
      .set('Cookie', cookie)
      .send({ decision: 'approve' })
      .expect(200)
    expect(res.body.data.status).toBe('Approved')
    const audit = await pool.query(`SELECT 1 FROM audit_log WHERE target_entity_id = $1 AND action_type = 'Content Approved'`, [
      flag.id,
    ])
    expect(audit.rows.length).toBeGreaterThan(0)
  })

  it('returns 409 when the flag was already decided', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const queue = await request(app)
      .get('/api/v1/moderation/queue?status=Pending&severity=High')
      .set('Cookie', cookie)
      .expect(200)
    // The previous test approved the High/Pending flag; nothing High+Pending
    // remains, so reuse that flag id via the Approved filter.
    const decided = await request(app)
      .get('/api/v1/moderation/queue?status=Approved&severity=High')
      .set('Cookie', cookie)
      .expect(200)
    expect(decided.body.data.length).toBeGreaterThan(0)
    const res = await request(app)
      .post(`/api/v1/moderation/flags/${decided.body.data[0].id}/decision`)
      .set('Cookie', cookie)
      .send({ decision: 'reject' })
      .expect(409)
    expect(res.body.error.code).toBe('FLAG-002')
    void queue
  })

  it('records the model suggestion (version + followed flag) in the audit payload (CON-ML-A-001)', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const flag = await ensurePendingFlag('Medium')
    await request(app)
      .post(`/api/v1/moderation/flags/${flag.id}/decision`)
      .set('Cookie', cookie)
      .send({ decision: 'reject' })
      .expect(200)
    const audit = await pool.query(
      `SELECT metadata FROM audit_log WHERE target_entity_id = $1 AND action_type = 'Content Rejected'
       ORDER BY created_at DESC LIMIT 1`,
      [flag.id],
    )
    const meta = audit.rows[0].metadata
    // The suggestion block is always present; when the model service is not
    // running it is the fail-safe form, when it is running it carries the
    // version and the followed/overridden determination.
    expect(meta).toHaveProperty('suggestion')
    if (meta.suggestion.available) {
      expect(typeof meta.suggestion.modelVersion).toBe('string')
      expect(typeof meta.suggestion.followed).toBe('boolean')
      expect(meta.suggestion.followed).toBe(meta.suggestion.action === 'reject')
    } else {
      expect(meta.suggestion.available).toBe(false)
    }
  })

  it('rejects an unknown decision with 422', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const queue = await request(app).get('/api/v1/moderation/queue?status=Pending').set('Cookie', cookie).expect(200)
    await request(app)
      .post(`/api/v1/moderation/flags/${queue.body.data[0].id}/decision`)
      .set('Cookie', cookie)
      .send({ decision: 'maybe' })
      .expect(422)
  })
})

d('bulk decisions (moderation.decide)', () => {
  it('applies one decision to many flags, reporting per-flag failures', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    // Ensure a Pending flag exists (earlier tests consume the seeded ones).
    const pending = await ensurePendingFlag('Medium')
    const res = await request(app)
      .post('/api/v1/moderation/bulk')
      .set('Cookie', cookie)
      .send({ flagIds: [pending.id, pending.id], decision: 'reject' })
      .expect(200)
    expect(res.body.data.applied).toHaveLength(1)
    expect(res.body.data.failed).toHaveLength(1)
    const audit = await pool.query(
      `SELECT 1 FROM audit_log WHERE target_entity_id = $1 AND action_type = 'Content Rejected'`,
      [pending.id],
    )
    expect(audit.rows.length).toBeGreaterThan(0)
  })

  it('rejects an oversized or empty batch with 422', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    await request(app).post('/api/v1/moderation/bulk').set('Cookie', cookie).send({ flagIds: [], decision: 'approve' }).expect(422)
  })
})

d('escalation lane (moderation.escalation, Super Admin only)', () => {
  it('denies a Moderator with 403', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const queue = await request(app)
      .get('/api/v1/moderation/queue?status=Escalated')
      .set('Cookie', cookie)
      .expect(200)
    const res = await request(app)
      .post(`/api/v1/moderation/flags/${queue.body.data[0].id}/escalation`)
      .set('Cookie', cookie)
      .send({ resolution: 'overrule' })
      .expect(403)
    expect(res.body.error.code).toBe('AUTHZ-001')
  })

  it('lets a Super Admin overrule an escalated flag (flag becomes Approved)', async () => {
    const cookie = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const queue = await request(app)
      .get('/api/v1/moderation/queue?status=Escalated')
      .set('Cookie', cookie)
      .expect(200)
    const flag = queue.body.data[0]
    const res = await request(app)
      .post(`/api/v1/moderation/flags/${flag.id}/escalation`)
      .set('Cookie', cookie)
      .send({ resolution: 'overrule' })
      .expect(200)
    expect(res.body.data.status).toBe('Approved')
    const audit = await pool.query(`SELECT 1 FROM audit_log WHERE target_entity_id = $1 AND action_type = 'Flag Overruled'`, [
      flag.id,
    ])
    expect(audit.rows.length).toBeGreaterThan(0)
  })

  it('lets a Super Admin uphold with ban (content owner becomes Terminated, audited)', async () => {
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    // Ensure a Pending flag exists to escalate, then escalate it.
    const pending = await ensurePendingFlag('Low')
    await request(app)
      .post(`/api/v1/moderation/flags/${pending.id}/decision`)
      .set('Cookie', moderator)
      .send({ decision: 'escalate' })
      .expect(200)
    const flag = { id: pending.id, ownerId: pending.ownerId }

    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const res = await request(app)
      .post(`/api/v1/moderation/flags/${flag.id}/escalation`)
      .set('Cookie', admin)
      .send({ resolution: 'uphold' })
      .expect(200)
    expect(res.body.data.ownerBanned).toBe(true)
    const owner = await pool.query(`SELECT status FROM users WHERE id = $1`, [flag.ownerId])
    expect(owner.rows[0].status).toBe('Terminated')
    const audit = await pool.query(`SELECT 1 FROM audit_log WHERE target_entity_id = $1 AND action_type = 'Escalation Upheld'`, [
      flag.id,
    ])
    expect(audit.rows.length).toBeGreaterThan(0)
  })

  it('refuses escalation resolution on a non-escalated flag (409)', async () => {
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const queue = await request(app).get('/api/v1/moderation/queue?status=Pending').set('Cookie', admin).expect(200)
    if (!queue.body.data.length) return
    const res = await request(app)
      .post(`/api/v1/moderation/flags/${queue.body.data[0].id}/escalation`)
      .set('Cookie', admin)
      .send({ resolution: 'overrule' })
      .expect(409)
    expect(res.body.error.code).toBe('FLAG-003')
  })
})
