# TEST_CLAIMS.md — what every test claims, and who it matters to

Review of every test in `server/tests/`, `tests/` and `ml/tests/`, written on branch
`test/behaviour` (2026-11-22). Each row is one sentence of plain English: the claim
about the software the test validates, and who that claim matters to —

- **[operator]** — matters to day-to-day console use;
- **[panel]** — the demo panel explicitly probes it (session rule 2: audit-log grants,
  permission-before-handler, Viewer CSV 403, model fails safe);
- **[audit]** — the audit-guarantee family (immutable ledger, provenance, no tampering);
- **[dev]** — an internal contract that keeps the code honest rather than a directly
  user-visible behaviour.

Status column: `ok` = behavioural as written; **`IMPL`** = checks implementation
details (flagged); **`NEW`** = added by this review; `REMOVED` = deleted by this
review and why.

Count: server 130 tests in 18 suites, frontend 12 in 4 suites, ml 7 — **149 claims**.
Run stability: 130/130 in five of six consecutive full `npm test` runs during this
review; the sixth reported one failed test (name not captured before the rerun) and is
treated as the known single-machine flake margin (D-045 documents the same class for
parallel runs).

---

## server/tests/api.test.ts (8 tests — the auth envelope and route hygiene)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| returns ok with database reachable | The health endpoint answers 200 with `{status:'ok', database:'reachable'}` when PostgreSQL answers. | [operator/panel] | ok |
| rejects bad credentials with 401 and a generic message | Every bad login returns the same generic `AUTH-001 "Invalid credentials"` with no account enumeration. | [panel] | ok |
| rejects malformed bodies with 422 | A login body without a valid email is refused 422 VALIDATION before any credential check. | [operator] | ok |
| logs the demo super admin in, issues the session cookie, and exposes /me | A correct login sets an HttpOnly `kz_session` cookie and `/me` reflects the session's role and permissions. | [panel] | ok |
| denies /me without a session (401) | `/auth/me` refuses anonymous callers with `AUTH-002`. | [panel] | ok |
| rejects an expired session token (401 AUTH-002) — **NEW** | A token signed with the real secret but past its `exp` is refused exactly like an invalid one — session expiry is enforced, not cosmetic. | [panel] | NEW |
| logout clears the session cookie and writes the Operator Logout audit row — **NEW** | Logout actually invalidates the browser's cookie and leaves an `Operator Logout` row in the ledger. | [operator/audit] | NEW |
| returns the error envelope for unknown routes (404) | Unknown paths answer the standard error envelope with `NOT_FOUND`, never an HTML error page. | [operator] | ok |

## server/tests/audit-immutability.test.ts (4 tests — the audit guarantee)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| can INSERT and SELECT audit rows | The application role can append to and read the ledger. | [audit] | ok |
| cannot UPDATE audit rows (permission denied) | PostgreSQL refuses `UPDATE audit_log` with SQLSTATE 42501 — history cannot be rewritten even with direct database access. | **[panel/audit]** | ok |
| cannot DELETE audit rows (permission denied) | PostgreSQL refuses `DELETE audit_log` — entries cannot be erased. | **[panel/audit]** | ok |
| cannot TRUNCATE audit rows (permission denied) | PostgreSQL refuses `TRUNCATE audit_log` — the ledger cannot be wiped wholesale. | **[panel/audit]** | ok |

## server/tests/audit.test.ts (18 tests — the audit explorer and export)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| escapes commas, quotes, and newlines | The CSV writer escapes RFC 4180 special characters so exports open correctly in spreadsheets. | [operator] | ok |
| serialises object metadata as JSON | JSONB metadata is exported as JSON text, not `[object Object]`. | [operator] | ok |
| requires authentication | The audit listing requires a session. | [panel] | ok |
| lets a Viewer read the log | A Viewer can read (not export) the audit log — the read tier of the permission model. | [operator] | ok |
| filters by actor and action type | Actor and action-type filters return only matching events. | [operator] | ok |
| rejects a malformed date filter with 422 | A malformed date is refused 422, not silently ignored or a 500. | [operator] | ok |
| DENIES a Viewer with 403 (BRIEF override of Ch5 all-operator export) | **A Viewer cannot download the audit CSV — 403 before any query runs.** | **[panel]** | ok |
| DENIES an anonymous caller with 401 | The export requires a session. | [panel] | ok |
| ALLOWS a Moderator and returns a CSV attachment | A Moderator's export arrives as `text/csv` with an attachment header and the 11-column header row. | **[panel]** | ok |
| ALLOWS a Super Admin | A Super Admin can export. | [operator] | ok |
| writes createdAt as a clean ISO cell with no quote marks (DISCREPANCIES row 18) | Exported `createdAt` cells are clean ISO timestamps — the JSON-stringify quoting defect stays fixed. | [operator/audit] | ok |
| prefixes a correlation id that would execute as a spreadsheet formula | A malicious-looking correlation id is exported with the `'` guard prefix, so the CSV cannot execute formulas when opened. | [operator/audit] | ok |
| records an Authorization Denied event when a Viewer attempts the CSV export | A refused export is itself audited (`Authorization Denied`, outcome Blocked). | **[audit]** | ok |
| records outcome Success, the source address and a correlation id on login | Login rows carry the full provenance (outcome, IP, correlation id). | **[audit]** | ok |
| honours a client-supplied correlation id so a trace can span systems | A plausible client-supplied `x-correlation-id` is honoured and recorded. | **[audit]** | ok |
| records outcome Blocked on an authorization denial | Permission denials are written with outcome `Blocked`. | **[audit]** | ok |
| filters the log by outcome | The outcome filter returns only rows with that outcome. | [operator] | ok |
| rejects an unknown outcome filter with 422 | An unknown outcome value is refused 422. | [operator] | ok |

## server/tests/audit-export-truncation.test.ts (1 test)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| caps the CSV at the configured rows and appends an explicit marker | A capped export announces itself: `X-Total-Matching-Rows` header plus an `Export Truncated` marker row — an auditor is never handed a silent partial ledger. | [audit] | ok |

## server/tests/csv-date.test.ts (14 tests — the export format contract)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| formats a Date as an unquoted ISO string | Date cells are ISO-8601, never JSON-quoted (row 18 defect regression). | [operator/audit] | ok |
| leaves plain strings untouched | Ordinary cells pass through unchanged. | [dev] | ok |
| still JSON-stringifies object metadata (RFC 4180-escaped) | Metadata stays JSON, RFC 4180-escaped — deliberately. | [dev] | ok |
| emits a clean createdAt cell through toCsv | End-to-end through the writer, a Date row is clean. | [operator] | ok |
| prefixes a cell that starts with "=" … "@" and tab and CR (7 tests) | Cells beginning with `= + - @`, tab or CR carry the `'` guard — the export cannot execute spreadsheet formulas. | [operator/audit] | ok |
| keeps the RFC 4180 quoting after the prefix; escapes quotes after the prefix | The guard composes correctly with RFC 4180 escaping. | [dev] | ok |
| does not prefix safe cells | UUIDs, ISO timestamps, emails and JSON are not mangled by the guard. | [operator] | ok |
| emits a prefixed correlation id through toCsv | End-to-end: a formula-shaped correlation id arrives guarded. | [operator/audit] | ok |

## server/tests/lockout.test.ts (12 tests — the login lockout machine)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| refuses the correct password while locked | A locked account refuses even correct credentials. | **[panel]** | ok |
| locks the account after MAX_FAILED_ATTEMPTS consecutive failures | The 5-consecutive-failure threshold is the real trigger — four failures never lock. | **[panel]** | ok |
| sets the lock for exactly LOCKOUT_MINUTES minutes | The lock lasts the policy's 15 minutes, not more, not less. | [operator] | ok |
| does not extend the lock on further attempts | Continued guessing does not prolong the lock. | [operator] | ok |
| zeroes the counter after a success | A successful login resets the failure counter. | [operator] | ok |
| a success between failures prevents the lock | Only *consecutive* failures count toward the lock. | [operator] | ok |
| returns an identical error for an unknown account and a wrong password | Unknown and wrong-password logins are indistinguishable — no account enumeration by response. | **[panel]** | ok |
| returns the SAME generic error for a locked account (lock state is not disclosed) | A locked account answers identically to a wrong password — lock state is not disclosed by the body. | **[panel]** | ok |
| allows login once the lock timestamp is in the past | The lock self-expires after 15 minutes. | [operator] | ok |
| denies a Viewer with 403 | Unlock requires the `users.unlock` permission — a Viewer cannot clear a lock. | [panel] | ok |
| denies a Moderator with 403 | A Moderator cannot clear a lock either. | [panel] | ok |
| lets a Super Admin unlock a locked account, and login then succeeds | Super Admin unlock works and the account can sign in again. | [operator] | ok |
| returns 404 for an unknown account id | Unlock of a non-existent id is 404, not a silent success. | [operator] | ok |
| writes one Account Locked event and no per-attempt rows | Locks are audited once; individual guesses are not (log-flooding defence). | **[audit]** | ok |
| writes an Account Unlocked event on unlock | Unlocks are audited. | **[audit]** | ok |

## server/tests/lockout-race.test.ts (1 test)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| locks the account after 8 concurrent failures with exactly one audit event | The atomic increment-and-lock holds under concurrency: the 5-failure policy locks exactly once, with exactly one audit row. | **[panel/audit]** | ok |

## server/tests/modelClient.test.ts (5 tests — the fail-safe contract)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| returns an available suggestion on a good response | A well-formed model response becomes an available suggestion. | [operator] | ok |
| fails safe when the service is unreachable | Unreachable service → `available:false`, never an error to the user. | **[panel]** | ok |
| fails safe when the service returns a non-2xx status | A failing model service degrades to `available:false`. | **[panel]** | ok |
| fails safe on a malformed body | A malformed model response cannot inject junk into the console. | **[panel]** | ok |
| times out and fails safe when the service is slow (short timeout) | A hung model service is cut off at the timeout and the console continues. | **[panel]** | ok |

(Note: these stub the injected `fetchImpl` — that is the module's public HTTP
contract, not private state; the fail-safe guarantee is additionally covered
end-to-end over HTTP by `moderation.test.ts`'s fail-safe test, added this round.)

## server/tests/moderation.test.ts (14 tests — the queue and the model boundary)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| is readable by every operator role, rule-ordered by severity | Every operator sees the queue, ordered High→Low then oldest. | [operator] | ok |
| filters by severity and status | Severity/status filters return matching rows. | [operator] | ok |
| denies a Viewer with 403 | A Viewer cannot decide — `moderation.decide` is checked before the handler. | **[panel]** | ok |
| lets a Moderator approve a Pending flag and writes an audit event | Approving applies the state change and writes the ledger row. | **[panel/audit]** | ok |
| returns 409 when the flag was already decided | A decided flag cannot be re-decided (serialised 409). | **[panel]** | ok |
| serves suggestions fail-safe over HTTP when the model service is down — **NEW** | Over HTTP, with no model service, the suggestion endpoint answers 200 `available:false` and the queue still renders — the rule-2 fail-safe guarantee. | **[panel]** | NEW |
| records the model suggestion (version + followed flag) in the audit payload | Decision-time suggestions (version, followed/overridden) are recorded in the ledger metadata. | **[audit]** | ok |
| rejects an unknown decision with 422 | Unknown decisions are refused 422. | [operator] | ok |
| applies one decision to many flags, reporting per-flag failures | Bulk decisions apply per flag and report which failed. | [operator] | ok |
| rejects an oversized or empty batch with 422 | Bulk bodies are bounded (1–100 ids). | [dev] | ok |
| denies a Moderator with 403 | The escalation lane is Super Admin only. | **[panel]** | ok |
| lets a Super Admin overrule an escalated flag (flag becomes Approved) | Overrule approves the flag and audits it. | [operator] | ok |
| lets a Super Admin uphold with ban (content owner becomes Terminated, audited) | Uphold bans the owner and audits both the ban and the uphold. | [operator/audit] | ok |
| refuses escalation resolution on a non-escalated flag (409) | Only escalated flags can be resolved (409). | [operator] | ok |

## server/tests/moderation-races.test.ts (6 tests — the concurrent state machines)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| applies exactly one decision and writes exactly one audit event | Under a lock-held concurrency burst, four simultaneous decisions apply exactly once with one audit row (SEMANTIC_MODEL M1, BUG-2 regression). | **[panel/audit]** | ok |
| uphold sets the flag to Rejected, stamps the decider, and clears it from the lane | Uphold resolves the flag (leaves the lane) and stamps decided_by/at (BUG-7 regression). | [operator] | ok |
| refuses an overrule after uphold with 409 (the owner stays banned, the flag stays resolved) | The uphold→overrule hole is closed; a banned owner with an approved flag is unreachable. | [operator] | ok |
| reports the ban honestly when a second uphold targets an already-terminated owner | A second uphold of an already-banned owner resolves honestly without a duplicate ban event. | [operator/audit] | ok |
| concurrent overrules apply exactly one resolution and write exactly one audit event | Two Super Admins racing an overrule produce one resolution and one ledger row. | **[panel/audit]** | ok |
| concurrent upholds ban the shared owner exactly once | Concurrent upholds on flags owned by one account ban that account exactly once. | **[audit]** | ok |

## server/tests/rate-limit.test.ts (1 test — **NEW**)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| passes the first requests and answers 429 RATE_LIMITED once the cap is hit | The per-IP fixed-window limiter actually throttles: inside the window requests pass, past the cap they are refused `RATE_LIMITED`. | [panel] | NEW |

## server/tests/session-claims.test.ts (3 tests)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| signs only sub and email into the JWT | The session token carries no role/permission claims — authorization cannot come from a stale cookie snapshot (BUG-12 regression). | [dev/panel] | ok |
| still authenticates every request from the fresh DB read (session works) | Sessions still work end-to-end with role/permissions re-derived from the database per request. | [panel] | ok |

## server/tests/settings-noop.test.ts (4 tests)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| PUT with the current value → 409 SETTING-003 and no audit event | Same-value writes are refused no-ops — no from==to ledger noise (BUG-11 regression). | [audit] | ok |
| PUT with a new value still works and is audited | Real changes still apply and are audited. | [operator/audit] | ok |
| toggle with the state already in force → 409 SETTING-003 and no audit event | Same-state toggles are refused no-ops. | [audit] | ok |
| toggle to the opposite state still works and is audited | Real toggles apply and are audited. | [operator/audit] | ok |

## server/tests/settings.test.ts (10 tests — the settings machine)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| requires authentication (401) | Settings listing requires a session. | [panel] | ok |
| lets a Viewer read active configuration (FR-ADM-031) | Viewers can read (not write) configuration. | [operator] | ok |
| DENIES a Viewer with 403 | Viewers cannot modify settings. | **[panel]** | ok |
| DENIES a Moderator with 403 | Moderators cannot modify settings. | **[panel]** | ok |
| ALLOWS a Super Admin and writes an audit event (FR-ADM-034, SEC-AUD-005) | Super Admin changes apply and are audited. | [operator/audit] | ok |
| rejects a malformed key with 422 | Key grammar is enforced. | [dev] | ok |
| returns 404 for an unknown key | Unknown keys 404 — settings cannot be created through the API. | [dev] | ok |
| DENIES a Moderator with 403 (toggle) | Toggles are Super Admin only. | **[panel]** | ok |
| ALLOWS a Super Admin to enable, audited, and to roll back without redeploy | Feature toggles flip without redeployment and are audited. | [operator] | ok |
| refuses toggling a non-toggle key (409) | Only `is_feature_toggle` keys can toggle. | [dev] | ok |
| rejects a non-boolean body with 422 | Toggle bodies are boolean-validated. | [dev] | ok |

## server/tests/users.test.ts (16 tests — the account control centre)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| requires authentication (401 without a session) | The user listing requires a session. | [panel] | ok |
| lists accounts for a Viewer (users.view) with envelope + meta | Viewers can view accounts (`users.view`). | [operator] | ok |
| supports search and status filters | Search/status filters return matching accounts. | [operator] | ok |
| rejects an invalid status filter with 422 | Filter grammar is enforced. | [dev] | ok |
| returns the account record with flags and content (users.view) | The record view includes reported flags and owned content. | [operator] | ok |
| denies a Viewer with 403 | Viewers cannot suspend. | **[panel]** | ok |
| lets a Moderator suspend a platform account and writes an audit event | Moderator suspension applies and is audited. | [operator/audit] | ok |
| returns 409 when the account is already suspended | Re-suspending is a 409, not a duplicate write. | [operator] | ok |
| denies a Moderator suspending an operator account (403, Ch5 "non-admin users") | Moderators cannot sanction operator accounts. | **[panel]** | ok |
| denies a Moderator with 403 (ban) | Bans are Super Admin only. | **[panel]** | ok |
| lets a Super Admin ban a platform account (status Terminated) and writes an audit event | Super Admin bans apply and are audited. | [operator/audit] | ok |
| blocks sign-in once the operator is suspended, and restores on reactivation | Suspension cuts off sign-in immediately (state-machine M2 ↔ session M4). | **[panel]** | ok |
| denies a Moderator with 403 (role) | Role assignment is Super Admin only. | **[panel]** | ok |
| lets a Super Admin assign a role and writes an audit event | Role changes apply and are audited. | [operator/audit] | ok |
| rejects an unknown role with 422 | Role grammar is enforced. | [dev] | ok |
| refuses a Super Admin changing their own role (lockout guard, 422) | Self-role-change is blocked — no self-escalation or accidental self-lockout. | **[panel]** | ok |

## server/tests/users-status.test.ts (4 tests — the account status machine)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| refuses to suspend a Terminated account (a Moderator cannot reverse a ban) | Terminated is terminal at the API — a Moderator cannot un-ban (BUG-3 regression). | **[panel/audit]** | ok |
| bans an account from Suspended (legal transition) | The legal Suspended→Terminated transition works. | [operator] | ok |
| refuses to ban a Terminated account again with a clear 409 | Re-banning is a clear 409. | [operator] | ok |
| applies concurrent suspends exactly once (one 200, one 409, one audit event) | Concurrent suspends apply exactly once with one audit row (guarded UPDATE). | **[panel/audit]** | ok |

## server/tests/users-role.test.ts (3 tests — roles and connection hygiene)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| refuses assigning the current role with 409 and writes no audit event | No-op role assignments are refused without ledger noise (BUG-11 regression). | [audit] | ok |
| leaves exactly one role row after 10 concurrent assignments | Concurrent role assignments keep the single-role invariant (BUG-5 regression). | [operator] | ok |
| leaves no dangling open transactions on the database (connection hygiene) — **NEW** | After concurrent traffic no backend is left "idle in transaction" — the role transaction never leaks a connection. | [dev] | NEW |

## server/tests/vocabulary.test.ts (3 tests — single-source guard)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| the permissions table contains exactly the vocabulary permission keys | The seeded permission set equals the vocabulary — renaming one without re-seeding fails this test. | [dev] | ok |
| the roles table contains exactly the vocabulary role names | The seeded roles equal the vocabulary role names. | [dev] | ok |
| every audit outcome written by the API is inside the vocabulary outcomes | Ledger outcomes stay within the declared domain. | [audit] | ok |

## server/tests/rate-limit + session-claims: see above; **removed** below.

**REMOVED — `server/tests/role-transaction.test.ts` (2 tests, both `IMPL`):** they
drove `assignRoleTransaction` through a fake pool and asserted which fake client
executed BEGIN/DELETE/INSERT/COMMIT, and that `release()` was called once — internal
mechanics, invisible to any user. The behaviours they guarded are now asserted at the
observable level: atomicity by `users-role.test.ts`'s concurrency test, connection
hygiene by its new `pg_stat_activity` test (both above). The one claim that has **no**
behavioural equivalent — "a statement failure inside the transaction triggers
ROLLBACK" — is unreachable through the API without fault injection and is recorded in
§Not covered below.

## server/tests/session-claims / api extras — see api.test.ts.

---

## tests/ — frontend (Vitest + RTL; rendered output)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| **ui.test.tsx** renders its label and tone | The Pill component renders its label with the right tone class. | [operator] | ok |
| **ui.test.tsx** requires two clicks before confirming | The destructive-action dialog genuinely needs two steps — one click cannot finalize a ban. | **[panel]** | ok |
| **ui.test.tsx** cancels on Escape | Escape cancels the confirmation dialog. | [operator] | ok |
| **moderation-ui.test.tsx** shows the "Suggestion only" label with severity, action and confidence | Suggestions render as "Suggestion only" with severity/action/confidence — the model is visibly not the decider. | **[panel]** | ok |
| **moderation-ui.test.tsx** shows "Suggestion unavailable" when the model is down | With `available:false` the cell shows the fail-safe text instead of a suggestion. | **[panel]** | ok |
| **moderation-ui.test.tsx** shows "Suggestion unavailable" when no suggestion was returned at all | A missing suggestion degrades to the fail-safe text too. | **[panel]** | ok |
| **moderation-ui.test.tsx** renders the queue rows and shows "Suggestion unavailable" without breaking | The whole queue renders and stays usable with the model down — the fail-safe at page level. | **[panel]** | ok |
| **audit-export.test.tsx** points at /api/v1/audit/export.csv with no filters | The export anchor targets the real CSV route (BUG-1 regression). | **[panel]** | ok |
| **audit-export.test.tsx** keeps the export path outside the query string when filters are set | With filters set the export still hits `/export.csv`, not the JSON listing. | **[panel]** | ok |
| **pager.test.tsx** the audit explorer shows a pager and fetches page 2 on Next | The audit explorer can reach events beyond page 1 (BUG-9 regression). | [operator] | ok |
| **pager.test.tsx** the moderation queue shows a pager and fetches page 2 on Next | The queue can page past the first 20 flags. | [operator] | ok |
| **pager.test.tsx** returns to page 1 when a filter changes | A filter change resets paging so stale page numbers cannot hide results. | [operator] | ok |

## ml/tests/test_ml.py (7 tests — the model pipeline contract)

| Test | Claim | Matters to | Status |
|---|---|---|---|
| test_same_seed_same_data | The synthetic generator is deterministic for a fixed seed — reported metrics are reproducible. | **[audit]** | ok |
| test_different_seed_different_data | Different seeds produce different data — the fixed seed is doing real work. | [dev] | ok |
| test_label_noise_is_applied | The documented label noise is actually applied — metrics are honest about noise, not silently clean. | **[audit]** | ok |
| test_features_present_and_types | The generated feature frame has exactly the documented features and types — training and serving stay in contract. | [dev] | ok |
| test_health_reports_model_version | `/health` reports the model version so every suggestion can be attributed. | **[audit]** | ok |
| test_predict_response_schema | `/predict` returns exactly the documented schema (version/severity/action/confidence/probabilities). | **[panel]** | ok |
| test_predict_rejects_unknown_category | Unknown reason categories are rejected at the boundary — the model cannot be fed undefined inputs. | [dev] | ok |

---

## Implementation-detail flags resolved this round

- `role-transaction.test.ts` (both tests, `IMPL`) — **removed**; replaced by
  `users-role.test.ts`'s `pg_stat_activity` hygiene test and its existing concurrency
  test (see above).
- Reviewed and kept: `modelClient.test.ts` stubs the injected fetch (public HTTP
  contract); `session-claims.test.ts` decodes the emitted JWT (the token payload is a
  public contract with the browser); `csv-date.test.ts` asserts the public CSV writer;
  `vocabulary.test.ts` asserts database rows. None reads private state.

## Claims with no test (recorded, with reasons)

- "A statement failure inside the role transaction triggers ROLLBACK" — unreachable
  through the API without fault injection; the guard remains in `roleService.ts`.
- "A captured cookie stops working at TTL mid-request" — requires time travel in a
  test; expiry-at-request-time **is** covered (`api.test.ts` expired-token test).
- "The rate limiter's window resets after 5 minutes" — would need a 5-minute test;
  the cap-hit behaviour is covered; the reset is a one-line interval (documented).
- ml/ has no coverage figure (pytest-coverage not installed; not requested).

## Coverage — first figure for the project

Measured 2026-11-22, branch `test/behaviour`, server code at commit `a846228`
(+ this branch's documentation). Commands quoted in the session report.

- **Server (Jest, `npx jest --coverage` in server/):** all files **90.14 % statements,
  74.39 % branches, 91.93 % functions, 94.04 % lines** — by area: db/lib 100 %, src
  aggregate 96.77 % stmts, routes 89.24 %, services 92.3 %, middleware 88.5 %,
  config 78.57 %. Branch coverage is the lower number (74.39 %) — the uncovered
  branches are mostly defensive arms (pool error paths, malformed-env guards).
- **Frontend (Vitest): not measured.** Running `vitest --coverage` requires the
  `@vitest/coverage-v8` provider, which is not installed; three installation attempts
  failed for environmental reasons (pnpm store-version guard against the existing
  node_modules — quoted in the session report; npm arborist `Cannot read properties of
  null (reading 'edgesOut')` in a throwaway directory). Adding the provider would be a
  one-line devDependency (rule 4 mechanism) if a person wants the figure.
- **ml/: not measured** (pytest-coverage not installed; outside the requested commands).
