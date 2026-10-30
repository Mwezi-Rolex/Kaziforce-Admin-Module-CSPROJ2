-- ============================================================================
-- Kaziforce — 02: application role privileges (the immutability guarantee)
-- ============================================================================
--
-- Run as the schema owner (kaziforce_owner) or the superuser, AFTER migrations
-- have created the tables:
--
--   psql "$OWNER_DATABASE_URL" -v ON_ERROR_STOP=1 -f deploy/sql/02_grants.sql
--
-- NOTE: migration 006_app_role_grants.sql already applies exactly these grants
-- when you run `npm run migrate`. This file exists because BRIEF requires an
-- explicit SQL script for the deployment, and because re-running it is a fast
-- way to re-assert the audit-log restrictions if anything drifts.
--
-- The load-bearing rule: kaziforce_app gets SELECT and INSERT on audit_log and
-- NOTHING else. UPDATE, DELETE and TRUNCATE are refused by the database for the
-- application role, so the audit ledger is append-only below the application
-- layer (Ch5 §3.6.5, CON-AUD-004). The smoke test proves this.

\set ON_ERROR_STOP on

-- ---------------------------------------------------------------------------
-- Schema usage
-- ---------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO kaziforce_app;

-- ---------------------------------------------------------------------------
-- Reference data: read-only to the application
-- ---------------------------------------------------------------------------
GRANT SELECT ON roles, permissions, role_permissions TO kaziforce_app;

-- ---------------------------------------------------------------------------
-- Working tables: the API may read and write these.
-- Deletion of accounts is soft (users.is_deleted), enforced in application code;
-- the grant below is deliberately generous and the policy lives in the service.
-- ---------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE ON users, user_roles, content_items, flags, system_settings TO kaziforce_app;

-- ---------------------------------------------------------------------------
-- Immutable ledger: SELECT + INSERT only.
-- ---------------------------------------------------------------------------
GRANT SELECT, INSERT ON audit_log TO kaziforce_app;

-- If tables are added by migrations run as the owner later, default privileges
-- keep the runtime role from silently losing access to them.
ALTER DEFAULT PRIVILEGES FOR ROLE kaziforce_owner IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO kaziforce_app;
ALTER DEFAULT PRIVILEGES FOR ROLE kaziforce_owner IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO kaziforce_app;

-- Sequences (uuid columns use gen_random_uuid(), but grant anyway for safety).
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO kaziforce_app;

-- ---------------------------------------------------------------------------
-- Withdraw everything else on the ledger, LAST so this is the effective state.
-- This also covers any pre-existing grant and makes re-running idempotent.
-- ---------------------------------------------------------------------------
REVOKE UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON audit_log FROM kaziforce_app;

-- ============================================================================
-- VERIFICATION — paste this output back when reporting.
-- Expected: can_select = t, can_insert = t, and the last three all f.
-- Uses has_table_privilege() because information_schema.role_table_grants only
-- lists grants visible to the connected role, which would misreport zero rows.
-- ============================================================================
\echo '--- audit_log privileges for kaziforce_app ---'
SELECT
    has_table_privilege('kaziforce_app', 'audit_log', 'SELECT')   AS can_select,
    has_table_privilege('kaziforce_app', 'audit_log', 'INSERT')   AS can_insert,
    has_table_privilege('kaziforce_app', 'audit_log', 'UPDATE')   AS can_update,
    has_table_privilege('kaziforce_app', 'audit_log', 'DELETE')   AS can_delete,
    has_table_privilege('kaziforce_app', 'audit_log', 'TRUNCATE') AS can_truncate;

\echo '--- working tables (expect all t) ---'
SELECT
    has_table_privilege('kaziforce_app', 'flags', 'SELECT') AS flags_select,
    has_table_privilege('kaziforce_app', 'flags', 'UPDATE') AS flags_update,
    has_table_privilege('kaziforce_app', 'users', 'UPDATE') AS users_update,
    has_table_privilege('kaziforce_app', 'system_settings', 'UPDATE') AS settings_update;

\echo '--- sanity: the ledger is readable and non-empty after seeding ---'
SELECT count(*) AS audit_rows FROM audit_log;
