-- 006_app_role_grants.sql — application database role grants (Ch5 §3.6.5 immutability rule).
-- kaziforce_app is created by scripts/bootstrap.mjs (superuser, one-time).
-- The audit ledger gets SELECT + INSERT only: the application can never UPDATE or
-- DELETE audit rows, enforcing immutability below the application layer (CON-AUD-004).

GRANT USAGE ON SCHEMA public TO kaziforce_app;

-- Read-only reference data
GRANT SELECT ON roles, permissions, role_permissions TO kaziforce_app;

-- Working tables: the API may mutate these (soft-delete only for users, enforced in code)
GRANT SELECT, INSERT, UPDATE, DELETE ON users, user_roles, content_items, flags, system_settings TO kaziforce_app;

-- Immutable ledger: SELECT + INSERT only. Deliberately no UPDATE, no DELETE, no TRUNCATE.
GRANT SELECT, INSERT ON audit_log TO kaziforce_app;
