# Documentation deliverables

How the build feeds the report. Structure follows the governing templates (example reports 1 and 2, the two PDF templates digested in `docs/digest/`, and `Research Writing for CS 2 Projects - 2026.md`) and the course sprint obligations in the research-writing guide.

Status of each deliverable is in `docs/TRACEABILITY_SCOPE.md`; the drafted text lives in `docs/draft/`. Nothing in this file is edited by the build — it is the map from report section to build artefact.

## Schedule

| Milestone | Date | Status at 12 Nov 2026 |
|---|---|---|
| Foundation, auth + RBAC, user management | 6 Nov | done |
| Moderation queue, audit log, settings | 10 Nov | done |
| ML component A (and B if time); feature freeze | 13 Nov | done |
| Deployment artifacts; operator provisions and runs the smoke test | 14–15 Nov | artifacts ready, run pending |
| Documentation drafts | 14–19 Nov | drafted, awaiting evidence |
| Submission | 20 Nov | pending |
| Demo / panel | 23–27 Nov | pending |

## Chapter 4 — System Analysis, Design and Architecture

| Section | Required content | Source of truth | Build artefact | Status |
|---|---|---|---|---|
| 4.1 Introduction | Scope of the system as built | Ch5 §1.5.1 | `docs/PLAN.md` §1 | drafted |
| 4.2.1 Functional Requirements | Requirement list with IDs | SRS + console requirements | `docs/TRACEABILITY_SCOPE.md` | drafted |
| 4.2.2 Non-Functional Requirements | Accessibility, performance, security | SRS §10, FWED §18 | `docs/digest/SRS.md`, `docs/digest/FWED.md` | drafted |
| 4.2.3 Data Requirements | Entities, keys, relationships | DDD §5.3, §10.8, §28.2 | `server/migrations/*.sql`, `docs/digest/DDD.md` | drafted |
| 4.2.4 Interface and Integration | API contracts, envelopes, auth | BED §6.6–§6.12, TDD §10 | `server/src/routes/`, `docs/digest/BED.md` | drafted |
| 4.3.1 Use Case Diagram | Actors and use cases | Note 8, Ch5 §1.5.1 | `docs/digest/note-8.md` | diagram needed |
| 4.4.1 Logical Database Schema | Tables, columns, keys, immutability | DDD §28.2, Ch5 §3.6.5 | `server/migrations/` | drafted |
| Sequence / activity / architecture diagrams | Must match the implementation | Note 8, TDD §4.3, §12.4.3 | `docs/draft/` | diagram needed |

The templates require the diagram, the code, the interface and the report to describe the same system, so every diagram is re-checked against the running application before submission.

## Chapter 5 — System Implementation, Testing and Evaluation

| Section | Required content | Build artefact |
|---|---|---|
| 5.1.1 Hardware Specification | Machine and OS used | `docs/draft/chapter-5-implementation-and-testing.md` §5.1 |
| 5.1.2 Software Specification | Runtime, service and tool versions | same §5.1 |
| 5.2 Implementation Environment | Both specification tables, deployment path | same §5.1–5.2 |
| 5.3 Implemented Modules and Workflows | What was built, how the parts connect | same §5.3, with screenshots |
| 5.4 Testing and Evaluation | Strategy, test cases, results | same §5.4, TC-01…TC-35 |
| 5.5 Version Control and Implementation Evidence | Commits, release, deployment evidence | `docs/draft/appendices.md` command log |
| 5.6 Author Oversight and AI-Assisted Tools | What AI assistance was used for and how it was verified | same chapter |
| 5.7 Results, Discussion and Limitations | Honest results, failures, scope limits | same chapter, §5.7 |

## Chapter 6 and back matter

| Item | Content | Artefact |
|---|---|---|
| 6.2 Conclusion | Objectives met against evidence | `docs/draft/chapter-6-conclusion.md` |
| 6.3 Recommendations | Findings and next steps | same |
| 6.4 Future Work | Passkeys, ML triage, platform modules | same |
| Front matter | Cover page, signed declaration, similarity report | student and supervisor supply |
| Appendices | Time schedule, user guide, repository evidence, settings evidence, Turnitin report | `docs/draft/appendices.md` |

## Evidence standards

1. Every claim in the report is backed by a file in this repository or by output from a command that was actually run, quoted with the command name.
2. No coverage percentage, performance figure or test count appears unless a command produced it. Coverage is recorded as "not measured".
3. Screenshots are captured from the running application at the final implementation state, not from the Figma export.
4. Test records use the format the guide requires: test performed, expected result, actual result, corrective action. The current table is TC-01 to TC-35 in the Chapter 5 draft.
5. Failed or unrun tests are reported as failures with the reason. The browser checklist and the VPS run are the two open items and are marked as such.
6. Model metrics come only from `ml/reports/metrics.json` and are labelled as a fit to synthetic data.

## Outstanding before submission

- Operator: `docs/BROWSER_CHECKLIST.md` in Firefox and Edge; `docs/DEPLOY.md` on the VPS; the report screenshots.
- Diagrams for Chapter 4 regenerated from the implementation.
- The 25 in-text citations still flagged `[reference needed]` in `docs/draft/references.md`.
