# OPERATIONS.md — production-readiness runbook for the Kaziforce VM

Written on branch `ops/production-readiness` (2026-11-22) for the single Azure VM
running https://kaziforce-demo.spaincentral.cloudapp.azure.com. Everything here is an
**artifact + procedure the operator runs**; the authoring agent never connected to the
VM. Changes in this round touch `deploy/` and `docs/` only.

**What was verified locally, with results** (the VM-side steps are marked [UNVERIFIED]
individually):

| Check | Command | Result |
|---|---|---|
| Backup script syntax | `bash -n deploy/scripts/backup-database.sh` (and the restore script, the installer) | OK — all three pass `bash -n` |
| Backup cycle, real data | backup script against the disposable perf cluster (`kaziforce_perf`, 50,001 audit rows) with `PG*` env overrides | `backup ok: …kaziforce_perf-20261122T024651Z.dump (3298282 bytes, 10 table-data entries, retention 7d)` |
| Restore cycle, real data | `bash deploy/scripts/restore-database.sh <dump> kaziforce_restore_test` | `audit_log=50001, flags=5004, content_items=1504, users=7` — identical row counts; **restore wall time 3,878 ms** |
| Nginx syntax (HTTP site) | `docker run --rm -v <conf mounts> nginx:1.27-alpine nginx -t` | `syntax is ok / test is successful` |
| Nginx syntax (HTTPS example) | same, with dummy certificates mounted | `syntax is ok / test is successful` |
| Full first install on the VM | operator-run (docs/draft/evidence/vm-deployment-2026-11-21.md) | recorded: smoke test 13 passed / 0 failed — [the re-run/rollback duration is UNVERIFIED] |

> The backup/restore cycle was exercised on the **disposable perf cluster**, not on the
> demo database; the demo database was not modified by this round.

---

## 1. Observability

### 1.1 Structured request logs (Nginx) — with the correlation id

The site configuration now writes a **JSON access log** with the API's correlation id
and the per-request latency (the API echoes the correlation id in the
`x-correlation-id` response header; Nginx records it via
`$sent_http_x_correlation_id`). Fields: `ts, ip, method, uri, status, bytes,
latency_s, corr_id`. The same log format is in the HTTPS example.

On the VM, after re-running `deploy/azure-vm-install.sh` (or applying the two conf
changes by hand — see the caveat in §6):

```bash
sudo cp deploy/nginx/kaziforce-headers.conf /etc/nginx/kaziforce-headers.conf
sudo cp deploy/nginx/kaziforce.conf /etc/nginx/sites-available/kaziforce   # if certbot has NOT rewritten it
sudo nginx -t && sudo systemctl reload nginx
tail -3 /var/log/nginx/kaziforce.access.log        # one JSON object per request
```

**Known limitation (recorded, not fixed here):** the API's own error lines in
journald (`journalctl -u kaziforce-api`) are single-line console messages, not JSON —
making them fully structured is a server-code change (out of scope for this
deploy/-only round). Request-level structure comes from the Nginx log; error *bodies*
returned to clients carry the `traceId` that matches the access-log `corr_id`.

### 1.2 journald retention

A drop-in caps the journal so a busy demo week cannot fill the OS disk:
`deploy/systemd/journald-retention.conf` → 200 MB on disk, 30-day retention.

```bash
sudo mkdir -p /etc/systemd/journald.conf.d
sudo cp deploy/systemd/journald-retention.conf /etc/systemd/journald.conf.d/kaziforce.conf
sudo systemctl restart systemd-journald
journalctl --disk-usage      # confirm the cap
```

### 1.3 Health check for an external monitor

`GET /api/v1/health` is public, unauthenticated and checks the database round trip
(`{status:'ok', database:'reachable'}`). An external monitor (Azure availability
alerts, UptimeRobot, or any HTTP poller) should:

- poll `https://kaziforce-demo.spaincentral.cloudapp.azure.com/api/v1/health` every
  60 s from outside the VM,
- treat 3 consecutive failures or one ≥ 5-minute outage as an alert,
- optionally poll the SPA root (`200` and body contains `Kaziforce`) separately, so a
  broken static deploy alerts independently of the API.

### 1.4 Metrics to watch (with the exact derivation)

| Metric | Derivation from what exists | Suggested alert threshold (demo) |
|---|---|---|
| 5xx rate | `jq -s '[.[] | select(.status>=500)] | length' < access log slice>` over the JSON lines (Nginx), or `journalctl -u kaziforce-api --since -10min | grep -c 'SYSTEM-001'` | > 5 in 10 minutes |
| p95 latency | From the JSON log's `latency_s` over a window (one-liner below) | > 2 s sustained for 10 min |
| Disk | `df -h /var/backups /` | > 80 % used |
| Memory | `free -m` and `systemctl status kaziforce-api` (`MemoryMax=512M` in the unit) | `free` available < 400 MB |
| Backup freshness | `systemctl list-timers kaziforce-backup.timer` and `ls -lt /var/backups/kaziforce` | newest dump older than 26 h |

p95 derivation (per endpoint, from the JSON log — run on the VM):

```bash
tail -n 5000 /var/log/nginx/kaziforce.access.log \
  | jq -r 'select(.uri | startswith("/api/v1/")) | .latency_s' \
  | sort -n | awk '{a[NR]=$1} END {print "p50:", a[int(NR*0.5)], "p95:", a[int(NR*0.95)]}'
```

(Requires `jq`; `sudo apt-get install -y jq` if absent.)

## 2. Reliability — backups, restore, RTO/RPO

### 2.1 Nightly backup (systemd timer)

Artifacts: `deploy/scripts/backup-database.sh` (custom-format `pg_dump`, integrity
check via `pg_restore --list`, 7-day retention prune), `deploy/systemd/
kaziforce-backup.service` + `.timer` (02:15 UTC nightly, `Persistent=true`, runs as
the `postgres` user over peer auth — no password in unit files).

Fresh installs get this automatically (installer step 10 creates
`/var/backups/kaziforce`, installs the units, enables the timer). On the **existing**
VM, apply once:

```bash
# from the unpacked bundle on the VM
sudo install -d -o postgres -g postgres /var/backups/kaziforce
sudo cp deploy/scripts/backup-database.sh /opt/kaziforce/deploy/scripts/
sudo cp deploy/systemd/kaziforce-backup.service deploy/systemd/kaziforce-backup.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now kaziforce-backup.timer
systemctl list-timers kaziforce-backup.timer     # next run ~02:15 UTC
# force one now and check it:
sudo systemctl start kaziforce-backup.service
sudo journalctl -u kaziforce-backup.service -n 5 --no-pager
sudo ls -lh /var/backups/kaziforce
```

### 2.2 Restore — verification procedure (run this MONTHLY)

Prove a backup is restorable **without touching the live database**:

```bash
sudo bash deploy/scripts/restore-database.sh \
  /var/backups/kaziforce/<newest>.dump kaziforce_restore_test
# → prints audit_log / flags / content_items / users row counts
sudo psql -d kaziforce_restore_test -tA -c "SELECT count(*) FROM audit_log"
sudo psql -c "DROP DATABASE kaziforce_restore_test"
```

Locally verified end-to-end (2026-11-22, perf cluster, 50,001 audit rows): the restore
recreated identical row counts in **3.9 s** (§Verification).

### 2.3 Restore — the real (live) procedure

**Do this only when the database is actually lost or corrupted.** The API must be
stopped so nothing writes during the restore:

```bash
sudo systemctl stop kaziforce-api
sudo psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='kaziforce' AND pid <> pg_backend_pid()"
sudo dropdb kaziforce && sudo createdb -O kaziforce_owner kaziforce
sudo pg_restore --no-owner --no-privileges -d kaziforce /var/backups/kaziforce/<newest>.dump
sudo -u postgres psql -d kaziforce -f /opt/kaziforce/deploy/sql/02_grants.sql   # re-assert the audit_log restriction
sudo systemctl start kaziforce-api
curl -s https://kaziforce-demo.spaincentral.cloudapp.azure.com/api/v1/health
```

The grants step matters: it re-asserts that `kaziforce_app` holds only SELECT+INSERT
on `audit_log` (rule-2 guarantee) — a restore recreates the tables, so the grants must
be re-applied.

### 2.4 RTO / RPO (stated)

- **RPO (recovery point): ≤ 24 h.** The timer dumps nightly at 02:15 UTC with
  `Persistent=true`; the worst case loses everything since the previous night's dump.
  Between backups the append-only audit ledger can be re-exported as CSV for a
  finer-grained record, but the operational database itself has no point-in-time
  recovery (no WAL archiving configured — recorded as a deliberate single-VM trade-off).
- **RTO (recovery time):** database-only restore: **minutes** — measured locally at
  3.9 s for a 3.3 MB / 50 k-row restore (`restore-database.sh`, §Verification); on the
  VM add service restart and the smoke test, so budget ~10 minutes.
  Full-VM loss: **re-provision with `deploy/azure-vm-install.sh` on a fresh VM**
  (the first recorded install is in `docs/draft/evidence/`, but the total wall time
  was not recorded — **[UNVERIFIED]**; the script's own steps are apt + Node + pnpm +
  training + migrations, so budget 20–40 minutes on the 2-vCPU VM).

## 3. SLO — proposal for the demo period (23–27 Nov) — **PROPOSAL, not a commitment**

| Objective | Target | Measured by |
|---|---|---|
| Availability | 99 % of requests during 08:00–22:00 CET get a non-5xx response | Nginx JSON log: 5xx ÷ total per day |
| List-page latency | p95 < 500 ms for `/users`, `/queue`, `/audit` page views | Nginx `latency_s` p95 per day |
| Health | `/api/v1/health` answers 200 within 2 s, 99.5 % of polls | external monitor |
| Durability | a restore-verification succeeds at least once during the period | §2.2 output |

Rationale: the measured baseline (PERFORMANCE.md §3) shows p50 ≤ 22 ms and p99 ≤ 29 ms
for the list endpoints at 50 k rows with a single user — 500 ms leaves a wide margin
while still catching real regressions. Error budget: 99 % over a 5-day demo ≈ 72
minutes of 5xx allowed. The SLO is a proposal because no monitor was running when it
was written and the demo period has no contractual availability requirement.

## 4. Security

### 4.1 Unattended security updates
Fresh installs: enabled by installer step 1 (`systemctl enable --now
unattended-upgrades`). Existing VM:

```bash
sudo apt-get install -y unattended-upgrades
sudo systemctl enable --now unattended-upgrades
cat /etc/apt/apt.conf.d/20auto-upgrades     # should show both lines = "1"
```

### 4.2 SSH brute-force defence: fail2ban or the Azure NSG (pick one)
- **fail2ban (installed by step 1):** the default jail bans an IP after repeated sshd
  failures. Check: `sudo fail2ban-client status sshd`. Customise
  `/etc/fail2ban/jail.local` (`bantime = 1h`, `maxretry = 5`) if wanted.
- **Azure NSG alternative:** restrict port 22 to your own address in the Azure portal
  (VM → Networking → inbound port rule). Trade-off: strongest result (the port is
  invisible to everyone else), but it breaks access when your address changes;
  fail2ban keeps 22 open but punishes guessers. Either is sufficient; the installer
  enables fail2ban and leaves the NSG choice to the operator.

### 4.3 Certificate renewal check
```bash
sudo certbot renew --dry-run        # must end with "Congratulations"-style dry-run success
systemctl list-timers | grep certbot  # certbot's renewal timer is active
```

### 4.4 Secret rotation (runbooks from docs/SECURITY_AUDIT.md §10)
- **JWT secret:** edit `JWT_SECRET` in `/etc/kaziforce/api.env` (generate with
  `openssl rand -base64 48`), `sudo systemctl restart kaziforce-api`. All sessions
  die immediately; operators sign in again. No database change.
- **Database passwords:** `ALTER ROLE kaziforce_app PASSWORD '<new>';` (and
  `kaziforce_owner` if needed) as the owner, then update the matching lines in
  `/etc/kaziforce/api.env` and restart the API. In-flight JWT sessions survive; the
  new password takes effect on the next connection. Also update the local
  `OWNER_DATABASE_URL` notes if any.
- Both rotations are safe to run while the site is up; do them in a maintenance
  minute during the demo period.

## 5. Abuse prevention (edge + application)

- **Edge (new, Nginx):** `limit_req_zone` tables throttle **sign-in** to 10/min per
  client IP (burst 5) and **the CSV export** to 6/min per client IP (burst 2),
  answering **429** at the edge. Rationale: sign-in is the credential gate (spraying
  is throttled before reaching Node), and the export is the heaviest endpoint
  (measured ≈1 s/request at 50 k rows — PERFORMANCE.md §3). These complement the API's
  own in-process limiter (600/5 min per IP) — two independent layers, the edge one
  cheaper and stricter, the application one aware of sessions.
- Human impact check: a demo rehearsal performs a handful of logins per minute — well
  under the burst; the CSV export limit allows one heavy export every 10 s per viewer.
- **Cloudflare (optional, not a requirement):** placing Cloudflare in front adds
  edge DDoS protection, a WAF, and hides the VM address. Trade-offs: the hostname's
  DNS must move to Cloudflare (a demo-day risk if misconfigured), TLS terminates at
  Cloudflare (its own certificate; origin still uses Let's Encrypt), traffic then
  transits a third party (audit data leaves the Azure boundary), and the free tier's
  limits apply. For a single-VM demo behind an Azure NSG + the two rate-limit layers,
  Cloudflare is optional insurance, not a prerequisite.

## 6. Rollback — redeploy a previous commit

The installer is idempotent by design (it reuses `/etc/kaziforce/api.env`, reseeds
nothing that exists, retrains models only if missing). To roll the **application**
back to a previous commit:

```bash
# on the workstation: build the previous commit's bundle exactly as for a deploy
git checkout <previous-commit-sha>
npx --yes pnpm@10.34.3 install && npx --yes pnpm@10.34.3 build && (cd server && npx --yes pnpm@10.34.3 build)
# upload the bundle to the VM as before (scp/rsync the repo folder)
```
```bash
# on the VM: re-run the installer — it reapplies code, systemd, Nginx
sudo DOMAIN=kaziforce-demo.spaincentral.cloudapp.azure.com bash deploy/azure-vm-install.sh 2>&1 | tee ~/rollback.log
curl -s https://kaziforce-demo.spaincentral.cloudapp.azure.com/api/v1/health
```

Caveats: (a) if certbot has rewritten the Nginx site, the installer leaves it
unchanged and prints a note — the new conf's edits (headers include, limit_req, JSON
log) must be re-applied by hand in that case; (b) migrations are one-way — if the
previous commit expects an older schema, restore the matching backup instead (§2.3).

**Duration:** the re-run skips apt, Node, the venv and model training (idempotent);
the remaining work is the bundle upload, the server compile, a systemd restart and an
Nginx reload — on a 2-vCPU VM budget **≈ 5–10 minutes** including the local build.
**[UNVERIFIED]**: no rollback has ever been executed (the recorded install transcript
covers the first install only and records no total duration).

## 7. 10× and 100× traffic

Measured baseline: `docs/PERFORMANCE.md` (50 k-row ledger, 30 s autocannon windows).
Where it breaks first:

1. **10× — the audit CSV export (measured 1,040 ms/request @10 connections, 10 rps)**
   and the model-suggestion fan-out (**3,028 ms p50** with the model up). Ten
   concurrent exports saturate a worker; the suggestion batch serialises 20
   scikit-learn predicts. Both degrade gracefully (429 at the new edge limits; the
   fail-safe text), but users feel them first. Levers per PERFORMANCE.md §7.
2. **100× — the per-request session verification + Node event loop** (the ceiling:
   even `/health` tops out ≈ 2.4–3.0 k rps, PERFORMANCE.md §3) and the **actor-filter
   audit queries** (28.6–48.3 ms, `::text` cast + ILIKE, PERFORMANCE.md §4). Single
   VM, single Node process — at 100× the answer is more processes behind a load
   balancer (the in-memory rate limiter becomes per-process, D-018), not tuning.
3. **Operator-visible symptom chain:** the systemd unit guards (`MemoryMax=512M`) and
   the edge limiter keep the VM alive; what degrades first is latency on the audit
   page, then export failures.

## 8. Not verified

- Everything executed on the VM (all §1–§6 commands, the timer's first real run,
  fail2ban/unattended-upgrades state, certbot renewal, rollback duration) — the
  authoring agent never connects to the VM; the operator runs the runbook.
- `nginx -t` on the VM's own live configuration (locally verified in a container
  against both files; the live file may have been rewritten by certbot).
- Restore against a dump taken on the VM from the production database (locally
  verified against the 50 k-row synthetic database; the procedure is identical).
