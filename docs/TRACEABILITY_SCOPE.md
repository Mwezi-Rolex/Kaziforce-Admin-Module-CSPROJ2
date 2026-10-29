# TRACEABILITY_SCOPE.md — in-scope requirements only

Generated 2026-10-29 by `docs/traceability-gen.mjs` (rerun: `node docs/traceability-gen.mjs`). Per AGENTS.md scoped-traceability rule: this file lists only rows in scope for the Admin & Moderation console build — (a) the 55 SRS IDs that map to a Figma screen, and (b) the console requirements (CON-*) that have no SRS ID and come from the proposal, `chapter 5 update`, the Note 8 diagrams, or BRIEF.md. The other 1,540 SRS IDs are out of scope and are reported as a count only (full archive: `docs/TRACEABILITY.md`).

**Scope statement (AGENTS.md scope-honesty rule):** this build implements the Admin & Moderation console subset of the SRS — not the whole Kaziforce platform SRS. The console subset below is the complete intended surface.

## A. Console requirements with no SRS ID (CON-*)

| ID | Statement | Source | Screen/area | Layer | Status |
|---|---|---|---|---|---|
| CON-AUTH-001 | Operators sign in with email + password; credentials verified with bcrypt | Ch5 §3.6.2 | Login | frontend + backend + database | done — Jest-verified end-to-end (login, cookie, /me) |
| CON-AUTH-002 | Role comes from the signed JWT; wireframe role switcher and hard-coded operator removed | BRIEF 2026-10-29 + Ch5 JWT role claims | All screens | frontend + backend | done — role switcher and hard-coded operator removed |
| CON-AUTH-003 | Suspended or terminated operators cannot authenticate | Ch5 §3.4 actors (cf. BR-USR-005) | Login | backend + database | done — Jest-verified: suspended operator denied 403 at login and middleware |
| CON-RBAC-001 | Three tiers: Viewer read-only; Moderator queue decisions + suspend; Super Admin role assignment, bans, settings | Ch5 §1.5.1/§3.4 (cf. SEC-RBAC-001…007) | All screens | frontend + backend + database | done — matrix seeded; Viewer/Moderator denial tests passing (403 per route) |
| CON-USR-001 | Account view / search / filter by query, role, and status | Ch5 §3.6.3 | User Control Centre | frontend + backend + database | done (slice 2) — Jest-verified list/search/filters |
| CON-USR-002 | No account create or delete; accounts originate in the marketplace platform | BRIEF 2026-10-29 overriding Ch5 "account CRUD"; Figma export | User Control Centre | frontend + backend | done (slice 2) — no create/delete endpoints exist |
| CON-USR-003 | Suspend account (Moderator+), audited | Ch5 §3.6.3 | User Control Centre | frontend + backend + database | done (slice 2) — Moderator suspends, audited; operator accounts need Super Admin |
| CON-USR-004 | Assign role (Super Admin only), audited | Ch5 §3.6.3 | User Control Centre | frontend + backend + database | done (slice 2) — Super Admin only, audited; self-change refused |
| CON-USR-005 | Permanent ban behind 2-step confirmation (Super Admin), audited | Ch5 §3.6.3 + wireframes §3.4.6 | User Control Centre | frontend + backend + database | done (slice 2) — Super Admin only, 2-step modal, audited |
| CON-USR-006 | Account record panel shows flags reported + content owned; lists scroll inside the panel | Figma export + BRIEF UI fix | User Control Centre | frontend | done (slice 2) — flags/content lists scroll in panel (.panel-scroll) |
| CON-MOD-001 | Prioritised flag queue ordered by severity; severity/status filters | Ch5 §3.6.4 | Moderation Queue | frontend + backend + database | done (slice 3) — severity-ranked queue + filters, Jest-verified |
| CON-MOD-002 | Approve / reject / escalate a flag (Moderator+), audited | Ch5 §3.6.4; Note 8 UC4–UC6 | Moderation Queue | frontend + backend + database | done (slice 3) — approve/reject/escalate audited, 409 on already-decided flags |
| CON-MOD-003 | Bulk approve and bulk reject | Ch5 §3.6.4 | Moderation Queue | frontend + backend | done (slice 3) — bulk endpoint with per-flag audit events |
| CON-MOD-004 | Super Admin escalation lane: overrule or uphold with permanent ban | Note 8 activity diagram; Figma export | Moderation Queue | frontend + backend + database | done (slice 3) — Super Admin lane overrule/uphold+ban; denied to Moderators (403) |
| CON-AUD-001 | Every state change writes an audit event (actor, action, target, UTC timestamp); store is INSERT-only | Ch5 §3.6.5 (cf. SEC-AUD-001…006) | Audit Explorer | backend + database | done — AuditLogger on auth + user endpoints; Jest asserts audit rows; app role denied UPDATE/DELETE/TRUNCATE (42501) |
| CON-AUD-002 | Audit explorer: date-range + actor filters, read-only table | Ch5 §3.6.5 | Audit Explorer | frontend + backend | not started |
| CON-AUD-003 | CSV export restricted to Moderator and Super Admin; server 403 for Viewer; control hidden for Viewer | BRIEF 2026-10-29 overriding Ch5 §3.6.5 all-operator export (cf. FR-ADM-037, SEC-AUD-007) | Audit Explorer | frontend + backend | not started |
| CON-AUD-004 | Adversarial immutability test: application DB role cannot UPDATE/DELETE audit_log | Ch5 §3.3 testing; BRIEF never-cut list | tests | database + tests | not started |
| CON-SET-001 | Settings panel Super Admin only; key/value config + feature toggle; changes audited | Ch5 §3.6.6 (cf. FR-ADM-004/019/026) | System Settings | frontend + backend + database | not started |
| CON-SET-002 | Settings keys and toggles stay named placeholders until the user supplies them | OQ-2 default confirmed in BRIEF | System Settings | frontend | not started |
| CON-DASH-001 | Dashboard shell present; analytics deliberately unpopulated ("Metric definitions pending") | BRIEF/OQ-2 (cf. FR-ADM-008/046) | Dashboard | frontend | not started |
| CON-WEB-001 | Landing page: minimal, reuses export tokens only; product name Kaziforce (replaces "Tendaji") | BRIEF 2026-10-29 | Landing | frontend | done (slice 0) |
| CON-WEB-002 | 404 page for unknown routes | BRIEF 2026-10-29 | 404 | frontend | done (slice 0) |
| CON-UI-001 | Every panel listing report content or options scrolls inside its container instead of clipping | BRIEF 2026-10-29 | All screens | frontend | not started |
| CON-ML-A-001 | Suggestion-only ML: per-flag predicted severity + suggested action + confidence (Random Forest vs logistic regression + baselines); moderator always decides | BRIEF ML-A; AGENTS.md ML rules | Moderation Queue | backend (model service) + frontend | reserved (slice 8) |
| CON-ML-B-001 | Stretch: Isolation Forest anomaly score over operator activity, shown to Super Admin in audit explorer | BRIEF ML-B (first to cut) | Audit Explorer | backend (model service) + frontend | reserved (slice 9, first cut) |
| CON-DEP-001 | Deployment artifacts + runbook for Azure VPS + Nginx; agent provisions nothing | BRIEF deployment | infra | backend (infra) | reserved (slice 10) |
| CON-TST-001 | Jest + Supertest API tests including role enforcement and audit immutability | BRIEF stack; Ch5 §3.5 | tests | backend + tests | on track — 26 Jest tests passing incl. role denials and immutability; Vitest 3 passing |

## B. SRS IDs in scope (mapped to a Figma screen)

| Requirement ID | Statement (SRS verbatim) | Figma screen | Layer | Status |
|---|---|---|---|---|
| FR-ADM-001 | The system shall provide a centralized platform administration console. | All screens | frontend + backend + database | not started |
| FR-ADM-003 | The system shall manage platform-wide roles and administrative permissions. | User Control Centre | frontend + backend + database | not started |
| FR-ADM-004 | The system shall manage global platform settings. | System Settings | frontend + backend + database | not started |
| FR-ADM-008 | The system shall display platform-wide operational dashboards. | Dashboard | frontend + backend | not started |
| FR-ADM-019 | The system shall support configurable application settings. | System Settings | frontend + backend + database | not started |
| FR-ADM-020 | The system shall support configurable business rules. | System Settings | frontend + backend + database | not started |
| FR-ADM-026 | The system shall support enabling and disabling features using feature flags. | System Settings | frontend + backend + database | not started |
| FR-ADM-027 | The system shall support feature activation by tenant, user role, region, or subscription plan. | System Settings | frontend + backend + database | not started |
| FR-ADM-029 | The system shall support feature rollback without application redeployment. | System Settings | frontend + backend + database | not started |
| FR-ADM-031 | The system shall provide administrative visibility into active feature configurations. | System Settings | frontend + backend | not started |
| FR-ADM-032 | The system shall record all administrative actions. | Audit Explorer | backend + database | not started |
| FR-ADM-033 | The system shall record authentication and authorization events. | Audit Explorer | backend + database | not started |
| FR-ADM-034 | The system shall record configuration changes. | Audit Explorer | backend + database | not started |
| FR-ADM-035 | The system shall record security-related events. | Audit Explorer | backend + database | not started |
| FR-ADM-036 | The system shall support audit log search and filtering. | Audit Explorer | frontend + backend | not started |
| FR-ADM-037 | The system shall support export of audit records subject to authorization. | Audit Explorer | frontend + backend | not started |
| FR-ADM-038 | The system shall protect audit logs against unauthorized modification or deletion. | Audit Explorer | backend + database | not started |
| FR-ADM-039 | The system shall support configurable audit retention periods. | Audit Explorer | backend + database | not started |
| FR-ADM-046 | The system shall provide operational dashboards for administrators. | Dashboard | frontend + backend | not started |
| BR-USR-005 | Suspended or deactivated users shall not authenticate or perform business operations. | Login, User Control Centre | backend + database | not started |
| BR-USR-008 | All user lifecycle events shall be recorded in the audit log. | Audit Explorer | backend + database | not started |
| NFR-PRT-003 | The system shall support modern web browsers. | All screens | frontend | not started |
| NFR-ACC-001 | The system shall comply with WCAG 2.1 Level AA accessibility guidelines. | All screens | frontend | not started |
| NFR-ACC-002 | The system shall support keyboard-only navigation. | All screens | frontend | not started |
| NFR-ACC-003 | The system shall support screen readers through semantic markup and ARIA where appropriate. | All screens | frontend | not started |
| NFR-ACC-004 | The system shall maintain sufficient color contrast for text and interactive elements. | All screens | frontend | not started |
| NFR-ACC-005 | The system shall provide text alternatives for non-text content where applicable. | All screens | frontend | not started |
| NFR-ACC-006 | The system shall avoid relying solely on color to convey information. | All screens | frontend | not started |
| SEC-AUTH-001 | The system shall require authentication before granting access to protected resources. | Login | frontend + backend | not started |
| SEC-AUTH-002 | The system shall support username/email and password authentication. | Login | frontend + backend | not started |
| SEC-AUTH-003 | The system shall support Multi-Factor Authentication (MFA). | Login | frontend + backend | not started |
| SEC-AUTH-004 | The system shall support Single Sign-On (SSO) using OpenID Connect (OIDC) and SAML 2.0. | Login | frontend + backend | not started |
| SEC-AUTH-005 | The system shall support passwordless authentication where configured. | Login | frontend + backend | not started |
| SEC-AUTH-006 | The system shall support biometric authentication on supported mobile devices. | Login | frontend + backend | not started |
| SEC-AUTH-007 | The system shall enforce configurable password complexity and rotation policies where applicable. | Login | frontend + backend | not started |
| SEC-AUTH-008 | The system shall lock or throttle authentication attempts after configurable failed login thresholds. | Login | frontend + backend | not started |
| SEC-AUTZ-001 | The system shall authorize every protected request. | All screens | backend | not started |
| SEC-AUTZ-002 | The system shall perform authorization before executing business operations. | All screens | backend | not started |
| SEC-AUTZ-003 | The system shall enforce least-privilege access principles. | All screens | backend | not started |
| SEC-RBAC-001 | The system shall support configurable platform and tenant roles. | All screens | frontend + backend + database | not started |
| SEC-RBAC-002 | The system shall assign one or more roles to each user. | All screens | frontend + backend + database | not started |
| SEC-RBAC-003 | The system shall support hierarchical roles. | All screens | frontend + backend + database | not started |
| SEC-RBAC-004 | The system shall support permission inheritance. | All screens | frontend + backend + database | not started |
| SEC-RBAC-005 | The system shall allow tenant-specific role customization. | All screens | frontend + backend + database | not started |
| SEC-RBAC-006 | The system shall support temporary privileged access where approved. | All screens | frontend + backend + database | not started |
| SEC-RBAC-007 | The system shall maintain complete role assignment history. | All screens | frontend + backend + database | not started |
| SEC-AUD-001 | The system shall log authentication events. | Audit Explorer | backend + database | not started |
| SEC-AUD-002 | The system shall log authorization decisions for privileged operations. | Audit Explorer | backend + database | not started |
| SEC-AUD-003 | The system shall log administrative actions. | Audit Explorer | backend + database | not started |
| SEC-AUD-004 | The system shall log financial operations. | Audit Explorer | backend + database | not started |
| SEC-AUD-005 | The system shall log security configuration changes. | Audit Explorer | backend + database | not started |
| SEC-AUD-006 | The system shall prevent unauthorized modification of audit records. | Audit Explorer | backend + database | not started |
| SEC-AUD-007 | The system shall support secure export of audit logs. | Audit Explorer | backend + database | not started |
| FR-ERR-004 | The system shall present user-facing error messages that are actionable and do not expose internal implementation details. | All screens | frontend + backend | not started |
| UC-009 | Platform Administrator Configures Tenant Settings | System Settings | scenario (all layers) | not started |

Out-of-scope SRS IDs: 1540 (count only, per AGENTS.md).
