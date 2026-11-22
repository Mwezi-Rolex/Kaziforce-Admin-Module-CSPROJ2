#!/usr/bin/env bash
# ============================================================================
# Kaziforce database restore — VERIFICATION path (never touches the live DB)
# ============================================================================
# Restores a backup archive into a THROWAWAY database so the operator can prove
# a backup is restorable before ever needing it. The live-database restore is a
# manual procedure documented in docs/OPERATIONS.md §Reliability, done with the
# API stopped; this script deliberately cannot touch it.
#
# Usage (on the VM, as a user with CREATEDB — the postgres user, or locally with
# the standard libpq environment variables):
#   bash deploy/scripts/restore-database.sh /var/backups/kaziforce/kaziforce-2026....dump kaziforce_restore_test
#
# Prints the restored row counts for the four application tables, then leaves
# the verification database in place for inspection:
#   psql -d kaziforce_restore_test -c 'SELECT count(*) FROM audit_log'
# Drop it afterwards:
#   psql -c 'DROP DATABASE kaziforce_restore_test'
set -euo pipefail

DUMP="${1:-}"
TARGET_DB="${2:-kaziforce_restore_test}"
[ -n "$DUMP" ] || { echo "usage: $0 <archive.dump> [target-db]" >&2; exit 1; }
[ -f "$DUMP" ] || { echo "no such archive: $DUMP" >&2; exit 1; }

command -v pg_restore >/dev/null || { echo "pg_restore not found in PATH" >&2; exit 1; }

# The target must not exist (this script never drops or overwrites anything).
if psql -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = '${TARGET_DB}'" | grep -q 1; then
  echo "database '${TARGET_DB}' already exists — refusing (drop it manually first)" >&2
  exit 1
fi

createdb "${TARGET_DB}"
# --no-owner/--no-privileges: restore objects without the original ownership so
# the restoring user can read everything, whatever role made the backup.
pg_restore --no-owner --no-privileges --dbname="${TARGET_DB}" "$DUMP"

echo "restore verification into '${TARGET_DB}' — row counts:"
psql -d "${TARGET_DB}" -tA -c \
  "SELECT 'audit_log=' || count(*) FROM audit_log
   UNION ALL SELECT 'flags=' || count(*) FROM flags
   UNION ALL SELECT 'content_items=' || count(*) FROM content_items
   UNION ALL SELECT 'users=' || count(*) FROM users"
