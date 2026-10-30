-- ============================================================================
-- Kaziforce — 01: database and roles  (run as the PostgreSQL superuser)
-- ============================================================================
--
--   sudo -u postgres psql -v ON_ERROR_STOP=1 -f deploy/sql/01_roles_database.sql
--
-- Creates the two login roles and the database:
--   kaziforce_owner — owns the schema, runs migrations and the seed
--   kaziforce_app   — runtime role for the API; restricted grants applied in 02
--
-- BEFORE RUNNING: replace the two placeholders below with strong passwords.
-- Do not commit real passwords; put the same values in /etc/kaziforce/api.env.
-- Generate them with:  openssl rand -base64 24
--
-- This file is the manual equivalent of `npm run bootstrap`
-- (server/scripts/bootstrap.mjs), which generates the passwords for you.
-- Use one path or the other, not both.

-- Fail loudly instead of half-applying.
\set ON_ERROR_STOP on

-- ---------------------------------------------------------------------------
-- Roles
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'kaziforce_owner') THEN
        CREATE ROLE kaziforce_owner LOGIN PASSWORD 'CHANGE_ME_OWNER_PASSWORD';
    ELSE
        ALTER ROLE kaziforce_owner LOGIN PASSWORD 'CHANGE_ME_OWNER_PASSWORD';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'kaziforce_app') THEN
        -- NOCREATEDB / NOCREATEROLE: the runtime role must not be able to
        -- create databases or roles.
        CREATE ROLE kaziforce_app LOGIN PASSWORD 'CHANGE_ME_APP_PASSWORD' NOCREATEDB NOCREATEROLE;
    ELSE
        ALTER ROLE kaziforce_app LOGIN PASSWORD 'CHANGE_ME_APP_PASSWORD' NOCREATEDB NOCREATEROLE;
    END IF;
END
$$;

-- ---------------------------------------------------------------------------
-- Database
-- ---------------------------------------------------------------------------
-- CREATE DATABASE cannot run inside a DO block or a transaction. The \gexec
-- idiom below creates it only when missing, so this script is safe to re-run.
SELECT 'CREATE DATABASE kaziforce OWNER kaziforce_owner'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'kaziforce')\gexec

ALTER DATABASE kaziforce OWNER TO kaziforce_owner;

-- Revoke public connect so only the two roles can reach the database.
REVOKE CONNECT ON DATABASE kaziforce FROM PUBLIC;
GRANT CONNECT ON DATABASE kaziforce TO kaziforce_owner;
GRANT CONNECT ON DATABASE kaziforce TO kaziforce_app;

-- ---------------------------------------------------------------------------
-- Verification (paste this output back when reporting)
-- ---------------------------------------------------------------------------
\echo '--- roles ---'
SELECT rolname, rolcanlogin, rolcreatedb, rolcreaterole
FROM pg_roles WHERE rolname IN ('kaziforce_owner', 'kaziforce_app') ORDER BY rolname;

\echo '--- database ---'
SELECT datname, pg_get_userbyid(datdba) AS owner FROM pg_database WHERE datname = 'kaziforce';
