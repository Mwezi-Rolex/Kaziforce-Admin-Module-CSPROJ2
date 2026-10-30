-- 007_flag_reason_category.sql — adds the reason category used by the model
-- service (ml/generate_data.py REASON_CATEGORIES). The free-text `reason` column
-- is retained; the category is the structured feature the model consumes.

ALTER TABLE flags
    ADD COLUMN IF NOT EXISTS reason_category text NOT NULL DEFAULT 'other'
    CHECK (reason_category IN (
        'off_platform_payment',
        'abusive_language',
        'spam_or_promotion',
        'credential_misrepresentation',
        'ip_infringement',
        'other'
    ));

CREATE INDEX IF NOT EXISTS flags_reason_category_idx ON flags (reason_category);
