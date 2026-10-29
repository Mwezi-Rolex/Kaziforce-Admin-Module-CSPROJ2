# Digest: Chapter 5 Update

**Document:** "Chapter 5 Update" — A Web-based Admin and Moderation Module for a Digital Workforce Marketplace Platform (Capstone). Samuel Mugabi Mwesigwa, Strathmore University, December 2026.

**Purpose:** The project's current supervisor documentation. Despite the filename, the file contains the proposal (Chapters 1–3) plus a Chapter 4 (System Analysis, Design and Architecture). It states what the system IS and DOES — the code must stay consistent with its claims.

**Requirement IDs:** None present in the document. Do not invent any.

## Key content

### Chapter 1 — Introduction
- Problem: the digital workforce marketplace platform (industry partner's AI-powered gig marketplace: auth, profiles/skills, gig marketplace, ratings, notifications) has NO operator-facing governance layer. Participant-facing modules exist; admin tooling does not.
- General objective: develop and validate a web-based Admin and Moderation System providing operators with governance tooling for user management, content moderation, and audit logging.
- Four specific objectives mirror four research questions: (i) examine governance/moderation challenges in emerging markets; (ii) review existing admin/moderation systems and gaps; (iii) design role-based administration and content moderation architecture; (iv) develop and validate the system.
- Scope (1.5.1) — the authoritative feature list:
  - Web-based, browser-accessed, no client install.
  - Three privilege tiers: **Super Admin** (full platform control), **Moderator** (content queue + user-level actions), **Viewer** (read-only dashboard analytics and logs).
  - Four functional areas: **User management** (account CRUD, role assignment, suspension); **Content moderation queue** (flag review with approve/reject/escalate); **Audit logging** (INSERT-only record of all operator actions, date-range filtering, CSV export); **System settings** (feature toggles, key/value configuration).
  - **Authentication module** (login, JWT session management, role-gated route protection) included as supporting context.
  - Developed/evaluated in the industry partner's development environment.
- Limitations (1.5.2): development environment only; no production-scale load testing; synthetic data only (live data under NDA); **ML behavioural flagging classifier architected but NOT implemented in Phase 1** (Phase 2 extension, shown in ERD/architecture only).
- Delimitations (1.5.3) — explicitly excluded: native mobile admin; third-party trust-and-safety/classifier API integrations (moderation is human-in-the-loop, rule-based); real-time chat moderation (separate module); financial transaction oversight/payments/disputes; automated identity verification.

### Chapter 2 — Literature Review
- Themes: governance deficits in platform labour markets; content moderation at scale (workforce platforms moderate transactional/professional content, high-stakes → hierarchical human-in-the-loop); RBAC (Ferraiolo/Kuhn, least privilege, separation of duties); auditability (immutable append-only audit trails for non-repudiation).
- Related work gaps: fragmented moderation/admin tooling; enterprise RBAC too complex and decoupled from moderation workflows; community modqueue tools lack immutable audit trails.
- Conceptual framework: HTTP requests from participants → API gateway → RBAC middleware → moderation engine → permanent DB records. Immutability via PostgreSQL INSERT-only constraints (UPDATE/DELETE privileges withdrawn from the application DB user).

### Chapter 3 — Methodology, Design and Deliverables
- Paradigm: applied experimental; deterministic validation (auth strictness, routing correctness, audit completeness) rather than statistical metrics. Data acquisition/preprocessing/model-training sections describe a synthetic-data pipeline and rule-based severity scoring (ML training deferred to Phase 2).
- Validation/testing: unit, integration, security testing; flags above risk threshold must route to high-priority queue; middleware must block unauthorized routes; audit logging must capture every state change; **adversarial DB tests issue UPDATE/DELETE against audit_log to confirm the write-once constraint**.
- Process: Agile, ten weeks = five two-week sprints; sprint 1 = DB schema + JWT auth middleware; feature-branch Git with conventional commit prefixes (feat:, fix:, test:, docs:, chore:); repo tagged v1.0.0 at final submission.
- System design (3.4):
  - Actors: Viewer = read-only dashboards + view-only audit search; Moderator = approve/reject/escalate in queue + suspend non-admin users; Super Admin = role assignment across all tiers, permanent account termination, global settings modification.
  - Core classes: **UserAccountManager** (suspensions, role assignments), **ModerationEngine** (flag routing, prioritisation, escalation), **AuditLogger** (writes non-repudiable events), **AuthController** (credential validation, JWT issuance), **SettingsController** (config key read/write).
  - ERD entities: users, flags (one-to-many users→flags), roles, permissions, role_permissions junction, user_roles junction, audit_log (structurally isolated, no cascade from account deletions), system_settings (key/value, no user dependency).
  - Schema: UUID primary keys (anti-enumeration); indexes on flag_status and log_timestamp (date-range filtering/analytics); audit_log.created_at server-generated UTC; unique constraint on user email; **soft-delete flags on users, no hard deletes**.
  - Architecture (3-tier, decoupled): React.js SPA ↔ JSON over HTTPS ↔ Node.js/Express (middleware pipeline: auth verification → rate-limiting → RBAC → controller) ↔ PostgreSQL (explicit role permissions, row-level security, write-once audit paths). Azure VPS + Nginx reverse proxy (TLS termination, load distribution, security headers).
  - Wireframes: persistent left navigation rail; four domains — **Dashboard Analytics, User Control Centre, Moderation Queue, Audit Explorer**; destructive actions (permanent bans, feature toggles) behind two-step confirmation modals.
- Tools table (3.5): React.js (Vite); Node.js + Express; PostgreSQL; JWT (stateless, signed role claims, no server-side sessions); **bcrypt** password hashing; **Jest + Supertest, target 80% line coverage**; Figma (Double Diamond); Git + GitHub; Azure VPS + Nginx; Agile (Scrum-lite).
- Deliverables (3.6):
  - System documentation: architecture maps, **OpenAPI/Swagger collection of every endpoint**, deployment guides, env config schemas, migration instructions, operator manual.
  - Authentication module: login, bcrypt, JWT with role claims, token refresh lifecycle, session invalidation.
  - User management: search by name/role/status; update privilege states; temporary suspensions and permanent bans; **role assignment restricted to Super Admin; Moderators may suspend**; every action audited.
  - Moderation queue: unified prioritised queue of flagged gig listings, abusive reviews, portfolio violations, disputed transactions; each entry shows historical metadata; actions = approve (keep visible), reject (remove from marketplace), escalate to senior supervisor; **bulk approve and bulk reject**; every action audited.
  - Audit logging: captures operator ID, server-generated UTC timestamp, action type, target entity ID; INSERT-only table, no UPDATE/DELETE privileges for app DB user; read-only interface with date-range and actor filters; **CSV export**.
  - Settings panel: Super Admin only; key/value interface; feature toggles without redeployment; configurable moderation queue thresholds and session timeout durations; all changes audited.

### Chapter 4 — System Analysis, Design and Architecture
- Presents use case, sequence, ERD (Crow's Foot), class, activity diagrams and system architecture (images only).
- 4.1 and 4.2.2 describe the system as "enhanced with a severity-aware hybrid machine learning threat detection engine" and an ML inference engine in the moderation flow — **this conflicts with Chapter 1's scope, where ML flagging is explicitly a Phase 2 extension, not implemented in Phase 1**. Record any divergence in docs/DECISIONS.md; treat ML as NOT built unless the user says otherwise.
- Wireframes (Figures 4.6–4.10): Login page; Dashboard overview (summary metric cards + recent activity feed); User management (searchable account table with role-assignment and suspension panel); Moderation queue (filterable table with approve/reject/escalate + bulk action toolbar); Audit log explorer (date-range filters, paginated read-only table, CSV export control).

## Hard constraints / claims the code must match
- Stack: React.js SPA (Vite) + Node.js/Express REST API + PostgreSQL, hosted on Azure VPS behind Nginx (TLS).
- Three RBAC tiers: Super Admin / Moderator / Viewer, enforced by JWT role claims validated on every protected request; role-gated route protection on the frontend too.
- Four modules: user management, content moderation queue, audit logging, system settings (+ auth as supporting context).
- Audit log is INSERT-only: no UPDATE/DELETE grants to the application DB user; server-generated UTC created_at; every operator action captured (actor ID, action type, target entity, timestamp).
- Moderation actions limited to approve / reject / escalate, plus bulk approve/reject; escalate routes disputes to Super Admin.
- Role assignment and permanent bans = Super Admin only; standard suspension = Moderator; Viewer read-only.
- Settings = Super Admin only, key/value with feature toggles; settings changes audited.
- UUID primary keys; unique user email; soft-delete users (no hard deletes); audit_log isolated from user cascades; indexes on flag_status and log_timestamp.
- Middleware pipeline order: authentication verification → rate-limiting → RBAC → controller.
- bcrypt password hashing; JWT stateless sessions with refresh and invalidation.
- Jest + Supertest with 80% line coverage target; adversarial immutability tests on audit_log.
- ML flagging classifier is Phase 2 only — must not be presented as implemented (note Chapter 4's contradictory wording).
- Out of scope: mobile admin, third-party content classifiers, chat moderation, payments/financial disputes, external identity verification.

## Section map
- Front matter: title, declaration, abstract, ToC, figure/table/abbreviation lists.
- Ch.1 Introduction: 1.1 Background · 1.2 Problem Statement · 1.3 Objectives & Research Questions · 1.4 Justification · 1.5 Scope/Limitations/Delimitations.
- Ch.2 Literature Review: 2.1 Intro · 2.2 Challenges (governance, moderation, RBAC, auditability) · 2.3 Related solutions · 2.4 Gaps · 2.5 Conceptual Framework.
- Ch.3 Methodology: 3.1 Intro · 3.2 Research Paradigm (data acquisition/preprocessing/training/validation) · 3.3 Agile SDM (elicitation, sprints, coding, testing) · 3.4 Analysis & Design (use case, class, ERD, schema, architecture, wireframes) · 3.5 Tools & Techniques (Table 3.1) · 3.6 Deliverables (5 modules).
- Ch.4 System Analysis, Design and Architecture: 4.1 Intro · 4.2 Diagrams (use case, sequence, ERD, class, activity, architecture, wireframes).
- References (APA); Appendix A1 Time Schedule (proposal submission 12-Jun-2026); Appendix A2 Turn-It-In Report.
