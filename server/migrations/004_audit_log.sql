-- 004_audit_log.sql — immutable audit ledger (Ch5 §3.6.5; DDD audit_log).
-- INSERT-only at the database-role level: migration 006 grants the application role
-- SELECT and INSERT on this table and nothing more. No UPDATE/DELETE path exists.

CREATE TABLE IF NOT EXISTS audit_log (
    id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id        uuid REFERENCES users(id) ON DELETE NO ACTION,  -- no cascade (Ch5 §3.4.3)
    action_type        text NOT NULL,
    target_entity_type text NOT NULL,
    target_entity_id   uuid,
    metadata           jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at         timestamptz NOT NULL DEFAULT now()              -- server-generated (Ch5 §3.4.4)
);

CREATE INDEX IF NOT EXISTS audit_log_created_at_idx ON audit_log (created_at);
CREATE INDEX IF NOT EXISTS audit_log_operator_idx ON audit_log (operator_id);
CREATE INDEX IF NOT EXISTS audit_log_action_idx ON audit_log (action_type);
