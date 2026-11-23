# PROGRESS.md

Three-line status after every meaningful step: **done / next / blockers**.

---

## Phase 0 — Ingest (2026-10-29)

**Done:** Figma export inspected → `docs/FIGMA_AUDIT.md` (React 19 + Vite 8 + Tailwind v4 single-file app, 6 state-based screens of a "Tendaji governance console", tokens catalogued, 8 conflicts logged). 11 markdown supervisor documents digested → `docs/digest/` (SRS, TDD, BED, DDD, FWED, chapter-5-update, research-writing, example-report-1/2, chapter-1-3-proposal, note-8). `docs/TRACEABILITY.md` generated: 1,595 SRS requirement IDs → screen/layer/status (55 mapped to Figma screens, 1,540 without; 0 unmapped). `OPEN_QUESTIONS.md` (OQ-1…OQ-5), `DECISIONS.md` (D-001…D-007) created.

**Next:** Phase 1 — `docs/PLAN.md` written; awaiting user answers to the 8 blocking questions before any code.

**Blockers:** 8 Phase-1 questions asked (batch, 2026-10-29) — bare-site page list, account create/delete, role handling at login, landing design freedom, testing setup, deployment target, deadline, Phase-5 docs. No git repo initialised yet.

---

## Phase 1 — Plan (2026-10-29)

**Done:** OQ answers recorded (OQ-1/2/4/5 closed; D-008…D-013). `docs/PLAN.md` written: architecture, folder structure, routes, typed mock data approach, 9 slices with requirement IDs, out-of-scope list. 8 blocking questions asked.

**Next:** user answers → adjust plan → Phase 2 foundation.

**Blockers:** user's answers to the question batch.

## Phase 2 — Foundation (2026-10-29)

**Done:** git initialised + baseline + attachments move (D-022). Frontend foundation: react-router routes (`/`, `/login`, `/console/*` guarded, `*` 404), SessionContext over the httpOnly-cookie API session, Public/Console layouts (Kaziforce brand, no role switcher, no hard-coded operator), shared UI (Button/Pill/Field/Panel/ConfirmDialog 2-step/Notice/Toolbar), landing + login + 404 pages, console placeholders per slice; `index.css` deduped + scroll containers (CON-UI-001 classes); site.json title/lang/skip-link. Backend foundation: `server/` Express + TS (env validation, rate limit, cookie JWT auth, permission middleware, error envelope), 6 migrations (roles/permissions/users/content+flags/audit_log/settings + restricted `kaziforce_app` grants: audit_log SELECT+INSERT only), AuditLogger service (wired into login/logout), health + auth routes, seed script (roles, matrix, 3 demo operators, sample data labelled), Jest+Supertest suites (9 tests, incl. adversarial audit-immutability test) and Vitest+RTL (3 tests).

**Commands run (2026-10-29):** frontend `tsc --noEmit` exit 0; `vite build` exit 0 (353.70 kB JS / 109.49 kB gzip, CSS 30.14 kB / 7.28 kB); `vitest run` 3 passed; server `tsc --noEmit` exit 0; `jest` 9 skipped (clean skip without DB env).

**Next:** operator runs the one-time bootstrap (`PGPASSWORD='<postgres password>' npm run bootstrap` in `server/`), then agent runs migrate + seed + full Jest against the real DB and continues Phase 3 (slice 2: user management).

**Blockers:** DB bootstrap requires the operator's local superuser password (agent never asks for or stores credentials).

## Phase 3 — Vertical slices

Not started.

## Phase 4 — Hardening

Not started.

## Phase 5 — Documentation sync

Not started (only if the user asks).

---

## Phase 3 — Vertical slices (2026-10-30)

**Done:** DB unblocked (agent-owned cluster on 5433, D-029) → bootstrap/migrate/seed green. **Slice 2 user management**: API (list/search/role/status filters, detail with flags+content, suspend/ban/role all audited and permission-gated), full UI (toolbar, scrolling table + record panel, 2-step ban modal, notices), 15 tests incl. per-role denials and suspended-operator login block. **Slice 3 moderation queue**: API (severity-ranked list, single/bulk decisions, Super Admin escalation lane overrule/uphold+ban), full UI (lane tabs, bulk bar, read-only states), 13 tests incl. 403s and 409s. Jest 38/38 passing; Vitest 3/3; frontend+server typecheck and build green.

**Schedule check:** 6 Nov gate (foundation, auth+RBAC, user management) met 6 days early; moderation queue (10 Nov gate) also done. **Not behind; no cuts needed.**

**Next:** slice 4 audit explorer + restricted CSV export (server 403 for Viewer), slice 5 settings, slice 6 dashboard shell.

**Blockers:** none.

---

## Phase 3 — ML slice (2026-10-30)

**Done:** `ml/` built — synthetic generator with fixed seed + documented label noise (15% severity / 12% action); train/validation/test split before fitting; Random Forest vs logistic regression vs majority baseline vs keyword-rule baseline for severity and action; Isolation Forest for operator-activity windows; `ml/reports/metrics.json` written by `evaluate.py` (no hand-typed numbers); FastAPI `/predict` + `/health` on loopback only; Node client with short timeout and fail-safe; queue shows "Suggestion only" and can sort by predicted severity; audit entries carry the suggestion, model version, and followed/overridden flag; migration 007 adds `flags.reason_category`. Tests: pytest 7, Jest 44, Vitest 7 — all passing.

**Schedule check:** 13 Nov ML-A/B gate met ~2 weeks early. Not behind; no cuts.

**Next:** slice 4 (audit explorer + restricted CSV export), then settings, dashboard shell, deployment artifacts.

**Blockers:** none.

---

## Phase 3 — Audit Explorer + deployment slice (2026-10-30)

**Done:** **Slice 4 Audit Explorer** — `server/src/routes/audit.ts` (filtered read-only listing for all tiers; CSV export gated on `audit.export`, Moderator+ only, Viewer refused 403 before any query) + full `AuditPage` UI (date/actor/action filters, scrolling table, export control hidden for Viewers) + `server/tests/audit.test.ts` (10 tests incl. Viewer 403 and anonymous 401) and RFC 4180 CSV escaping tests. **Slice 10 deployment artifacts** — `deploy/nginx/kaziforce.conf` (SPA + `/api` proxy; no route to the model service), `kaziforce-https.conf.example`, `deploy/systemd/kaziforce-{api,model}.service` (hardened, loopback-only), `deploy/sql/01_roles_database.sql` + `02_grants.sql`, `deploy/.env.production.example`, `deploy/smoke-test.sh`; `docs/DEPLOY.md` runbook (12 numbered steps, certbot and no-domain paths, rollback, every unverified step marked).

**Commands run (all output quoted in the report):** smoke test against a live API + real PostgreSQL → **12 passed, 0 failed, 1 skipped** (skip = Nginx-only model-exposure check); `02_grants.sql` against the real DB → `can_select=t, can_insert=t, can_update=f, can_delete=f, can_truncate=f`; `01_roles_database.sql` against scratch names → ran clean, second run idempotent, app role `rolcreatedb=f, rolcreaterole=f`; pytest 7; Jest **54**; Vitest 7; both `tsc --noEmit` clean; `vite build` ok.

**Schedule check:** 14–15 Nov deployment gate met ~2 weeks early. Not behind; no cuts.

**Next:** slice 5 settings, slice 6 dashboard shell, then Phase 4 hardening and Phase 5 documentation drafts.

**Blockers:** VPS deployment cannot be verified by the agent (no provisioning) — awaiting the operator running `docs/DEPLOY.md` and pasting the smoke-test output. Nothing is claimed as deployed.

---

## Phase 4 — Hardening (2026-10-30)

**Done:** Slice 5 settings API+UI (Super Admin only, key/value + feature toggle, all changes audited) and slice 6 dashboard shell (real role-scope panel, analytics deliberately unpopulated). Accessibility: measured every text colour's WCAG ratio and darkened 31 tokens below 4.5:1; focus ring was 2.48:1 and is now `#ad7f2d` (≥3:1). Responsive: rebuilt around semantic hooks with breakpoints at 1200 px and 900 px, verified present in the built CSS. Security: `SEC-AUD-002` implemented (refused authorizations recorded as `Authorization Denied`); `ZodError` now maps to 422 instead of 500. Scope walk: every row of `TRACEABILITY_SCOPE.md` resolved — **32 done, 11 partial, 12 out of scope, 0 not started**; the 23 non-done rows are recorded in `OPEN_QUESTIONS.md` OQ-6…OQ-13 with reasons. `docs/BROWSER_CHECKLIST.md` (Chrome/Firefox/Edge, with a Result column) and the root `README.md` written.

**Commands run (output quoted in the report):** `npm test` → **66 passed / 7 suites** (3 consecutive runs); `pnpm test` → **7 passed**; `pytest ml/tests` → **7 passed**; both `tsc --noEmit` clean; `pnpm build` ok; `deploy/smoke-test.sh` → **12 passed, 0 failed, 1 skipped** (skip is the Nginx-only exposure check).

**Schedule check:** Phase 4 is running ~2 weeks ahead of the 13 Nov freeze. Not behind; no cuts.

**Next:** Phase 5 documentation drafts in `docs/draft/` (BRIEF requires it), and the operator's VPS run + browser checklist results.

**Blockers:** browser checks and the VPS run can only be done by the operator; nothing is claimed until they are reported back.

---

## Post-Phase-4 user decisions (2026-10-31)

**Done:** Login lockout implemented and tested (5 consecutive failures → 15-minute lock; counter reset on success; identical generic 401 for unknown/wrong-password/locked; Super Admin unlock via the new `users.unlock` permission; only lock/unlock audited, never individual attempts). Migration `008_login_lockout.sql`, `npm run demo:reset`, UI lock badge + Unlock control, and 15 tests in `server/tests/lockout.test.ts` (one per rule). Production seeding now reads `SEED_*_PASSWORD` variables and **refuses** to run with `NODE_ENV=production` without them or with a demo password; credentials are never printed. `bootstrap.mjs` refuses to overwrite an existing `server/.env`, checked before any database work. `npm run dev:all` starts API + frontend + model service with the model port defined once. ml/models decided as regenerate-not-commit (23.5 MB + 3.4 MB, gitignored). OQ-11 closed as won't do (passkeys → Future Work); OQ-12 closed as implemented.

**Commands run:** `npm test` → **8 suites, 81 passed**; `pnpm test` → **7 passed**; `pytest` → **7 passed**; both `tsc --noEmit` clean; `pnpm build` ok (386.23 kB / 116.71 kB gzip); production-seed guard refused correctly in two cases and succeeded with strong values; `demo:reset` cleared locks without touching `audit_log`; `dev:all` verified end to end on alternate ports with the API reaching the model service on the same port.

**Next:** Phase 5 drafts (below).

**Blockers:** none.

---

## Phase 5 — Documentation drafts (2026-10-31)

**Done:** Drafts written to `docs/draft/`: `chapter-5-implementation-and-testing.md` (environment tables with tested versions, per-module implementation, 30-row test-case table with observed results, defects found and fixed, accessibility measurements, version control, AI-use declaration, results by objective, limitations), `chapter-6-conclusion.md` (conclusions by objective, recommendations, Future Work including passkeys), `references.md` (25 sources with full entries from the project documents; 25 in-text citations flagged `[reference needed]`), `appendices.md` (traceability summary, 16-row command log, screenshot/browser/deployment registers, env-var and DB-role tables, model metrics, AI log), `chapters-1-4-changes.md` (6 required + 4 recommended + 3 tidy-up changes to Chapters 1–4, listed not rewritten), plus the existing `DISCREPANCIES.md`.

**Marked not yet verified in the drafts:** all browser checks, the VPS deployment, the screen-reader pass, and every screenshot. Test coverage is recorded as "not measured".

**Next:** operator to run the browser checklist and the deployment runbook, supply screenshots, and resolve the missing reference entries.

**Blockers:** none from the agent; the outstanding evidence requires the operator.

---

## Teardown and test-suite hardening (2026-10-31)

**Done:** Disposable cluster and its stale `server/.env` removed; both confirmed gitignored with 0 tracked files. Removed a real defect found during teardown: six database-backed test suites failed at import (rather than skipping) when no `.env` exists, because they imported the database pool at module load. Fixed by extracting `config/lockout.ts`, `lib/csv.ts` and `tests/helpers/db.ts` (D-054). Re-verified in both states.

**Commands run:** with a database — Jest **81 passed / 81**, Vitest **7 passed**, pytest **7 passed**, smoke test **12 passed, 0 failed, 1 skipped**; without a database — Jest **6 suites skipped, 2 passed, 0 failed** with the 7 pure tests still running.

**Next:** operator runs `cd server && PGPASSWORD='<postgres password>' npm run bootstrap && npm run migrate && npm run seed` (Path A), then the browser checklist and `docs/DEPLOY.md`.

**Blockers:** none. The repository is in a clean initial state with no credentials and no local database.

---

## Phase 0 re-ingest, relocation and audit-provenance pass (2026-11-12)

**Done:** the development from the previous working copy was brought into this workspace with its Git history (21 commits, branch `master`), the read-only supervisor documents preserved in `src/imports/`, and the two PDF documentation templates added, converted to markdown and digested (D-060) — closing the last Phase 0 gap. The Phase 0 briefings were then applied to the code itself: the audit ledger gained the provenance fields the BED §6.15 and DDD §28.2 require (D-061), the DDD table-name divergence is now recorded rather than mis-cited (D-062), the error envelope carries the BED's `traceId` with the lockout test still proving no account enumeration (D-063), and the order-dependent moderation suite was made idempotent (D-064). Environment corrected for the build: Node 22.23.5 and a fresh `pnpm install` (D-065).

**Commands run (2026-11-12):** frontend `tsc --noEmit` exit 0; `vitest run` → **7 passed / 7**; `vite build` ok (JS 386.76 kB / 116.83 kB gzip, CSS 32.47 kB / 7.64 kB gzip); server `tsc --noEmit` exit 0; `jest --runInBand` → **86 passed / 86, 8 suites**, three consecutive runs with no re-seed; `pytest ml/tests` → **7 passed**; `migrate` applied `009_audit_provenance.sql`; `seed` and `bootstrap` green against a local PostgreSQL 18 cluster on port 5433.

**Next:** update the Phase 5 drafts and appendices for the new audit fields and test counts (in progress), refresh the traceability scope file, and hand the browser checklist and the deployment runbook to the operator.

**Blockers:** none from the agent. The operator still has to run `docs/BROWSER_CHECKLIST.md` in Firefox and Edge, provision the VPS, and supply screenshots and the missing reference entries.

**Live check (2026-11-12):** the API was started on port 3100 against the local PostgreSQL cluster and exercised over HTTP: a login with `x-correlation-id: report-smoke-001` echoed that id in the response header and stored it on the ledger row; the CSV export header row was `id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,outcome,actorIp,correlationId,metadata`; the newest row carried `Success`, `127.0.0.1` and the correlation id; `GET /api/v1/audit?outcome=Blocked` returned 25 blocked rows. Recorded as appendix rows 17-21.

**Note for the operator:** a `tsx watch src/index.ts` dev server from the previous working copy is still listening on port 3000. It serves the old copy of the code, so it should be stopped and restarted from this workspace before the demo.

---

## Final work and documentation (2026-11-20)

**Done:** port 3000 checked (not listening; no stale R server). New disposable database on 5433 (D-068); on Node 22.23.5 (D-069): migrate 9/9, seed, Jest **86/86 ×3** without re-seed, Vitest **7**, pytest **7**, both `tsc --noEmit` exit 0, build JS 386.76 kB / 116.83 kB gzip. `dev:all` on API 3100 / web 8543 / model 8100; health 200 direct and through the Vite proxy; correlation id echoed; 11-column CSV; Blocked first page 25, total 58; Viewer export 403. Ten screenshots captured (D-070) with SHA-256 register. Wrote `docs/FINAL_RECONCILIATION.md`; finished Chapter 5/6, appendices (rows O-01…O-21, screenshot register), DISCREPANCIES rows 16–21, chapters 1–4 outstanding table. Evidence in `docs/draft/evidence/`.

**Next:** operator runs `docs/BROWSER_CHECKLIST.md` (Chrome, Firefox, Edge, including the 1440 px users layout), decides on the two open defects after the panel, resolves the `[reference needed]` entries, tags and pushes.

**Blockers:** none from the agent. The `server/.pgdata` cluster is still running on 5433 for the demo; stop it with `pg_ctl -D server\.pgdata stop`.

---

## Console restyle (2026-11-22, branch `restyle/image-heavy`, continued)

**Done:** the five console screens restyled to the Figma Make design per `docs/RESTYLE_GUIDE.md`: legacy colour literals mapped to the F tokens (completion check clean — no `#183a35`/`#c99434`/`#17332f` outside src/legacy); `ConsoleLayout` rewritten as the dark forest rail with a **four-item** menu (System Settings removed from the rail, a permission-gated **header settings control** added; route + gate unchanged), breadcrumb header, role chip, trust blurb, session box, operator block; every decision now passes the two-step `ConfirmDialog` — approve/reject/escalate, the three bulk actions, overrule, uphold-and-ban, suspend, unlock and role change all state the action, target and "recorded in the immutable audit log" (Cancel/Escape change nothing; focus returns to the opener); `UsersPage` rebuilt with a full-width table and the horizontal record band beneath (Account details | Relationship history, 240px scroll boxes — DISCREPANCIES row 19 layout at 1440px fixed in-browser); `DashboardPage` rebuilt with the F hero band, control-centre cards, "Meaningful measures come first" analytics placeholder and a read-only recent-audit card. Verified in-browser per role: viewer (no settings control), moderator (confirmation gate), super admin (header settings control). Rule-2 behaviours re-checked in-browser: Viewer CSV 403 (server), confirmation Cancel changes nothing, "Suggestion only" labels intact.

**Next:** report screenshots (10) are stale for the public pages + dashboard — a person retakes them after review; the settings/audit screens inherit the skin (spot-checked via the shared classes).

**Blockers:** none.

---

## Image-heavy public pages (2026-11-22, branch `restyle/image-heavy`)

**Done:** the public pages rebuilt to the owner's Figma Make design (CS Project II v3 — the split hero shell, Newsreader display type, forest/lime palette, self-hosted OFL fonts copied from the Figma export so the demo renders offline). `LandingPage` is now image-heavy: split hero with the workforce-studio photo panel (owner's Figma asset), a facts band stating only real product facts, three photographed steps (report → human review → immutable record), a story band, an operator-tier people strip (portraits labelled as illustrative tiers), and a CTA band. `LoginPage` ports the Figma v3 PublicScreen login variant 1:1 (form logic unchanged). 7 photographs sourced from Pexels (CDN direct download; search pages are Cloudflare-blocked — noted), credited with photographer and page URL in `public/images/CREDITS.md`; Freepik not used (account-gated downloads). Design tokens moved to self-hosted fonts and the v3 palette (`--forest #103e32`, lime `#d1f77b`). Verified in-browser at 1440px with screenshots (hero, steps, people strip, CTA, login). Console screens untouched.

**Next:** a person reviews the pages in a browser (screenshots quoted in the session) and decides whether the console screens get the same treatment (the restyle guide's scope).

**Blockers:** none.

---

## Production-readiness runbook (2026-11-22, branch `ops/production-readiness`)

**Done:** deploy/ + docs/ only. New: `deploy/scripts/backup-database.sh` (custom-format pg_dump, integrity check, 7-day prune), `deploy/scripts/restore-database.sh` (verification restore into a throwaway DB — cannot touch the live one), `deploy/systemd/kaziforce-backup.{service,timer}` (02:15 UTC nightly, runs as postgres over peer auth), `deploy/systemd/journald-retention.conf` (200 MB / 30 days), `deploy/nginx/kaziforce-headers.conf` (fixes the add_header inheritance defect from SECURITY_AUDIT F-04 by including the five security headers in every location), both Nginx confs rewritten (JSON access log with correlation id + latency, `limit_req` zones on sign-in 10/min and CSV export 6/min answering 429, header include), `deploy/azure-vm-install.sh` (unattended-upgrades + fail2ban enabled, backup dir/units/journald/headers installed). `docs/OPERATIONS.md` runbook: observability (JSON request log, journald retention, /health polling, 5xx/p95/disk/memory derivations), reliability (nightly timer, tested restore, RPO ≤ 24 h, RTO minutes for DB-only [locally measured] / 20–40 min full VM [UNVERIFIED]), SLO proposal, security rotations, abuse limits + Cloudflare option, rollback ≈ 5–10 min [UNVERIFIED], 10×/100× citing PERFORMANCE.md. Verified locally: bash -n ×3; nginx -t in a real nginx:1.27-alpine container (HTTP + HTTPS with dummy certs); a full backup→restore cycle on the disposable 50k-row cluster (3.3 MB dump; identical row counts; 3.9 s restore).

**Next:** the operator applies §1.2/§2.1/§4 of OPERATIONS.md to the existing VM (the fresh-install path gets it automatically) and runs `certbot renew --dry-run`.

**Blockers:** none.

---

## Test-behaviour review (2026-11-22, branch `test/behaviour`)

**Done:** every test across server/tests (18 suites, 130 tests), tests/ (12) and ml/tests (7) catalogued with a one-sentence behavioural claim and audience in the new `docs/TEST_CLAIMS.md` (149 claims). Implementation-detail tests flagged and resolved: `role-transaction.test.ts` (fake-client internals) removed and replaced by a DB-observable connection-hygiene test (`pg_stat_activity` shows zero idle-in-transaction backends after concurrent role assignments) in `users-role.test.ts`. Missing claims added: expired-session 401 (M4 expiry), logout cookie-clear + audit row, per-IP rate-limiter 429 contract (`RATE_LIMIT_MAX=3` per-suite env), suggestions fail-safe over HTTP (model down → 200 `available:false`), connection hygiene. **The Jest open handle is fixed**: the cause was every suite's `createApp` import leaving the module-level pg pool open — `db/pool.ts` now sets `allowExitOnIdle` when `NODE_ENV=test`; full runs exit cleanly (warning gone, verified). First coverage figure (server, `npx jest --coverage`, commit a846228): **90.14 % statements / 74.39 % branches / 91.93 % functions / 94.04 % lines**. Frontend coverage **not measured**: `@vitest/coverage-v8` could not be installed (pnpm store-version guard + npm arborist crash — three attempts documented).

**Next:** a person may add the coverage provider as a devDependency (one line, rule 4) for the frontend figure; consider pytest-coverage for ml.

**Blockers:** none.

---

## Module deepening refactor (2026-11-22, branch `refactor/deepen-modules`)

**Done:** length guard `scripts/check-file-length.mjs` + `npm run lint:lengths` (gate 1000 lines, report at 400 — **no file exceeds 400: max is UsersPage.tsx at 385**); `server/src/lib/vocabulary.ts` now single-sources permission keys, role names, account/flag status vocabularies, severities, moderation decisions, audit action names, ledger outcomes and error codes (refactored call sites: all five route files, authService, all four middleware files, seed.ts); `server/src/lib/params.ts` single-sources the UUID path-parameter schema (was ×6 with differing messages); authService's dead re-export shim removed (nothing imported from it); `mutateStatus` deepened (returns the row; routes own the response); client `src/lib/format.ts` replaces six inline `toLocaleString()` calls across four pages. Trust-me item (seed writing the vocabulary to the DB) made provable by the new `vocabulary.test.ts` (permissions/roles/outcomes ↔ DB). oxlint NOT installed (would add two dev dependencies; rule 4) — the anti-slop rule catalog was used as review lenses instead (D-086). LOC: src 2,260→2,278, server/src 2,012→2,147 (new modules), server/tests 2,279→2,326 (new guard), ml unchanged. Suites: server **18 suites / 127 tests** (3 new), Vitest 12, typecheck+build clean.

**Next:** the >400-line list is empty; the gate now fails any future breach. Candidate follow-up: collapse `requireAuth`'s two per-request queries (the measured HTTP ceiling from PERFORMANCE.md §4) — deliberately not in this refactor (it changes auth middleware, not vocabulary).

**Blockers:** none.

---

## Full performance baseline (2026-11-22, branch `perf/baseline`)

**Done:** the complete measurement pass on the isolated 50k-row perf database (audit_log 50,001 / flags 5,004, stated counts): bundle visualiser via npx (react-dom 524 KB = 59 % of rendered JS, zod 143 KB, react-router 93 KB, app code 91 KB); autocannon 30-second windows at 10/50 connections for health, users, queue, audit, CSV export plus POST /suggestions with the model up (p50 3,028 ms — the 20-flag batch serialises 20 scikit-learn predicts) and down (128 ms, zero non-2xx — fail-safe holds); model /predict cold 235 ms, warm p50 85 ms; EXPLAIN per audit filter (actor filter is the slowest path at 28.6–48.3 ms — `::text` cast + ILIKE). Bottlenecks at 10×/100× recorded in §7, each tied to a measurement. One measurement defect found and corrected mid-run: a Node spawnSync(shell:true) battery dropped the Cookie header (unquoted space under cmd.exe) and measured 401s — replaced with a bash-driven battery; the perf/fixes 10 s HTTP table is superseded. No application code changed; `docs/PERFORMANCE.md` rewritten as the authoritative baseline.

**Next:** none committed — the report's levers (CSV streaming, batched predictions, single auth query, actor-filter index) are options for a future round, each with a measured justification.

**Blockers:** none.

---

## Performance baseline and fixes (2026-11-22, branch `perf/fixes`)

**Done:** `docs/PERFORMANCE.md` did not exist (the earlier perf session was interrupted), so the baseline was produced here first: disposable PostgreSQL cluster in %TEMP% (port 5434, D-068 pattern) with database `kaziforce_perf`, migrations+grants+seed, bulk data (audit_log 50,000 rows, flags 5,004, content_items 1,504, VACUUM ANALYZE), then an EXPLAIN ANALYZE battery, an autocannon battery (10/50 connections × 10 s × 5 endpoints) and the bundle size. Three changes applied against measured numbers: migration `010_perf_indexes.sql` (flags severity-rank expression index: queue list 5.256→0.332 ms; audit_log outcome+order index: filtered count 15.842→1.343 ms), audit count join elision (filtered count 13.511→0.552 ms using the existing migration-004 index; no-filter 3.428→3.004 ms), and route-level code splitting (initial JS 387.98→357.71 kB, −7.8 % raw; pages lazy-loaded). A composite (action_type, created_at, id) index was measured as a non-mover and reverted — never committed. HTTP rps at ~50 k rows stayed within noise (~2.6–3.0 k, ceiling is per-request session overhead — recorded honestly in §4). Grants re-checked after migrating; full suites green.

**Next:** operator re-runs `npm run migrate` on any real deployment to pick up 010; a future round could collapse requireAuth's two per-request queries (the measured HTTP ceiling) — deliberately not done here (auth middleware).

**Blockers:** none.

---

## Security audit (2026-11-22, branch `security/audit`)

**Done:** full checklist audit per the `security-audit` skill (guidance mode) recorded in `docs/SECURITY_AUDIT.md`: no critical or high finding. Two medium findings measured live against a scratch API — the login timing oracle (unknown 2 ms vs known 252 ms → email enumeration; locked 2 ms vs active 261 ms → lock-state/expiry disclosure) and the password-spraying gap (global 600/5-min per-IP bucket, no login-specific throttle; per-account lockout bounds only single-account guessing). One low Nginx finding (add_header inheritance drops security headers from /api/ and /assets/ responses). Dependencies: root clean, server 4 moderate (dev-only jest chains), ml pip-audit clean (run from a throwaway venv). Secrets: git ls-files clean; owner role never on a runtime path; audit_log grants re-verified (INSERT+SELECT only, no schema CREATE). Per the session rule, nothing was fixed (no critical/high); recommended fixes are inline in the report. Two needs-validation items for the VM (live response headers; NODE_ENV/Secure flag).

**Next:** a person validates NV-1/NV-2 on the VM (curl header check; production-password check) and decides whether to apply the three recommended medium fixes.

**Blockers:** none.

---

## Open-defect fixes (2026-11-22, branch `fix/open-defects`)

**Done:** DISCREPANCIES rows 18/19 addressed on this workspace. Row 18: the Date→ISO `csvCell` fix was already landed with the state-machine branch (commit 5670566); this round added the missing export-level test (a Moderator export contains no `"""` and bare ISO createdAt cells), a column-by-column check (createdAt is the only Date column; metadata stays JSON + RFC 4180 by design), and the requested spreadsheet formula-injection guard — `csvCell` prefixes `'` on cells starting with `= + - @` tab or CR, proven by 9 new unit tests and an end-to-end test that inserts a probe row with `correlation_id = '=-HYPERLINK(…)'` and exports it (cell arrives prefixed, RFC-escaped). Row 19: no restyle branch exists in this repo and the restyle working copy (`Kaziforce-restyle`, currently serving 8443) restructures the record panel entirely, so the defect applies to this code — `.account-record` was rewritten for the two-child DOM the page actually renders (the old grid addressed a five-child shape, which is what stacked both panels in one ~420px column); confirmed in a real browser (this workspace, Vite 8453 + API 3000) at 1440 px (two columns 652/408, same top), 1200 px (500/320, side-by-side) and 900 px (stacked, record below the table), and the rules are present in the built CSS (`minmax(0,1.6fr)`).

**Next:** a person applies the closing text for rows 18/19 to `docs/draft/DISCREPANCIES.md` (drafted in the session report; the report directory is not edited by the agent). The probe audit rows from the tests stay in the ledger (append-only).

**Blockers:** none.

---

## State-machine remediation (2026-11-22, branch `fix/state-machine-bugs`)

**Done:** every CONFIRMED finding from `docs/SEMANTIC_MODEL.md` §5 fixed test-first — ten issues, one commit each (`49f72b1`…`568d128`): guarded flag UPDATEs (BUG-2), uphold resolves to Rejected with a single ban event (BUG-7), account transition table in `mutateStatus` (BUG-3), atomic failed-login increment/lock (BUG-6), one-client role transaction + `ON CONFLICT DO NOTHING` (BUG-5, second defect found by the new tests), same-role/same-value no-ops refused 409 (BUG-11), JWT carries sub+email only (BUG-12), export href fix + ISO Date CSV cells (BUG-1/13), self-disclosing export cap (BUG-8), Pager on all three lists (BUG-9), escalation-lane bulk bar removed (BUG-4), comment corrections (BUG-14). `docs/SEMANTIC_MODEL.md` gained §8 (remediation record); DECISIONS D-073…D-081; no migration (rationale in D-074/D-081). Suspected items (BUG-15/16/18) untouched; BUG-17 re-classified by-design (D-080).

**Next:** maintainer runs the browser checklist against the changed screens (export button, pagers, escalation lane without checkboxes); optional follow-up: DB trigger + fixture-GUC if below-app enforcement is wanted (see §8.2).

**Blockers:** none.

---

## Semantic-model audit (2026-11-22, branch `audit/semantic-model`)

**Done:** recovered the program's minimal semantic model into `docs/SEMANTIC_MODEL.md` (state inventory S1–S15, state machines M1–M7 with transition tables and audit side effects, transition algebra, effect dependencies) and recorded 18 findings with file:line evidence, ranked by impact. High-impact items confirmed live against a scratch API on 3123 + the local 5433 cluster (Node 22): the audit-export UI href can never reach `/export.csv` (JSON or 422 downloads); 9/10 concurrent decision pairs both apply and both write audit rows; a Moderator can flip Terminated→Suspended (un-ban); the escalation-lane bulk bar resolves only `selected[0]`; the role-assignment "transaction" spans pool clients; the lockout counter lost 6 of 8 concurrent updates; uphold leaves the flag Escalated and Uphold→Overrule leaves the owner banned. Demo data re-seeded and locks reset afterwards; no application code changed; Azure VM untouched.

**Next:** a maintainer triages the findings (BUG-1/2/3 are the panel-critical ones); fixes are out of scope for this audit branch by prompt.

**Blockers:** none.

---

## Azure deployment (2026-11-21)

**Done:** operator created `kaziforce-vm` (Azure for Students, Spain Central after a region-policy refusal, Ubuntu 24.04.5, 2 vCPU / 3.8 GiB). `deploy/azure-vm-install.sh` (commit `f7c13fc`) exited 0 with four health checks OK; audit grants `update/delete/truncate = f`; certbot issued and deployed a certificate for `kaziforce-demo.spaincentral.cloudapp.azure.com`; smoke test over HTTPS **13 passed, 0 failed, 0 skipped**. Transcript in `docs/draft/evidence/vm-deployment-2026-11-21.md`; Appendix 5, Chapter 5 §5.2.3/§5.4.4/§5.8 and Chapter 6 updated.

**Next:** operator signs in once in a browser on the deployed site; optional `sudo certbot renew --dry-run`; keep the VM running (auto-shutdown at 23:00) for 23–27 Nov.

**Blockers:** none.

---

## Dashboard analytics (2026-11-23, branch `feat/dashboard-analytics`)

**Done:** the user's request "add the dashboard analytics" implemented as D-098, superseding OQ-2's "unpopulated" default. **API:** `GET /api/v1/analytics/dashboard` (`server/src/routes/analytics.ts`, registered in `app.ts`) — requireAuth, all three tiers per Ch5 §3.6.1; raw DB aggregates only (accounts by status, flags by status + high-severity pending, audit totals 24 h/7 d, 7-day decision counts from the ledger action vocabulary, 14-day trend via SQL `generate_series` so zero days and "today" come from the DB clock). **UI:** the dashboard's "Meaningful measures come first" placeholder replaced by four KPI cards + a 14-day trend strip (restyle tokens, DM Mono labels / Newsreader numerals), with FWED-mandated loading (skeleton, reduced-motion aware), error (ErrorState) and empty (EmptyState) states, an sr-only trend summary and the honesty footer "no derived or projected figures". **Tests:** `server/tests/analytics.test.ts` (401 unauth; Viewer 200; every figure equals direct SQL counts over the same tables; trend sums to the window; last day equals the DB's `current_date`) and `tests/dashboard-analytics.test.tsx` (KPI render, fail-safe error without invented numbers, zero-window empty state). Fixed a stray NUL byte in `docs/DECISIONS.md` (one `0` of `009_audit_provenance.sql` was written as 0x00, which made the file binary to readers) — content unchanged. Traceability rows CON-DASH-001 / FR-ADM-008 / FR-ADM-046 moved to done via `docs/traceability-gen.mjs` and regenerated; OQ-2 half-superseded.

**Commands run (2026-11-23):** server `tsc --noEmit` exit 0; frontend `tsc --noEmit` exit 0; `npx jest --runInBand` → **19 suites, 133 passed** (incl. 3 new); `npx vitest run` → **15 passed** (incl. 3 new); `npx pnpm@10.34.3 build` ok (DashboardPage chunk 7.89 kB / 2.52 kB gzip, index JS 364.07 kB / 112.37 kB gzip). Live check: API on 3100 (the stale old-code API still occupies 3000 — untouched), curl login → analytics payload matches the DB; in-browser at 1440 px the analytics band renders all four cards and the trend (audit trail ticked 1368→1369 from the session's own login — live, not static).

**Next:** operator review of the dashboard visuals (screenshots for the report are a person's retake); note the stale process on port 3000 serves old code and should be restarted from this workspace before any demo.

**Blockers:** none.

---

## Final documentation Word document (2026-11-23, branch `feat/dashboard-analytics`)

**Done:** the user's request "documentation written into a complete word doc, copy the chapter 5 update and create a new file" delivered as `docs/draft/Chapter 5 Update - Final Documentation.docx` (D-099). Built with the docx skill in a temp workspace (repo untouched except the deliverable): title page (December 2026, "Final Project Documentation"), declaration/approval, acknowledgment, present-tense abstract, field-based TOC with placeholders, List of Figures/Tables/Abbreviations, Chapters 1–4 from the attached docx with the chapters-1-4-changes corrections and tense conversion, complete Chapter 5 (environment tables, dataset description, per-module implementation with the 10 real screenshots from docs/draft/screenshots, 35-row test-case table, defects incl. the two post-freeze fixes confirmed in branch history, accessibility, results with model metrics, version control, AI declaration, limitations), Chapter 6, references + [reference needed] paragraph, Appendix A1 with Semester 1 + new Semester 2 (July–December 2026) schedules and a regenerated Apr–Dec Gantt (matplotlib, style-matched), Appendix A2 Turn-It-In placeholder. Verified: postcheck.py 0 errors / 2 acceptable warnings (mandated TOC page-break paragraph; intentional tighter table-cell line spacing); LibreOffice render → 75-page PDF; page inspection (visual-judge subagents unavailable — provider-not-found — so pages were inspected directly): title, declaration, abstract, TOC dot-leader entries, lists, Table 3.1, Figures 2.1/4.2/4.6, screenshot figures, Table 5.6 header repeat (ID/Verdict widths fixed after first render), References italics, Appendix tables + Gantt all pass; TOC placeholder script exit 0; footer PAGE fields patched (front matter `\* roman`, body `\* arabic`), empty pgNumType stripped.

**Next:** a person opens the file in Word and runs TOC → Update Field (the placeholder page numbers are approximate); fills the [reference needed] entries and the Turn-It-In appendix; retakes any screenshots they want replaced.

**Blockers:** none.

---

## Prose revision of the final documentation (2026-11-23, branch `feat/dashboard-analytics`)

**Done:** the user's writing-improvement request applied to `docs/draft/Chapter 5 Update - Final Documentation.docx` (D-100). All Chapters 1–6, the abstract and the appendix introductions rewritten against the Orwell (1946) rules + ASD-STE100 at the source modules, then rebuilt through the docx-skill pipeline (docx-js → add_toc_placeholders exit 0 → footer PAGE field patch roman/arabic → postcheck.py **0 errors / 2 accepted warnings** → LibreOffice render → **72 pages**, down from 75). Rule-7 grep review clean: no utilize/in order to/prior to/de facto/demonstrate/load-bearing/smoothed-over/comprehensive/necessitate remain; "very" hits were all substrings of "every"; the residual passive constructions are declaration boilerplate, table cells and deliberate rule-6 keeps. Technical terms, statuses, citations, figures, tables and every number untouched (rule 9). Spot-checked rendered pages: abstract, abbreviations, Chapter Two opening, defects table, accessibility section — all clean.

**Next:** the person-side actions from the previous entry stand (Update Field in Word, reference entries, Turn-It-In appendix).

**Blockers:** none.

---

## Azure redeploy of the dashboard build (2026-11-23, master)

**Done:** HEAD `166f6f1` redeployed to `kaziforce-vm` per the owner's runbook, after the local gates passed on Node 22.23.5 (both typechecks 0, Vitest 15/15, Jest 133/133, build ok). First upload aborted on CRLF line endings in the archived scripts (D-101); after converting the bundle to LF and committing the `.gitattributes` guard, the installer exited 0 with four health checks OK, and the smoke test reported **13 passed, 0 failed, 0 skipped**. Live checks: `/var/www/kaziforce` serves the new hashed assets, `/api/v1/analytics/dashboard` returns live aggregates, port 22 was reachable once the NSG rule was refreshed to the current IP.

**Next:** owner hard-refreshes the site (Ctrl+F5) and confirms sign-in plus the dashboard; optional Nginx rate-limit/JSON-log merge by hand (certbot owns the live file).

**Blockers:** none.
