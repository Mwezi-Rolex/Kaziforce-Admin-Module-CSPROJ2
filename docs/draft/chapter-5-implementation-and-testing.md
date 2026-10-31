# Chapter 5: System Implementation and Testing

DRAFT — Chapter 5. Written per the guidance in *Research Writing for CS 2 Projects
(2026)*: past tense for completed work, present tense for what tables and figures
show, third person throughout. Every measured figure cites the command that
produced it. Items not yet observed are marked **not yet verified**.

The organisation is referred to as "the industry partner" or "the platform". The
interface brand shown in screenshots is the product name.

## 5.1 Introduction

This chapter documents how the Admin and Moderation System was implemented and
how it was tested. Section 5.2 records the environment in which the software was
built and run. Section 5.3 describes each implemented module and the requirements
it satisfies. Section 5.4 sets out the testing strategy and the test cases with
their observed outcomes. Section 5.5 records the version-control evidence.
Section 5.6 declares the use of AI assistance. Section 5.7 reports the results
against the specific objectives, and Section 5.8 states the limitations of the
implementation and of the evidence.

**Scope statement.** The delivered system implements the **Admin and Moderation
console subset** of the platform requirements. It is not the whole platform.
Fifty-five requirements of the Software Requirements Specification are in scope,
together with twenty-nine console requirements that the SRS does not enumerate;
the remaining 1,540 SRS identifiers fall outside this build. The complete
in-scope list with per-row status is maintained in `docs/TRACEABILITY_SCOPE.md`.

## 5.2 Implementation Environment

### 5.2.1 Hardware

Table 5.1 records the development machine. The software is not demanding: the
largest single artifact is the trained model file at 23.5 MB, and the frontend
bundle is 386 kB before compression.

**Table 5.1: Development hardware specification**

| Component | Specification |
|---|---|
| Processor | AMD Ryzen 5 5625U with Radeon Graphics |
| Installed memory | 7.4 GB |
| Operating system | Microsoft Windows 11 Home Single Language (build 10.0.26300, 64-bit) |
| Storage | Local SSD (project volume) |
| Network | Local host only; no external service is required to run the system |

Evidence: `powershell -NoProfile -Command "(Get-CimInstance Win32_Processor).Name; (Get-CimInstance Win32_OperatingSystem).Caption"`.

### 5.2.2 Software and services

**Table 5.2: Software and service versions**

| Software / service | Version | Role in the system | Evidence command |
|---|---|---|---|
| Node.js | v20.15.1 | Runtime for the API and the frontend build | `node --version` |
| npm | 10.7.0 | Dependency installation and script execution | `npm --version` |
| pnpm | 10.x (invoked as `npx pnpm@10`) | Lockfile-based dependency resolution for the frontend | `npx pnpm --version` |
| PostgreSQL | 18.6 | Relational store, including the append-only audit ledger | `psql --version` |
| Python | 3.12.4 | Runtime for the model service | `python --version` |
| React | 19.x | Frontend user interface | `package.json` |
| Vite | 8.3.5 | Frontend dev server and production bundler | build output banner |
| Tailwind CSS | 4.x | Utility styling carrying the design tokens | `package.json` |
| Express | 5.x | HTTP API framework | `server/package.json` |
| scikit-learn | 1.7.2 | Random Forest and Isolation Forest implementations | `pip freeze` → `ml/requirements.txt` |
| FastAPI / Uvicorn | 0.162.0 / 0.38.0 | Model service HTTP layer | `ml/requirements.txt` |
| Jest / Supertest | 30.x / 7.x | API and service unit and integration tests | `server/package.json` |
| Vitest / React Testing Library | 5.x / 16.x | Frontend component tests | `package.json` |
| pytest | 9.2.0 | Model-service tests | `ml/requirements.txt` |

The full resolved Python dependency set is pinned in `ml/requirements.txt`,
generated with `pip freeze` from the working environment rather than written by
hand.

### 5.2.3 Reproducibility and deployment

The system is reproducible from the repository. `README.md` documents the
prerequisites, the two database roles, the environment variables and the run and
test commands. Database schema changes are applied by ordered, tracked migrations
(`server/migrations/001`–`008`), so a fresh database is built with
`npm run migrate`.

Deployment is described honestly: **the system runs as a local prototype.** It
has not been deployed to a public host. Deployment artifacts and a runbook for an
Ubuntu virtual private server with Nginx were produced (`deploy/`,
`docs/DEPLOY.md`), but the server has not been provisioned and the runbook has
not been executed end to end; the steps that could not be verified are marked in
that document, and the deployment remains **not yet verified**.

## 5.3 System Implementation

Implementation proceeded in vertical slices. Each slice delivered a complete
screen with its API, validation, role checks, audit writes and loading and error
states, and each was committed separately. The slice order and the requirements
in each slice are recorded in `docs/PLAN.md` and `docs/TRACEABILITY_SCOPE.md`.

### 5.3.1 Database layer

Eight migrations define the schema. The `users` table carries the account record
with a soft-delete flag, so accounts are never physically removed. The `flags`
table carries the moderation workflow with a constrained status domain
(`Pending`, `Approved`, `Rejected`, `Escalated`), and `content_items` holds the
flagged marketplace content.

The central design decision is that **audit immutability is enforced by the
database, not by application code.** Two roles exist. `kaziforce_owner` owns the
schema and runs migrations; `kaziforce_app` is the runtime role. The application
role is granted `SELECT` and `INSERT` on `audit_log` and nothing else, so an
`UPDATE`, `DELETE` or `TRUNCATE` issued by the application fails at the database.

**Table 5.3: Audit-ledger privileges for the application role**

| Privilege | Granted | Verification |
|---|---|---|
| SELECT | yes | required to read the log |
| INSERT | yes | required to append events |
| UPDATE | no | refused, SQLSTATE 42501 |
| DELETE | no | refused, SQLSTATE 42501 |
| TRUNCATE | no | refused, SQLSTATE 42501 |

Evidence: `psql "$DATABASE_URL" -c "SELECT has_table_privilege('kaziforce_app','audit_log','SELECT') AS sel, ... 'UPDATE' ... 'DELETE' ..."` returns
`sel = t, upd = f, del = f`. The same guarantee is asserted by an automated test
and by the deployment smoke test (§5.4).

### 5.3.2 Identity and access module

Authentication uses an email and password verified with bcrypt, and issues a
signed JSON Web Token carried in an `httpOnly`, `SameSite=Lax` session cookie.
The account's current status is re-checked on every authenticated request, so a
suspension takes effect immediately rather than at the next token refresh.

Authorisation is enforced by a permission matrix held in the database across
three tiers. `Viewer` holds read-only permissions, `Moderator` may decide
moderation items and suspend platform accounts, and `Super Admin` additionally
assigns roles, bans accounts, manages settings and clears login locks. Each
protected endpoint declares the permission it requires, and the check runs before
the handler.

A refused authorisation is itself recorded: `requirePermission` writes an
`Authorization Denied` event naming the missing permission, the role and the
requested path. A session with insufficient privilege receives HTTP 403 rather
than a disguised 404, so an authenticated operator is told that access was
refused rather than misled about the resource's existence.

Login lockout was added to close the one security gap identified in the
requirements walk. Five consecutive failed logins lock the account for fifteen
minutes; a successful login resets the counter; a Super Admin can clear the lock
through the console. Unknown account, wrong password and locked account all
return the same generic `401 Invalid credentials`, so the response does not
disclose whether an address is registered or whether it is locked. Only lock and
unlock events are written to the ledger; individual failed attempts are
deliberately not recorded, so a password-guessing run cannot flood the audit
table.

**Design note.** Because a locked account is refused with the same message as a
wrong password, a locked operator is not told that the account is locked. This is
the deliberate cost of not disclosing account state; the Super Admin unlock
control is the recovery path.

### 5.3.3 User management module

The User Control Centre lists platform accounts with search and filtering by
query, role and account status. Selecting an account opens a record panel showing
the account's role, status, creation date, the flags it has reported and the
content it owns.

Accounts are reviewed and their state controlled; they are **not created or
deleted** through this interface, because accounts originate in the marketplace
platform. This is a deliberate narrowing of the "account CRUD" wording used in
Chapter 1, and is recorded as a documentation discrepancy in
`docs/draft/DISCREPANCIES.md`. Suspension is available to Moderators for platform
accounts; role assignment, permanent bans and clearing login locks require Super
Admin authority. Every one of these actions writes an audit event.

### 5.3.4 Content moderation queue module

The moderation queue presents flagged items ordered by a rule-based severity
ranking, with filters for severity and status. A Moderator may approve, reject or
escalate an individual item, and may apply a bulk approve, reject or escalate to
a selected set. Only items in the `Pending` state are decidable; a second attempt
on an already-decided item is refused with HTTP 409 rather than silently
reapplied.

Escalated items move to a Super Admin review lane, where the activity diagram's
two outcomes are implemented: **overrule**, which returns the flag to approved,
and **uphold and ban**, which terminates the content owner's account and writes
both an account-termination event and an escalation-upheld event.

**Machine-learning integration.** The queue additionally displays a model
suggestion for each item: a predicted severity, a suggested action and a
confidence score, labelled "Suggestion only". The model never changes a flag, an
account or a setting. A sorting control orders the queue by predicted severity.
If the model service is unavailable or slow, the interface shows "Suggestion
unavailable" and every moderation action continues to work unchanged. When a
moderator decides, the audit event records the model version, the suggested
severity, action and confidence, and a boolean indicating whether the moderator
**followed or overrode** the suggestion — so that live decisions can later become
labelled training data.

### 5.3.5 Audit logging module

Every state-changing endpoint calls a single auditing service. Each event records
the operator, the action type, the target entity, a JSON metadata payload and a
server-generated UTC timestamp. The Audit Explorer provides date-range, actor and
action-type filters over the log and presents it read-only; no control to modify
or delete an event exists anywhere in the interface, and none could succeed if it
did.

CSV export is restricted to Moderators and Super Admins. The control is hidden
from a Viewer, **and** the server returns HTTP 403 if a Viewer requests the
export URL directly. This restriction is an explicit instruction that overrides
the earlier requirement that every operator could export (recorded as
discrepancy 5).

### 5.3.6 System settings module

The settings panel exposes a key/value configuration store and a feature toggle,
gated to Super Admin. Changes take effect without redeployment, and flipping a
toggle back is the rollback path. Each change is audited with its previous and
new value.

The keys are named `sample.*`. The source documentation defines the settings
interface but names no concrete keys or toggles, so the interface is demonstrated
with clearly-labelled sample configuration rather than invented platform
settings. The same restraint applies to the dashboard, whose analytical area is
left unpopulated because no KPI set is defined in any source document.

### 5.3.7 Model service

The model service is a separate Python process implementing two components.

Component A predicts, for each flag, a severity class (`Low`, `Medium`, `High`)
and a suggested action (`approve`, `reject`, `escalate`) with a confidence score.
Training data is synthetic, generated by a documented script with a fixed seed
because the industry partner's live data is governed by a non-disclosure
agreement. Six feature families are used: reason category, content type, text
features derived from the report text, reporter history, account age and prior
flags on the same account. Label noise is injected at documented rates — 15 per
cent for severity and 12 per cent for the action — so the task is not trivially
separable, and these are the observed labels the models are trained and scored
against.

The data is split into training, validation and test partitions **before any
model is fitted**. Four models are compared: a Random Forest, logistic
regression, a majority-class baseline and a deterministic keyword-rule baseline.

Component B applies an Isolation Forest to operator activity windows using four
features (actions per hour, bulk-action share, off-hours share and reject-to-approve
ratio). It is presented as a pipeline check over injected synthetic anomalies in
the audit explorer for Super Admin review; it does not act on its own.

The service binds to the loopback interface only and is never published through
the web server. Results are reported in §5.7.

### 5.3.8 Public interface

The console is wrapped in a minimal public site: a landing page, a sign-in page
and a not-found page. The landing page was designed from the existing design
tokens. The product name in the interface replaced the placeholder brand from the
design export, and the wireframe role-switching control present in that export
was removed entirely, because the operator's role is derived from the signed
session and must not be self-selectable.

## 5.4 Testing

### 5.4.1 Strategy

Testing followed the guidance that every test should map to a requirement, and
that failures should be recorded rather than hidden. Four layers were used:

1. **Unit and integration tests of the API** (Jest with Supertest), driven
   through real HTTP requests against a seeded database, so that permission
   checks, validation and audit writes are exercised as deployed.
2. **Database-level tests of the immutability guarantee**, issuing unauthorised
   modification commands against the audit table as the application role and
   confirming each is refused.
3. **Frontend component and service tests** (Vitest with React Testing Library),
   including the model client's timeout and failure paths.
4. **Model-service tests** (pytest), covering determinism of data generation and
   the prediction response schema.

Acceptance criteria were that all tests pass, that every role that must be
refused is refused with the correct status code, and that the audit ledger
cannot be modified by the application.

### 5.4.2 Test results summary

**Table 5.4: Test suite results**

| Suite | Command | Result |
|---|---|---|
| API and service tests (Jest + Supertest) | `cd server && npm test` | 8 suites passed, **81 tests passed**, 0 failed |
| Frontend tests (Vitest + RTL) | `npx pnpm test` | 2 files passed, **7 tests passed**, 0 failed |
| Model service tests (pytest) | `ml/.venv/Scripts/python -m pytest ml/tests -q` | **7 passed**, 0 failed |
| Frontend type check | `npx pnpm typecheck` | exit 0, no errors |
| API type check | `cd server && npm run typecheck` | exit 0, no errors |
| Production build | `npx pnpm build` | success — JS 386.23 kB (116.71 kB gzipped), CSS 32.47 kB (7.64 kB gzipped) |
| Deployment smoke test (local) | `deploy/smoke-test.sh` | **12 passed, 0 failed, 1 skipped** |

Test coverage percentage is **not measured**. No coverage run was performed, so no
coverage figure is claimed anywhere in this report.

### 5.4.3 Test cases

**Table 5.5: Representative functional test cases**

| Test ID | Traceability | Scenario, data and conditions | Expected result | Actual result and evidence | Verdict |
|---|---|---|---|---|---|
| TC-01 | SEC-AUTH-002, CON-AUTH-001 | Sign in with a seeded operator's correct credentials | HTTP 200, session cookie issued, role returned | 200 with `kz_session` cookie; `tests/api.test.ts` | Pass |
| TC-02 | SEC-AUTH-001 | Request a protected endpoint with no session | HTTP 401 | 401 `AUTH-002`; `tests/api.test.ts` | Pass |
| TC-03 | SEC-AUTH-008, CON-USR-007 | Submit five consecutive wrong passwords | Account locked; the fifth attempt's lock recorded | Lock set 15 min; `tests/lockout.test.ts` | Pass |
| TC-04 | SEC-AUTH-008 | Sign in with the correct password while locked | Refused with the same generic error | 401 `AUTH-001`, message `Invalid credentials`; `tests/lockout.test.ts` | Pass |
| TC-05 | SEC-AUTH-008 | Fail four times, succeed, then fail four times again | No lock (failures are consecutive) | No lock; `tests/lockout.test.ts` | Pass |
| TC-06 | Security (enumeration) | Compare the response for an unknown account with a wrong password | Byte-identical error payload | Identical error object; `tests/lockout.test.ts` | Pass |
| TC-07 | SEC-AUTH-008, CON-USR-007 | Unlock a locked account as Super Admin | Lock cleared; the account can sign in | 200, then successful login; `tests/lockout.test.ts` | Pass |
| TC-08 | SEC-AUTH-008, SEC-RBAC-001 | Attempt unlock as Viewer and as Moderator | HTTP 403 for both | 403 `AUTHZ-001`; `tests/lockout.test.ts` | Pass |
| TC-09 | CON-USR-005, SEC-AUD-003 | Permanent ban as Super Admin through the two-step dialog | Account terminated, audit event written | 200, status `Terminated`, `Account Terminated` event; `tests/users.test.ts` | Pass |
| TC-10 | CON-USR-005 | Attempt permanent ban as Moderator | HTTP 403 | 403 `AUTHZ-001`; `tests/users.test.ts` | Pass |
| TC-11 | CON-MOD-002, SEC-AUD-003 | Approve a pending flag as Moderator | Status becomes approved; audit event written | 200, `Content Approved` event; `tests/moderation.test.ts` | Pass |
| TC-12 | CON-MOD-002 | Decide a flag that is already decided | HTTP 409, state unchanged | 409 `FLAG-002`; `tests/moderation.test.ts` | Pass |
| TC-13 | CON-MOD-003 | Apply a bulk decision to two items where one is already decided | One applied, one reported as skipped | `applied: 1, failed: 1`; `tests/moderation.test.ts` | Pass |
| TC-14 | CON-MOD-004 | Uphold an escalation with a ban as Super Admin | Owner terminated, two audit events | Owner status `Terminated`; `tests/moderation.test.ts` | Pass |
| TC-15 | CON-MOD-004 | Resolve an escalation as Moderator | HTTP 403 | 403 `AUTHZ-001`; `tests/moderation.test.ts` | Pass |
| TC-16 | CON-AUD-003 | Request the audit CSV export as a Viewer | HTTP 403, permission named | 403 `AUTHZ-001`, message names `audit.export`; `tests/audit.test.ts` | Pass |
| TC-17 | CON-AUD-003 | Request the same export as a Moderator | HTTP 200 with a CSV attachment | 200, `text/csv`, correct header row; `tests/audit.test.ts` | Pass |
| TC-18 | CON-AUD-004, SEC-AUD-006 | Issue `UPDATE audit_log` as the application role | Refused | SQLSTATE 42501; `tests/audit-immutability.test.ts` | Pass |
| TC-19 | CON-AUD-004, SEC-AUD-006 | Issue `DELETE audit_log` as the application role | Refused | SQLSTATE 42501; `tests/audit-immutability.test.ts` | Pass |
| TC-20 | CON-AUD-004, SEC-AUD-006 | Issue `TRUNCATE audit_log` as the application role | Refused | SQLSTATE 42501; `tests/audit-immutability.test.ts` | Pass |
| TC-21 | SEC-AUD-002 | Request the CSV export as a Viewer, then read the log | An `Authorization Denied` event naming the permission | Metadata `{requiredPermission: 'audit.export', role: 'viewer'}`; `tests/audit.test.ts` | Pass |
| TC-22 | FR-ADM-026, CON-SET-001 | Toggle a feature flag as Super Admin | Value changes, no redeployment, audited | 200, `Feature Toggle Changed` event; `tests/settings.test.ts` | Pass |
| TC-23 | FR-ADM-004, CON-SET-001 | Save a settings value as Viewer and as Moderator | HTTP 403 for both | 403 `AUTHZ-001`; `tests/settings.test.ts` | Pass |
| TC-24 | FR-ERR-004 | Send a malformed settings key | HTTP 422 with an actionable message, no stack trace | 422 `VALIDATION`; `tests/settings.test.ts` | Pass |
| TC-25 | CON-ML-A-001 | Start the model service and open the queue | "Suggestion only" with severity, action, confidence | Suggestion rendered; `tests/moderation-ui.test.tsx` | Pass |
| TC-26 | CON-ML-A-001 | Stop the model service and open the queue | "Suggestion unavailable"; decisions still work | Fail-safe text shown, Approve still present; `tests/moderation-ui.test.tsx` | Pass |
| TC-27 | CON-ML-A-001 | Model service does not respond within the timeout | Client aborts and fails safe | `AbortError` → unavailable, within 500 ms; `tests/modelClient.test.ts` | Pass |
| TC-28 | ML rules (determinism) | Generate the synthetic dataset twice with the same seed | Identical data | Frames byte-identical; `ml/tests/test_ml.py` | Pass |
| TC-29 | ML rules (schema) | Call `POST /predict` | Response carries version, severity, action, confidence, probabilities | Schema asserted, probabilities sum to 1; `ml/tests/test_ml.py` | Pass |
| TC-30 | CON-AUD-001 | Perform any state-changing action | An audit row exists for it | Asserted per action across suites | Pass |

Every row above was produced by the command named in the "Actual result" column.
No test result in this table is estimated.

### 5.4.4 Deployment smoke test

A single script verifies the four behaviours the panel is expected to probe
against a running deployment: that login works, that a Viewer is refused on the
log download, that a Moderator action succeeds and is audited, and that `UPDATE`,
`DELETE` and `TRUNCATE` on the audit ledger are refused for the application role.
Run locally against the live API and database, it reported **12 passed, 0 failed,
1 skipped**. The single skip is the check that the model service is not publicly
reachable, which requires the Nginx origin and therefore could not execute in a
direct-to-API run; the script reports it as skipped rather than passed.

### 5.4.5 Defects found and corrected during testing

Recording defects is required, so the following were found by the tests and
fixed. None remain open.

| Defect | How it was found | Resolution |
|---|---|---|
| An empty search parameter produced a database error (unused bind parameter) | Account list test | Parameter list rebuilt conditionally |
| The seed script was not idempotent and duplicated sample flags, and could leave an account with two roles | Repeated test runs | Sample rows replaced on re-seed; single-role enforcement |
| A validation error that escaped route-level parsing returned HTTP 500 and leaked an internal error shape | Settings malformed-key test | Zod errors mapped centrally to 422 with an actionable message |
| A sorting rule in the model test compared whole response bodies including the timestamp, producing a false failure | Lockout disclosure test | Assertion narrowed to the error payload |
| The development runner failed to start the model service because the workspace path contains a space and was passed to the shell unquoted | Running the runner | Spawned without a shell for the real executable |
| The queue's sidebar badge count was hard-coded to a value that did not match the data | Design audit | Corrected when the queue became data-driven |

One flaky failure was observed once when the API suite was invoked directly
without `--runInBand`, letting suites share a database and interfere. It did not
reproduce across six sequential runs of the configured command. The configured
`npm test` script uses `--runInBand` and is stable.

### 5.4.6 Accessibility and responsive testing

Colour contrast was measured programmatically rather than judged by eye. A script
computed the WCAG contrast ratio of every text colour against every light surface
in the interface. Thirty-one tokens fell below the required 4.5:1 for normal text
and were darkened to the nearest compliant value with their hue preserved; the
lowest measured ratio afterwards is at or above 4.5:1 on all surfaces. The
keyboard focus indicator measured 2.48:1, below the 3:1 required for non-text
user-interface components, and was replaced with a value measuring at least
3.03:1 on every surface including the dark panel. The methods and results are
recorded in `docs/BROWSER_CHECKLIST.md` and `docs/DECISIONS.md`.

The layout uses breakpoints at 1200 px and 900 px in addition to the original
design's single 1000 px breakpoint, so the navigation rail narrows and multi-column
panels stack on tablet-width viewports. The compiled stylesheet was inspected to
confirm these rules survive the build.

**Not yet verified.** Manual checks in Chrome, Firefox and Edge, including the
tablet-to-desktop width sweep, have not been performed. The step-by-step
checklist for doing so is `docs/BROWSER_CHECKLIST.md`; results will be recorded
there. Accessibility has not been tested with a screen reader.

## 5.5 Version Control

The project is a Git repository with 19 commits at the time of writing. Work was
committed slice by slice, with the requirement identifiers named in the commit
message, for example:

- `feat(users): user management slice — search/filter/suspend/ban/role, audited, role-denied [CON-USR-001..006,...]`
- `feat(ml): suggestion-only severity/action model (RF vs baselines) + Isolation Forest anomalies [CON-ML-A-001,CON-ML-B-001]`
- `feat(deploy): Nginx config, systemd units, SQL role/grant scripts, prod env, verified smoke test [CON-DEP-001,...]`
- `feat(auth): login lockout with Super Admin unlock, production seed guards, dev:all runner [SEC-AUTH-008,...]`

The repository contains a README covering prerequisites, database setup, the two
roles, environment variables and the run and test commands; a `.gitignore`
excluding `node_modules`, build output, environment files and generated model
artifacts; and no committed credentials. The two database passwords and the token
signing secret are generated at setup time and written only to a gitignored
environment file.

The repository has not been tagged with a release version and has not been pushed
to a remote; both remain to be done before submission.

## 5.6 Declaration of AI Use

AI assistance was used materially in this project and is declared here as the
writing guide requires. It was used to analyse the supervisor documents, to draft
and implement code, to write the automated tests, and to draft this chapter from
recorded results. It was **not** used to fabricate data: all training data is
synthetic and generated by a committed script with a fixed seed, and all test
counts, metrics and measurements in this report were produced by commands that
are named alongside them. Any figure that could not be produced by a command is
marked "not measured" or "not yet verified" rather than estimated.

## 5.7 Results and Discussion

Results are reported against the specific objectives.

**Objective (i) — examine governance and moderation challenges.** Addressed in
Chapters 1 and 2 and not re-examined here.

**Objective (ii) — review existing systems and identify gaps.** Addressed in
Chapter 2.

**Objective (iii) — design a role-based administration and content moderation
architecture.** The architecture is implemented and observable: three privilege
tiers enforced by a database-held permission matrix, a two-role database
separation, and an append-only ledger. The design is evidenced by eight tracked
migrations, the permission matrix, and `docs/PLAN.md`.

**Objective (iv) — develop and evaluate the system.** The system is developed and
automatically tested. The measured results are:

- **Role enforcement** is verified by tests that assert the correct refusal for
  every role that must be denied: a Viewer is refused suspension, banning,
  moderation decisions and the log download; a Moderator is refused banning, role
  assignment, the escalation lane, settings changes and unlocking. Each refusal
  was asserted with its status code (`npm test`, 81 tests passed).
- **Audit immutability** is verified at the database level: `UPDATE`, `DELETE` and
  `TRUNCATE` against the ledger are all refused for the application role with
  SQLSTATE 42501, both in the automated suite and in the deployment smoke test.
- **Moderation workflow** is verified end to end: approve, reject and escalate
  transitions, bulk application with per-item outcomes, and the two escalation
  outcomes including the ban path.
- **The machine-learning component** produces the measured results in Table 5.6.

**Table 5.6: Model performance on the held-out test partition**

| Task | Model | Accuracy | Macro-F1 |
|---|---|---|---|
| Severity | Random Forest | 0.6700 | **0.6170** |
| Severity | Logistic regression | 0.6250 | 0.5812 |
| Severity | Majority-class baseline | 0.5075 | 0.2244 |
| Severity | Keyword-rule baseline | 0.5413 | 0.4613 |
| Suggested action | Random Forest | 0.5312 | 0.5303 |
| Suggested action | Logistic regression | **0.5525** | **0.5555** |
| Suggested action | Majority-class baseline | 0.4288 | 0.2001 |
| Suggested action | Keyword-rule baseline | 0.4075 | 0.3740 |

Component B recovered **43 of 43** injected anomalies in the synthetic activity
data (precision 0.9773, recall 1.0000).

Evidence: `ml/evaluate.py` writes `ml/reports/metrics.json`; the values above are
quoted from that file, not typed by hand.

Three points are stated plainly rather than smoothed over.

First, **these metrics measure fit to the synthetic generator, not real-world
moderation performance.** The training data is synthetic because live platform
data is under a non-disclosure agreement. A high score means the model learned
the generator's rules.

Second, **the Random Forest does not win every task.** On the suggested-action
task, logistic regression's macro-F1 exceeds the Random Forest's. Both beat the
majority-class and keyword-rule baselines. This is reported as measured.

Third, **component B's recovery is easy by construction.** The injected anomalies
sit far outside the normal operating range, so the detector separates them almost
perfectly. The result therefore demonstrates that the pipeline works end to end
on known injected anomalies; it does not demonstrate detection of subtle real
misconduct. A future iteration should inject borderline anomalies.

## 5.8 Limitations

The following limitations are stated so that the results are not read as broader
than they are.

1. **Scope.** Only the console subset is implemented; the remaining 1,540 SRS
   identifiers are outside this build.
2. **Deployment.** The system runs locally. The server has not been provisioned
   and the runbook has not been executed; deployment is **not yet verified**.
3. **Browser coverage.** Browser checks have **not yet been performed**. Only
   browsers that are actually tested will be claimed.
4. **Accessibility.** Contrast was measured and corrected programmatically, but no
   screen-reader pass and no full WCAG conformance audit has been performed.
5. **Test coverage** is not measured; no coverage percentage is claimed.
6. **Synthetic data.** All model metrics are fit to a synthetic generator.
7. **Authentication depth.** Multi-factor authentication, single sign-on,
   passwordless login and passkeys are not implemented; scope for them is defined
   by Chapter 5 §3.6.2 of the earlier documentation. Passkeys are recorded under
   Future Work.
8. **Single tenancy.** The console is single-tenant; tenant-scoped requirements
   were therefore not implemented.
