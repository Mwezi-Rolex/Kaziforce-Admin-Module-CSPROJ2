-- 009_audit_provenance.sql — audit provenance fields.
--
-- The Phase 0 digest of the BED (§6.15 "Every authenticated request shall
-- record: User ID, Tenant ID, IP address, User Agent, Correlation ID,
-- Timestamp, Operation, Result") and of the DDD (§28.2 audit_events: actor_ip,
-- outcome, correlation_id) require the ledger to carry where an action came
-- from and how it ended. The ledger created in migration 004 recorded only
-- actor, action, target, metadata and timestamp, so this migration adds the
-- three missing provenance columns. Additive only: no existing column changes
-- and no existing row is rewritten.
--
-- Immutability is unaffected. The application role holds SELECT + INSERT on
-- audit_log and nothing else (migration 006); a table-level grant follows the
-- table, so the new columns are insertable and not updateable.

ALTER TABLE audit_log
    ADD COLUMN IF NOT EXISTS actor_ip inet,
    ADD COLUMN IF NOT EXISTS outcome text NOT NULL DEFAULT 'Success',
    ADD COLUMN IF NOT EXISTS correlation_id text;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'audit_log_outcome_chk') THEN
        ALTER TABLE audit_log
            ADD CONSTRAINT audit_log_outcome_chk CHECK (outcome IN ('Success', 'Failure', 'Blocked'));
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS audit_log_correlation_idx ON audit_log (correlation_id);
