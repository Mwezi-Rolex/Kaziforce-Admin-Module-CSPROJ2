# PERFORMANCE.md — measured baseline and applied fixes

Produced on branch `perf/fixes` (2026-11-22). **Method note:** the measurement pass the
task brief assumed (`docs/PERFORMANCE.md` from the earlier perf session) never existed —
that session was interrupted before it ran. This document is therefore self-contained:
the baseline below was measured here first, then three changes were applied and the
**same commands** were re-run. One change (a composite index) was created, measured as a
non-mover, and reverted; it is documented but not committed.

Every number names the command that produced it (quoted in §5). Machine: the
development workstation (Windows 10, Node 22.23.5 via the Node 22 shim, PostgreSQL 18.6).
This is a single-machine local baseline — not a production load test.

## 1. Environment (disposable, isolated from the demo database)

- Disposable PostgreSQL cluster in `%TEMP%/kaziforce-perf-cluster` on `127.0.0.1:5434`
  (initdb + pg_ctl, D-068 pattern), database `kaziforce_perf`, migrations 001–010
  applied as `kaziforce_owner`, `deploy/sql/02_grants.sql` applied, seed fixtures, then
  bulk data added by a throwaway SQL script in the temp directory (outside server/src):
  **audit_log = 50,000 rows, flags = 5,004, content_items = 1,504** (counts from
  `SELECT count(*)`). All tables `VACUUM ANALYZE`d as the owner before measuring.
- API under test: `tsx src/index.ts` on `127.0.0.1:3100` with `DATABASE_URL` pointed at
  the perf database and `RATE_LIMIT_MAX=1000000` — the raised bucket exists so the
  measurement targets the endpoints rather than the limiter (the production limiter at
  600/5 min correctly 429'd the first full-speed run; noted, not a defect).
- Model service NOT running (no endpoint in the battery calls it; noted).

## 2. Baseline (before any change)

**EXPLAIN ANALYZE battery** (identical SQL to the API queries; `EXPLAIN (ANALYZE,
TIMING OFF)`; file quoted in the run):

| # | Query (perf DB) | Baseline |
|---|---|---|
| 1 | queue list — 5,004 flags, `ORDER BY severity-rank DESC, created_at` LIMIT 20 | **5.256 ms** (Seq Scan on flags + top-N heapsort) |
| 2 | queue count | 0.475 ms |
| 3 | audit list, no filter (50,000 rows) | 0.351 ms |
| 4 | audit count, no filter (with the users join, as the code had it) | **3.428 ms** |
| 5 | audit list, `action_type` filter | 0.162 ms |
| 6 | audit count, `action_type` filter (with join) | **13.511 ms** |
| 7 | audit list, `outcome` filter | 0.156 ms |
| 8 | audit export query (LIMIT 10000) | 7.379 ms |
| 9 | users list | 0.222 ms |

**HTTP battery** (`autocannon@7 -c {10,50} -d 10` per endpoint, moderator cookie;
10-second windows — a deliberate reduction from the interrupted session's 30 s plan):

| Endpoint | @10c p50/p90/p99 (ms) | rps | @50c p50/p90/p99 (ms) | rps |
|---|---|---|---|---|
| /health | 1 / 2 / 4 | 2587 | 8 / 12 / 15 | 2732 |
| /users | 1 / 2 / 4 | 2917 | 8 / 12 / 14 | 2958 |
| /moderation/queue | 1 / 2 / 4 | 2824 | 8 / 12 / 13 | 2985 |
| /audit | 1 / 2 / 4 | 2986 | 8 / 11 / 13 | 3028 |
| /audit/export.csv | 1 / 2 / 4 | 2981 | 8 / 12 / 13 | 2979 |

Reading: throughput tops out at ≈2.6–3.0 k rps **regardless of endpoint — including
`/health`, which runs no page queries**. The ceiling is per-request overhead (the
session re-verification queries + Node event loop), not any single list query. At this
scale the list endpoints are not the HTTP bottleneck.

**Bundle** (`pnpm build`): single JS chunk **387.98 kB / 117.16 kB gzip**, loaded
whole on every navigation.

## 3. Changes applied (three) and measured effect

### Change 1 — indexes (migration `010_perf_indexes.sql`)
- `flags_sevrank_created_idx` — expression index on
  `(CASE severity WHEN 'High' THEN 3 WHEN 'Medium' THEN 2 ELSE 1 END) DESC, created_at ASC`,
  matching the queue's ORDER BY exactly. **Queue list: 5.256 → 0.332 ms** (after-battery
  run; a mid-round run read 0.612 ms — same order of magnitude, warm-cache variance).
  The planner switches from Seq Scan + top-N heapsort to an index scan.
- `audit_log_outcome_created_idx` — `(outcome, created_at DESC, id DESC)`.
  **Outcome-filtered count: 15.842 → 1.343 ms** (measured by SQL probe with the join
  elision of change 2 in place).
- **Reverted (non-mover):** a third candidate `(action_type, created_at DESC, id DESC)`
  was created, measured, and dropped: the action-filtered count was 13.511 → 5.161 ms
  with the index but **0.773 ms without it once change 2 landed**, and with change 2
  alone it read 0.552 ms using the pre-existing single-column
  `audit_log_action_idx` (migration 004). The composite added nothing over the
  existing index, so it was reverted and never committed.

### Change 2 — audit count join elision (`server/src/routes/audit.ts`)
The count query's `LEFT JOIN users` exists only for the actor filter; when no actor
filter is set the join is skipped. Measured by SQL probe:
- no-filter count: 3.428 (joined) → **3.004 ms** (join-less) — small, real;
- action-filtered count: 13.511 (joined) → **0.552 ms** (join-less, migration-004
  index) — ~24×.

### Change 3 — route-level code splitting (`src/App.tsx`)
Console screens load on demand (`React.lazy` + Suspense; landing/login stay eager).
`pnpm build` after: entry **357.71 kB / 110.88 kB gzip** + per-page chunks
(UsersPage 10.25 kB, QueuePage 9.59 kB, AuditPage 4.45 kB, SettingsPage 4.79 kB,
DashboardPage 2.77 kB raw). **Initial JS: 387.98 → 357.71 kB (−30.3 kB raw, −6.3 kB
gzip, ≈ −7.8 % raw)**, and each console screen's code is fetched only when visited.

## 4. What did not move (recorded honestly)

- **HTTP throughput at the measured scale** did not visibly improve: the after-battery
  read 2.7–3.0 k rps vs the 2.6–3.0 k baseline — within run-to-run variance, and the
  after-run is uniformly slightly LOWER including untouched `/health` (−5–8 %), i.e.
  machine noise dominates. The per-query wins above are real and deterministic
  (EXPLAIN/SQL probes), but at ~3 k rps the ceiling is the per-request session
  re-verification round trips + Node event loop, not the list queries. The honest
  conclusion: the indexes and the join elision buy headroom (they matter when the
  filtered audit page is slow or the table grows), not a visible rps jump at 50 k rows.
  A next-round candidate targeting the measured ceiling: collapse
  `requireAuth`'s two per-request queries (session + permissions) into one round trip —
  not applied here (it rewrites auth middleware; the three chosen changes were lower-risk).
- `/audit/export.csv` end-to-end ≈ list cost (7.4–7.8 ms SQL for 10 k rows + serialisation).

## 5. Commands (identical before and after)

```text
# EXPLAIN battery (identical SQL file, both runs)
psql -h 127.0.0.1 -p 5434 -U kaziforce_app -d kaziforce_perf -f explain-baseline.sql
# HTTP battery (10 s per endpoint, autocannon@7 via npx, -c 10 and -c 50, Cookie header)
node autocannon-battery.mjs
# Bundle
npx --yes pnpm@10.34.3 build
# Bulk data + counts
psql -f bulk-perf.sql   (50,000 audit / 5,004 flags / 1,504 content_items; VACUUM ANALYZE as owner)
```

Scripts live in the temp directory (outside the repository). The disposable cluster is
stopped after the run; nothing on the demo database changed except migration 010
(two indexes — see below).

## 6. Deployment note

`010_perf_indexes.sql` is part of the normal migration set: `npm run migrate` applies
it to the demo/production database. Grants were re-checked after migrating:
`kaziforce_app` on `audit_log` = `["INSERT","SELECT"]` (unchanged), and the two indexes
exist on the demo database. Indexes only add write cost to rare operator actions
(audit INSERTs, flag decisions); the immutability guarantees are untouched.
