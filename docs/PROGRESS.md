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
