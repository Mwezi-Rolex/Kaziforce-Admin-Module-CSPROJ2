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

**Evidence labels.** Every figure in this chapter carries the track it comes
from. **D** marks output from the deployed server, run by the operator and
committed as a raw transcript (Appendix 5). **O** marks a command rerun in the delivered workspace on 20 November 2026
(Appendix 2, rows O-01 to O-21). **R** marks a result recorded earlier in the
reference repository from which the workspace was copied and not rerun.
**F** marks an observation from a separate hosted adaptation of the console,
which is a different implementation and is cited only for comparison. **A**
marks a figure supplied by the author without a raw transcript, and **U**
marks anything unverified or not measured. A figure keeps its label; the
reconciliation of the three copies is in `docs/FINAL_RECONCILIATION.md`.

### List of figures

| Figure | Description | File |
|---|---|---|
| 5.1 | Operator sign-in screen | `screenshots/02-login.png` |
| 5.2 | User Control Centre with an account record open (Moderator) | `screenshots/04-users-moderator.png` |
| 5.3 | Moderation queue with the bulk bar and model suggestions (Moderator) | `screenshots/05-queue-moderator.png` |
| 5.4 | Escalation review lane (Super Admin) | `screenshots/09-escalation-superadmin.png` |
| 5.5 | Audit explorer with filters, outcome pills and export (Moderator) | `screenshots/06-audit-moderator.png` |
| 5.6 | Audit explorer as a Viewer, with no export control | `screenshots/07-audit-viewer-no-export.png` |
| 5.7 | System settings (Super Admin) | `screenshots/08-settings-superadmin.png` |
| 5.8 | Public landing page | `screenshots/01-landing.png` |
| 5.9 | Dashboard as a Viewer | `screenshots/03-dashboard-viewer.png` |
| 5.10 | Not-found page | `screenshots/10-not-found.png` |

All ten images were captured from the running application on 20 November 2026
(Appendix 3). None is taken from the design export or the hosted adaptation.

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

Evidence: `powershell -NoProfile -Command "(Get-CimInstance Win32_Processor).Name; (Get-CimInstance Win32_OperatingSystem).Caption"`
(recorded during development, R; the 20 November run used the same machine and
did not re-query it).

### 5.2.2 Software and services

**Table 5.2: Software and service versions**

| Software / service | Version | Role in the system | Evidence command |
|---|---|---|---|
| Node.js | v22.23.5 for every command in Appendix 2 rows O-01 to O-21 (O); the system installation is v20.15.1 | Runtime for the API and the frontend build | `npx -y node@22 --version`; `node --version` |
| npm | 10.7.0 (R) | Dependency installation and script execution | `npm --version` |
| pnpm | 10.34.3, the version pinned in `.mise.toml` (O) | Lockfile-based dependency resolution for the frontend | `npx --yes pnpm@10.34.3 --version` |
| PostgreSQL | 18 (O, binaries in `PostgreSQL\18\bin`); 18.6 recorded earlier (R) | Relational store, including the append-only audit ledger | `psql --version` |
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
(`server/migrations/001`–`009`), so a fresh database is built with
`npm run migrate`. On 20 November 2026 a new, empty database was built this way:
all nine migrations applied and the seed completed (O-01, O-02).

The clone-to-running sequence in `README.md` is:

1. Install Node.js 22 (pinned in `.mise.toml`; `README.md` §1 still names
   20.15 as the earlier tested version), pnpm 10, PostgreSQL 16 or later and
   Python 3.12.
2. Install dependencies: `pnpm install` in the root and `npm install` in `server/`.
3. Create the two database roles and `server/.env` once with
   `npm run bootstrap` in `server/`, supplying the PostgreSQL superuser
   password through the `PGPASSWORD` environment variable.
4. Build and seed the schema: `npm run migrate && npm run seed` in `server/`.
5. Create the model environment in `ml/` (`python -m venv .venv`, install
   `requirements.txt`) and train with `.venv/Scripts/python train.py`.
6. Start all three services with `npm run dev:all`. If another process holds
   port 3000, set `API_PORT`, and set `API_ORIGIN` to the same address so the
   frontend proxy reaches this API; this was done for the 20 November run
   (O-11, O-13).

**Deployment.** On 21 November 2026 the system was deployed to an Azure virtual
machine (Ubuntu 24.04.5 LTS, 2 vCPU, 3.8 GiB RAM, region Spain Central) behind
Nginx with a Let's Encrypt certificate, at
`https://kaziforce-demo.spaincentral.cloudapp.azure.com`. The operator ran
`deploy/azure-vm-install.sh`, which scripts the numbered steps of
`docs/DEPLOY.md`, then certbot, then the smoke test, and pasted the output
back (Appendix 5; evidence track D). Planning had named the East US region;
the student subscription's region policy refused it, so an allowed region was
used (D-071). Deployment followed the 20 November submission. Response time,
load and uptime on the server are not measured.

## 5.3 System Implementation

Implementation proceeded in vertical slices. Each slice delivered a complete
screen with its API, validation, role checks, audit writes and loading and error
states, and each was committed separately. The slice order and the requirements
in each slice are recorded in `docs/PLAN.md` and `docs/TRACEABILITY_SCOPE.md`.

### 5.3.1 Database layer

Nine migrations define the schema (O-01). The `users` table carries the account record
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

Each ledger row also carries the provenance fields the Backend Engineering
Document requires for a security-relevant record: the source address
(`actor_ip`), how the action ended (`outcome`, one of `Success`, `Failure` or
`Blocked`) and the correlation identifier (`correlation_id`) that ties the row
to the API response that produced it. The correlation identifier is generated
per request, returned in the `x-correlation-id` response header and echoed in
the error envelope, so one operator action can be followed from the response
to the ledger. A refused authorisation is recorded with `outcome = 'Blocked'`
rather than being omitted, because a denial is itself a security event. The
fields were added by migration `009_audit_provenance.sql`, which is additive:
no existing column changed and no existing row was rewritten. In a live check
on 20 November a sign-in sent with `x-correlation-id: final-recon-20261120`
returned that value in the response header, and the ledger row for the sign-in
carried `outcome = 'Success'`, the loopback address `::1` and the same
correlation id (O-14, O-15).

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

![Figure 5.1: Operator sign-in screen](screenshots/02-login.png)

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

Figure 5.2 shows the screen as a Moderator with a sample account's record open:
the Moderator sees the suspension control and a note that role assignment and
bans require Super Admin authority. The record's report and content lists are
scroll containers; with the sample data neither list is long enough to scroll,
so no scrolled image was captured. The capture also shows a layout defect at a
1440-pixel viewport: the table and the record panel stack in one narrow column
and the Role column is clipped (§5.4.5).

![Figure 5.2: User Control Centre as a Moderator, with an account record open](screenshots/04-users-moderator.png)

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
**followed or overrode** the suggestion, so that live decisions can later become
labelled training data.

Single and bulk decisions apply as soon as the button is pressed; the two-step
confirmation dialog is reserved for the permanent ban. Figure 5.3 shows two
selected flags with the bulk bar and the "Suggestion only" column, captured with
the model service running. Figure 5.4 shows the Super Admin lane with the
overrule and uphold-and-ban controls. No decision was submitted for either
capture.

![Figure 5.3: Moderation queue as a Moderator, with the bulk bar and model suggestions](screenshots/05-queue-moderator.png)

![Figure 5.4: Escalation review lane as a Super Admin](screenshots/09-escalation-superadmin.png)

### 5.3.5 Audit logging module

Every state-changing endpoint calls a single auditing service. Each event records
the operator, the action type, the target entity, a JSON metadata payload and a
server-generated UTC timestamp. The Audit Explorer provides date-range, actor, action-type and
outcome filters over the log, shows each row's outcome as a pill beside its
action type (Figure 5.5), and presents the log read-only; no control to modify
or delete an event exists anywhere in the interface, and none could succeed if it
did.

CSV export is restricted to Moderators and Super Admins. The control is hidden
from a Viewer, **and** the server returns HTTP 403 if a Viewer requests the
export URL directly. This restriction is an explicit instruction that overrides
the earlier requirement that every operator could export (recorded as
discrepancy 5). Figure 5.6 shows the Viewer's screen without the control, and a
direct request for the export as a Viewer returned HTTP 403 `AUTHZ-001` on 20
November (O-19).

The export has eleven columns:
`id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,outcome,actorIp,correlationId,metadata`
(O-15). One defect was found in it on 20 November: the `createdAt` value is
written with literal quote marks around the timestamp. It is listed in
§5.4.5 and was not corrected, because the application was feature-frozen.

![Figure 5.5: Audit explorer as a Moderator, with filters, outcome pills and the export control](screenshots/06-audit-moderator.png)

![Figure 5.6: Audit explorer as a Viewer; the export control is absent](screenshots/07-audit-viewer-no-export.png)

### 5.3.6 System settings module

The settings panel exposes a key/value configuration store and a feature toggle,
gated to Super Admin. Changes take effect without redeployment, and flipping a
toggle back is the rollback path. Each change is audited with its previous and
new value.

The keys are named `sample.*`. The source documentation defines the settings
interface but names no concrete keys or toggles, so the interface is demonstrated
with clearly-labelled sample configuration rather than invented platform
settings. The same restraint applies to the dashboard, whose analytical area is
left unpopulated because no KPI set is defined in any source document
(Figure 5.9).

![Figure 5.7: System settings as a Super Admin, with the sample keys and the feature toggle](screenshots/08-settings-superadmin.png)

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

Inside the console, a persistent rail lists the screens the session may open:
five entries for a Super Admin, with System Settings hidden from the other
roles (compare Figures 5.9 and 5.7).

![Figure 5.8: Public landing page](screenshots/01-landing.png)

![Figure 5.9: Dashboard as a Viewer; the analytics area is deliberately unpopulated](screenshots/03-dashboard-viewer.png)

![Figure 5.10: Not-found page for an unknown route](screenshots/10-not-found.png)

**Visual direction.** A separately hosted adaptation of the console uses a
different palette (forest and lime), a four-item rail, a horizontal account
record, two-step confirmation and a secondary route to settings. The delivered
application keeps the original design export's green and gold values. The
difference is recorded in `docs/draft/DISCREPANCIES.md` row 16; the application
was not restyled after the feature freeze, and every figure in this chapter
shows the delivered application.

## 5.4 Testing and Evaluation

### 5.4.1 Strategy and acceptance criteria

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

### 5.4.2 Results summary

**Table 5.4: Test suite results**

| Suite | Command | Result | Track |
|---|---|---|---|
| API and service tests (Jest + Supertest) | `cd server && npm test` | 8 suites passed, **86 tests passed / 86**, 0 failed, in three consecutive runs without re-seeding (O-03 to O-05, 20 Nov; also 12 Nov, row 18) | O |
| Frontend tests (Vitest + RTL) | `npx pnpm@10.34.3 test` | 2 files passed, **7 tests passed**, 0 failed (O-07) | O |
| Model service tests (pytest) | `ml\.venv\Scripts\python -m pytest ml\tests -q` | **7 passed**, 0 failed (O-10) | O |
| Frontend type check | `npx pnpm@10.34.3 typecheck` | exit 0, no errors (O-08) | O |
| API type check | `cd server && npm run typecheck` | exit 0, no errors (O-06) | O |
| Production build | `npx pnpm@10.34.3 build` | success: JS 386.76 kB (116.83 kB gzipped), CSS 32.47 kB (7.64 kB gzipped) (O-09) | O |
| Live provenance check | HTTP requests to the API on port 3100 | correlation id echoed; 11-column CSV; Viewer export 403; unknown outcome 422 (O-12 to O-20) | O |
| Deployment smoke test (local) | `deploy/smoke-test.sh` | **12 passed, 0 failed, 1 skipped** on 31 October | R |
| Deployment smoke test (Azure VM, HTTPS) | `BASE_URL=https://kaziforce-demo.spaincentral.cloudapp.azure.com deploy/smoke-test.sh` | **13 passed, 0 failed, 0 skipped** on 21 November | D |

For comparison only, the hosted adaptation's own suite of 11 Node tests passed
in that environment (F). Those tests exercise a different implementation and
are not counted in Table 5.4.

Test coverage percentage is **not measured**. No coverage run was performed, so no
coverage figure is claimed anywhere in this report.

### 5.4.3 Test cases and observed results

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
| TC-31 | BED §6.15, DDD §28.2 | Sign in as an operator and read the ledger row for that login | The row records the outcome, the source address and the correlation id | `outcome = 'Success'`, `actor_ip` not null, `correlation_id` equals the `x-correlation-id` response header; `tests/audit.test.ts` | Pass |
| TC-32 | BED §6.15 | Send a request with a client-supplied `x-correlation-id` | The same id is stored on the ledger row | Ledger `correlation_id` equals the supplied value; `tests/audit.test.ts` | Pass |
| TC-33 | SEC-AUD-002 | Trigger an authorisation refusal | The denial row records `outcome = 'Blocked'` | `outcome = 'Blocked'`; `tests/audit.test.ts` | Pass |
| TC-34 | FR-ADM-036 | Filter the ledger by outcome | Only rows with that outcome are returned | `GET /api/v1/audit?outcome=Blocked`; `tests/audit.test.ts`; live: first page of 25 rows all `Blocked`, `meta.total` 58 (O-16, O-17) | Pass |
| TC-35 | FR-ERR-002 | Request the ledger with an unknown outcome value | HTTP 422, no rows returned | 422 `VALIDATION`; `tests/audit.test.ts` | Pass |

Every row above was produced by the command named in the "Actual result" column,
and every automated row is part of the 86 Jest, 7 Vitest or 7 pytest cases that
passed on 20 November (O). No test result in this table is estimated.

### 5.4.4 Deployment smoke test

A single script verifies the four behaviours the panel is expected to probe
against a running deployment: that login works, that a Viewer is refused on the
log download, that a Moderator action succeeds and is audited, and that `UPDATE`,
`DELETE` and `TRUNCATE` on the audit ledger are refused for the application role.
Run locally against the live API and database on 31 October, before migration
009, it reported **12 passed, 0 failed, 1 skipped** (R). On 21 November it was
run on the deployed Azure virtual machine against the HTTPS origin and reported
**13 passed, 0 failed, 0 skipped** (D): the check skipped locally, that the
model service is not reachable from outside, executed through Nginx and
passed. On the same server the application role's privileges on the audit
ledger read `can_update = f, can_delete = f, can_truncate = f`. The single skip is the check that the model service is not publicly
reachable, which requires the Nginx origin and therefore could not execute in a
direct-to-API run; the script reports it as skipped rather than passed.

### 5.4.5 Defects found and corrected during testing

Recording defects is required. The following were found by the tests and
fixed before the feature freeze.

| Defect | How it was found | Resolution |
|---|---|---|
| An empty search parameter produced a database error (unused bind parameter) | Account list test | Parameter list rebuilt conditionally |
| The seed script was not idempotent and duplicated sample flags, and could leave an account with two roles | Repeated test runs | Sample rows replaced on re-seed; single-role enforcement |
| A validation error that escaped route-level parsing returned HTTP 500 and leaked an internal error shape | Settings malformed-key test | Zod errors mapped centrally to 422 with an actionable message |
| A sorting rule in the model test compared whole response bodies including the timestamp, producing a false failure | Lockout disclosure test | Assertion narrowed to the error payload |
| The development runner failed to start the model service because the workspace path contains a space and was passed to the shell unquoted | Running the runner | Spawned without a shell for the real executable |
| The queue's sidebar badge count was hard-coded to a value that did not match the data | Design audit | Corrected when the queue became data-driven |
| The moderation suite depended on run order: the escalation-lane tests read the first escalated row, which an earlier run had already resolved, so a second run failed | Re-running the suite without re-seeding (12 Nov) | Suite made idempotent (D-064); three consecutive runs pass (O-03 to O-05) |

One flaky failure was observed once when the API suite was invoked directly
without `--runInBand`, letting suites share a database and interfere. It did not
reproduce across six sequential runs of the configured command. The configured
`npm test` script uses `--runInBand` and is stable.

**Open defects found on 20 November.** Two defects were found during the final
verification run. Both are recorded in `docs/draft/DISCREPANCIES.md` and were
not corrected, because the application was feature-frozen and a change on the
submission day would invalidate the test evidence above.

| Defect | How it was found | Status |
|---|---|---|
| The CSV export writes `createdAt` with literal quote marks around the timestamp, because a date object is serialised as JSON before CSV escaping | Reading the exported CSV in the live check (O-15) | Open; fix proposed in DISCREPANCIES row 18 |
| At a 1440-pixel viewport the User Control Centre stacks the account table and record panel in one narrow column and clips the Role column | Screenshot capture (Figure 5.2) | Open; to be confirmed in a headed browser (DISCREPANCIES row 19) |

Every Jest run also ends with the warning "Jest did not exit one second after
the test run has completed". The runs exit with code 0; the open handle was not
investigated.

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

The ten figures were captured with headless Google Chrome 157 driven by a
script at a 1440 × 900 viewport (Appendix 3). That run rendered every screen
and exposed the layout defect above, but it was a capture, not a browser test:
it did not follow the checklist and is not reported as a Chrome result.

**Not yet verified.** Manual checks in Chrome, Firefox and Edge, including the
tablet-to-desktop width sweep, have not been performed. The step-by-step
checklist for doing so is `docs/BROWSER_CHECKLIST.md`, which has a Result
column for the outcomes. Accessibility has not been tested with a screen reader.

## 5.5 Version Control

The project is a Git repository on branch `master` with 30 commits after the
final documentation commit of 20 November 2026 (`git rev-list --count HEAD`
returned 29 before it). The history was carried over from the reference
repository when the work was relocated on 12 November, and the audit-provenance
change was committed as
`feat(audit): record provenance on the ledger - source IP, outcome and correlation id [CON-AUD-005]`. Work was
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

On 20 November `git ls-files` listed no environment file other than the two
templates (`server/.env.example`, `deploy/.env.production.example`), and
`.gitignore` covers `node_modules/`, `dist/`, `.venv/`, `.env` and the local
PostgreSQL data directory (`server/.pgdata*`).

The repository has no configured remote and no release tag (`git remote -v` and
`git tag` returned nothing on 20 November). Tagging and pushing remain operator
actions and are **not yet verified**.

## 5.6 Author Oversight and Use of AI-Assisted Tools

AI assistance was used materially in this project and is declared here as the
writing guide requires. The author remains responsible for the design, the
behaviour of the system and the conclusions drawn in this report. Each
AI-assisted change was checked by running the build, the type checks and the
three test suites, and the final figures in this chapter were reproduced on 20
November from a new, empty database rather than carried forward from earlier
drafts. It was used to analyse the supervisor documents, to draft
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
separation, and an append-only ledger that records the outcome, source address
and correlation id of each event. The design is evidenced by nine tracked
migrations, the permission matrix, and `docs/PLAN.md`.

**Objective (iv) — develop and evaluate the system.** The system is developed and
automatically tested. The measured results are:

- **Role enforcement** is verified by tests that assert the correct refusal for
  every role that must be denied: a Viewer is refused suspension, banning,
  moderation decisions and the log download; a Moderator is refused banning, role
  assignment, the escalation lane, settings changes and unlocking. Each refusal
  was asserted with its status code (`npm test`, 86 tests passed).
- **Audit immutability** is verified at the database level: `UPDATE`, `DELETE` and
  `TRUNCATE` against the ledger are all refused for the application role with
  SQLSTATE 42501, in the automated suite (O), in the local deployment smoke
  test of 31 October (R) and on the deployed server on 21 November (D).
- **Audit provenance** is verified live: the correlation id is echoed and stored,
  and the export carries the outcome and source address (O-14, O-15).
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
2. **Deployment.** The system is deployed to a single Azure virtual machine and
   passed the smoke test there (13 passed, 0 failed). It has no redundancy,
   backup schedule or monitoring, and its performance under load is not
   measured. A browser sign-in on the deployed site and certificate renewal
   are not yet verified.
3. **Browser coverage.** Browser checks have **not yet been performed**. Only
   browsers that are actually tested are claimed, and none is claimed in this
   report. The headless capture run of 20 November is not a browser test.
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
9. **Open defects.** The CSV timestamp quoting and the account-record layout at
   1440 pixels (§5.4.5) are known and uncorrected.
10. **Performance and load** are not measured. No response-time, throughput or
    resource figure is claimed.
11. **Repository publication.** No release tag exists and the repository has
    not been pushed to a remote.
