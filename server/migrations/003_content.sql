-- 003_content.sql — marketplace content and flags (DDD content_items/flags; Ch5 §3.4 ERD).
-- Flag status drives the moderation workflow: Pending -> Approved | Rejected | Escalated.

CREATE TABLE IF NOT EXISTS content_items (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type text NOT NULL
                 CHECK (content_type IN ('Gig listing', 'Review', 'Portfolio submission')),
    owner_id     uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flags (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id uuid NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
    reported_by     uuid REFERENCES users(id) ON DELETE SET NULL,
    severity        text NOT NULL DEFAULT 'Low'
                    CHECK (severity IN ('Low', 'Medium', 'High')),
    flag_status     text NOT NULL DEFAULT 'Pending'
                    CHECK (flag_status IN ('Pending', 'Approved', 'Rejected', 'Escalated')),
    reason          text NOT NULL DEFAULT '',
    created_at      timestamptz NOT NULL DEFAULT now(),
    decided_by      uuid REFERENCES users(id) ON DELETE SET NULL,
    decided_at      timestamptz
);

-- Ch5 §3.4.4: indexes on flag_status (queue filtering) and created_at (age/priority).
CREATE INDEX IF NOT EXISTS flags_flag_status_idx ON flags (flag_status);
CREATE INDEX IF NOT EXISTS flags_severity_idx ON flags (severity);
CREATE INDEX IF NOT EXISTS flags_created_at_idx ON flags (created_at);
