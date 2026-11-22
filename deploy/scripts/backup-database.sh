#!/usr/bin/env bash
# ============================================================================
# Kaziforce nightly database backup (run by systemd timer kaziforce-backup.timer)
# ============================================================================
# Produces a compressed custom-format pg_dump of the application database,
# verifies the archive is listable, then prunes archives older than the
# retention window (default 7 days).
#
# On the VM the unit runs this as the `postgres` user with no connection
# settings: pg_dump then uses the local Unix socket and peer authentication.
# For local testing (no peer auth), export the standard libpq variables first:
#   PGHOST=127.0.0.1 PGPORT=5434 PGUSER=kaziforce_owner \
#   PGPASSWORD=... PGDATABASE=kaziforce_perf bash deploy/scripts/backup-database.sh
#
# Output: $BACKUP_DIR/${PGDATABASE}-<UTC stamp>.dump (+ this line's summary).
# Exit non-zero on any failure — systemd will mark the unit failed and the
# operator can alert on it (see docs/OPERATIONS.md).
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/var/backups/kaziforce}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
TARGET="${BACKUP_DIR}/${PGDATABASE:-kaziforce}-${STAMP}.dump"

command -v pg_dump >/dev/null || { echo "pg_dump not found in PATH" >&2; exit 1; }
mkdir -p "$BACKUP_DIR"
umask 027

# The dump itself (custom format: compressed, restorable selectively).
pg_dump --format=custom --no-owner --no-privileges --file="$TARGET"

# Verify before trusting it: non-empty and the archive table of contents lists
# table-data entries.
[ -s "$TARGET" ] || { echo "backup failed: $TARGET is empty" >&2; rm -f "$TARGET"; exit 1; }
TOC_ENTRIES="$(pg_restore --list "$TARGET" 2>/dev/null | grep -c 'TABLE DATA' || true)"
[ "${TOC_ENTRIES:-0}" -ge 1 ] || { echo "backup failed: $TARGET has no table data" >&2; rm -f "$TARGET"; exit 1; }

# Retention: delete this database's archives older than the window.
find "$BACKUP_DIR" -name "${PGDATABASE:-kaziforce}-*.dump" -type f -mtime "+${RETENTION_DAYS}" -delete

SIZE="$(stat -c%s "$TARGET")"
echo "backup ok: $TARGET (${SIZE} bytes, ${TOC_ENTRIES} table-data entries, retention ${RETENTION_DAYS}d)"
