import request from 'supertest'
import type { Express } from 'express'
import type { Pool } from 'pg'
import { createPool, hasDb as envHasDb } from './helpers/db'

// Regression tests for the moderation state machine (SEMANTIC_MODEL.md BUG-2
// and BUG-7, audit branch fix/state-machine-bugs):
//   - two concurrent decisions on one Pending flag must produce exactly one
//     applied decision and exactly one audit event (BUG-2);
//   - an upheld escalation must RESOLVE the flag (Rejected) so it leaves the
//     lane, and an overrule after uphold must be refused (BUG-7);
//   - two concurrent overrules/upholds must not double-write audit events.
//
// The suite inserts its own probe flags (reason LIKE 'race probe%') so it is
// independent of the seeded fixtures other suites reset, and removes them in
// afterAll.

const hasDb = envHasDb
const d = hasDb ? describe : describe.skip

let pool: Pool
let app: Express

beforeAll(async () => {
  if (!hasDb) return
  pool = createPool()
  const mod = await import('../src/app')
  app = mod.createApp()
  // Same fixture-reset discipline as moderation.test.ts: the uphold tests ban
  // sample platform accounts, so restore them to Active for a clean re-run.
  await pool.query(
    `UPDATE users SET status = 'Active'
     WHERE email IN ('adwoa.mensah@example.com', 'zainab.okafor@example.com', 'moses.kato@example.com')`,
  )
})

afterAll(async () => {
  if (!hasDb) return
  // Remove this suite's probe rows (audit_log rows referencing them stay, by design).
  await pool.query(`DELETE FROM flags WHERE reason LIKE 'race probe%'`)
  await pool.query(
    `DELETE FROM content_items WHERE id NOT IN (SELECT content_item_id FROM flags)
       AND owner_id IN (SELECT id FROM users WHERE email LIKE '%@example.com')
       AND created_at > now() - interval '1 hour'`,
  )
  await pool.end()
})

async function loginAs(email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password }).expect(200)
  return res.headers['set-cookie'][0]
}

/** Insert a fresh Pending flag owned by a sample platform account. */
async function insertProbeFlag(reason: string, ownerEmail: string): Promise<{ flagId: string; ownerId: string }> {
  const owner = await pool.query<{ id: string }>(`SELECT id FROM users WHERE email = $1`, [ownerEmail])
  const reporter = await pool.query<{ id: string }>(`SELECT id FROM users WHERE email = 'zainab.okafor@example.com'`)
  const content = await pool.query<{ id: string }>(
    `INSERT INTO content_items (content_type, owner_id) VALUES ('Gig listing', $1) RETURNING id`,
    [owner.rows[0].id],
  )
  const flag = await pool.query<{ id: string }>(
    `INSERT INTO flags (content_item_id, reported_by, severity, flag_status, reason, reason_category)
     VALUES ($1, $2, 'Medium', 'Pending', $3, 'other') RETURNING id`,
    [content.rows[0].id, reporter.rows[0].id, reason],
  )
  return { flagId: flag.rows[0].id, ownerId: owner.rows[0].id }
}

async function auditCount(actionType: string, flagId: string): Promise<number> {
  const { rows } = await pool.query<{ n: string }>(
    `SELECT count(*) AS n FROM audit_log WHERE action_type = $1 AND target_entity_id = $2`,
    [actionType, flagId],
  )
  return Number(rows[0].n)
}

d('BUG-2: concurrent decisions on one Pending flag', () => {
  it('applies exactly one decision and writes exactly one audit event', async () => {
    const cookie = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const { flagId } = await insertProbeFlag('race probe concurrent-decision', 'adwoa.mensah@example.com')

    // Deterministic interleaving: hold a row lock on the flag so every
    // concurrent decision's read of Pending completes before ANY of them can
    // write. The old check-then-act decideFlag let all four apply; a guarded
    // UPDATE re-checks the status after the lock and admits exactly one.
    const barrier = await pool.connect()
    let results: Array<{ status: number; body: { data?: { status?: string }; error?: { code?: string } } }>
    try {
      await barrier.query('BEGIN')
      await barrier.query(`SELECT flag_status FROM flags WHERE id = $1 FOR UPDATE`, [flagId])
      const pending = Promise.all(
        ['approve', 'reject', 'approve', 'reject'].map((decision) =>
          request(app).post(`/api/v1/moderation/flags/${flagId}/decision`).set('Cookie', cookie).send({ decision }),
        ),
      )
      await new Promise((r) => setTimeout(r, 500))
      await barrier.query('COMMIT')
      results = await pending
    } finally {
      barrier.release()
    }

    const statuses = results.map((r) => r.status).sort((a, b) => a - b)
    // Exactly one applied decision; the losers are refused, never silently applied.
    expect(statuses).toEqual([200, 409, 409, 409])
    const winnerStatus = results.find((r) => r.status === 200)!.body.data?.status ?? ''
    expect(winnerStatus).toMatch(/Approved|Rejected/)

    const approved = await auditCount('Content Approved', flagId)
    const rejected = await auditCount('Content Rejected', flagId)
    expect(approved + rejected).toBe(1)

    const final = await pool.query(`SELECT flag_status FROM flags WHERE id = $1`, [flagId])
    expect(final.rows[0].flag_status).toBe(winnerStatus)
  })
})

d('BUG-7: uphold resolves the flag and closes the lane item', () => {
  it('uphold sets the flag to Rejected, stamps the decider, and clears it from the escalation lane', async () => {
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const { flagId, ownerId } = await insertProbeFlag('race probe uphold-resolves', 'moses.kato@example.com')
    await request(app).post(`/api/v1/moderation/flags/${flagId}/decision`).set('Cookie', moderator).send({ decision: 'escalate' }).expect(200)

    const bansBefore = await auditCount('Account Terminated', ownerId)
    const res = await request(app).post(`/api/v1/moderation/flags/${flagId}/escalation`).set('Cookie', admin).send({ resolution: 'uphold' }).expect(200)
    expect(res.body.data.ownerBanned).toBe(true)

    const flag = await pool.query(`SELECT flag_status, decided_by, decided_at FROM flags WHERE id = $1`, [flagId])
    // The upheld flag must leave the escalation lane (terminal state), not sit there forever.
    expect(flag.rows[0].flag_status).toBe('Rejected')
    expect(flag.rows[0].decided_by).not.toBeNull()
    expect(flag.rows[0].decided_at).not.toBeNull()

    const lane = await request(app).get('/api/v1/moderation/queue?status=Escalated').set('Cookie', admin).expect(200)
    expect(lane.body.data.some((f: { id: string }) => f.id === flagId)).toBe(false)

    const owner = await pool.query(`SELECT status FROM users WHERE id = $1`, [ownerId])
    expect(owner.rows[0].status).toBe('Terminated')
    // Delta counts: earlier tests and history also banned this sample owner.
    expect((await auditCount('Account Terminated', ownerId)) - bansBefore).toBe(1)
    expect(await auditCount('Escalation Upheld', flagId)).toBe(1)
  })

  it('refuses an overrule after uphold with 409 (the owner stays banned, the flag stays resolved)', async () => {
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const { flagId, ownerId } = await insertProbeFlag('race probe overrule-after-uphold', 'moses.kato@example.com')
    await request(app).post(`/api/v1/moderation/flags/${flagId}/decision`).set('Cookie', moderator).send({ decision: 'escalate' }).expect(200)
    await request(app).post(`/api/v1/moderation/flags/${flagId}/escalation`).set('Cookie', admin).send({ resolution: 'uphold' }).expect(200)

    const res = await request(app).post(`/api/v1/moderation/flags/${flagId}/escalation`).set('Cookie', admin).send({ resolution: 'overrule' })
    expect(res.status).toBe(409)
    expect(res.body.error.code).toBe('FLAG-003')

    const flag = await pool.query(`SELECT flag_status FROM flags WHERE id = $1`, [flagId])
    expect(flag.rows[0].flag_status).toBe('Rejected')
    const owner = await pool.query(`SELECT status FROM users WHERE id = $1`, [ownerId])
    expect(owner.rows[0].status).toBe('Terminated')
  })

  it('reports the ban honestly when a second uphold targets an already-terminated owner', async () => {
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    // Two escalated flags over content owned by the SAME account (adwoa, so the
    // assertion is independent of moses's state in the other tests).
    const a = await insertProbeFlag('race probe uphold-shared-owner-a', 'adwoa.mensah@example.com')
    const b = await insertProbeFlag('race probe uphold-shared-owner-b', 'adwoa.mensah@example.com')
    for (const { flagId } of [a, b]) {
      await request(app).post(`/api/v1/moderation/flags/${flagId}/decision`).set('Cookie', moderator).send({ decision: 'escalate' }).expect(200)
    }
    await request(app).post(`/api/v1/moderation/flags/${a.flagId}/escalation`).set('Cookie', admin).send({ resolution: 'uphold' }).expect(200)
    const bansBefore = await auditCount('Account Terminated', a.ownerId)
    const res = await request(app).post(`/api/v1/moderation/flags/${b.flagId}/escalation`).set('Cookie', admin).send({ resolution: 'uphold' }).expect(200)
    expect(res.body.data.ownerBanned).toBe(true)

    // One ban audit event for this uphold, both flags resolved.
    expect((await auditCount('Account Terminated', a.ownerId)) - bansBefore).toBe(0)
    const statuses = await pool.query(`SELECT flag_status FROM flags WHERE id = ANY($1) ORDER BY 1`, [[a.flagId, b.flagId]])
    expect(statuses.rows.map((r) => r.flag_status).sort()).toEqual(['Rejected', 'Rejected'])
  })
})

d('BUG-2 (escalation form): concurrent escalation resolutions', () => {
  it('concurrent overrules apply exactly one resolution and write exactly one audit event', async () => {
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    const { flagId } = await insertProbeFlag('race probe concurrent-overrule', 'adwoa.mensah@example.com')
    await request(app).post(`/api/v1/moderation/flags/${flagId}/decision`).set('Cookie', moderator).send({ decision: 'escalate' }).expect(200)

    const [r1, r2] = await Promise.all([
      request(app).post(`/api/v1/moderation/flags/${flagId}/escalation`).set('Cookie', admin).send({ resolution: 'overrule' }),
      request(app).post(`/api/v1/moderation/flags/${flagId}/escalation`).set('Cookie', admin).send({ resolution: 'overrule' }),
    ])
    expect([r1.status, r2.status].sort((x, y) => x - y)).toEqual([200, 409])
    expect(await auditCount('Flag Overruled', flagId)).toBe(1)

    const final = await pool.query(`SELECT flag_status FROM flags WHERE id = $1`, [flagId])
    expect(final.rows[0].flag_status).toBe('Approved')
  })

  it('concurrent upholds ban the shared owner exactly once', async () => {
    const moderator = await loginAs('moderator@kaziforce.local', 'ModeratorDemo!2026')
    const admin = await loginAs('superadmin@kaziforce.local', 'SuperDemo!2026')
    // zainab: a distinct owner so the delta is not polluted by the other tests.
    const a = await insertProbeFlag('race probe concurrent-uphold-a', 'zainab.okafor@example.com')
    const b = await insertProbeFlag('race probe concurrent-uphold-b', 'zainab.okafor@example.com')
    for (const { flagId } of [a, b]) {
      await request(app).post(`/api/v1/moderation/flags/${flagId}/decision`).set('Cookie', moderator).send({ decision: 'escalate' }).expect(200)
    }
    const bansBefore = await auditCount('Account Terminated', a.ownerId)
    const [r1, r2] = await Promise.all([
      request(app).post(`/api/v1/moderation/flags/${a.flagId}/escalation`).set('Cookie', admin).send({ resolution: 'uphold' }),
      request(app).post(`/api/v1/moderation/flags/${b.flagId}/escalation`).set('Cookie', admin).send({ resolution: 'uphold' }),
    ])
    // Both resolutions may succeed (two flags), but the owner is banned once.
    for (const r of [r1, r2]) expect([200, 409]).toContain(r.status)
    expect((await auditCount('Account Terminated', a.ownerId)) - bansBefore).toBe(1)
    const owner = await pool.query(`SELECT status FROM users WHERE id = $1`, [a.ownerId])
    expect(owner.rows[0].status).toBe('Terminated')
    const statuses = await pool.query(`SELECT flag_status FROM flags WHERE id = ANY($1) ORDER BY 1`, [[a.flagId, b.flagId]])
    expect(statuses.rows.map((r) => r.flag_status).sort()).toEqual(['Rejected', 'Rejected'])
  })
})
