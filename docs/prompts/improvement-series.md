# Prompt series: improving the Kaziforce console after submission

A set of prompts, run **one at a time, in order**, each in a fresh agent session
with the project as the workspace. Each prompt starts by pasting the shared
preamble (section 0). Each one ends with a report, and a person reads that
report before the next prompt starts.

**When to start:** after the restyle branch (`docs/prompts/restyle-figma-make.md`)
is reviewed and merged into `master`. Several prompts touch the same files as
the restyle, and running them earlier would cause merge conflicts.

**Order and why:**

| # | Prompt | Depends on | Touches code? |
|---|---|---|---|
| 1 | Recover the semantic model and the state machines | — | No (document only) |
| 2 | Fix confirmed bugs from prompt 1 | 1 | Yes |
| 3 | Fix the two open defects | — | Yes |
| 4 | Security audit | 2 | Yes, small fixes only |
| 5 | Measure performance (measure first, change nothing) | — | No |
| 6 | Performance fixes backed by prompt 5's numbers | 5 | Yes |
| 7 | Deepen modules, simplify interfaces, cap file length | 2, 3 | Yes (refactor) |
| 8 | Test quality: behaviour tests and the claim each test makes | 7 | Tests only |
| 9 | Production readiness on the Azure VM | 4 | Deploy artifacts and runbook |
| 10 | Interface polish (motion, details) | restyle merged | Frontend only |

The skills in `docs/prompts/skills-setup.md` are used by prompts 4, 7 and 10 if
they are installed. Every prompt also works without them.

---

## 0. Shared preamble (paste at the top of every prompt)

```text
Project: the Kaziforce Admin and Moderation console, a finished capstone.
Workspace: C:\Users\smmwe\Documents\OpenCode Projects\CS Project II v2
Stack: Vite + React 19 + TypeScript + Tailwind 4 (src/), Express 5 + TypeScript
API (server/), PostgreSQL with two roles (kaziforce_owner, kaziforce_app),
Python FastAPI model service (ml/). Deployed at
https://kaziforce-demo.spaincentral.cloudapp.azure.com (Azure VM, Nginx).

Read first: BRIEF.md, AGENTS.md, docs/PROGRESS.md, docs/DECISIONS.md,
docs/FINAL_RECONCILIATION.md, docs/draft/DISCREPANCIES.md.

Rules for this session:
1. Work on a new branch named in the prompt. Never commit to master, never
   push, never deploy, never touch the Azure VM.
2. Never break these guarantees, which the panel probes: the application role
   has only SELECT and INSERT on audit_log; every protected endpoint checks its
   permission before the handler; a Viewer cannot export the audit CSV (403);
   the model only suggests and fails safe ("Suggestion unavailable").
3. Don't edit src/imports/, any .docx or .pdf, or docs/draft/ (the report). List
   report changes for a person to make instead.
4. Don't add a dependency without a one-line reason in docs/DECISIONS.md.
5. Never claim a result you didn't produce. Every number names the command that
   produced it; anything else is "not measured".
6. Before you finish, run: npx --yes pnpm@10.34.3 typecheck, npx --yes
   pnpm@10.34.3 test, npx --yes pnpm@10.34.3 build, and cd server; npm test
   (86 tests before you started). Quote the summary lines. Use Node 22.
7. If a clean solution needs a refactor larger than the prompt allows, stop and
   say so instead of bolting a change on.
8. End with: what changed (one line per file), commands and results, what you
   didn't do and why, what a person should check first.
```

---

## 1. Recover the semantic model and the state machines

Branch: `audit/semantic-model`. Output: `docs/SEMANTIC_MODEL.md`. No code changes.

```text
Recover this program's minimal semantic model and write it to
docs/SEMANTIC_MODEL.md.

1. State: every value that changes what an operator sees (account status, role,
   lock, flag status, settings, session, model availability).
2. State machines: find every explicit and implicit state machine (flags
   Pending/Approved/Rejected/Escalated, accounts Active/Suspended/Terminated,
   login lockout, session, model client). For each, give the states, the
   invariants, and a transition table: from, event, guard, to, side effects
   (audit row written?).
3. Transitions: which commute, which are idempotent, which depend on order.
4. Dependencies: what must be true before each effect fires.

Then find, with file and line evidence:
- states or transitions the code can actually reach but shouldn't, including
  through retries, double-clicks, bulk actions and two operators acting at once
- nondeterminism in awaits, retries and event order
- invariants enforced by hope rather than by the database or a guard
- one fact stored in two places that can drift (for example the role in the
  JWT versus user_roles, the permission matrix in seed.ts versus
  src/lib/permissions.ts)
- objects referenced without a stable, canonical ID
- work that never reaches the screen

For each suspected bug, give the smallest input or sequence that triggers it,
and say whether you confirmed it (by a test or a request you ran) or only
suspect it. Rank by impact. Change no code.
```

## 2. Fix the confirmed bugs from prompt 1

Branch: `fix/state-machine-bugs`.

```text
Read docs/SEMANTIC_MODEL.md. Take only the items marked confirmed. Group related
ones into issues, and for each issue:
1. Write a failing regression test first (Jest + Supertest in server/tests/, or
   Vitest in tests/) and show it failing.
2. Fix the cause, not the symptom. Prefer enforcing an invariant in the
   database or in one guard over checks scattered through handlers.
3. Show the test passing.
Update docs/SEMANTIC_MODEL.md with what was fixed. Leave suspected items alone
and list them. Database changes go in a new numbered migration; never edit an
existing one, and re-check the audit_log grants after migrating.
```

## 3. Fix the two open defects

Branch: `fix/open-defects`.

```text
Fix the two defects in docs/draft/DISCREPANCIES.md rows 18 and 19.

Row 18: the audit CSV writes createdAt with literal quote marks, because
server/src/lib/csv.ts passes a Date through JSON.stringify. Format Date values
with toISOString() in csvCell. Add a unit test for a Date cell and a test that
the exported createdAt has no quote marks. Check the other columns for the same
problem (metadata is JSON on purpose; keep it RFC 4180 quoted).

Row 19: if the restyle has already fixed the account-record layout at 1440 px,
confirm it at 1440, 1200 and 900 px, then close the row in your report.
Otherwise fix it in src/index.css (.account-record) without touching the API.

Then make the CSV safe against spreadsheet formula injection: a cell starting
with =, +, -, @, tab or CR is prefixed with a single quote. Add a test for it.
```

## 4. Security audit

Branch: `security/audit`. Uses the `security-audit` skill if installed.

```text
Run a security audit of this codebase. If the security-audit skill is
available, activate it and follow it; otherwise follow the checklist below.

Check, with file and line evidence:
- login: rate limits per IP and per account, lockout, generic "Invalid
  credentials" for every failure, timing differences between unknown and known
  accounts
- session: httpOnly, Secure in production, SameSite, expiry, what happens on
  suspension, sign-out on every device (not implemented: report, don't build)
- server-side permission checks on every route; list any route without
  requirePermission and say why it's safe
- input validation at every trust boundary (zod schemas), SQL parameterisation,
  CSV injection, error envelopes leaking internals
- headers and CSP in deploy/nginx/kaziforce.conf; TRUST_PROXY; CORS
- secrets: nothing tracked in git (git ls-files), .env templates only
- the audit ledger: can any path write as kaziforce_owner at runtime?
- dependency vulnerabilities: run pnpm audit in the root and in server/, and
  pip-audit for ml/ if available; quote the output
- what an attacker gains if the JWT secret or the app database password leaks,
  and how to rotate each

Classify each finding as critical, high, medium or low, with a fix. Fix only
critical and high findings that are small and local, each with a test. Write the
full report to docs/SECURITY_AUDIT.md.
```

## 5. Measure performance (change nothing)

Branch: `perf/baseline`. Output: `docs/PERFORMANCE.md`.

```text
Measure performance. Change no application code. Every number must come from a
command you ran, quoted with the command and the machine it ran on.

Measure locally (npm run dev:all against the seeded database), not on the Azure
VM:
1. Frontend: production bundle sizes from vite build; which modules dominate
   the JS bundle (use a bundle visualiser run through npx; don't add it to
   package.json).
2. API latency: p50, p95 and p99 for GET /api/v1/health, the user list, the
   moderation queue (with and without the model service running), the audit
   list and the CSV export, using autocannon through npx at 10 and 50
   concurrent connections for 30 seconds each.
3. Database: EXPLAIN ANALYZE for the queue, the audit list with each filter, and
   the CSV export. Seed a larger data set first (a throwaway script outside
   server/src that inserts, say, 50,000 audit rows and 5,000 flags into a
   separate local database) and state the row counts.
4. Model service: latency of /predict, cold and warm.

Then list the first three bottlenecks you would expect at 10x and 100x traffic,
each tied to a measurement. Mark anything you couldn't measure as "not
measured".
```

## 6. Performance fixes

Branch: `perf/fixes`.

```text
Read docs/PERFORMANCE.md. Pick at most three changes, each aimed at a measured
bottleneck. For each: state the expected effect, make the change (an index in a
new migration, a query rewrite, pagination, code-splitting, caching headers),
then rerun the same measurement from docs/PERFORMANCE.md and record before and
after. Revert any change that doesn't move its number. Don't add a cache or a
new service unless a measurement shows the need.
```

## 7. Deepen modules, simplify interfaces, cap file length

Branch: `refactor/deepen-modules`. Uses the anti-slop skill if installed.

```text
Deepen modules and simplify interfaces. If an anti-slop skill is available,
activate it.

1. Add a lint rule (no new dependency if possible: a small Node script in
   scripts/ run by npm) that fails when any source file exceeds 1000 lines. List
   files currently over 400 lines.
2. Find duplicated logic across server/src, src and ml: permission names,
   status vocabularies, error codes, audit action names, date formatting. Each
   fact should live in one place and be imported everywhere else.
3. Find shallow modules (an interface nearly as complex as its implementation)
   and merge or deepen them.
4. Split your refactors into two lists: "provably equivalent" (pure moves,
   renames, extractions, backed by the existing tests) and "trust me". For each
   "trust me" item, give the smallest input that would break it and add a test
   for that input.
Report lines of code before and after (cloc or wc via npx) per area. All 86 API
tests and the frontend tests must still pass unchanged, except where a test
imports a moved path.
```

## 8. Test quality

Branch: `test/behaviour`.

```text
Review every test in server/tests/, tests/ and ml/tests/. For each test, state in
one sentence of plain English the claim about the software it validates, and
whether that claim matters to an operator, the panel or the audit guarantee.

Then:
- flag tests that check implementation details rather than behaviour (internal
  calls, private state) and rewrite them to assert on HTTP responses, rendered
  output or database rows
- flag important claims with no test (start with the guarantees in preamble
  rule 2 and the state machines in docs/SEMANTIC_MODEL.md) and add tests
- find and fix the open handle behind "Jest did not exit one second after the
  test run has completed"
- run coverage once (jest --coverage, vitest --coverage via npx) and report the
  figure with the command. This is the first coverage figure for the project,
  so label it with the date and commit.
Write the claim list to docs/TEST_CLAIMS.md.
```

## 9. Production readiness on the Azure VM

Branch: `ops/production-readiness`. Changes `deploy/` and `docs/` only.

```text
The site runs on one Azure VM. Prepare it to be production-ready, as artifacts
and a runbook the operator runs. Never connect to the VM yourself.

Cover, and write docs/OPERATIONS.md:
- observability: structured JSON logs from the API with the correlation id;
  journald retention; a /api/v1/health check an external monitor can poll;
  which metrics to watch (5xx rate, p95 latency, disk, memory)
- reliability: a nightly pg_dump with 7-day retention via a systemd timer
  (deploy/systemd/), a tested restore procedure, and a stated recovery time and
  recovery point
- an SLO proposal for the demo period, labelled as a proposal
- security: unattended-upgrades, fail2ban or the Azure NSG for SSH, certbot
  renew --dry-run, rotating the JWT secret and the database passwords
- abuse: Nginx limit_req on /api/v1/auth/login and the CSV export, in addition
  to the API's own rate limit; optionally Cloudflare in front, as an option with
  its trade-offs, not a requirement
- rollback: redeploy a previous commit with deploy/azure-vm-install.sh, and how
  long it takes
- 10x and 100x traffic: where the first bottleneck would be, citing
  docs/PERFORMANCE.md if it exists
Every command in the runbook must be syntax-checked locally (bash -n,
nginx -t in a container if available). Mark anything you couldn't check
[UNVERIFIED].
```

## 10. Interface polish

Branch: `ui/polish`. Run only after the restyle is merged. Uses Emil Kowalski's
skills if installed.

```text
Act as a senior UI engineer. If the emilkowalski skills are available, activate
the ones for animation and interface detail and follow them.

Polish the console without changing its layout or behaviour:
- transitions for dialogs, the bulk bar, notices and the account record panel:
  short, interruptible, and disabled under prefers-reduced-motion
- loading, empty and error states on every screen: consistent and never a
  layout jump
- focus management in dialogs, a visible focus ring, keyboard paths for the
  queue and bulk actions
- check text contrast at 4.5:1 or better with a script, and quote the lowest
  ratio
Capture before and after screenshots of each screen at 1440 x 900 into
docs/restyle-review/polish/. No new dependencies unless docs/DECISIONS.md gets
a one-line reason. The 7 frontend tests must still pass.
```

---

## After each prompt

1. Read the agent's report and the diff (`git diff master..<branch>`).
2. Run the four checks in preamble rule 6 yourself.
3. Merge into `master` only if they pass.
4. Redeploy only after a person has reviewed the change. Upload a new bundle,
   rerun `deploy/azure-vm-install.sh` (it keeps the passwords and data), then
   the smoke test.
5. Add any change the report needs to `docs/draft/chapters-1-4-changes.md`, or
   as a note for Chapter 5.
