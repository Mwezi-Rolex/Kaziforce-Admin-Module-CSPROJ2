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

## 0. Clone

```bash
git clone https://github.com/Samuel-M-M/Test-repo-csprojii.git
cd Test-repo-csprojii
```

**Local-only files.** The partner's source documents are confidential and are
deliberately **not in this repository**. The following are gitignored and must
be supplied locally by whoever has access to them:

| Path | What it is | Who needs it |
|---|---|---|
| `src/imports/` | the partner's engineering documents (SRS, TDD, BED, DDD, FWED) and the project documentation | anyone editing requirements or docs |
| `docs/digest/` | one-page digests of those documents | working from the digests instead of the originals |
| `docs/TRACEABILITY.md` | full SRS requirement archive | requirement traceability work |
| `reference/` | reference copies of the proposal and design diagrams | design reference |

The application code, tests, deployment artifacts and project state files
(`docs/PROGRESS.md`, `docs/DECISIONS.md`, `docs/PLAN.md`) are complete without
them: nothing in `server/`, `src/`, `ml/` or `deploy/` reads from those folders
at build or run time.

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
| Node.js | 20.x LTS (tested on 20.15) | API and frontend. Vite 8 prints a warning below 20.19; it still runs. |
| pnpm | 10.x (`npx pnpm@10` works) | The repo has `pnpm-lock.yaml`. npm also works. |
| PostgreSQL | 16+ (tested on 18) | Local server on port 5432 |
| Python | 3.12 | Model service only |
| `psql` | matching the server | Needed for the role setup and the smoke test |

Everything except PostgreSQL and Python is installed by the package manager of
your choice. No cloud account is required to run this locally.

### `server/.env` is required and is never committed

The app **cannot start without `server/.env`** — it holds the database passwords
and the JWT signing secret. It is gitignored and must never be committed, so a
fresh clone does not have one: **you create it once** with `npm run bootstrap`
(step 2 below). Never commit it, never paste its contents into a document, and
treat the values as secrets.

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
writes `server/.env` (gitignored). It never stores your superuser password, never
prints the generated secrets, and **refuses to overwrite an existing
`server/.env`** — it rotates the role passwords, so overwriting the file would
lock you out of a database whose credentials you had recorded elsewhere. To
really start over, delete `.env` first or pass `--force`.

```bash
# starter over deliberately
rm server/.env && PGPASSWORD='...' npm run bootstrap
```

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
| `MODEL_SERVICE_URL` | no | default `http://127.0.0.1:8000`. `npm run dev:all` overrides it to match the port it starts the service on. |
| `MODEL_TIMEOUT_MS` | no | default 3000 ms. The first node→model call measured ~2.4 s on the development machine, so 800 ms aborted healthy predictions; 3 s still fails fast (a down service fails instantly on connect) |
| `SEED_VIEWER_PASSWORD`, `SEED_MODERATOR_PASSWORD`, `SEED_SUPERADMIN_PASSWORD` | production seeding only | required when `NODE_ENV=production`; the seed refuses the demo passwords and never prints these |

No secrets are committed. `server/.env` is gitignored; `deploy/.env.production.example`
is the production template.

### Login lockout (OQ-12)

An operator account is locked for **15 minutes after 5 consecutive failed
logins**. The counter resets on a successful login. Unknown account, wrong
password and a locked account all return the same generic `401 Invalid
credentials`, so the response does not disclose whether an address exists or is
locked. A Super Admin can clear a lock from **User Control Centre → Unlock**
(the `users.unlock` permission). Only `Account Locked` and `Account Unlocked`
are audited — individual failed attempts are deliberately not written, so a
guessing run cannot flood the ledger.

To reset locks between demo runs:

```bash
cd server && npm run demo:reset
```

---

## 4. Running it

### One command (recommended)

```bash
npm run dev:all
```

Starts the API, the frontend and the model service together, colour-prefixed by
service. The model service port is defined once inside `scripts/dev-all.mjs` and
is used for both uvicorn and `MODEL_SERVICE_URL`, so the two cannot drift. If
`ml/.venv` is missing it says so and starts the other two anyway. Press Ctrl+C to
stop everything.

```bash
API_PORT=3100 MODEL_PORT=8100 PORT=8543 npm run dev:all   # override ports
```

### Or four terminals

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

### Model artifacts are regenerated, not committed

`ml/models/models.joblib` is **23.5 MB** and `ml/models/anomaly_model.joblib` is
**3.4 MB**. They are deliberately **not committed** (`ml/models/` is gitignored)
because they are fully reproducible: the generator uses a fixed seed
(`20261030`), so `generate_data.py → train.py → anomaly.py` rebuilds byte-identical
artifacts. Committing 27 MB of binaries that regenerate in seconds would bloat the
repository and invite the stale-artifact problem where code and model drift apart.

The evidence that *is* committed is small and textual: `ml/reports/metrics.json`,
which holds the measured per-model metrics and is the source of every number
quoted in the report. `ml/models/train_summary.json` is written next to the
binaries and is **not** committed either — it regenerates with the models.
Rebuild everything with the four commands above.

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
