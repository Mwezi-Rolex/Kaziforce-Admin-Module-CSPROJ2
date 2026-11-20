# Chapter 6: Conclusions, Recommendations and Future Works

DRAFT — Chapter 6. Past tense for work completed, present tense for what the
system is and for established knowledge, future tense only in Section 6.3.
Conclusions rest only on evidence reported in Chapter 5; no new results or
citations are introduced here.

## 6.1 Conclusions

The conclusions answer the specific objectives in order.

### 6.1.1 On the governance and moderation challenges (Objective i)

The literature reviewed in Chapter 2 established that digital labour platforms
operating in high-informality markets function as the de facto regulatory
authority for their own marketplaces, and that the absence of an operator-facing
governance layer leaves three structural gaps: no mechanism to manage participant
accounts, no structured process for reviewing flagged content, and no
non-repudiable record of administrative decisions. Chapter 2 recorded that
content moderation on a workforce platform differs from social-media moderation
because a false positive can remove a worker's income, which is why a
human-in-the-loop workflow is required rather than fully automated review.

### 6.1.2 On gaps in existing solutions (Objective ii)

The review identified fragmentation as the central gap. Community moderation
tools optimise for short conversational content and generally lack immutable
audit trails; enterprise access-control systems provide rigorous permission
modelling but sit apart from moderation workflows; and machine-learning flagging
systems presuppose labelled historical data that a newly launched marketplace
does not possess. No reviewed system combined moderation queue management,
role-based access control and immutable audit logging in a single operator-facing
module.

### 6.1.3 On the design (Objective iii)

A role-based administration and content moderation architecture was designed and
implemented. The design is characterised by three decisions, each of which was
carried through to the running system and verified rather than asserted.

First, **authorisation is centralised and data-driven.** Three privilege tiers are
defined by a permission matrix held in the database rather than by conditions
scattered through the code. Every protected endpoint declares the permission it
requires, and the check executes before the handler. This made the refusal
behaviour directly testable, and the tests confirm that each role is refused the
actions it must not perform.

Second, **audit immutability is enforced below the application.** Two database
roles separate schema ownership from runtime access, and the runtime role is
granted only `SELECT` and `INSERT` on the audit ledger. Each ledger row also
records how the action ended, the source address and a correlation identifier
that ties it to the response the operator received, so a refused action is kept
as evidence rather than omitted. Immutability therefore
does not depend on application code being correct: even a defect in the software
cannot alter a recorded event. Adversarial tests issuing `UPDATE`, `DELETE` and
`TRUNCATE` as the application role confirm each is refused, and the same check is
part of the deployment smoke test.

Third, **the machine-learning component is advisory by construction.** The model
predicts and suggests; it cannot change a flag, an account or a setting. The
interface labels its output "Suggestion only", the operator decides, and the audit
event records both the model's version and whether the operator followed or
overrode it. The design therefore satisfies the requirement that a human remains
in control while still capturing the labelled decisions a future classifier would
need.

### 6.1.4 On development and evaluation (Objective iv)

The system was developed as a working prototype and automatically tested. The
evidence reported in Chapter 5 supports the following conclusions.

**Access control operates as specified.** Tests confirm that a Viewer is refused
suspension, banning, moderation decisions and log download; that a Moderator is
refused banning, role assignment, escalation resolution, settings changes and
unlocking; and that each refusal returns the correct status code. Role
enforcement was designated a never-cut item and it is fully implemented and
tested.

**The audit ledger is immutable in practice, not only in intent.** All three
destructive operations against it fail for the application role with a
database-level permission error, verified in the automated suite and in a local
smoke test against a running API and database. A live check also confirmed that
the correlation identifier sent with a request is returned to the caller and
stored on the ledger row.

**The moderation workflow is complete and auditable.** Flag review with approve,
reject and escalate transitions, bulk decisions with per-item outcomes, and the
two escalation outcomes including the ban path all operate and all write audit
events. The moderation tests were made independent of their run order, and the
full suite passed three times in a row without re-seeding the database.

**The audit trail supports the future classifier.** Because every decision records
the model version and whether the suggestion was followed, the system accumulates
exactly the labelled data that Chapter 2 identified as the prerequisite for
automated triage — the gap that the literature review found existing systems do
not address.

**The model is measurably better than the baselines on severity prediction, and
not uniformly better on action prediction.** On severity the Random Forest
achieved a macro-F1 of 0.6170 against 0.2244 for the majority-class baseline and
0.4613 for the keyword-rule baseline. On suggested action the logistic regression
achieved a marginally higher macro-F1 (0.5555) than the Random Forest (0.5303),
with both exceeding the baselines. These figures measure fit to the synthetic
generator and are not evidence of real-world moderation performance.

**The system fails safely.** When the model service is unavailable or slow, the
console continues to operate and reports that suggestions are unavailable; the
queue, the decisions and the audit writes are unaffected. This was verified by
test rather than assumed.

## 6.2 Recommendations

The recommendations are addressed to the audiences who would act on them, and each
follows from evidence in Chapter 5.

**To the industry partner.** The console should be deployed to a controlled
environment and used with real operator accounts before the machine-learning
component is extended, because the value of the classifier depends on accumulating
genuine moderation decisions. The account-creation boundary should also be
confirmed: this build treats accounts as originating in the marketplace platform
and provides review and state control rather than creation and deletion.

**To future maintainers.** The two-role database separation should be treated as
load-bearing rather than incidental. Any migration that adds a table must re-assert
the audit-ledger restriction, because a broad default grant would silently weaken
the immutability guarantee that the tests currently prove. The provided grants
script re-applies the restriction and can be re-run to correct drift.

**To future maintainers, regarding the two open defects.** The CSV timestamp
quoting and the account-record layout recorded in Chapter 5 should be corrected
first, each with a test that would have caught it.

**To the project supervisor, regarding evidence.** The deployment runbook and the
browser checklist were prepared but not executed by the developer. Their results
should be obtained before any deployment or cross-browser claim is made in the
final documentation, because a claim that has not been observed cannot be defended.

**Regarding the model.** The severity model is usable as a triage aid; the action
suggestion is weaker and should be treated as a prompt for attention rather than a
recommendation. Both should be evaluated against real decisions once such data
exists, and the metrics in this report should be replaced with metrics computed
from that data.

## 6.3 Future Works

The following extend the work rather than repair it; the limitations in Chapter
5.8 concern evidence that has not yet been collected, which is a different matter
from functionality that was never in scope.

**Passkeys and stronger authentication.** The strongest extension is the addition
of phishing-resistant authentication. Passkeys (WebAuthn/FIDO2) would allow
operators to authenticate without a shared secret, and would be complemented by
multi-factor authentication for privileged roles. The current design already
provides the two foundations this needs: a per-request authorisation check that is
independent of how the identity was proven, and an audit ledger that records
authentication and authorisation events. Passkeys are therefore a natural next
step rather than a redesign.

**Real labelled data and retraining.** The machine-learning component should be
retrained on the decisions the console accumulates. The system was deliberately
built to make this possible: the audit payload records the model version and
whether the operator followed the suggestion, so a training set can be extracted
without further instrumentation. The synthetic generator should then be retained
only as a benchmark.

**Detection of subtler anomalies.** Component B recovered every injected anomaly
because the injected cases were far outside normal operating ranges. A stronger
evaluation would inject borderline anomalies, so that the detector's precision and
recall are informative rather than near-perfect by construction.

**Server-side sorting by predicted severity.** The queue currently sorts the
retrieved page by predicted severity. Moving the prediction ahead of the query
would allow the ordering to apply across the whole result set.

**Configurable business rules.** The settings store supports key/value
configuration and feature toggles. A general rule engine — for example,
configurable escalation criteria expressed as conditions rather than constants —
would extend this without changing the configuration interface.

**Multi-tenancy.** Several requirements assume tenant-scoped roles and feature
activation. The console is deliberately single-tenant, so tenancy would require
the tenant identifier to be threaded through the data model and every query
before those requirements could be met.

**Retention policy.** No retention period is applied to the audit ledger, and the
requirement for configurable retention is recorded as out of scope because
choosing a period carries legal implications the source documents do not settle.
Defining such a policy would be an operational decision for the industry partner
rather than a technical one.
