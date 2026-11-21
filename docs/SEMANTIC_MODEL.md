# SEMANTIC_MODEL.md — recovered semantic model of the Kaziforce console

Recovered on branch `audit/semantic-model` (2026-11-22) by reading every state-bearing
file in `server/src`, `server/migrations`, `src/` and `ml/`, and by running confirmation
requests against a scratch API instance on `127.0.0.1:3123` (Node 22, local PostgreSQL
cluster on 5433). **No application code was changed.** Everything marked *Confirmed* was
produced by a request or script quoted in §6; anything else is *suspected* (code reading
only) or *not measured*.

Scope statement: this build implements the **Admin and Moderation console subset** of the
platform SRS; the model below covers that subset only.

---

## 1. State inventory — every value that changes what an operator sees

| # | State | Lives in | Written by | Read by (screen) | Source of truth |
|---|---|---|---|---|---|
| S1 | `users.status` ∈ {Active, Suspended, Terminated} (CHECK, migration 002) | PostgreSQL | `users.suspend`, `users.ban`, escalation uphold (`moderation.ts:304`) | UsersPage pills, login gate | DB |
| S2 | `users.is_deleted` (soft delete) | PostgreSQL | seed only | `WHERE is_deleted = false` filters | DB |
| S3 | `users.failed_login_attempts`, `users.locked_until` (migration 008) | PostgreSQL | `authenticate()` on failure/success, `unlockAccount()` | UsersPage "Locked" pill + Unlock control | DB |
| S4 | Role: rows in `user_roles` × `roles` | PostgreSQL | `POST /users/:id/role` (delete-all + insert), seed | Role column, role filter, role label | DB |
| S5 | Permissions: `role_permissions` matrix | PostgreSQL | seed only (`seed.ts:150-158`) | Server enforcement + client visibility (`req.user.permissions`) | DB |
| S6 | `flags.flag_status` ∈ {Pending, Approved, Rejected, Escalated} (CHECK, migration 003) | PostgreSQL | `decideFlag()`, escalation overrule/uphold | Queue lanes, status pills | DB |
| S7 | `flags.decided_by`, `decided_at`, `severity`, `reason_category` | PostgreSQL | decided_by/at by decisions; severity/category fixed at creation | Queue table | DB |
| S8 | `audit_log` rows (append-only; app role has SELECT+INSERT only, migration 006) | PostgreSQL | `writeEvent()` from every mutation + denials + lock | Audit Explorer table + CSV export | DB |
| S9 | `system_settings.key/value/is_feature_toggle` | PostgreSQL | settings PUT / toggle (Super Admin), seed | SettingsPage inputs, toggle switches | DB |
| S10 | JWT session cookie `kz_session` (claims: sub, email, **role, permissions**) | Browser cookie, TTL = `JWT_TTL_HOURS` (8 h default) | `POST /auth/login` | *Only `sub` is ever read server-side* (`middleware/auth.ts:33-41`) | JWT (stale snapshot) |
| S11 | Derived session (id, email, fullName, role, permissions) | Rebuilt from DB on **every** request (`middleware/auth.ts:42-68`) | — | Everything (via `req.user`) | DB (authoritative) |
| S12 | Client session object `SessionContext.user` | React state, set at load (`/auth/me`), login, logout | SessionContext | Guards, rail, header pills | S11 via /auth/me |
| S13 | Client view states: `acting`, `selected[]`, `lane`, filters, `suggestions`, `editing` | React state per page | UI events | Buttons, bulk bars, tables | UI only |
| S14 | Model service availability (per call) | External FastAPI process; Node client resolves `available: true/false` per call | `/predict` 200/malformed/timeout(3 s)/unreachable | Queue suggestion cells; audit metadata | model service |
| S15 | Rate-limit buckets (in-memory `Map`, fixed window) | API process memory | every `/api/v1` request | 429 responses | process memory (resets on restart) |

---

## 2. State machines

### M1 — Flag moderation (`flags.flag_status`)

**States:** `Pending` → {`Approved`, `Rejected`, `Escalated`}; `Escalated` → `Approved` (overrule) or stays `Escalated` (uphold). `Approved` and `Rejected` are terminal — no transition leaves them.

**Invariants**
- DB CHECK constrains the domain (migration 003).
- *Only read-time enforced:* "only Pending flags can be decided" is checked in `decideFlag` (`moderation.ts:170-172`) **before** an unconditional `UPDATE` (`moderation.ts:188-192` that does not carry `AND flag_status = 'Pending'`). The same applies to the escalation guard (`moderation.ts:278-280` vs the overrule UPDATE at `moderation.ts:283-286`). Under concurrency the check and the write are not atomic (BUG-2).
- `decided_by`/`decided_at` are stamped on every decision and on overrule; **uphold does not stamp them** — the flag stays `Escalated` with the original NULLs (BUG-7).
- Every decision writes exactly one audit event *when serialised*; concurrently, two events are possible (BUG-2).

**Transition table** (actor permission in parentheses)

| From | Event | Guard | To | Side effects |
|---|---|---|---|---|
| Pending | `POST /flags/:id/decision` approve/reject/escalate (`moderation.decide`) | flag exists; read status = Pending | Approved / Rejected / Escalated | `UPDATE flags` (status, decided_by, decided_at) + 1 audit row (`Content Approved/Rejected/Escalated`, outcome Success, metadata carries decision-time model suggestion) |
| Pending | same, concurrent second call | read happens before first UPDATE commits | (same as above) | **2 audit rows, last writer wins decided_by/at** (BUG-2, Confirmed 9/10) |
| Pending | same, read happens after first commit | — | 409 `FLAG-002` | audit denial row is **not** written for 409s (only permission denials are) |
| Escalated | `POST /flags/:id/escalation` overrule (`moderation.escalation`) | flag read = Escalated | Approved | `UPDATE flags` + audit `Flag Overruled` |
| Escalated | `POST /flags/:id/escalation` uphold | flag read = Escalated; owner exists; owner ≠ Terminated | **Escalated (unchanged)** | `UPDATE users SET status='Terminated'` + audit `Account Terminated` (target user) + audit `Escalation Upheld` (target flag) |
| Escalated | uphold when owner already Terminated | — | 409 `USER-003` | no write |
| any non-Escalated | escalation resolution | — | 409 `FLAG-003` | no write |

### M2 — Account status (`users.status`) + soft delete

**States:** `Active`, `Suspended`, `Terminated`. `is_deleted` is a flag, never set by any API (seed sets it false). **No transition returns to `Active`.**

| From | Event | Guard | To | Side effects |
|---|---|---|---|---|
| Active | `POST /users/:id/suspend` (`users.suspend`, Moderator+) | not self; operator targets need Super Admin (`users.ts:113-116`) | Suspended | `UPDATE users` + audit `User Suspended` (metadata from/to/email) |
| Active, Suspended | `POST /users/:id/ban` (`users.ban`, Super Admin) | not self (`users.ts:112`) | Terminated | audit `Account Terminated` |
| **Terminated** | `POST /users/:id/suspend` (`users.suspend`) | target.status ≠ 'Suspended' (so Terminated passes) | **Suspended** | audit `User Suspended` from=Terminated — **BUG-3, Confirmed: a Moderator un-bans a banned account** |
| Suspended | suspend again | status == nextStatus | 409 `USER-003` | no write |
| Terminated | ban again | status == nextStatus | 409 `USER-003` | no write |
| any | self suspend/ban | — | 422 `USER-002` | no write |
| any (owner of escalated content) | escalation uphold | owner ≠ Terminated | Terminated | see M1 |

Effects on other machines: any status ≠ Active revokes API access at the next request (`middleware/auth.ts:52` → 403 `AUTH-003`) and blocks login (`authService.ts:82`). Reactivation exists only as direct SQL (tests, `users.test.ts:149`), never through the API.

### M3 — Login lockout (`failed_login_attempts`, `locked_until`)

**Policy constants:** 5 failures → 15-minute lock (`config/lockout.ts`). Only lock and unlock are audited; single failures are deliberately not (D-047).

| From | Event | Guard | To | Side effects |
|---|---|---|---|---|
| (attempts < 4, unlocked) | failed login (bad password, after bcrypt compare) | not currently locked (`authService.ts:49-50`) | attempts + 1 | silent `UPDATE` (`authService.ts:75`), no audit |
| (attempts = 4) | failed login | not locked | **locked** until now+15 min, attempts reset to 0 | `UPDATE` + audit `Account Locked` (outcome Blocked, operatorId null) |
| locked | any login attempt, even correct password | `locked_until > now()` | unchanged | generic 401 `AUTH-001` (identical to unknown account/wrong password — no disclosure), no counter change |
| locked | 15 minutes elapse | `locked_until <= now()` at next attempt | effectively unlocked (attempts remain 0) | nothing written until next event |
| unlocked, attempts > 0 | successful login | — | attempts = 0, `locked_until = NULL` | silent `UPDATE` (`authService.ts:85-87`) |
| locked or not | `POST /users/:id/unlock` (`users.unlock`, Super Admin) | target exists | attempts = 0, `locked_until = NULL` | audit `Account Unlocked` (metadata wasLocked) — idempotent, writes audit even when not locked |

Counter consistency is read-modify-write (`attempts = read + 1`, `authService.ts:55-56`) with no row locking or atomic `SET failed_login_attempts = failed_login_attempts + 1` — concurrent failures lose updates (BUG-6, Confirmed 8→2).

### M4 — Operator session

| From | Event | Guard | To | Side effects |
|---|---|---|---|---|
| anonymous | `POST /auth/login` | email+password valid; operator; not deleted; not locked; status Active | authenticated (cookie + client `user`) | audit `Operator Login` (awaited **before** the response — a failed audit INSERT fails the whole login, fail-closed) |
| authenticated | any API request | JWT valid (issuer/audience/TTL); account exists, operator, not deleted, Active; role+permissions re-read from DB | authenticated | no write (permission denials write audit `Authorization Denied`, outcome Blocked — `requirePermission.ts:18-27`) |
| authenticated | account suspended/terminated/role changed elsewhere | — | still authenticated client-side; server denies per request | client UI does not reset (`SessionContext` only resets on login/logout/load) — BUG-16 |
| authenticated | JWT TTL (8 h) or cookie maxAge passes | — | anonymous | 401 `AUTH-002` |
| authenticated | `POST /auth/logout` | authenticated | anonymous (cookie cleared) | audit `Operator Logout` |

There is **no server-side revocation primitive**: logout only clears the cookie; a captured cookie stays valid until TTL unless the account leaves Active. The JWT's role/permissions claims are written but never read (BUG-12) — authorization always uses the fresh DB read (S11), which is why role changes take effect on the *next request* even though the UI says "next sign-in" (`UsersPage.tsx:317`, Confirmed).

### M5 — Model suggestion (per call, stateless client)

| Event | Guard | Result | Side effects |
|---|---|---|---|
| `GET /flags/:id/suggestion` or `POST /suggestions` (any authenticated operator) | flag exists | `available:true` {modelVersion, severity, action, confidence} | none (read-only) |
| model service down / slow (>3 s) / non-2xx / malformed body | — | `available:false` + reason | none; queue shows "Suggestion unavailable"; **decisions never blocked** (fail-safe per AGENTS.md ML rules) |
| `decideFlag` runs | — | prediction re-fetched **at decision time** and recorded in the audit metadata (`followed` = suggestion.action === decision) | audit metadata only |

The recorded suggestion is therefore not necessarily the one the operator saw on screen (BUG-17). The model itself never writes any state (ml/service.py "The model only recommends").

### M6 — System settings

| From | Event | Guard | To | Side effects |
|---|---|---|---|---|
| value v | `PUT /settings/:key` (`settings.manage`) | key exists (404 `SETTING-001` otherwise) | new value | `UPDATE` + audit `Configuration Updated` (from/to) — **writes audit even when value unchanged** |
| toggle 'true'/'false' | `POST /settings/:key/toggle` | key exists; `is_feature_toggle` (409 `SETTING-002` otherwise) | absolute value from request body | audit `Feature Toggle Changed` (from/to) |

Note: the PUT endpoint takes an absolute value, not a delta, so two Super Admins acting concurrently produce deterministic final values but possibly wrong `from` metadata in the second audit row (suspected — race window between read and write, `settings.ts:60-67`). The route comment says "New keys are allowed — this is a key/value store" (`settings.ts:17`) but unknown keys 404 (`settings.ts:61`): keys can only be created by the seed.

### M7 — Operator roles (`user_roles`)

| From | Event | Guard | To | Side effects |
|---|---|---|---|---|
| role R1 | `POST /users/:id/role` R2 (`users.assign_role`, Super Admin) | not self (422 `USER-004`); role name exists | R2 (delete-all + insert) | audit `Role Assigned` (from/to/email) — **written even when R1 = R2** (Confirmed) |
| — | concurrent assignments on one user | — | last committer wins; both audited | DELETE+INSERT runs inside a `pool.query('BEGIN')`…`'COMMIT'` that can span different pool clients (BUG-5) |

Single-role-per-user is enforced only by this delete-first pattern and the seed — there is no `UNIQUE(user_id)` constraint on `user_roles` (migration 002), so duplicate role rows are reachable by any direct-DB writer (invariant by hope, BUG-15a).

---

## 3. Transition algebra

**Commute (independent):**
- Decisions on *different* flags; suspend/ban/role on *different* users; settings changes on different keys; audit events among themselves.
- `Operator Login` events; rate-limit counting vs business state.

**Do not commute (same object):**
- `approve` vs `reject` vs `escalate` on one flag: serialised → first committer wins (409 for the other); concurrent → both apply, two audit rows (BUG-2). The end status depends on event order and thread scheduling.
- `overrule` then `uphold` ≠ `uphold` then `overrule` on an escalated flag: overrule first removes the flag from the lane (Approved) so uphold becomes 409 `FLAG-003`; uphold first keeps it Escalated so overrule still succeeds — leaving **owner Terminated + flag Approved** (BUG-7, Confirmed).
- `suspend` then `ban` ≠ `ban` then `suspend`: Terminated→Suspended is accepted (BUG-3) while Suspended→Suspended 409s — the same two events in opposite orders end in different states.
- Role assignments on one user: last committer wins; both are audited with possibly stale `from` values.

**Idempotent at the state level but not at the ledger level:**
- `unlock` on an unlocked account (state no-op, audit row written).
- Role assignment to the current role (state no-op, audit row written — Confirmed).
- Settings PUT / toggle to the same value (state no-op, audit row written).
- Failed logins *should* accumulate to a deterministic lock but lost updates make the threshold probabilistic (BUG-6).

**Not idempotent:**
- Flag decisions (409 after commit; double-apply under race).
- suspend/ban on the same target produce 409s on repeat (except the Terminated→Suspended hole).
- Every decision/mutation adds another immutable audit row; there is no deduplication.

**Order-dependent windows:**
- The bulk endpoint processes ids sequentially and per-flag (applied/failed arrays), so its result depends on arrival order relative to other operators' decisions; nothing is atomic across the batch (each flag commits independently).
- Queue/listing pages are not snapshotted: `page`+`total` can shift between the count query and the page query (two separate queries, `moderation.ts:56-63`, `users.ts:54-59`, `audit.ts:79-88`), so paging can skip or repeat rows under concurrent writes.

---

## 4. Dependencies — what must be true before each effect fires

| Effect | Hard preconditions | Soft/latent dependencies |
|---|---|---|
| Login success | bcrypt match; `is_operator`; not deleted; not locked; status Active | audit INSERT grant on `audit_log` — `writeEvent` is awaited **before** responding, so a ledger failure fails the login (fail-closed) |
| Any protected request | valid JWT cookie; account Active; permission key present in the **fresh DB-derived** set (`middleware/auth.ts:42-68`) | JWT's own role/permissions claims ignored (BUG-12) |
| `decideFlag` | flag Pending **at read time** | model service (best-effort, ≤3 s, fail-safe); audit INSERT *after* the UPDATE commits — a failure between them leaves a decided flag with no audit row (BUG-19) |
| Escalation overrule | flag Escalated at read time | — |
| Escalation uphold | flag Escalated; owner row exists (`owner_id` not nulled); owner ≠ Terminated | `content_items.owner_id` is `ON DELETE SET NULL` — a hard-deleted owner makes uphold permanently 409 `FLAG-004` (soft-delete makes this unreachable in practice) |
| suspend/ban | target exists, not deleted; not self; operator-target rule for Moderators | audit INSERT after UPDATE (same window as decideFlag) |
| Role assignment | target exists; role name seeded; not self | `roles`/`permissions` rows exist (seed); INSERT grant on `user_roles` |
| CSV export | `audit.export` permission (Viewer → 403 **before any query**) | ≤ 10000 matching rows, silently (BUG-8); UI link is broken (BUG-1) |
| Suggestion | flag exists | model service reachable within 3 s; `reason_category` within the CHECK domain (migration 007) matches `ml/service.py`'s Literal — changing one without the other breaks every prediction (drift risk) |
| Seed | `OWNER_DATABASE_URL`; migrations 001–009 applied | production requires strong `SEED_*_PASSWORD` (D-050) |

---

## 5. Findings, ranked by impact

Status legend: **Confirmed (request/script)** — reproduced against the scratch API, output in §6; **Confirmed (reading)** — deterministic from code, no runtime ambiguity; **Suspected** — plausible from code, not reproduced.

### BUG-1 · The audit CSV export is unreachable from the UI — HIGH — **Confirmed (request)**
`AuditPage.tsx:53` builds the href as `` href={`${listPath}/export.csv`} `` but `listPath` (line 35-43) already contains `?`, so `/export.csv` lands **inside the query string**. The request never reaches `GET /audit/export.csv`.
- Smallest input: click "Export CSV" as a Moderator with no filters → the browser downloads `GET /api/v1/audit?/export.csv` → **200 `application/json`** (page 1 of the listing, not CSV); with any filter set → **422** `from must be YYYY-MM-DD`.
- The server endpoint itself is correct (200 `text/csv`, Viewer 403 — the panel guarantee holds); the defect is purely the UI href.
- Impact: the demo-critical export (CON-AUD-003, BRIEF "Moderators and Super Admins only") produces JSON or an error, never a CSV, from the screen. The Jest suite passes because it calls the endpoint directly (`audit.test.ts`), so tests cannot catch a broken href.

### BUG-2 · Concurrent decisions both apply and both write audit rows — HIGH — **Confirmed (request, 9/10)**
`decideFlag` (`moderation.ts:163-192`) reads `flag_status` then writes an UPDATE with no `AND flag_status='Pending'` predicate and no transaction. The 409 guard only fires when the second read lands after the first commit.
- Smallest input: two concurrent `POST /moderation/flags/:id/decision` on one Pending flag (double-click with two tabs, two moderators, or a client retry). Result: **both 200, two `Content Approved/Rejected` audit rows for one flag**, `decided_by`/`decided_at` = last writer.
- Measured: 9 of 10 trials produced two audit rows (§6, CONF-2b).
- Impact: the immutable ledger records two decisions for one judgment — exactly the evidence the panel is told is one-per-decision. The single-decision 409 test (`moderation.test.ts:119`) is sequential and cannot see this.

### BUG-3 · A Moderator can flip a Terminated (banned) account to Suspended — HIGH — **Confirmed (request)**
`mutateStatus` (`users.ts:118`) rejects only `status === nextStatus`; the subsequent UPDATE (`users.ts:119-122`) has no status predicate. `suspend` on a Terminated target passes the guard and sets `status='Suspended'`.
- Smallest input: Super Admin bans a sample account; Moderator sends `POST /users/:id/suspend` → **200**, DB status `Suspended`, audit row `User Suspended` with `from: Terminated`.
- The UI never shows this (Suspend button renders only for `status === 'Active'`, `UsersPage.tsx:198`), so the state is reachable only through the API — a Moderator reverses a permanent sanction that only Super Admin can apply, bypassing the two-step ban dialog.

### BUG-4 · Escalation-lane bulk bar resolves only the first selected flag — HIGH — **Confirmed (reading)**
`QueuePage.tsx:244-249`: with N flags selected in the escalated lane, "Overrule" / "Uphold and ban" call `escalate(selected[0], …)` — only `selected[0]` is resolved — while the bar announces "N selected" (`QueuePage.tsx:242`).
- Smallest input: select 2 escalated flags → click "Uphold and ban" → exactly one owner is banned; the notice ("Escalation upheld — content owner terminated") does not say which flag or that N−1 were ignored.
- Impact: an operator can believe several owners were banned when only one was. Single-flag escalation buttons (`QueuePage.tsx:338-346`) are fine.

### BUG-5 · The role-assignment "transaction" spans pool clients — MEDIUM — **Confirmed (request, mechanism)**
`users.ts:172-176` issues `BEGIN`, `DELETE`, `INSERT`, `COMMIT` through `pool.query`, which checks out a **different pool client per call** (node-pg documented semantics). The statements are therefore not guaranteed to share a transaction.
- Confirmed: with concurrent traffic, the emulated sequence ran `BEGIN` on backend pid 32136 and the write on pid 33744 (§6 CONF-4b) — the "transaction" does not wrap its writes.
- Consequence (suspected, scheduling-dependent): under failure or interleaving, the DELETE can commit without the INSERT (role lost), or an unrelated statement can join the dangling open transaction on the BEGIN client. A row lock taken inside the emulated "transaction" survived the route-style COMMIT whenever COMMIT landed on a different backend (observed BLOCKED-before / acquired-after in one run — §6 CONF-4c).
- Smallest input: two Super Admin requests racing, or any failure between DELETE and INSERT.

### BUG-6 · Lockout counter loses updates under concurrent failures — MEDIUM — **Confirmed (request)**
`authenticate` computes `attempts = read + 1` then writes the absolute value (`authService.ts:55-56, 75`).
- Smallest input: 8 concurrent wrong-password logins for one account → `failed_login_attempts = 2` (6 updates lost), no lock (§6 CONF-5).
- Impact: the "5 consecutive failures → lock" rule (OQ-12, SEC-AUTH-008) becomes probabilistic exactly under the brute-force traffic it exists for. Response discipline (identical 401s) is unaffected.

### BUG-7 · Uphold leaves the flag Escalated forever; Uphold→Overrule leaves the owner banned with an approved flag — MEDIUM — **Confirmed (request)**
Uphold (`moderation.ts:299-323`) bans the owner but does not change `flag_status` (response even says `status: "Escalated"`).
- Smallest input A: uphold the seeded escalated flag → `flag_status` stays `Escalated` → the flag **stays in the escalation lane** with live Overrule/Uphold buttons; a second Uphold 409s (`USER-003`).
- Smallest input B: uphold, then overrule the same flag → **200 Approved**, owner **still Terminated** (§6 CONF-6). No API or UI path returns an account to Active, so the ban is irreversible while the content is approved.
- Impact: the lane accumulates upheld items permanently; the approved-flag-with-banned-owner combination is reachable and invisible to the operator (the lane shows an Approved-flag row only after a manual status filter).

### BUG-8 · Audit CSV export silently caps at 10000 rows — MEDIUM — **Confirmed (reading)**
`audit.ts:114` appends `LIMIT 10000` with no marker, no continuation, and no `meta.truncated` signal. Smallest input: >10000 rows matching the filter → the CSV ends at 10000 data rows as if complete. Impact: an auditor treats a truncated export as the full ledger. (Not reproduced live: inserting >10000 test rows would pollute the append-only demo ledger.)

### BUG-9 · Lists beyond page 1 are unreachable in the UI — MEDIUM — **Confirmed (request + reading)**
The API supports `page`/`size` everywhere; the UI never passes them and renders no pager (UsersPage, QueuePage, AuditPage). Confirmed: `GET /audit` returned 25 rows with `meta.total = 581` (§6 CONF-9) — 556 events invisible in the explorer. Impact: once the queue holds >20 pending flags, flags 21+ cannot be seen or decided; the audit explorer shows only the first 25 events of any filter. (The audit total is inflated by this audit's own confirmation traffic — see §6 note.)

### BUG-10 · The bulk endpoint opens a client it never uses — LOW/MEDIUM — **Confirmed (reading)**
`moderation.ts:234-247`: `const client = await pool.connect()` … `client.release()` wraps the loop, but every statement uses `pool.query`. The connection is dead weight, and its presence implies an atomicity the loop does not have (each `decideFlag` commits independently). Smallest input: any bulk call — a connection is borrowed and returned untouched.

### BUG-11 · No-op role assignments (and same-value settings writes) still write audit rows — LOW — **Confirmed (request)**
`POST /users/:id/role` with the current role → 200 + audit `Role Assigned` with `from == to` (§6 CONF-8). Same for settings PUT/toggle with unchanged values. Impact: ledger noise that makes "count of role changes" style readings unreliable; harmless to state.

### BUG-12 · The JWT carries role/permissions that are stale and never read; the UI's "next sign-in" claim is wrong — LOW — **Confirmed (request)**
`signSessionToken` embeds role+permissions (`routes/auth.ts:28-33`); `requireAuth` reads only `claims.sub` (`middleware/auth.ts:33-41`) and re-derives role+permissions from the DB per request. Confirmed: after demoting the moderator, their existing cookie's `/auth/me` returned `role: viewer` while the JWT still claimed `moderator` + 5 permissions (§6 CONF-7) — moderation attempts through the same cookie 403. So revocation is *immediate*, and `UsersPage.tsx:317` ("takes effect on next sign-in") misdescribes the system. Impact today: none (the stale copy is inert); it is one fact stored twice with a latent drift trap if any future code trusts the claims.

### BUG-13 · CSV `createdAt` cells carry literal quote marks — LOW — **Confirmed (prior evidence, DISCREPANCIES row 18)**
`csv.ts:8-16` JSON-stringifies objects; `pg` returns `createdAt` as a `Date`, so the cell becomes `"""2026-11-20T…Z"""`. Recorded as an open defect on 20 Nov (O-15); listed here for completeness of the state model.

### BUG-14 · Comment/code mismatches (misleading contracts) — LOW — **Confirmed (reading)**
- `settings.ts:17` says "New keys are allowed" but `PUT` 404s unknown keys (`settings.ts:61`).
- `ConsoleLayout.tsx:10` says "the queue count badge appears only with real data" but no badge is rendered in the rail.

### BUG-15 · Invariants enforced by hope, not by the database — LOW — **Suspected (reading)**
a. **Single role per user**: no `UNIQUE(user_id)` on `user_roles` (migration 002); only the endpoint's delete-first pattern and the seed maintain it. Any direct-DB writer or concurrent bug yields multi-role users, and `requireAuth`'s join then returns one arbitrary role row while permissions accumulate from all rows.
b. **Role-less users display as viewer but do not filter as viewer**: display uses `COALESCE(r.name,'viewer')` (`users.ts:20`, `authService.ts:35`), but the role filter matches `r.name = 'viewer'` (`users.ts:49-52`), so a user with no `user_roles` row appears as Viewer in the list yet vanishes when filtering role=Viewer. No current API path creates role-less users, so this is latent.
c. **Permission matrix in three places**: seed.ts `ROLE_MATRIX` (authoritative, written to `role_permissions`), the DB tables (enforced), and `src/lib/permissions.ts` (visibility keys). Adding a permission server-side without adding it to the client mirror only silently hides controls — the UI would never offer a legitimate action, with no test catching the divergence.
d. **Decision/audit atomicity**: every mutation commits its state change first and writes the audit row second, with no wrapping transaction (`moderation.ts:188→193`, `users.ts:119→123`, `settings.ts:63→69`). A failure in between leaves a state change with no ledger row — the completeness guarantee ("every decision writes an immutable audit event", CON-MOD/CON-AUD) holds only when nothing fails. Suspected: not reproduced (needs fault injection between two statements).

### BUG-16 · Client session state ignores mid-session revocation — LOW — **Suspected (reading)**
`SessionContext` sets `user` only on load/login/logout; a suspended operator's open tab keeps rendering the console, the header keeps its static "Authenticated · JWT session verified" text (`ConsoleLayout.tsx:81`), and each API call surfaces a 403 error box. No redirect to /login occurs until reload.

### BUG-17 · The audited suggestion is not the displayed suggestion — LOW — **Confirmed (reading)**
The queue fetches suggestions when the list loads (`QueuePage.tsx:76-96`); `decideFlag` re-predicts at decision time (`moderation.ts:175-176`) and records that result with `followed`. If the model service changed state between display and decision (or the display fetch failed and the decision fetch succeeded), the audit's suggestion/`followed` fields describe a suggestion the operator never saw.

### BUG-18 · Known documented items (no new evidence) — INFO
- Rate limiter is in-memory per process; restarts reset buckets and multi-process deployments multiply the limit (documented D-018 upgrade path).
- Escalated content whose owner is hard-deleted makes uphold permanently 409 (`moderation.ts:300-302`); unreachable while users are soft-delete-only.

---

## 6. Confirmation commands and raw outputs

Environment: scratch API `127.0.0.1:3123` (Node 22.23.5 via `npx -y node@22`, `tsx src/index.ts`), local PostgreSQL 18 cluster on 5433 (`server/.pgdata`), model service **not** running (the fail-safe path — appropriate, since these checks exercise decisions, not predictions). Scripts were run from a temp directory outside the repository (`%TEMP%/kaziforce-audit/confirm*.mjs`), so no repo file changed. Demo data was restored afterwards with `npm run seed` + `npm run demo:reset` (both green; `audit_log` keeps the confirmation traffic, as it is append-only — this is why CONF-9's total reads 581).

Raw outputs (abridged to the lines that matter):

```text
CONF-1  GET /audit?/export.csv                          -> 200 application/json (JSON listing, 25 rows, no Content-Disposition)
        GET /audit?from=2026-01-01/export.csv           -> 422 {"code":"VALIDATION","message":"from must be YYYY-MM-DD"}
        GET /audit/export.csv (real endpoint)           -> 200 text/csv "id,createdAt,operatorId,..."
        GET /audit/export.csv as VIEWER                 -> 403 {"code":"AUTHZ-001","message":"Permission required: audit.export"}

CONF-2b 10 trials, two concurrent decisions per fresh Pending flag:
        trial 1: #1=200 #2=409 auditRows=1
        trials 2-10: #1=200 #2=200 auditRows=2
        trials with TWO audit rows for one originally-Pending flag: 9/10

CONF-3  moderator suspend on Terminated -> 200 {"status":"Suspended"}
        DB status after moderator suspend: Suspended

CONF-4b emulated route backends: BEGIN pid=32136 write pid=33744 COMMIT pid=33744
        split across backends: true
CONF-4c probe DURING "transaction": BLOCKED (55P03) / probe AFTER route-style COMMIT: acquired

CONF-5  after 8 concurrent failures: attempts= 2 locked= null

CONF-6  uphold -> 200 {"status":"Escalated","ownerBanned":true}
        flag_status after uphold: Escalated
        overrule after uphold -> 200 {"status":"Approved"}
        owner status after uphold+overrule: Terminated

CONF-7  JWT claims.role: moderator | claims.permissions count: 5
        old cookie /auth/me role now: viewer (fresh from DB, same cookie)

CONF-8  assign same role -> 200
        latest Role Assigned metadata: {"from":"viewer","to":"viewer"}

CONF-9  GET /audit -> rows: 25 meta.total: 581 (page size defaults to 25)
```

Restore evidence: `seed complete — SAMPLE DATA inserted (…)`; `Reset 0 account(s): locks cleared…audit_log was not modified (append-only).`

---

## 7. Not done / not measured

- No code was changed anywhere in the repository; the branch contains only this document (plus the PROGRESS entry).
- BUG-8 (10000-row export cap) and BUG-15d (state/audit atomicity) were not reproduced live: the former would require polluting the append-only ledger with >10000 rows, the latter needs fault injection between two statements. Both are deterministic from code.
- The frontend was not exercised in a browser during this audit (the findings about the UI are from component code and the API behaviour behind them).
- Performance, coverage and load figures: not measured (unchanged from the project's standing "not measured" list).
- The deployed Azure VM was not touched; nothing was pushed.
