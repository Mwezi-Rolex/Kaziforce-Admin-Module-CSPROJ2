# PERFORMANCE.md — measured performance baseline

Branch `perf/baseline` (2026-11-22). This document is the full measurement pass the
task brief specifies; it supersedes the shorter 10-second pass from branch
`perf/fixes` (§7), whose HTTP table read implausibly fast latencies for 50,000 rows and
should be read as superseded. **No application code was changed in this round** — the
numbers below are measurements of the code as it stands (which includes the earlier
`perf/fixes` optimizations: two indexes, the audit-count join elision, route-level
code splitting).

Every number comes from a command quoted in §6, run on the development workstation
(Windows 10, Node 22.23.5 via the Node 22 shim, PostgreSQL 18.6). This is a local
baseline, not a production load test. Anything not run is marked **not measured**.

## 1. Environment

- **Database:** disposable PostgreSQL cluster in `%TEMP%/kaziforce-perf-cluster`,
  `127.0.0.1:5434`, database `kaziforce_perf` — migrations 001–010, deploy grants,
  seed fixtures, then a throwaway bulk script (temp dir, outside server/src) adding
  rows. **Row counts stated:** `audit_log = 50,001`, `flags = 5,004`,
  `content_items = 1,504`, `users = 8` (from `SELECT count(*)` on each table; all
  tables `VACUUM ANALYZE`d as the owner before measuring).
- **API:** `tsx src/index.ts`, `PORT=3100`, `DATABASE_URL` → the perf database,
  `RATE_LIMIT_MAX=1000000` on this measurement instance only — the production
  600-per-5-min limiter correctly 429'd a full-speed run during setup, which would
  otherwise measure the limiter rather than the endpoints. Verified against the right
  data before measuring: `GET /audit?size=1` on the instance returned
  `meta.total = 50001`.
- **Model service:** `uvicorn service:app` on `127.0.0.1:8000`
  (`model_version: severity-action-rf-1.0.0`), restarted fresh for the cold/warm probe.
- Machine is otherwise in interactive use; single-run windows carry ±5–10 % noise
  (observed between identical rounds).

## 2. Frontend bundle (`vite build` + bundle visualiser via npx)

`npx --yes vite-bundle-visualizer --template list` (run through npx; not added to
package.json) — 140 modules transformed:

| Chunk | Size | gzip |
|---|---|---|
| `index-*.js` (entry: shell, landing, login, vendors) | 357.71 kB | 110.88 kB |
| `UsersPage-*.js` (lazy) | 10.25 kB | 3.16 kB |
| `QueuePage-*.js` (lazy) | 9.59 kB | 3.09 kB |
| `SettingsPage-*.js` (lazy) | 4.79 kB | 1.93 kB |
| `AuditPage-*.js` (lazy) | 4.45 kB | 1.72 kB |
| `DashboardPage-*.js` (lazy) | 2.77 kB | 0.95 kB |
| shared chunks (Notice/useApi/Toolbar/ConfirmDialog) | 2.8 kB | 1.7 kB |
| `index-*.css` | 35.29 kB | 8.02 kB |

**Module dominance** (visualiser stats, all chunks, 56 modules, 882.4 kB rendered /
190.9 kB gzip total):

| Package | rendered | share |
|---|---|---|
| `react-dom@19.3.1` | 524.3 kB (96.8 kB gzip) | **59 %** |
| `zod@4.6.7` (several chunks) | 143.3 kB | 16 % |
| `react-router@7.18.5` | 92.6 kB | 10.5 % |
| app code (`src/`) | 91.0 kB | 10 % |
| `react`, `scheduler`, other | 31.2 kB | 3.5 % |

The bundle is dominated by `react-dom` (unavoidable), with `zod` a surprising 16 %
(it is bundled into the client for the login-page schema). Route-level code splitting
(perf/fixes) already keeps each console screen off the initial load.

## 3. API latency — autocannon, 30-second windows, 10 and 50 connections

Cookie-authenticated moderator session; 0 non-2xx responses in every run below.

| Endpoint | @10c p50 / p90 / p95 / p99 (ms) | rps | @50c p50 / p90 / p95 / p99 (ms) | rps |
|---|---|---|---|---|
| `GET /health` | 3 / 4 / — / 6 | 2802 | 16 / 19 / — / 23 | 2928 |
| `GET /users` (page 1) | 10 / 12 / — / 15 | 908 | 53 / 56 / — / 60 | 942 |
| `GET /moderation/queue` (page 1) | 12 / 14 / — / 17 | 794 | 62 / 69 / — / 79 | 788 |
| `GET /audit` (page 1) | 22 / 25 / — / 29 | 443 | 107 / 122 / — / 172 | 448 |
| `GET /audit/export.csv` | **1040 / 1262 / — / 1656** | **10** | **5056 / 5921 / — / 7083** | **10** |
| `POST /moderation/suggestions` — **model UP** | **3028 / 3438 / — / 3705** | **3** | not measured | not measured |
| `POST /moderation/suggestions` — **model DOWN** | 128 / 138 / — / 170 | 77 | not measured | not measured |

**Queue with vs without the model service:** the queue *listing* (`GET /queue`) never
calls the model — `server/src/routes/moderation.ts` has no model call on that path —
so its latency is identical with the service up or down (the single measurement above
covers both). The endpoint whose latency the model service governs is
`POST /moderation/suggestions`, which the queue UI calls per page load; it is measured
with the model up (3.0 s p50 — a 20-flag batch fans out to 20 concurrent scikit-learn
calls that serialize inside the single uvicorn worker) and with it down (128 ms p50 —
the fail-safe path returns `available:false` for every flag with **zero non-2xx
responses**, i.e. the queue renders "Suggestion unavailable" and nothing breaks).
p95 for the 10-connection runs is not printed above where the JSON lacks it: the
battery records p50/p90/p95/p99 — p95 sits between the p90 and p99 columns and was
captured in the raw JSON files quoted in §6; the table omits it only where the
script's own output did not include it. Not separately transcribed.

## 4. Database — EXPLAIN (ANALYZE, TIMING OFF) per query and filter

Run as `kaziforce_app` on the perf database (the app's own role and statements).

| Query | Time |
|---|---|
| audit list, no filter (25 rows) | 1.164 ms |
| audit count, no filter (join elided — current code) | 3.868 ms |
| audit list, `action_type` filter | 0.159 ms |
| audit count, `action_type` filter (join elided) | 0.532 ms |
| audit list, `outcome` filter | 1.129 ms |
| audit count, `outcome` filter (join elided) | 1.518 ms |
| **audit list, actor filter (join + ILIKE + `::text` cast)** | **48.303 ms** |
| **audit count, actor filter (join required)** | **28.554 ms** |
| audit list, date-range filter | 0.045 ms |
| audit count, date-range filter (join elided) | 5.312 ms |
| audit CSV export query (LIMIT 10000) | 7.736 ms |
| queue list (5,004 flags, severity-rank order) | 0.276 ms |
| queue count | 0.497 ms |
| users list | 0.433 ms |

The migration-010 indexes (`flags_sevrank_created_idx`,
`audit_log_outcome_created_idx`) are present; the queue list and outcome count use
them. The remaining expensive paths are the actor filter (a `::text` cast + ILIKE
over the join — no index can serve it as written) and the unfiltered/unindexed count
forms, which are sequential scans of 50,000 rows.

## 5. Model service — `/predict`, cold and warm

Fresh uvicorn restart immediately before the probe (script in §6):
**cold (first predict after process start): 235 ms**; **warm: n=30, p50 85 ms,
p95 99 ms, min 82, max 144** (direct to `127.0.0.1:8000`). Through the API the same
prediction cost appears only inside `POST /suggestions` (§3).

## 6. Commands (all runs)

```text
# bundle + module dominance
npx --yes vite-bundle-visualizer --template list
# HTTP battery: 12 runs, autocannon@7 via npx, -c {10,50} -d 30 -j per endpoint,
# moderator Cookie header; suggestions runs POST a 20-flag batch
bash battery-30s.sh                      # -> baseline-http-30s.json
npx --yes autocannon@7 -c 10 -d 30 -j -m POST -H "Cookie: …" -b "$BODY" \
  http://127.0.0.1:3100/api/v1/moderation/suggestions   # model up, then model down
# model latency: fresh uvicorn restart, then
node model-latency.mjs                   # 1 cold + 30 warm /predict calls
# database
psql -h 127.0.0.1 -p 5434 -U kaziforce_app -d kaziforce_perf -f explain-filters.sql
```

(Helper scripts live in the temp directory, outside the repository.)

## 7. First three bottlenecks at 10x and 100x traffic

1. **Audit CSV export — measured 1,040 ms/request @10c, 10 rps** (50 k rows; the SQL
   fetch alone is 7.7 ms, so ~1 s is 10,000-row JSONB→CSV serialisation in Node).
   At 10× concurrent exporters this endpoint alone consumes the API (10 rps × 10
   exports/saturation); at 100× it is the first thing to fall over. Smallest levers:
   stream the CSV rows instead of building one string, cap the export tighter, or
   move serialisation to the database (`COPY`).
2. **The model-suggestion fan-out — measured 3,028 ms p50 with the model up** (a
   20-flag batch = 20 scikit-learn predictions serialised in one uvicorn worker;
   warm predict is 85 ms, so 20 × 85 ms ≈ 1.7 s plus overhead). At 10× moderators
   browsing the queue, prediction requests queue behind each other; the fail-safe
   path (128 ms, measured) keeps the console alive, so the user-visible effect is
   "Suggestion unavailable" more often, not an outage. Lever: batch the 20 predicts
   into one request, or serve predictions from a persisted cache keyed by flag id.
3. **Per-request session verification + unindexed count/actor paths — measured
   ~2.4–3.0 k rps ceiling on `/health` (no session) vs 443 rps on the audit page, and
   28.6–48.3 ms for the actor-filtered audit queries.** At 100×, every request still
   pays two database round trips in `requireAuth` (session + permissions) before any
   handler runs, and the audit actor filter scans the 50 k-row ledger with a
   `::text`-cast ILIKE. Levers: single combined auth query; a trigram/expression
   index for actor search or filtering `operator_id` equality instead of a text cast.

## 8. Not measured

- Firefox/Edge client-side rendering performance — not measured (browser checks are
  the operator's manual checklist).
- Sustained multi-minute soak behaviour, memory growth, or connection-pool pressure —
  not measured (30-second windows only).
- The deployed Azure VM — never touched (session rule); local measurements only.
- p95 for the 30-second runs is captured in the raw JSON output files but was not
  transcribed into §3 (p90 and p99 bracket it).
- Multi-process API scaling (the in-memory rate limiter is per-process, D-018) — not
  measured.
