# Changes Required in Chapters 1–4

DRAFT — action list, not a rewrite. As instructed, the existing chapters were not
edited; this document lists what each one needs so the report is internally
consistent with the implemented system. Each item names the section, the current
wording, why it is wrong, and the specific correction.

Ordered by severity: E = will be challenged at the defence, M = inconsistency a
reader will notice, L = tidy-up.

---

## E1 — Chapter 1 §1.5.1 and Chapter 3 §3.6.3: "account CRUD"

**Current.** User management is described as encompassing "account CRUD
operations".

**Why it is wrong.** The implemented console does not create or delete accounts.
Accounts originate in the marketplace platform; the console reviews them and
controls their state. This matches the design export, and the user confirmed the
narrowing explicitly.

**Correction.** Replace "account CRUD operations" with wording such as "account
review and state control: search and filtering, suspension, permanent banning and
role assignment". Also state, in the scope section, that account creation and
deletion are performed by the marketplace platform and are outside this module.

---

## E2 — Chapter 1 §1.5.2 and Chapter 3 §3.2.3 vs Chapter 4 §4.1/§4.2.2: machine-learning status

**Current.** Chapter 1 states the machine-learning behavioural flagging component
is architected but **not implemented in Phase 1**. Chapter 4 then describes the
system as "enhanced with a severity-aware hybrid machine learning threat detection
engine" and places an inference engine in the moderation flow.

**Why it is wrong.** These two statements contradict each other inside the same
report, and neither matches what was built. What *was* built is a
**suggestion-only** model that predicts severity and a suggested action with a
confidence score, plus an anomaly pipeline check over operator activity. It never
acts; a human always decides.

**Correction.**
1. In Chapter 1 §1.5.2, replace "strictly not implemented in Phase 1" with a
   description of the delivered component: a suggestion-only classifier whose
   output is advisory, with the full behavioural-flagging pipeline remaining a
   later extension.
2. In Chapter 4, remove the "severity-aware hybrid ML threat detection engine"
   phrasing and describe the moderation flow as it is: rule-based severity
   ordering plus an advisory model suggestion that the operator may follow or
   override.

---

## E3 — Chapter 1 §1.5.1 and Chapter 3 §3.6.5: who may export the audit log

**Current.** Audit logging is described as providing date-range filtering and CSV
export, with no restriction by role.

**Why it is wrong.** Export is restricted to Moderators and Super Admins. A Viewer
is refused with HTTP 403, and the control is hidden in the interface.

**Correction.** Add the restriction to both sections and state that it is enforced
server-side. Note in the limitations that this narrows an earlier stated
capability.

---

## E4 — Chapter 3 Table 3.1: Bootstrap, and the missing model-service tools

**Current.** The tools table lists "React.js & Bootstrap" for the frontend. It
also has no entry for the model service, while Chapter 3's research paradigm
section discusses model training.

**Why it is wrong.** The frontend is built with Tailwind CSS, not Bootstrap (the
design export uses Tailwind and its tokens are carried through). And the delivered
system includes a Python service using scikit-learn, pandas and FastAPI, which the
table does not mention.

**Correction.**
1. Change the frontend row to the actual stack: React 19, Vite 8, Tailwind CSS 4.
2. Add rows for: Python 3.12 with scikit-learn, pandas and joblib; FastAPI with
   Uvicorn for the model service; Vitest with React Testing Library for frontend
   tests (the table lists Jest and Supertest only).

---

## E5 — Chapter 3 §3.3 and §3.5: testing claims that do not match the build

**Current.** Jest and Supertest are stated with a **target of 80% line coverage**.

**Why it is wrong.** No coverage run was performed, so no coverage percentage can
be reported. Coverage is "not measured".

**Correction.** Keep Jest and Supertest for the API, add Vitest and React Testing
Library for the frontend and pytest for the model service, and either remove the
80% target or restate it explicitly as an **intended target that was not
measured**, to be confirmed with a coverage command.

---

## E6 — Chapter 1 §1.5.1: the completeness of the scope list

**Current.** The module is described as delivering four functional areas.

**Why it is wrong.** Two things are missing from the description: the public
interface that wraps the console (landing, login, not-found), which was confirmed
as required, and the login lockout behaviour now implemented.

**Correction.** Add the public shell to the scope description, and mention the
lockout as part of the authentication module's behaviour (five consecutive
failures lock the account for fifteen minutes, with Super Admin release).

---

## M1 — Chapter 2 §2.5 and Chapter 3 §3.4.3: the algorithmic feedback loop

**Current.** The conceptual framework describes approved, rejected and escalated
decisions becoming structured input for a future classifier.

**Status.** This is now **implemented**, not merely designed: each decision's
audit payload records the model version and whether the operator followed or
overrode the suggestion.

**Correction.** Change the tense of this claim from prospective to realised, and
point forward to the implementation chapter.

---

## M2 — Chapter 3 §3.4.6: wireframes and the role switcher

**Current.** The wireframe description refers to the interface as exported from
the design tool.

**Why it needs a note.** The exported design contained a wireframe control that
let a viewer switch roles. It was removed, because the operator's role comes from
the signed session and must not be self-selectable. The interface brand in the
export was also replaced.

**Correction.** Add a sentence to the wireframe section noting both changes and
why. Any wireframe figures reproduced in the report should be captioned as
pre-implementation artefacts if they still show that control.

---

## M3 — Chapter 1 §1.5.3: delimitations and passkeys

**Current.** Delimitations list mobile, third-party classifiers, chat moderation,
financial oversight and external identity verification.

**Correction.** Add a line recording that multi-factor authentication, single
sign-on and passkeys (WebAuthn) are outside the authentication scope defined for
this module, and cross-reference the Future Work section. This keeps the omission
visible rather than implicit.

---

## M4 — Chapter 3 §3.6.6: the settings panel's contents

**Current.** The settings panel is described as providing feature toggles and
key/value configuration.

**Why it needs a qualifier.** No source document names any concrete configuration
key or toggle. The implemented interface therefore presents clearly-labelled
sample keys.

**Correction.** State that the key set is configuration-driven and that no
specific keys are prescribed by the requirements, so the demonstration uses sample
configuration rather than invented platform settings. The same qualifier applies
to the dashboard's metrics.

---

## L1 — Chapter 3 Appendix A1: the time schedule

**Current.** The schedule ends at proposal submission (12 June 2026).

**Correction.** Extend it to cover the implementation phase and submission
(20 November 2026) and the demonstration window, so the appendix reflects the
whole project rather than the proposal stage only.

---

## L2 — Chapters 1–3 generally: tense

**Current.** Several passages describing what will be built use the future tense.

**Correction.** Apply the writing guide's rule throughout: past tense for work
completed, present tense for what the system is, future tense only in the Future
Work section.

---

## L3 — Chapter 2: reference currency

**Current.** The literature review cites sources of varying age.

**Correction.** The guide prefers sources no more than three years old. Review
each citation in Chapter 2 against that guidance when resolving the missing
reference entries listed in `docs/draft/references.md` Section B.

---

## Outstanding evidence (not a chapter change, but required before submission)

| Item | Where it goes | Status |
|---|---|---|
| Browser results (Chrome, Firefox, Edge) | Appendix | Not yet executed (the 20 Nov headless capture is not a browser test) |
| Deployment runbook results | Appendix | Not yet executed |
| Coverage figure (if the 80% target is retained) | Chapter 5 | Not measured |
| Full reference entries for ~25 in-text citations | References | Outstanding |
| Repository release tag and remote push | Chapter 5 version control | Outstanding |
| Screen-reader pass | Chapter 5 §5.4.6 | Not yet verified |
| Performance and load figures | Chapter 5 §5.8 | Not measured |
| Decision on the two open defects (CSV timestamp quoting, account-record layout) | Chapter 5 §5.4.5 | Recorded, not fixed (feature freeze) |

Screenshots were removed from this table on 20 November 2026: ten were captured
from the running application (Appendix 3).
