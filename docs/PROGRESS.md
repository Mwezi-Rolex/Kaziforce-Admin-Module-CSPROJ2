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
