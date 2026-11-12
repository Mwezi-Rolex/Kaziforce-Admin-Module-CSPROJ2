import type { Pool } from 'pg'
import type { Request } from 'express'
import { pool } from '../db/pool'

// AuditLogger — the cross-cutting service from the Note 8 class diagram.
// Every state-changing endpoint calls writeEvent(); the ledger itself has no
// update or delete path (migration 006 grants the app role SELECT+INSERT only,
// and this service exposes no such operation).
//
// Provenance fields (actor_ip, outcome, correlation_id) come from the BED §6.15
// and DDD §28.2 record definitions and were added in migration 009.

export type AuditOutcome = 'Success' | 'Failure' | 'Blocked'

/** Where a request came from, for services that do not receive the request object. */
export type AuditContext = { actorIp: string | null; correlationId: string | null }

export type AuditInput = {
  operatorId: string | null
  actionType: string
  targetEntityType: string
  targetEntityId: string | null
  /** How the action ended. Defaults to Success; denials and failures must say so. */
  outcome?: AuditOutcome
  /** Source address of the request, when the request is known. */
  actorIp?: string | null
  /** Correlation id tying the ledger row to the API response (x-correlation-id). */
  correlationId?: string | null
  metadata?: Record<string, unknown>
}

// Only accept an address PostgreSQL will accept as `inet`.
const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/
const IPV6 = /^[0-9a-fA-F:]+$/

function normaliseIp(value: string | undefined | null): string | null {
  if (!value) return null
  const ip = value.trim().replace(/^::ffff:/, '')
  if (!ip) return null
  if (IPV4.test(ip)) {
    const octets = ip.split('.').map(Number)
    return octets.every((o) => o >= 0 && o <= 255) ? ip : null
  }
  if (ip.includes(':') && IPV6.test(ip)) return ip
  return null
}

/**
 * The provenance of the current request: source address and correlation id.
 * Spread into a writeEvent() call so every ledger row carries them.
 */
export function auditContext(req: Request): AuditContext {
  const correlated = req as Request & { correlationId?: string }
  return {
    actorIp: normaliseIp(req.ip ?? req.socket?.remoteAddress),
    correlationId: correlated.correlationId ?? null,
  }
}

export async function writeEvent(input: AuditInput, db: Pool = pool): Promise<void> {
  await db.query(
    `INSERT INTO audit_log (operator_id, action_type, target_entity_type, target_entity_id, outcome, actor_ip, correlation_id, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)`,
    [
      input.operatorId,
      input.actionType,
      input.targetEntityType,
      input.targetEntityId,
      input.outcome ?? 'Success',
      normaliseIp(input.actorIp),
      input.correlationId ?? null,
      JSON.stringify(input.metadata ?? {}),
    ],
  )
}
