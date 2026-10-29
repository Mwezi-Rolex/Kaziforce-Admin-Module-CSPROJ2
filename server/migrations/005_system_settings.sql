-- 005_system_settings.sql — key/value configuration + feature toggles (Ch5 §3.6.6; DDD system_settings).
-- Concrete keys are intentionally unnamed in the documents (CON-SET-002): the seed
-- inserts labelled sample keys so the interface is demonstrable without inventing requirements.

CREATE TABLE IF NOT EXISTS system_settings (
    key               text PRIMARY KEY,
    value             text NOT NULL,
    is_feature_toggle boolean NOT NULL DEFAULT false,
    updated_at        timestamptz NOT NULL DEFAULT now(),
    updated_by        uuid REFERENCES users(id) ON DELETE SET NULL
);
