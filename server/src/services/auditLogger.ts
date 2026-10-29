import type { Pool } from 'pg'
import { pool } from '../db/pool'

// AuditLogger — the cross-cutting service from the Note 8 class diagram.
// Every state-changing endpoint calls writeEvent(); the ledger itself has no
// update or delete path (migration 006 grants the app role SELECT+INSERT only,
// and this service exposes no such operation).

export type AuditInput = {
  operatorId: string | null
  actionType: string
  targetEntityType: string
  targetEntityId: string | null
  metadata?: Record<string, unknown>
}

export async function writeEvent(input: AuditInput, db: Pool = pool): Promise<void> {
  await db.query(
    `INSERT INTO audit_log (operator_id, action_type, target_entity_type, target_entity_id, metadata)
     VALUES ($1, $2, $3, $4, $5::jsonb)`,
    [
      input.operatorId,
      input.actionType,
      input.targetEntityType,
      input.targetEntityId,
      JSON.stringify(input.metadata ?? {}),
    ],
  )
}
