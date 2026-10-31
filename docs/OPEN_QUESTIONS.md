# OPEN_QUESTIONS.md

Questions that the supervisor documents do not answer. Each has a proposed default; per AGENTS.md these are asked once, in one batch, in Phase 1 — the defaults apply if the user does not override them.

## ANSWERED

- **OQ-1 (answered by user, 2026-10-29):** The focus is the small build — the web-based Admin & Moderation System (auth + user management + moderation queue + immutable audit log + settings console). Borrow whatever is relevant from the wider v2 documents to improve that implementation. Additionally, a **bare website shell** (landing page, login, and other pages) must wrap the moderation module.
- **OQ-2 (answered: proposed defaults confirmed):** Generic key/value + feature-toggle settings over mock data; dashboard structurally present but unpopulated.
- **OQ-4 (answered by user, 2026-10-29):** Stack = proposal/Figma hybrid as proposed: Vite + React + Tailwind frontend keeping the export's tokens/look; typed mock data layer mirroring BED/DDD contracts; no real backend for now; TDD v2 microservice/K8s machinery out of scope. Recorded in DECISIONS.md D-009.
- **OQ-5 (answered by user, 2026-10-29):** The v2 engineering documents provide depth of instruction (complexity and constraints) but must not exceed Chapter 5's direction: they take precedence when guiding complexity and related constraints, but do not change Chapter 5's direction.

## OQ-3 — BRIEF.md — ANSWERED (2026-10-29)

BRIEF.md is now filled and confirmed: project/deadline/demo dates, scope, backend + database in scope, ML components A (required) and B (stretch), Azure VPS deployment artifacts + runbook, documentation drafting required, schedule and cut line. No open items remain from the original list.

## OQ-4 — Which stack is authoritative? — ANSWERED, see top

## OQ-5 — Which document set wins on contradictions? — ANSWERED, see top

---

## Phase 4 walk — in-scope rows moved out of the build

Raised while walking every row of `docs/TRACEABILITY_SCOPE.md`. Each names the
requirement it carries, why it is not built, and a proposed default. None blocks
the demo: the console works without them.

### OQ-6 — FR-ADM-020 "configurable business rules"

The console exposes key/value configuration (e.g. a moderation queue threshold),
but there is no general business-rule engine (no expression language, no
rule editing). **Proposed default:** treat the key/value values that gate
behaviour as the configurable rules for this phase, and record that a rule engine
is a future extension. Building one is out of scale for a capstone with a
10 Nov queue gate.

### OQ-7 — Tenancy: FR-ADM-027, SEC-RBAC-005, part of UC-009

Several SRS rows assume multi-tenancy (feature activation by tenant, tenant-level
role customisation, a Platform Administrator configuring *tenant* settings). The
console is deliberately single-tenant: Chapter 5 has no tenancy concept, and the
SRS's own multi-tenancy requirements (FR-TEN-001…005) are outside the console
subset. **Proposed default:** single-tenant console; note this explicitly in the
report so the panel does not read the omission as an oversight.

### OQ-8 — FR-ADM-035 "record security-related events"

Authentication events and refused authorization decisions are recorded. There is
no wider security-event taxonomy (privilege-escalation attempts, anomalous login
detection, etc.). **Proposed default:** accept login + denial logging as the
security-event record for this phase; the broader taxonomy belongs with the
threat-detection requirements (SEC-THR-*), which are whole-platform, not console.

### OQ-9 — FR-ADM-039 "configurable audit retention periods"

There is no retention configuration and no retention job; the ledger simply
grows. **Proposed default:** leave retention as an operational policy decision
for the industry partner, because choosing a retention period has legal
implications the documents do not settle. Documented, not silently omitted.

### OQ-10 — NFR-ACC-001/003: full accessibility conformance audit

Colour contrast was measured and corrected (see `docs/BROWSER_CHECKLIST.md`),
keyboard paths and semantic markup are built, but no human has run a screen
reader or a full WCAG 2.1 AA audit. **Proposed default:** the automated checks
stand as the evidence for this phase; a manual screen-reader pass is the user's
to run and record in the checklist. I cannot test a screen reader I do not have.

### OQ-11 — SEC-AUTH-003…007: MFA, SSO, passwordless, biometrics, password policy

Chapter 5 defines the authentication module as email + password with JWT role
claims only (§3.6.2), and BRIEF confirms seeded demo operators. MFA, SSO/OIDC/
SAML, passwordless login, biometrics and configurable password policies are
therefore not built. **Proposed default:** these are out of scope by Chapter 5's
own direction, not by omission; the v2 SRS rows are recorded here so the
distinction is auditable.

### OQ-12 — SEC-AUTH-008: account lockout after failed logins

A global per-IP rate limit exists (600 requests / 5 minutes), which throttles
brute force, but there is no per-account failed-attempt lockout. **Proposed
default:** add a per-account counter (N failed attempts → temporary lock,
audited) if time allows after the 10 Nov queue gate; otherwise record the IP
throttle as the mitigation. **This is the one item here I would prioritise**,
because the panel probes authentication.

### OQ-13 — SEC-RBAC-002…006: multi-role, hierarchy, inheritance, temporary access

Each user holds exactly one role (D-032); there is no role hierarchy, no
permission inheritance, and no temporary privileged access. **Proposed default:**
a flat three-tier model matches Chapter 5's three privilege tiers exactly;
hierarchy and inheritance are enterprise features the SRS itself notes are
disproportionate to a mid-scale marketplace (proposal §2.3.3).

---

## Closed after Phase 4 (user decisions, 2026-10-31)

### OQ-11 — MFA / SSO / passwordless / passkeys — **CLOSED: won't do**

Closed as out of scope by decision, not by omission. Chapter 5 §3.6.2 defines the
authentication module as email + password with JWT role claims, and BRIEF confirms
seeded demo operators. The affected SRS rows (`SEC-AUTH-003`…`007`, and passkeys
via `SEC-AUTH-006` / `FR-IAM-029`) remain marked "out of scope" in
`docs/TRACEABILITY_SCOPE.md`. **Passkeys are recorded under Future Work** in the
Phase 5 draft (`docs/draft/chapter-6-conclusion.md`) so the omission is visible to
the panel rather than hidden. No further action.

### OQ-12 — Account lockout after failed logins — **CLOSED: implemented**

Implemented exactly as specified: 5 consecutive failures locks the account for 15
minutes; the counter resets on a successful login; unknown account, wrong password
and locked account all return the same generic `401 Invalid credentials`; a Super
Admin can unlock (`users.unlock`); and **only lock and unlock events are audited**,
never the individual failed attempts. Migration `008_login_lockout.sql`,
`npm run demo:reset` for demo cleanup, and 15 tests in
`server/tests/lockout.test.ts` — one per rule. Logged as D-047/D-048.

One consequence worth stating plainly: because a locked account returns the same
error as a wrong password, **a locked user is not told they are locked.** That is
the deliberate trade-off for not disclosing account state; the Super Admin unlock
in the console is the recovery path.
