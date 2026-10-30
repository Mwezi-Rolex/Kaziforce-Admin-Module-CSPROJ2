# Kaziforce — Admin & Moderation console

A web-based **Admin and Moderation System** for a digital workforce marketplace:
role-based operator access, a human-in-the-loop content moderation queue with a
suggestion-only ML model, an append-only audit ledger, and a settings console,
wrapped in a minimal public site (landing, login, 404).

> **Scope honesty.** This repository implements the **Admin & Moderation console
> subset** of the platform documented in `src/imports/`. It is not the whole
> platform. The in-scope requirements and their status are in
> `docs/TRACEABILITY_SCOPE.md`; the full platform SRS (1,595 IDs) is archived in
> `docs/TRACEABILITY.md`, of which 55 are in scope and 1,540 are out of scope.

## Contents

| Area | Path | Stack |
|---|---|---|
| Frontend | `src/` | Vite + React 19 + TypeScript + Tailwind v4 |
| API | `server/` | Node.js + Express + TypeScript + PostgreSQL |
| Model service | `ml/` | Python 3 + scikit-learn + FastAPI |
| Deployment | `deploy/`, `docs/DEPLOY.md` | Nginx + systemd on Ubuntu |
| Docs | `docs/` | Audit, plan, digests, traceability, runbook |

---

## 1. Prerequisites

| Tool | Version used | Notes |
|---|---|---|
| Node.js | 20.x LTS (tested on 20.15) | API and frontend |
| pnpm | 10.x (`npx pnpm@10` works) | The repo has `pnpm-lock.yaml`. npm also works. |
| PostgreSQL | 16+ (tested on 18) | Local server on port 5432 |
| Python | 3.12 | Model service only |
| `psql` | matching the server | Needed for the role setup and the smoke test |

Everything except PostgreSQL and Python is installed by the package manager of
your choice. No cloud account is required to run this locally.

---

## 2. Database setup — **two roles, deliberately different**

The ledger's immutability depends on the application role **not** being able to
modify `audit_log`. Two roles are therefore required:

| Role | Purpose | Privileges |
|---|---|---|
| `kaziforce_owner` | owns the schema; runs migrations and the seed | full DDL on the schema |
| `kaziforce_app` | the running API | `SELECT/INSERT/UPDATE/DELETE` on working tables; **`SELECT` + `INSERT` only on `audit_log`** |

### Option A — scripted (recommended)

```bash
cd server
PGPASSWORD='<your postgres superuser password>' npm run bootstrap
npm run migrate
npm run seed
```

`bootstrap` generates random passwords for both roles, creates the database, and
writes `server/.env` (gitignored). It never stores your superuser password.
The generated passwords are printed nowhere — they live only in `server/.env`.

### Option B — manual SQL

```bash
# as a superuser
psql -v ON_ERROR_STOP=1 -f deploy/sql/01_roles_database.sql   # edit the CHANGE_ME passwords first
psql "$OWNER_DATABASE_URL" -v ON_ERROR_STOP=1 -f deploy/sql/02_grants.sql
cd server && npm run migrate && npm run seed
```

### Verify the roles are right

```bash
psql "$DATABASE_URL" -c "SELECT has_table_privilege('kaziforce_app','audit_log','SELECT') AS sel, has_table_privilege('kaziforce_app','audit_log','UPDATE') AS upd, has_table_privilege('kaziforce_app','audit_log','DELETE') AS del;"
# expected: sel = t, upd = f, del = f
```

If `upd` or `del` is `t`, the immutability guarantee is broken — re-run
`deploy/sql/02_grants.sql`.

---

## 3. Environment variables

Copy `server/.env.example` to `server/.env` (or let `npm run bootstrap` write it).

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | `kaziforce_app` connection (runtime, restricted) |
| `OWNER_DATABASE_URL` | for migrate/seed | `kaziforce_owner` connection |
| `JWT_SECRET` | yes | signs the session cookie. Min 16 chars; use `openssl rand -base64 48` |
| `PORT` | no (default 3000) | API port |
| `NODE_ENV` | no | `production` sets the `Secure` cookie flag |
| `TRUST_PROXY` | behind Nginx | set to `1` so the rate limiter sees real client IPs |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` | no | defaults 600 / 300000 |
| `MODEL_SERVICE_URL` | no | default `http://127.0.0.1:8000` |
| `MODEL_TIMEOUT_MS` | no | default 800 — the queue never waits longer than this |

No secrets are committed. `server/.env` is gitignored; `deploy/.env.production.example`
is the production template.

---

## 4. Running it

Four terminals, or fewer if you skip the model service.

```bash
# 1. API  (http://localhost:3000)
cd server && npm run dev

# 2. Frontend  (http://localhost:8443 — Vite proxies /api to the API)
pnpm dev

# 3. Model service, optional  (http://127.0.0.1:8000, loopback only)
cd ml
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt     # Windows
# .venv/bin/python -m pip install -r requirements.txt       # Linux/macOS
.venv/Scripts/python generate_data.py
.venv/Scripts/python train.py
.venv/Scripts/python anomaly.py
.venv/Scripts/python evaluate.py
.venv/Scripts/python -m uvicorn service:app --host 127.0.0.1 --port 8000
```

Open `http://localhost:8443`. Sign in with a seeded operator (printed by
`npm run seed`):

| Role | Email | Password |
|---|---|---|
| Viewer | `viewer@kaziforce.local` | `ViewerDemo!2026` |
| Moderator | `moderator@kaziforce.local` | `ModeratorDemo!2026` |
| Super Admin | `superadmin@kaziforce.local` | `SuperDemo!2026` |

**The model service is optional.** Stop it and the console keeps working; flag
suggestions read "Suggestion unavailable". That fail-safe is intentional and
tested.

---

## 5. Testing

```bash
# Frontend (Vitest + React Testing Library)
pnpm test

# API (Jest + Supertest) — requires a seeded database, because it exercises
# role denials, audit writes and database-level immutability
cd server && npm test

# Model service (pytest) — no database needed
ml/.venv/Scripts/python -m pytest ml/tests -q
```

Type checking and build:

```bash
pnpm typecheck            # frontend
cd server && npm run typecheck
pnpm build                # production frontend bundle
```

Deployment smoke test (needs a running stack):

```bash
BASE_URL=http://127.0.0.1:3000 APP_DATABASE_URL="$DATABASE_URL" deploy/smoke-test.sh
```

Coverage is **not measured** unless you run it yourself with
`--coverage`; no coverage figure is claimed anywhere in this repo.

---

## 6. Retraining and using the model

Everything under `ml/` is deterministic given the seed in `ml/generate_data.py`:

```bash
.venv/Scripts/python generate_data.py   # synthetic data, fixed seed, documented label noise
.venv/Scripts/python train.py           # splits first, then fits RF / logreg / baselines
.venv/Scripts/python anomaly.py         # Isolation Forest over operator windows
.venv/Scripts/python evaluate.py        # writes ml/reports/metrics.json
```

**Every metric in `ml/reports/metrics.json` measures fit to the synthetic
generator, not real-world moderation performance.** Live platform data is under
NDA and was never used. See `ml/README.md` for the assumptions, the noise rates
and the known limitations.

The model only ever suggests. A sorting rule and a human decision are always
required; the audit entry records the model version and whether the operator
followed or overrode the suggestion.

---

## 7. Deployment

See `docs/DEPLOY.md` — numbered steps for a fresh Ubuntu VPS with Nginx, HTTPS
via certbot (and what to do without a domain), a rollback procedure, and an
explicit list of what remains unverified because it cannot be tested without a
provisioned server.

## 8. Verifying the UI by hand

`docs/BROWSER_CHECKLIST.md` has step-by-step checks for Chrome, Firefox and Edge
with a Result column to fill in.

## 9. Project state

- `docs/PROGRESS.md` — what is done, next, blocked
- `docs/DECISIONS.md` — every decision and deviation, with reasons
- `docs/OPEN_QUESTIONS.md` — what the documents do not answer, with defaults
- `docs/PLAN.md` — architecture, slices, schedule and cut line
- `docs/TRACEABILITY_SCOPE.md` — in-scope requirements and their status
