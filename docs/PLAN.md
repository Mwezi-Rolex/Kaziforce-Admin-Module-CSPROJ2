# PLAN.md — Phase 1, updated after BRIEF.md confirmation (2026-10-29)

Scope decisions D-008…D-014 plus the Phase-1 question answers (D-015…) recorded in `docs/DECISIONS.md`. BRIEF.md outranks supervisor documents where they conflict (overrides logged). In-scope requirement rows live in `docs/TRACEABILITY_SCOPE.md`.

## 0. Schedule (backwards from BRIEF.md; agent works to these gates)

| Date | Gate |
|---|---|
| by 6 Nov | Foundation, authentication + RBAC, user management |
| by 10 Nov | Moderation queue, audit log, settings |
| by 13 Nov | ML component A (and B if time). **Feature freeze end of 13 Nov** |
| 14–15 Nov | Deployment artifacts; user provisions + runs smoke test |
| 14–19 Nov | Documentation drafts (chapters drafted as slices complete, final pass) |
| 20 Nov | Submit. Demo/panel 23–27 Nov |

**Cut line (in order):** ML B → extra dashboard content → frontend component tests → Firefox/Edge checks. **Never cut:** role enforcement, audit immutability tests, ML A, deployment runbook, documentation.

## 1. Target architecture

**SPA + API + PostgreSQL, deployed as artifacts.** Vite + React 19 + TypeScript + Tailwind v4 (export tokens); Node.js + Express + TypeScript API (`server/`); PostgreSQL; JWT (httpOnly cookie) + bcrypt; Jest + Supertest for the API, Vitest + RTL for frontend services/components; Python 3 + scikit-learn + FastAPI model service (`ml/`) for ML A/B.

```
Browser (SPA: public shell + governance console)
└── Express API  /api/v1/*   (middleware: auth verify → rate limit → RBAC permission → handler)
    ├── PostgreSQL  (owner role runs migrations; app role has restricted grants — audit_log is SELECT+INSERT only)
    └── AuditLogger (every state-changing endpoint calls it; INSERT-only)
Model service (FastAPI, slices 9–10): POST suggestion per flag; fails safe ("Suggestion unavailable")
Deployment: build artifacts + Nginx runbook for Azure VPS (user provisions; agent never touches credentials)
```

- **Auth:** login → bcrypt verify → JWT (HS256, `sub/email/role/permissions/jti/exp`) set as httpOnly SameSite=Lax cookie; `GET /api/v1/auth/me` restores the session; role + permissions always read from the verified token server-side. Deviation from BED RS256 logged (D-017). No tokens in localStorage.
- **RBAC:** permission matrix seeded in DB (`roles`, `permissions`, `role_permissions`, `user_roles` per DDD/Note-8 ERD); `requirePermission(...)` middleware; console UI mirrors it (hide what the role lacks).
- **Audit:** `audit_log` INSERT-only; app DB role gets no UPDATE/DELETE grant; adversarial Jest test asserts the denial (CON-AUD-004, never-cut).
- **Data:** types shared conceptually with DDD shapes; UUID PKs via `gen_random_uuid()`; unique user email; soft-delete flag; UTC timestamps default now().
- **ML (slices 9–10, reserved):** FastAPI service predicts severity + suggested action + confidence per flag (Random Forest vs logistic regression vs baselines, synthetic seeded data, metrics only from `ml/reports/metrics.json`); suggestion-only UI; fails safe. B (Isolation Forest operator anomaly score) is stretch/first cut.
- **Name:** product name in UI is **Kaziforce** everywhere ("Tendaji" removed); prose/docs say "the industry partner"/"the platform".

## 2. Folder structure

```
src/                        (frontend, Vite)
  app/router.tsx, providers/SessionContext.tsx, layouts/{ConsoleLayout,PublicLayout}.tsx
  components/ui/            (Button, Pill, ConfirmDialog, Field, Select, Toolbar, DataTable, Toast, EmptyState, ErrorState, Panel)
  features/{landing,auth,dashboard,users,moderation,audit,settings}/
  lib/                      (api client, format, csv)
  legacy/ExportApp.tsx      (original Figma export, preserved unwired)
server/                     (Express + TS)
  src/{index,app}.ts, config/env.ts, db/{pool,migrate}.ts, migrations/*.sql,
  middleware/{auth,requirePermission,rateLimit,errorEnvelope}.ts,
  services/{auditLogger,authService}.ts, routes/{health,auth}.ts, seed/seed.ts
  tests/                    (Jest + Supertest)
ml/                         (slices 9–10: data generation, training, FastAPI service, reports/)
reference/attachments/      (misfiled docs moved out of src/)
docs/, docs/digest/, docs/draft/ (Phase 5)
```

## 3. Route & page list

| Route | Page | Access |
|---|---|---|
| `/` | Landing (minimal, export tokens, Kaziforce brand) | public |
| `/login` | Login (real API auth) | public |
| `*` | 404 | public |
| `/console` → `/console/dashboard` | Dashboard (shell, metrics pending) | any operator |
| `/console/users` | User Control Centre | any operator; actions role-gated |
| `/console/queue` | Moderation Queue (+ escalation lane) | any operator; decisions Moderator+ |
| `/console/audit` | Audit Explorer (+ CSV export for Moderator+) | any operator (read) |
| `/console/settings` | System Settings | **Super Admin only** |

## 4. Data approach

Real PostgreSQL behind the Express API (BRIEF: backend in scope). Migrations create the DDD-derived schema; a migration/owner role owns the schema; the application role (`kaziforce_app`) has only the grants it needs — **SELECT+INSERT (no UPDATE/DELETE) on `audit_log`**, plus sequence usage where identity columns are used. Seed script inserts the three roles + permission matrix, three demo operators (bcrypt-hashed credentials), and sample users/flags/content/settings labelled as sample data. The frontend talks to `/api/v1/*` through one typed client; BED envelope on every response.

## 5. Slice order (updated with ML + deployment; IDs in TRACEABILITY_SCOPE.md)

| # | Slice | Target date | Scope |
|---|---|---|---|
| 0 | Foundation: git, tokens, router, layouts, shared UI, landing/login/404, protected routes, server skeleton, env, migrations, DB roles, AuditLogger, seed | 6 Nov | CON-WEB-001/002, CON-AUTH-001/002, CON-AUD-001 scaffold, NFR-ACC baseline, FR-EXT-008 |
| 1 | Authentication + RBAC end-to-end (API login/me/logout, guards, permission matrix, role tests) | 6 Nov | CON-AUTH-003, CON-RBAC-001, SEC-AUTH-001/002, SEC-AUTZ-001…003 |
| 2 | User management (table, filters, record panel w/ scrolling lists, suspend/role/ban, all audited) | 6 Nov | CON-USR-001…006 |
| 3 | Moderation queue (severity ordering, filters, single + bulk decisions, escalation lane) | 10 Nov | CON-MOD-001…004 |
| 4 | Audit log explorer (filters, pagination, CSV export w/ server 403 for Viewer) | 10 Nov | CON-AUD-002/003, FR-ADM-032…039, SEC-AUD-001…007 |
| 5 | System settings (Super Admin, key/value + toggle, audited) | 10 Nov | CON-SET-001/002 |
| 6 | Dashboard shell (unpopulated analytics) | 10 Nov | CON-DASH-001, FR-ADM-008/046 |
| 7 | Scroll-panel pass across all list panels | 10 Nov | CON-UI-001 |
| 8 | **ML A** (synthetic data gen w/ fixed seed + label noise, RF vs logreg vs baselines, FastAPI suggestion service, suggestion-only UI, fail-safe) | 13 Nov | CON-ML-A-001 + AGENTS ML rules |
| 9 | **ML B** (Isolation Forest operator anomaly score) — stretch, first to cut | 13 Nov | CON-ML-B-001 |
| 10 | Deployment artifacts + Nginx runbook (no provisioning) | 14–15 Nov | CON-DEP-001 |
| 11 | Hardening (a11y pass, error states, responsive, README) | ongoing → 19 Nov | NFR-ACC-001…006, FR-ERR-004 |
| 12 | Phase 5 documentation drafts in `docs/draft/` (per example-report structure; DISCREPANCIES.md) | 14–19 Nov | BRIEF documentation section |

## 6. Out of scope (with reasons)

| Excluded | Reason |
|---|---|
| All SRS platform modules outside the console (1,540 IDs) | BRIEF scope: Admin & Moderation console only |
| ML beyond components A and B; any autonomous model action | BRIEF ML scope; AGENTS ML rules: model never changes state, human decides |
| Account create/delete | BRIEF: view/search/filter/suspend/ban/assign-role only (Figma export wins over Ch5 "account CRUD" — discrepancy logged) |
| MFA/SSO/OAuth, registration, password reset | Ch5 auth = email+password only; operators seeded |
| Mobile/PWA, offline sync, i18n | Ch5 §1.5.3 delimitations; English-only |
| Cloud provisioning (VPS, domain, HTTPS) | BRIEF: none exist; agent prepares artifacts + runbook only |
| Real-time collaboration, WebSockets | No console requirement; REST polling unnecessary at demo scale |

## 7. Placeholders & discretionary items (BRIEF requires this list)

- Settings keys/toggles stay "[Key not specified]"-style placeholders (CON-SET-002) — no document names them.
- Dashboard shows no fabricated KPIs (CON-DASH-001).
- JWT HS256 instead of BED RS256/ES256 (D-017); single-node in-memory rate limiter instead of Redis (D-018); `bcryptjs` instead of native `bcrypt` (D-019) — all logged with reasons.
- Seeded demo data is synthetic and labelled "sample data" in seed comments (NDA constraint).
- Landing page copy is original, minimal, token-only (no Figma screen existed).
