# SECURITY_AUDIT.md — Kaziforce Admin & Moderation console

Security audit run on branch `security/audit` (2026-11-22), following the
`security-audit` skill in **guidance mode**: the skill's evidence bar, trust-boundary
discipline, severity anchors and anti-patterns applied to the session's checklist.
No live or deployed endpoint was probed; every runtime claim was reproduced against a
local scratch API instance (`127.0.0.1:3100`, Node 22.23.5, the local PostgreSQL 18
cluster on 5433) or is quoted from source with file and line. Facts that depend on the
deployed VM rather than source are marked **needs validation**, never given severity.

**Source ref:** branch `security/audit` at commit `c9af51f` + the working tree of this
audit (the tree also carries the unmerged branches `fix/state-machine-bugs` and
`fix/open-defects`, whose commits are included in the reviewed code).

**Trust boundaries examined:** anonymous internet → Nginx → Express API → PostgreSQL
(two roles: `kaziforce_owner` scripts-only, `kaziforce_app` runtime); browser cookie →
session; model service (loopback); operator scripts (bootstrap/migrate/seed).

---

## 1. Findings summary

No critical or high finding was confirmed. Two medium findings (login timing oracle)
and one medium design gap (no login-specific per-IP throttle → password spraying) are
reported with recommended fixes; per the session rule ("fix only critical and high
findings that are small and local"), **no code was changed by this audit** — every
recommendation below is small and local if the owner chooses to apply it.

| ID | Severity | Finding | Evidence | Fix applied? |
|---|---|---|---|---|
| F-01 | **medium** | Login timing oracle: unknown account ≈ 2 ms vs known account ≈ 252 ms — operator email enumeration | measured (§2.4); `server/src/services/authService.ts:44` | no (medium) — recommended fix given |
| F-02 | **medium** | Lock-state disclosure via timing: locked ≈ 2 ms vs active ≈ 261 ms — lock expiry is observable | measured (§2.4); `authService.ts:49-50` | no (medium) — same fix class |
| F-03 | **medium** | Password spraying: per-IP login traffic rides the global 600-req/5-min bucket; per-account lockout does not constrain cross-account spraying | `rateLimit.ts:7-27`, `config/env.ts` RATE_LIMIT_MAX=600; lockout `authService.ts` | no (medium) — recommended dedicated login limiter |
| F-04 | **low** | Nginx `add_header` inheritance: `/api/` and `/assets/` locations declare their own `add_header`, so the server-level security headers do not reach API responses (classic Nginx semantics) | `deploy/nginx/kaziforce.conf:24-28` vs `:49-64` | no (low, deploy artifact) — recommended include-file fix |
| F-05 | low | JWT `verify` does not pin `algorithms: ['HS256']`; jsonwebtoken ≥ 9 already rejects alg confusion, so no exploitable path — hardening only | `server/src/middleware/auth.ts:39-42` | no (low) |
| F-06 | low | `LIKE` wildcard injection in account search: a query containing `%` broadens matching (parameterised — no SQL injection) | `server/src/routes/users.ts:39-43` | no (low) — escape `%`/`_` if it matters |
| F-07 | low | In-memory rate limiter: per-process (resets on restart, not shared across processes), IPv6 rotation can grow the bucket map between cleanups | `server/src/middleware/rateLimit.ts:7-35` | no (low) — documented Redis upgrade path (D-018) |
| F-08 | low | Server dependency audit: 4 moderate advisories, **all dev-only** (jest → glob → minimatch); no production dependency path | `pnpm audit` output quoted in §8 | no (dev-only) — `pnpm update` recommended |
| F-09 | informational | Sign-out does not invalidate the JWT server-side (no session store): a captured cookie stays valid until TTL unless the account leaves Active. Suspension/termination is the kill switch (per session prompt: reported, not built) | `server/src/routes/auth.ts:54-69`, `middleware/auth.ts` | — documented design limitation |
| F-10 | informational | No CSP in local development (headers come from Nginx only; Vite dev serves without them). Production CSP exists in the Nginx config | `index.html` (no meta CSP); `deploy/nginx/kaziforce.conf:28` | — dev-only |

**Needs validation (no severity — depends on the deployed VM, not source):**
- **NV-1** — whether the **live** VM responses actually carry the security headers: the
  source config declares them at server level, but F-04's inheritance defect (and any
  certbot rewrite) means the live `/api/` headers are unknown. Check: `curl -sI
  https://kaziforce-demo.spaincentral.cloudapp.azure.com/api/v1/health | grep -iE
  'x-frame|x-content|content-security|referrer'` on the VM.
- **NV-2** — whether the deployed API runs with `NODE_ENV=production` (the `Secure`
  cookie flag and the production seed guard depend on it). The VM transcript shows a
  production install, but the flag itself was not captured live.

---

## 2. Login and lockout

### 2.1 Rate limits per IP and per account
- **Per IP:** one global fixed-window limiter for every `/api/v1` request —
  `RATE_LIMIT_MAX` (default **600**) per `RATE_LIMIT_WINDOW_MS` (default **300 000 ms =
  5 min**), keyed by `req.ip` (`server/src/middleware/rateLimit.ts:9-27`); env schema at
  `server/src/config/env.ts:11-12`. Login shares this bucket with every other request.
- **Per account:** consecutive-failure lockout — **5 failures → 15-minute lock**,
  counter reset on success, Super Admin unlock (`server/src/config/lockout.ts:9-10`,
  `server/src/services/authService.ts`, migration 008). Unit-tested in
  `server/tests/lockout.test.ts` and `lockout-race.test.ts` (the atomic increment).
- **Gap (F-03):** the global 600/5-min bucket permits ~2 requests/second sustained from
  one IP. Lockout caps guessing *per account* (5 tries per 15 min), but a password
  *spray* — one guess across many accounts — meets no lockout and is bounded only by
  600 attempts per 5 minutes per IP (≈ 172 800 accounts/day from one IP). Not
  live-tested (would require ~600 requests against the scratch API — not run);
  classification from source numbers. **Recommended fix:** a dedicated login limiter
  (e.g. `RATE_LIMIT_LOGIN_MAX` default 30/5 min per IP, exempted under `NODE_ENV=test`
  and exercised by its own suite with a low cap, as the export-cap suite does).

### 2.2 Lockout
Implemented atomically (one statement increments and locks — `authService.ts:54-90`),
identical generic 401 on every failure path, only lock/unlock audited (D-047),
Super Admin unlock is its own permission. Tested by `lockout.test.ts` (15 tests) and
`lockout-race.test.ts` (concurrent failures lock exactly once). **No finding.**

### 2.3 Generic "Invalid credentials"
Unknown account, wrong password and locked account all return the same body:
`401 {"code":"AUTH-001","message":"Invalid credentials"}`. Re-verified live in this
audit: the timing probe recorded `statuses: 401 401 401`, `codes: AUTH-001 AUTH-001
AUTH-001` for unknown/known-wrong/locked. Also asserted by `lockout.test.ts`. **No
finding at the response level.**

### 2.4 Timing differences (F-01, F-02) — measured
Probe: 20 sequential login attempts per class against the scratch API, lock reset
between samples (script: temp dir, outside the repository; command `node
timing-probe.mjs` with Node 22.23.5). Result:

| Class | n | p50 | p95 | min–max |
|---|---|---|---|---|
| unknown email | 20 | 2 ms | 173 ms | 2–173 |
| known email + wrong password | 20 | **252 ms** | 257 ms | 247–257 |
| known + locked (correct password) | 20 | **2 ms** | 2 ms | 1–2 |
| known + correct password | 10 | 261 ms | 271 ms | 250–271 |

- **F-01:** the unknown path returns before `bcrypt.compare` (`authService.ts:44`);
  the known path pays a cost-12 bcrypt (~250 ms). A ~125× separation lets an
  unauthenticated caller enumerate which emails are operators. The response *bodies*
  are identical; the disclosure is temporal.
- **F-02:** the lock check also returns before compare (`authService.ts:49-50`), so
  lock *state* — and the exact moment a lock *expires* — is observable (2 ms → 261 ms
  transition) even with the correct password.
- **Severity (both):** medium — a demonstrated defeat of the enumeration-resistance
  property the code documents, but the consequence is account-existence/lock-state
  disclosure, not authentication bypass.
- **Recommended fix (small, local):** on the unknown path, run
  `bcrypt.compare(password, DUMMY_HASH)` (a fixed hash baked into the module) before
  the generic 401; on the locked path, burn the same compare. All failure paths then
  cost one bcrypt, equalising the timing. Test: `jest.spyOn(bcrypt, 'compare')` —
  assert the unknown path performs exactly one compare — plus an integration test
  asserting p50 similarity is *not* practical in Jest; the behaviour test is the
  regression guard.

## 3. Session

- **Cookie flags:** `httpOnly: true`, `sameSite: 'lax'`, `secure: NODE_ENV ===
  'production'`, `path: '/'`, `maxAge = JWT_TTL_HOURS` (`server/src/routes/auth.ts:15-18`).
  httpOnly and SameSite are unconditional; `Secure` is production-only
  (**NV-2** for the deployed instance).
- **Expiry:** JWT `exp` from `JWT_TTL_HOURS` (default 8 h) and cookie `maxAge` match.
  Expired/invalid tokens get 401 `AUTH-002` (`middleware/auth.ts:40-44`).
- **Suspension:** every request re-checks the account — non-Active → 403 `AUTH-003`
  (`middleware/auth.ts:51-52`); login refuses non-Active (`authService.ts:82`).
  Tested in `users.test.ts` (suspended operator lifecycle).
- **Sign-out on every device: not implemented** (per the session prompt: report, don't
  build). There is no server-side session store or revocation list; logout clears only
  the caller's cookie (`routes/auth.ts:64`). Consequence: a captured cookie remains
  valid until TTL unless the account leaves Active (F-09). If ever needed, the minimal
  design is a `sessions` table (token jti) checked in `requireAuth`.
- **Session fixation:** login always issues a fresh signed cookie on success; no
  pre-auth session is reused. **No finding.**
- **Token contents:** after the state-machine round, the JWT carries only `sub` and
  `email` — role and permissions are re-derived from the database on every request
  (`middleware/auth.ts`), so a stale snapshot cannot grant rights (verified live during
  the audit round: a demoted operator's old cookie loses its rights on the next
  request).

## 4. Server-side permission checks — full route inventory

Every state-changing endpoint sits behind `requirePermission`, which runs **before**
the handler (`server/src/middleware/requirePermission.ts:13-31`) and re-derives the
permission set from the database per request. Routes **without** `requirePermission`,
and why each is safe:

| Route | Guard | Why it is safe |
|---|---|---|
| `GET /api/v1/health` | none (public) | Intentional probe (BED convention); reveals only `{status:'ok',database:'reachable'}` (`routes/health.ts:7-14`) |
| `POST /api/v1/auth/login` | none (public) | The authentication endpoint itself; zod-validated, rate-limited, audited |
| `POST /api/v1/auth/logout` | `requireAuth` | Acts only on the caller's own cookie; writes one audit row |
| `GET /api/v1/auth/me` | `requireAuth` | Returns only the caller's own session data (`routes/auth.ts:71-83`) |
| `GET /api/v1/settings` | `requireAuth` | Read-only view of the labelled `sample.*` keys — FR-ADM-031; mutation is `settings.manage` |
| `GET /api/v1/moderation/queue` | `requireAuth` | Read-only listing; decisions are `moderation.decide` (Figma: Viewer sees a read-only queue) |
| `GET /moderation/flags/:id/suggestion`, `POST /moderation/suggestions` | `requireAuth` | Read-only model calls; the model never writes anything (fail-safe client) |

All remaining routes carry `requirePermission`: users view/suspend/ban/role/unlock,
moderation decide/bulk/escalation, audit view/export.csv. Denials are audited with
`outcome='Blocked'` before the 403 is sent (`requirePermission.ts:16-27`).
**No finding.**

## 5. Input validation, SQL, CSV, error envelopes

- **Zod at every trust boundary:** login body (`routes/auth.ts:10-13`), users list
  query + role payload (`routes/users.ts:25-31, 176-179`), decision/bulk/suggestion
  payloads (`routes/moderation.ts:204, 222-225, 132`), escalation resolution
  (`moderation.ts:268`), settings key/value/toggle (`routes/settings.ts:40-47, 85`),
  audit filters (`routes/audit.ts:21-29`), path IDs parsed as UUIDs. A schema escaping
  a route maps to 422, not 500 (`middleware/errors.ts:38-45`).
- **SQL parameterisation:** every user input reaches PostgreSQL as `$n` parameters;
  the only interpolations into SQL text are internal constants (`${where}` built from
  parameterised fragments, `users.ts:55`; `LIMIT ${maxRows}` from the validated env
  number, `audit.ts:119`). Grep evidence in the transcript. **No injection.**
- **CSV injection:** `csvCell` guards `= + - @` tab/CR with a `'` prefix and applies
  RFC 4180 escaping after the guard — unit-tested (`csv-date.test.ts`) and proven
  end-to-end through the export (`audit.test.ts`, the `=-HYPERLINK` correlation-id
  probe). Object metadata stays JSON on purpose.
- **Error envelopes:** ApiError/ZodError produce controlled bodies; unhandled errors
  log server-side only and answer generic `SYSTEM-001` with a `traceId`
  (`middleware/errors.ts:23-52`). The permission-denial message names the missing key
  (needed by the UI) but nothing about internals.
- **Body size:** `express.json({ limit: '256kb' })` (`app.ts:24`); Nginx caps uploads
  at 1 m.
- Minor: LIKE-wildcard broadening (F-06) — cosmetic.

## 6. Headers, CSP, TRUST_PROXY, CORS

- **Headers/CSP:** present at server level in both Nginx configs — `X-Frame-Options:
  DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  CSP with `frame-ancestors 'none'`; HSTS in the HTTPS config
  (`deploy/nginx/kaziforce.conf:24-28`, `kaziforce-https.conf.example:42-52`).
  **F-04 (low):** because the `/api/` and `/assets/` locations declare their own
  `add_header`, Nginx drops the server-level headers on those responses — the headers
  effectively protect only `index.html` and the SPA fallback. Recommended fix: move the
  five header lines into a snippet included by every location, or re-declare them in
  the `/api/` and `/assets/` blocks. Live-header presence on the VM: **NV-1**.
- **TRUST_PROXY:** enabled only when set (`app.ts:23`); Nginx uses
  `$proxy_add_x_forwarded_for` (appends, never trusts the client's own XFF), so with
  `trust proxy` = 1 hop the rate limiter keys on the real client address, and a
  spoofed `X-Forwarded-For` cannot move the bucket key. Locally the proxy setting is
  absent, so `req.ip` is the socket peer. **No finding.**
- **CORS:** no CORS middleware anywhere — the browser default (same-origin) applies,
  which is exactly right for a same-origin SPA+API. No cross-origin JS can read
  responses; `SameSite=Lax` prevents cross-site POSTs from carrying the cookie, and
  every state-changing endpoint is POST. **No finding.**
- **Model service:** uvicorn binds `127.0.0.1` only (`scripts/dev-all.mjs:65`), and no
  Nginx location proxies it (both configs state and enforce this; the smoke test
  checks it). **No finding.**

## 7. Secrets

- `git ls-files` contains **no** `.env`, key, pem or credential files; the only
  env-shaped tracked files are the two templates (`server/.env.example`,
  `deploy/.env.production.example`) with placeholder values. `.gitignore` covers
  `.env`, `server/.pgdata/`, `ml/.venv/`, `ml/models/`.
- Real credentials live only in untracked local files (`server/.env`) and, on the VM,
  in `/etc/kaziforce/api.env` (root:kaziforce, 0640 per the deploy doc).
- Scope note: this check covers tracked files of this workspace. The historical
  history of the upstream GitHub repository (R) was **not** scanned for old secrets —
  out of scope for this audit.
- Demo operator passwords exist in source by design and are refused for production
  seeding (D-050). **No finding.**

## 8. Audit ledger integrity

- The runtime pool connects **only** as `kaziforce_app` (`db/pool.ts:6`).
  `OWNER_DATABASE_URL` appears exclusively in operator-run scripts
  (`db/migrate.ts:11`, `seed/seed.ts:114`, `scripts/bootstrap.mjs`) — never on a
  request path. **No path writes as `kaziforce_owner` at runtime.**
- Grants re-verified during this audit: `kaziforce_app` on `audit_log` =
  `["INSERT","SELECT"]`; `UPDATE/DELETE/TRUNCATE` refused; no schema-CREATE privilege.
  The application can append to the ledger but never rewrite it.
- Migration 006 + `deploy/sql/02_grants.sql` are the enforcement points; the
  immutability suite (`audit-immutability.test.ts`) asserts the refusals with
  SQLSTATE 42501.

## 9. Dependency vulnerabilities (quoted output)

- **Frontend root** (`npx --yes pnpm@10.34.3 audit --prod`):
  `No known vulnerabilities found`
- **server/** (`npx --yes pnpm@10.34.3 audit`): `4 vulnerabilities found — Severity:
  4 moderate`. All four sit in **dev-only chains** (`jest > @jest/core > glob >
  minimatch` — glob AbortSignal bypass; minimatch DoS amplification). jest is a
  devDependency; the deployed API runs compiled production code and never loads it.
  Production-audited surface therefore has **no known vulnerabilities**. Recommended:
  `pnpm update jest glob minimatch` in `server/` at convenience; not applied (dev-only,
  not critical/high).
- **ml/** (`pip-audit 2.10.1 -r requirements.txt --no-deps`, run from a throwaway venv
  outside the repository — pip-audit is not installed in the project venv):
  `No known vulnerabilities found`

## 10. If a secret leaks — impact and rotation

### JWT secret (`JWT_SECRET`) leaks
- **Impact:** the attacker can sign valid session tokens for **any existing operator
  id** and the API will accept them — `requireAuth` verifies the signature and then
  re-derives role/permissions from the database for that `sub`, so a forged token for
  a Super Admin's id is full console access (account control, moderation, settings,
  audit). Operator ids are UUIDs; an attacker who only has the secret (not the DB)
  must know or guess a valid operator id — anyone who has seen the audit CSV or the
  demo seed output has them. Cookie theft is not required.
- **Rotation:** generate a new secret (`openssl rand -base64 48`), replace
  `JWT_SECRET` in `/etc/kaziforce/api.env`, `sudo systemctl restart kaziforce-api`.
  Every existing cookie becomes invalid immediately (all operators must sign in
  again); no database change is needed. Rotating the secret is the complete remedy.

### Application database password (`kaziforce_app`) leaks
- **Impact:** direct SQL access with the application's grants — read **everything**
  the console can read (users incl. `password_hash` → offline bcrypt cracking at
  cost 12, the full audit ledger, settings) and write the working tables (suspend or
  terminate any account, change operator roles via `user_roles`, alter flags and
  settings). It does **not** allow rewriting or deleting the audit ledger
  (SELECT+INSERT only) nor creating schema objects.
- **Rotation:** as the owner (or superuser):
  `ALTER ROLE kaziforce_app PASSWORD '<new random>'` — then update `DATABASE_URL` in
  `/etc/kaziforce/api.env` and restart the API. In-flight sessions (JWT cookies) keep
  working because the API re-connects with the new URL; no operator action needed.
  If the **owner** password leaks too, rotate it the same way
  (`ALTER ROLE kaziforce_owner PASSWORD …` + `OWNER_DATABASE_URL`), since the owner
  role can drop the schema and re-grant anything. The rotation commands belong in the
  operator runbook (a person executes them on the VM).

### Demo credentials
The three demo operator passwords are public in the repository. On any real
deployment the production seed refuses them and requires `SEED_*_PASSWORD` — verify
the deployed instance actually used production passwords (**NV-2** companion check:
try `viewer@kaziforce.local / ViewerDemo!2026` on the VM; it must fail).

## 11. Applied fixes

None. Per the session rule, only critical and high findings that are small and local
would be fixed; every finding here is medium or low. The three medium findings each
have a small, local recommended fix (dummy bcrypt compare ×2; a dedicated login rate
limiter with a test-only override) that can be applied and tested in a follow-up
round if the owner accepts the risk/benefit.

## 12. Verification (this session, quoted)

```text
npx --yes pnpm@10.34.3 audit --prod  (root)      → No known vulnerabilities found
npx --yes pnpm@10.34.3 audit         (server/)   → 4 vulnerabilities found / Severity: 4 moderate (dev-only chains)
pip-audit 2.10.1 -r ml/requirements.txt --no-deps → No known vulnerabilities found
git ls-files | grep -iE "\.env|secret|credential|password|\.pem|\.key$" → empty
timing probe (scratch API 127.0.0.1:3100, 70 requests) → table in §2.4; all failure classes 401 AUTH-001
grants re-check → audit_log: ["INSERT","SELECT"]; app role schema CREATE: false
```

The full rule-6 verification suite (typecheck / frontend tests / build / server Jest)
was run after this document was written; the summary lines are in the session report.
