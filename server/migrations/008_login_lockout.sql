-- 008_login_lockout.sql — consecutive-failure account lockout (OQ-12, SEC-AUTH-008).
--
-- Locks an operator account for LOCKOUT_MINUTES after MAX_FAILED_ATTEMPTS
-- consecutive failed logins. The counter resets on a successful login.
-- Only lock and unlock events are audited; individual failed attempts are not
-- (the request would otherwise write an audit row per guess, which is both a
-- log-flooding vector and noise the ledger does not need).
--
-- These columns live on `users` rather than a separate table because the state
-- is one counter and one timestamp per account.

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS failed_login_attempts integer NOT NULL DEFAULT 0;

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS locked_until timestamptz;

-- Supports "which accounts are currently locked" without a sequential scan.
CREATE INDEX IF NOT EXISTS users_locked_until_idx ON users (locked_until)
    WHERE locked_until IS NOT NULL;

COMMENT ON COLUMN users.failed_login_attempts IS
    'Consecutive failed logins since the last successful one; reset to 0 on success.';
COMMENT ON COLUMN users.locked_until IS
    'If in the future, login is refused until this instant. Cleared on successful login or by a Super Admin unlock.';
