# Digest: Note 8 — ICS 410X CS Project II (Lecturer note: report diagrams)

- **Title:** "Diagrams used in the report" (Note 8, ICS 410X CS Project II Notes MOC; created 2026-09-10).
- **Purpose:** The lecturer's worked diagram set for the Kaziforce admin & moderation system, provided as PlantUML/Mermaid sources to be used in the report.
- **Role:** LECTURER NOTE (diagram reference for the project's own documentation; governs what analysis/design diagrams the report must contain and their expected content — not product behaviour).
- Note: a byte-identical duplicate exists at `src/imports/ICS_410X_CS_Project_II_-_Note_8 (2).md`; only this file was digested.

## Structure & format rules

- Pure diagram-source note: six diagram blocks, each under a heading naming the tool that produced it ("Claude Use case diagram", "ChatGPT Sequence Diagram", "Grok Class Diagram", "claude entity-relationship diagram", "claude activity", "claude system architecture").
- Formats: PlantUML `@startuml` blocks for use case, sequence, and class diagrams; Mermaid blocks for ERD (`erDiagram`), activity (`flowchart TD`), and architecture (`flowchart TB`).
- Implication for the report: diagrams are expected as renderable sources (UML use case / sequence / class, ERD, activity/flowchart, system architecture) matching the Chapter 4 diagram set seen in the example reports.
- No prose rules, referencing, or section structure beyond the diagram headings.

## Key content (what the diagrams encode)

- Actors (use case): Viewer, Moderator, Super Admin, with generalization Moderator <|-- Viewer and Super Admin <|-- Moderator (role inheritance).
- Use cases: Login/Authenticate; View Dashboard Analytics; Search/Filter Audit Log; Export Audit Log CSV (<<extend>> of search); Review Moderation Queue; Approve / Reject / Escalate Content; Suspend User Account; Assign Role; Permanently Ban Account; Modify System Settings.
- Actor→use-case mapping: Viewer → login, analytics, audit search; Moderator → queue review, approve/reject/escalate, suspend user; Super Admin → assign role, permanent ban, settings.
- Sequence diagram (moderation flow): Moderator → React Admin UI → Node/Express API, with JWT Middleware validation (401 branch) then RBAC Middleware role check (403 branch), then ModerationEngine → PostgreSQL; decision alt-blocks for Approve / Reject / Escalate; every state change followed by AuditLogger writing an INSERT audit event; loop over queue items.
- Class diagram: controllers AuthController (login, verifyJWT, refreshToken, hashPassword), UserAccountManager (search, suspend, ban, assignRole, bulkMutateStatus), ModerationEngine (getPrioritizedQueue, processDecision, bulkResolveFlags), SettingsController; domain classes User, ContentFlag, AuditEvent, SystemSetting; all operational classes depend on AuditLogger (cross-cutting; note states DB enforces INSERT-only on audit_log).
- ERD: users, roles, permissions, role_permissions, user_roles (RBAC many-to-many), content_items, flags, audit_log (no cascade delete from users), system_settings; users.email unique; users.is_deleted soft-delete flag.
- Activity diagram: flag ingestion → rule-based severity scoring → enqueue; moderator decision (approve/reject/escalate); Super Admin review (overrule or uphold & ban); all resolutions wrapped in BEGIN TRANSACTION → SQL mutation → INSERT INTO audit_log → COMMIT.
- Architecture diagram: React SPA (internet) → Nginx on Azure VPS :443 (TLS 1.2/1.3 termination, load distribution, security headers) → Node/Express :3000 on loopback (auth → rate-limiting → RBAC → controller middleware chain) → PostgreSQL :5432 localhost (relational store, row-level security, audit_log INSERT-only).

## Section map

1. Use case diagram (PlantUML) — actors, role generalization, use cases, extend relationship.
2. Sequence diagram (PlantUML) — moderation queue load + decision resolution with JWT/RBAC/audit steps.
3. Class diagram (PlantUML) — controllers, domain classes, AuditLogger as cross-cutting dependency.
4. ERD (Mermaid) — RBAC tables, content_items/flags, audit_log, system_settings.
5. Activity diagram (Mermaid) — end-to-end flag lifecycle with transactional persistence and audit insert.
6. System architecture (Mermaid) — SPA / Nginx / Express middleware chain / PostgreSQL deployment view.
