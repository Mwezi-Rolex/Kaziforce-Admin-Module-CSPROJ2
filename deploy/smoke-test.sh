#!/usr/bin/env bash
# ============================================================================
# Kaziforce deployment smoke test
# ============================================================================
#
# Verifies the four claims the panel will probe, against a RUNNING deployment:
#   1. login works and issues a session
#   2. a Viewer is refused (403) on the audit CSV download  [CON-AUD-003]
#   3. a Moderator action succeeds and is audited           [CON-MOD-002]
#   4. UPDATE and DELETE on audit_log fail as the application role [CON-AUD-004]
#
# Usage:
#   deploy/smoke-test.sh                       # assume http://127.0.0.1 (local, direct to API)
#   BASE_URL=https://kaziforce.example.com deploy/smoke-test.sh
#   BASE_URL=http://<vps-ip> deploy/smoke-test.sh
#
# For check 4 the script needs a database connection as the APPLICATION role.
# It reads APP_DATABASE_URL from the environment, or from /etc/kaziforce/api.env.
# Check 4 is SKIPPED (loudly) if neither is available — it never silently passes.
#
# Exit code 0 = every executed check passed. Non-zero = a check failed.

set -uo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1}"
VIEWER_EMAIL="${VIEWER_EMAIL:-viewer@kaziforce.local}"
VIEWER_PASSWORD="${VIEWER_PASSWORD:-ViewerDemo!2026}"
MODERATOR_EMAIL="${MODERATOR_EMAIL:-moderator@kaziforce.local}"
MODERATOR_PASSWORD="${MODERATOR_PASSWORD:-ModeratorDemo!2026}"

PASS=0
FAIL=0
SKIP=0
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

pass() { PASS=$((PASS + 1)); printf '  \033[32mPASS\033[0m %s\n' "$1"; }
fail() { FAIL=$((FAIL + 1)); printf '  \033[31mFAIL\033[0m %s\n' "$1"; }
skip() { SKIP=$((SKIP + 1)); printf '  \033[33mSKIP\033[0m %s\n' "$1"; }
section() { printf '\n\033[1m%s\033[0m\n' "$1"; }

need() {
  command -v "$1" >/dev/null 2>&1 || { printf 'missing required command: %s\n' "$1" >&2; exit 2; }
}
need curl

printf 'Kaziforce smoke test — target: %s\n' "$BASE_URL"

# ---------------------------------------------------------------------------
section "1. Login works"
# ---------------------------------------------------------------------------
VIEWER_CODE="$(curl -s -o "$TMP/viewer.json" -w '%{http_code}' \
  -c "$TMP/viewer.cookies" -X POST "$BASE_URL/api/v1/auth/login" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$VIEWER_EMAIL\",\"password\":\"$VIEWER_PASSWORD\"}")"

if [ "$VIEWER_CODE" = "200" ] && grep -q '"success":true' "$TMP/viewer.json"; then
  pass "Viewer login returned 200 with a success envelope"
else
  fail "Viewer login returned $VIEWER_CODE (expected 200). Body: $(head -c 300 "$TMP/viewer.json" 2>/dev/null)"
fi

if grep -qi 'kz_session' "$TMP/viewer.cookies" 2>/dev/null; then
  pass "Session cookie kz_session was issued and stored"
else
  fail "No kz_session cookie in the login response"
fi

MOD_CODE="$(curl -s -o "$TMP/mod.json" -w '%{http_code}' \
  -c "$TMP/mod.cookies" -X POST "$BASE_URL/api/v1/auth/login" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$MODERATOR_EMAIL\",\"password\":\"$MODERATOR_PASSWORD\"}")"
if [ "$MOD_CODE" = "200" ]; then
  pass "Moderator login returned 200"
else
  fail "Moderator login returned $MOD_CODE (expected 200)"
fi

# ---------------------------------------------------------------------------
section "2. Viewer is refused (403) on the audit log download  [CON-AUD-003]"
# ---------------------------------------------------------------------------
EXPORT_CODE="$(curl -s -o "$TMP/export.json" -w '%{http_code}' \
  -b "$TMP/viewer.cookies" "$BASE_URL/api/v1/audit/export.csv")"

if [ "$EXPORT_CODE" = "403" ]; then
  pass "Viewer CSV export returned 403 (server-enforced, not just hidden in the UI)"
else
  fail "Viewer CSV export returned $EXPORT_CODE (expected 403)"
fi

if grep -q 'audit.export' "$TMP/export.json" 2>/dev/null; then
  pass "403 names the required permission (audit.export)"
else
  printf '  note: 403 body did not name audit.export: %s\n' "$(head -c 200 "$TMP/export.json" 2>/dev/null)"
fi

# Control: the same endpoint must succeed for a Moderator, proving 403 is
# about the role and not a broken endpoint.
MOD_EXPORT_CODE="$(curl -s -o "$TMP/export_mod.csv" -w '%{http_code}' \
  -b "$TMP/mod.cookies" "$BASE_URL/api/v1/audit/export.csv")"
if [ "$MOD_EXPORT_CODE" = "200" ]; then
  pass "Moderator CSV export returned 200 (control: endpoint is not broken)"
else
  fail "Moderator CSV export returned $MOD_EXPORT_CODE (expected 200)"
fi

# ---------------------------------------------------------------------------
section "3. A Moderator action succeeds and is audited  [CON-MOD-002]"
# ---------------------------------------------------------------------------
# Find one Pending flag to act on.
curl -s -b "$TMP/mod.cookies" "$BASE_URL/api/v1/moderation/queue?status=Pending" -o "$TMP/queue.json"
FLAG_ID="$(sed -n 's/.*"id":"\([0-9a-f-]\{36\}\)".*/\1/p' "$TMP/queue.json" | head -1)"

if [ -n "$FLAG_ID" ]; then
  DECISION_CODE="$(curl -s -o "$TMP/decision.json" -w '%{http_code}' \
    -b "$TMP/mod.cookies" -X POST "$BASE_URL/api/v1/moderation/flags/$FLAG_ID/decision" \
    -H 'Content-Type: application/json' -d '{"decision":"escalate"}')"
  if [ "$DECISION_CODE" = "200" ]; then
    pass "Moderator escalated flag ${FLAG_ID%?????????????????????????}… with 200"
  else
    fail "Moderation decision returned $DECISION_CODE (expected 200). Body: $(head -c 300 "$TMP/decision.json")"
  fi

  # The action must appear in the audit log.
  curl -s -b "$TMP/mod.cookies" "$BASE_URL/api/v1/audit?action=Content%20Escalated" -o "$TMP/audit_after.json"
  if grep -q "$FLAG_ID" "$TMP/audit_after.json"; then
    pass "Audit log contains a Content Escalated event for that flag"
  else
    fail "No Content Escalated audit event found for flag $FLAG_ID"
  fi
else
  skip "No Pending flag available to act on (queue returned none) — create one and re-run"
fi

# ---------------------------------------------------------------------------
section "4. audit_log is immutable for the application role  [CON-AUD-004]"
# ---------------------------------------------------------------------------
APP_URL="${APP_DATABASE_URL:-}"
if [ -z "$APP_URL" ] && [ -r /etc/kaziforce/api.env ]; then
  APP_URL="$(grep -E '^DATABASE_URL=' /etc/kaziforce/api.env | head -1 | cut -d= -f2-)"
fi

if ! command -v psql >/dev/null 2>&1; then
  skip "psql not installed on this host — run check 4 from a host with psql, or via the API host"
elif [ -z "$APP_URL" ]; then
  skip "No application database URL (set APP_DATABASE_URL or /etc/kaziforce/api.env)"
else
  check_denied() {
    local sql="$1" label="$2"
    local out status
    out="$(psql "$APP_URL" -v ON_ERROR_STOP=1 -tAc "$sql" 2>&1)"
    status=$?
    if [ $status -ne 0 ] && printf '%s' "$out" | grep -qiE 'permission denied|42501'; then
      pass "$label refused as kaziforce_app (permission denied)"
    else
      fail "$label was NOT refused (exit $status): $(printf '%s' "$out" | head -1)"
    fi
  }
  check_denied "UPDATE audit_log SET action_type = action_type WHERE false" "UPDATE on audit_log"
  check_denied "DELETE FROM audit_log WHERE false" "DELETE on audit_log"
  check_denied "TRUNCATE audit_log" "TRUNCATE on audit_log"

  # Control: SELECT must still work, proving the role is functional.
  if psql "$APP_URL" -v ON_ERROR_STOP=1 -tAc "SELECT count(*) FROM audit_log" >/dev/null 2>&1; then
    pass "SELECT on audit_log still works for kaziforce_app (control)"
  else
    fail "SELECT on audit_log failed for kaziforce_app — the role is over-restricted"
  fi
fi

# ---------------------------------------------------------------------------
section "5. Model service is not exposed publicly  [deployment requirement]"
# ---------------------------------------------------------------------------
# What counts as "exposed"? The model service answers with a JSON body containing
# "model_version". Anything else — a 404, a 403, or the SPA's index.html — means
# the service is not reachable from outside.
#
# This deliberately does NOT test for a 404. The Nginx config has an SPA
# fallback (`try_files $uri $uri/ /index.html`), so /predict returns 200 with
# index.html on a CORRECT deployment. Testing for 404 would therefore report a
# false failure. We assert on the response body instead, which is what actually
# indicates exposure.
case "$BASE_URL" in
  *:3000*|*:8000*)
    skip "BASE_URL points at a service directly ($BASE_URL) — run this check against the Nginx origin"
    ;;
  *)
    # POST, not GET: /predict is POST-only, so a GET returns 405 from an exposed
    # service and would produce a false PASS. A valid minimal body is sent so a
    # leak returns a real model response.
    MODEL_CODE="$(curl -s -o "$TMP/model.json" -w '%{http_code}' --max-time 5 \
      -X POST "$BASE_URL/predict" \
      -H 'Content-Type: application/json' \
      -d '{"reason_category":"other","content_type":"Review","report_text":"probe"}' || echo "000")"

    # A leak shows up in two ways:
    #   1. a successful model response  -> contains "model_version"
    #   2. FastAPI's own error envelope -> contains "detail"  (nginx and the SPA
    #      fallback never emit that shape; they return HTML or 403/404)
    if grep -q 'model_version' "$TMP/model.json" 2>/dev/null; then
      fail "Model service IS publicly reachable at $BASE_URL/predict (HTTP $MODEL_CODE) — check the Nginx config"
    elif grep -q '"detail"' "$TMP/model.json" 2>/dev/null; then
      fail "Model service answers at $BASE_URL/predict with a FastAPI error envelope (HTTP $MODEL_CODE) — it is exposed"
    elif [ "$MODEL_CODE" = "000" ]; then
      pass "Nothing reachable at $BASE_URL/predict (connection failed)"
    else
      pass "Model service not exposed at $BASE_URL/predict (HTTP $MODEL_CODE, no model response)"
    fi
    ;;
esac

# ---------------------------------------------------------------------------
printf '\n\033[1mSummary:\033[0m %d passed, %d failed, %d skipped\n' "$PASS" "$FAIL" "$SKIP"
if [ "$FAIL" -gt 0 ]; then
  printf '\033[31mSmoke test FAILED\033[0m\n'
  exit 1
fi
if [ "$SKIP" -gt 0 ]; then
  printf '\033[33mSmoke test passed with skips — re-run to execute the skipped checks\033[0m\n'
fi
printf '\033[32mSmoke test PASSED\033[0m\n'
exit 0
