-- 001_roles_permissions.sql — RBAC core (DDD roles/permissions/role_permissions; Note 8 ERD).
-- Run by the migration role (kaziforce_owner).

CREATE TABLE IF NOT EXISTS roles (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL UNIQUE,          -- 'viewer' | 'moderator' | 'super_admin'
    description text NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS permissions (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key         text NOT NULL UNIQUE,          -- e.g. 'moderation.decide', 'audit.export'
    description text NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id       uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);
