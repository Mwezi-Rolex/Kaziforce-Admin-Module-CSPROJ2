-- 002_users.sql — accounts (DDD users; soft delete, unique email, no hard deletes — Ch5 §3.4).
-- is_operator marks console operators (they authenticate); platform accounts do not.

CREATE TABLE IF NOT EXISTS users (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email         text NOT NULL,
    password_hash text,                        -- NULL for platform accounts (they never sign in here)
    full_name     text NOT NULL DEFAULT '',
    status        text NOT NULL DEFAULT 'Active'
                  CHECK (status IN ('Active', 'Suspended', 'Terminated')),
    is_operator   boolean NOT NULL DEFAULT false,
    is_deleted    boolean NOT NULL DEFAULT false,  -- soft delete only (Ch5 §3.4.4)
    created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_key ON users (lower(email));
CREATE INDEX IF NOT EXISTS users_status_idx ON users (status);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON users (created_at);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);
