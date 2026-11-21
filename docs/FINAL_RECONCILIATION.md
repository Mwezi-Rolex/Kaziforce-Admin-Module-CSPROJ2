# Final reconciliation of the three project copies — 20 November 2026

**Scope statement.** This build implements the **Admin and Moderation console
subset** of the platform SRS, not the whole platform: operator sign-in and
session, account review and state control (search, filter, suspend, ban, assign
role, unlock), the moderation queue with bulk decisions and the Super Admin
escalation lane, the read-only audit explorer with restricted CSV export, sample
system settings, the suggestion-only model, and the public landing, sign-in and
not-found pages. 55 mapped SRS identifiers and 29 console identifiers are in
scope; the other 1,540 SRS identifiers are outside the build
(`docs/TRACEABILITY_SCOPE.md`).

## Evidence labels

Adapted from F's `docs/draft/DECISIONS.md` DOC-01…DOC-08, with one label added.

| Label | Meaning |
|---|---|
| **O** | Rerun in this OpenCode workspace on 20 November 2026; the command is quoted in `docs/draft/evidence/o-command-results-2026-11-20.md` (rows O-01…O-21) |
| **R** | A claim recorded in the GLM reference repository (`C:\Users\smmwe\Documents\GLM Projects\Kaziforce`), not rerun here |
| **F** | An observation or command result from the Figma Make hosted adaptation (`C:\Users\smmwe\Documents\Figma\CS Project II v3`), taken from its `docs/draft/evidence/` |
| **A** | Supplied by the author without a raw transcript in the accessible repository |
| **U** | Unverified or not measured |
| **D** | Added 21 Nov: output from the deployed Azure VM, run by the operator over SSH and committed as a raw transcript (`docs/draft/evidence/vm-deployment-2026-11-21.md`) |

A result keeps its label. An A-reported pass is not an F-hosted verification,
and F's 11-test pass is not an O result.

**Label collision to keep in mind.** F's own drafts use **H** for "hosted" (our
F) and **R** for the GitHub repository `Mwezi-Rolex/Test-repo-csprojii` at commit
`51d6b42`. That commit exists in the GLM repository's history, so F's R is a
snapshot of our R, not of O. When quoting F's documents, read their H as F.

## State of the three copies, as found today

| Copy | Observed today | Label |
|---|---|---|
| O | Branch `master`, 29 commits before this change (HEAD `11261fd`), no remote, no tag, clean working tree; migrations 001–009 | O |
| R | HEAD `058f130` ("refactor: deepen modules and deduplicate…"), **26 commits**, remote `origin` → `github.com/Mwezi-Rolex/Kaziforce-Admin-Module-CSPROJ2`, migrations 001–008, contains commit `51d6b42`. The brief for this task described R as 21 commits ending at `d34e106`; R has moved on since O was copied from it. Its later commits were not inspected (a deeper history query was declined during this session) and none of their content is used here | O (git queries) |
| R's stale server | Port 3000 was **not listening**; no `tsx watch` process from R was running, so nothing had to be stopped. O ran on port 3100 regardless, and the Vite proxy was pointed at 3100 explicitly (`API_ORIGIN`) | O |
| F | Next.js 16.4.6 + Payload 4.0.0-beta.10 hosted adaptation with its own drafts, 11 screenshots and evidence register | F |

## Reconciliation table

| Topic | O (verified here) | R (reference) | F (hosted) | Authoritative source for the report | Consequence |
|---|---|---|---|---|---|
| Runtime and stack | Vite 8.3.5 + React 19 + Tailwind 4 SPA; Express 5 + TypeScript API; PostgreSQL 18; Python 3 FastAPI model service. Commands ran on Node v22.23.5 via `npx -y node@22` (system Node is v20.15.1) and pnpm 10.34.3 (evidence file, "Environment"; O-09) | Same stack before migration 009; the original Chapter 5 table records Node v20.15.1 (R) | Next.js 16.4.6, Payload 4.0.0-beta.10, React 19.3.1, TypeScript 6.0.3, Tailwind 4.3.5, Node v24.22.3 (F `hosted-environment.txt`) | O | Table 5.2 states the Node version actually used (22.23.5) and notes the system Node. F's stack is not described as the delivered system |
| Routing and pages | `/`, `/login`, `/console/{dashboard,users,queue,audit,settings}`, `*` 404. Rail has **5** entries, filtered by permission; System Settings is a rail entry (Super Admin only) (`src/App.tsx`, `ConsoleLayout.tsx`; screenshots 03, 08) | Same as O | **4**-item rail; Settings reached from a secondary header control (F `browser-observations.json`: `railEntries: 4`, `secondarySettingsControl: true`) | O | The report describes a 5-entry rail. F's layout is recorded as a visual divergence, not a defect (DISCREPANCIES row 16) |
| Authentication and session | Email + password checked with `bcryptjs`; JWT in an `httpOnly`, `SameSite=Lax` cookie (Secure in production); status re-checked per request; 5-failure / 15-minute lockout. Login returned 200 and a session cookie (O-14); anonymous request 401 (O-20); Jest 86/86 includes the lockout suite (O-03…O-05) | Same (R record of 81 tests) | Payload native auth owns hashing, tokens and lockout; cookie `app-session`; session limit from a setting (F `src/lib/app-auth.ts`) | O | Chapter 5 §5.3.2 stays bcrypt + JWT cookie. No Payload claim enters the report |
| RBAC enforcement point | `requirePermission(key)` middleware before each handler; permission matrix in the `roles` / `permissions` / `role_permissions` tables; a refusal returns 403 and writes `Authorization Denied` with `outcome = 'Blocked'`. Viewer CSV request → 403 `AUTHZ-001` (O-19) | Same, without the `outcome` column | Permissions hard-coded in `src/lib/governance/policy.ts` plus Payload collection access functions | O | The "data-driven matrix held in the database" claim in Chapters 5 and 6 applies to O only |
| Data layer and persistence | PostgreSQL 18; nine ordered migrations `001`…`009` applied to an empty database (O-01) | Migrations 001–008 | Platform-owned database through Payload collections (`users`, `flags`, `content-items`, `audit-events`, `system-settings`, …); F's health reports `storage: Payload` | O | Chapter 5 says nine migrations (it said eight in two places, now corrected) |
| Audit immutability mechanism | Database grants: `kaziforce_app` holds `SELECT` and `INSERT` only on `audit_log` (migration 006); `UPDATE`/`DELETE`/`TRUNCATE` refused with SQLSTATE 42501 in `audit-immutability.test.ts` (part of O-03…O-05) | Same; the deployment smoke test result 12 passed / 0 failed / 1 skipped is an R-era (31 October) record, not rerun today | Application-level: collection access denies update/delete and a `beforeChange` hook throws unless the operation is `create` | O for the mechanism; R for the smoke-test figure | The report's "enforced below the application" argument is about O. F's mechanism is weaker by design and is not cited as evidence for it |
| Audit record fields and CSV columns | Ledger row: id, created_at, operator_id, action_type, target_entity_type, target_entity_id, metadata, plus `actor_ip`, `outcome`, `correlation_id` (migration 009). `x-correlation-id` echoed (O-14). CSV has **11** columns `id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,outcome,actorIp,correlationId,metadata` (O-15). Audit view shows an Outcome pill beside the action type (screenshot 06). The `createdAt` cell carries literal quote marks (O observation 1) | No provenance fields; 5-column-plus export record | 7-column CSV (`Event ID, Operator ID, Operator, Action type, Target type, Target ID, Created at (UTC)`); no `x-correlation-id` header; action pills only, no outcome pill (F `browser-observations.json`) | O | A real divergence between implementations, not a documentation error (DISCREPANCIES row 17). F's DOC-03 labels the 11-column CSV as A because F could not see migration 009; in O it is O-verified. Both facts stand. The quoting defect is recorded (row 18) |
| Moderation states, bulk actions and escalation | States `Pending` / `Approved` / `Rejected` / `Escalated`; single and bulk approve / reject / escalate (bulk bar appears on selection, screenshot 05); Super Admin lane with **Overrule** and **Uphold and ban** (screenshot 09); 409 on re-deciding; two-step dialog used for the permanent ban | Same | Same four states; labels "Overrule & approve" and "Uphold & permanently ban" (F `browser-observations.json`); F's visual direction includes a two-step confirmation, whose exact coverage was not checked here (U) | O | The report uses O's labels. In O, single and bulk decisions apply immediately and only the permanent ban uses the two-step dialog; this is recorded as a divergence (row 16) |
| Settings and sample keys | `sample.feature.auto_triage` (toggle), `sample.moderation.queue_threshold`, `sample.session.timeout_minutes`; Super Admin only; changes audited (screenshot 08) | Same | Three configuration rows; at least `sessionTimeout` is operational (it limits the session) | O | Report keeps "sample keys, no source document names real keys" |
| Model in production vs training pipeline | Separate FastAPI service on loopback (`ml/service.py`), called with a 3000 ms timeout by `dev:all`; fails safe to "Suggestion unavailable". Training: `ml/generate_data.py`, `train.py`, `evaluate.py` → `ml/reports/metrics.json` (`severity-action-rf-1.0.0`). Model service started and suggestions rendered (screenshot 05); pytest 7 passed (O-10) | Same | Portable Random Forest evaluated in Node (`src/lib/governance/model-runtime.ts`) from exported forests; parity checked against scikit-learn cases (F `portable-parity.json`) | O; metrics only from `ml/reports/metrics.json`, labelled fit to synthetic data | No F parity figure enters the report. Metrics stay as quoted from the JSON |
| Design tokens and visual layout | Hard-coded hex values in `src/index.css` and components, no colour custom properties: ink `#17332f`, forest green `#183a35`, gold `#c99434` (focus `#ad7f2d`), surfaces `#f7f5ef` / `#eeece3`. Account record stacks under the table at 1440 px (screenshot 04) | Same | `--forest #103e32`, `--ink #173e32`, `--lime #d1f77b`; 4-item rail; horizontal account record; two-step confirmation; secondary Super Admin settings route (F `styles.css`, screenshots) | O for what is shown; F only as a visual comparison labelled "hosted adaptation" | Not restyled during the freeze (BRIEF schedule; DISCREPANCIES row 16). Screenshots in the report are O's |
| Test suites and counts | Jest 8 suites, **86 / 86**, three consecutive runs without re-seed (O-03…O-05); Vitest **7** (O-07); pytest **7** (O-10); both `tsc --noEmit` exit 0 (O-06, O-08); build JS 386.76 kB / 116.83 kB gzip, CSS 32.47 kB / 7.64 kB (O-09) | 81 API tests (R record, 31 October) | 11 Node tests pass (F `hosted-tests.txt`); hosted type check | O | Table 5.4 uses O. F's DOC-03 treats 86 as A; here it is O. R's 81 is history |
| Deployment route | **Update 21 Nov (track D):** deployed to an Azure VM (Spain Central, Ubuntu 24.04.5) with `deploy/azure-vm-install.sh`, Nginx and a Let's Encrypt certificate at `https://kaziforce-demo.spaincentral.cloudapp.azure.com`; smoke test 13 passed / 0 failed / 0 skipped (`docs/draft/evidence/vm-deployment-2026-11-21.md`). On 20 Nov it was local only, with the artifacts in `deploy/` and the runbooks in `docs/DEPLOY*.md` | Smoke test 12 / 0 / 1 skipped, local, 31 October (R) | `figma make verify-deploy` succeeded on the hosted build (F) | D transcript, D-071 | "Prepared, not performed" is replaced by "deployed after submission, smoke test passed". F's verify-deploy is not a VPS deployment and is not cited as one |
| Outstanding evidence | Coverage, performance and load: not measured (U). Firefox/Edge, screen reader, tag, push: not yet verified (U). VPS run: done 21 Nov (D). Screenshots: captured (10, O-21), with headless Chrome, which is a capture tool, not a browser compatibility test | Same list | F lists the same unverified items (DOC-07) | — | Listed in Chapter 5 §5.8 and `chapters-1-4-changes.md` |

## Conflicts preserved, not resolved

1. **F DOC-03 vs O.** F treats migration 009, the 86-test run, the 11-column CSV
   and TC-31…TC-35 as author-supplied (A) because its reference snapshot had
   migrations 001–008 and an 81-test record. In O those items are O-verified
   today (O-01, O-03…O-05, O-14, O-15) and were O-verified on 12 November
   (appendix rows 17–21). F did not verify them; O's verification is not
   downgraded.
2. **The "25 Blocked rows" figure.** The 12 November figure is the first page
   of results (default page size 25), not a total. Today's total was 58 in a
   fresh database (O-17). The report now states the figure as a page.
3. **R has moved.** R is no longer the 21-commit tree O was copied from. Nothing
   from R's later commits is claimed for O.
