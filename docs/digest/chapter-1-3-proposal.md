# Digest: Chapter 1–3 Proposal — ICS 410X CS Project II (Kaziforce's own proposal)

- **Title:** "A Web-based Admin and Moderation Module for a Digital Workforce Marketplace (Capstone)" — Samuel Mugabi Mwesigwa, 167999; Supervisor: Dr Dickson Owuour; Strathmore University, June 2026.
- **Purpose:** The project's own Chapters 1–3 proposal — the binding scope/objectives/architecture statement for Kaziforce.
- **Role:** PROPOSAL (format model AND the closest thing to a feature spec at project level; superseded per AGENTS.md by SRS/TDD/BED/DDD/FWED where they decide behaviour/architecture).
- Note: a byte-identical duplicate exists at `src/imports/ICS_410X_CS_Project_II_-_Chapter_1-3_v2 (2).md`; only this file was digested.

## Structure & format rules

- Front matter: Title page → Declaration and Approval → Acknowledgment → Abstract → Table of Contents → List of Figures → List of Tables → List of Abbreviations.
- Chapter naming: "Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Development Methodology" (spelled-out ordinals in this proposal).
- Ch 1 sections: 1.1 Background; 1.2 Problem Statement; 1.3 General Objective / Aim with 1.3.1 Specific Objectives and 1.3.2 Research Questions; 1.4 Justification(s); 1.5 Scope and Limitations (1.5.1 Scope, 1.5.2 Limitation(s), 1.5.3 Delimitations).
- Ch 2: Introduction; Challenges (4 subsections); Related Applications and Solutions (one subsection per category); Gaps in Existing Solutions; Conceptual Framework (figure + prose: inputs → processing → outputs, plus feedback loop).
- Ch 3: Introduction; Research Paradigm (Data Acquisition, Data Preprocessing, Model Training, Model Validation and Testing); Software Development Methodology (Requirements Elicitation, Sprint Planning, Iterative Development, Coding, Testing and Deployment, Justification); System Analysis and Design (Use Case, Class, ERD, Database Schema, System Architecture, Wireframes); System Development Tools and Techniques (Table 3.1: Tool/Technique | Section | Description); System Deliverables (one subsection per module).
- Referencing: APA author-date with DOIs; Appendix A1 time-schedule table (ID, Task, Start, Finish, Duration); Appendix A2 Turnitin report.
- A supervisor comment anchor remains in the text ("[[DO1]]" on 1.3.2: "Which technology/algorithm will you use? A simple web-based app is too simple for this level") — the ML component was added to answer it.

## Key content (this project's stated scope)

- Problem: platforms without a centralised operator-facing admin layer cannot manage accounts, moderate flagged content, resolve disputes, or keep an auditable decision record — acute in high-informality Sub-Saharan African labour markets.
- Aim: develop and evaluate a web-based administrative architecture integrating deterministic RBAC, an immutable database-level audit ledger, and an extensible moderation pipeline that supports future ML-driven behavioural anomaly detection.
- Specific objectives (i–iv): examine governance/moderation challenges; review existing systems and gaps; design the role-based administration and moderation architecture; develop and evaluate the architecture. Research questions mirror objectives 1:1.
- Roles (3 privilege tiers): Super Admin (full control), Moderator (moderation queue + user-level actions), Viewer (read-only analytics and logs).
- Four functional areas: (1) user management — account CRUD, role assignment, suspension/ban; (2) human-in-the-loop content moderation queue — flag review with approve / reject / escalate workflows, capturing labelled data; (3) audit logging — INSERT-only record of all operator actions, date-range filtering, CSV export; (4) system settings panel — feature toggles and key/value configuration. Authentication (login, JWT sessions, role-gated routes) included as supporting context.
- Explicit exclusions (delimitations): native mobile admin UI; third-party trust-and-safety APIs; real-time chat moderation; financial transaction oversight; automated external identity verification.
- Limitations: evaluation only in the industry partner's development environment; synthetic test data (NDA-governed real data); ML behavioural flagging (Random Forest / Isolation Forest) architected but strictly NOT implemented in Phase 1.
- Architecture: decoupled three-tier — React.js SPA → Node.js/Express REST API → PostgreSQL on an Azure VPS; JWT role claims validated in middleware against a centralized permission matrix; audit immutability via withdrawing UPDATE/DELETE privileges on the audit table; UUID primary keys; soft-delete flags; Nginx reverse proxy with TLS.
- Tooling table (Table 3.1): React.js & Bootstrap; Node.js & Express; PostgreSQL; JWT & bcrypt; FastAPI (ML API); Python (Pandas, NumPy, Scikit-learn); Google Colab & Jupyter; Jest & Supertest (target 80% line coverage); Figma (Double Diamond); Git & GitHub (conventional commits, tag v1.0.0); Azure VPS & Nginx; Agile (Scrum-lite, five two-week sprints).
- Methodology: applied experimental paradigm + Agile; timeline Apr–Jun 2026 (proposal submission 12-Jun-2026).
- Literature themes: governance deficits (ILO, Gillespie, Gorwa et al.); workforce moderation differs from social media (Ticona); RBAC (Ferraiolo & Kuhn, NIST); immutable audit trails (Han et al., Yavuz); ML flagging needs labelled data produced by Phase 1 (Kothapalli et al.).

## Section map

1. Front matter: title, declaration/approval, acknowledgment, abstract, ToC, lists (figures/tables/abbreviations).
2. Ch 1 Introduction: background (SSA labour markets), problem statement, general aim + specific objectives + research questions, justification (academic/industry/social), scope, limitations, delimitations.
3. Ch 2 Literature Review: challenges (governance, moderation at scale, RBAC, auditability), related solutions (Reddit modqueue, gig risk management, enterprise RBAC, ML flagging), gaps, conceptual framework.
4. Ch 3 Development Methodology: research paradigm (acquisition/preprocessing/training/validation), Agile SDLC phases, analysis & design (use case, class, ERD, schema, architecture, wireframes), tools table, deliverables (documentation, authentication, user management, moderation queue, audit logging, settings panel).
5. References (APA, DOIs).
6. Appendix A1 time schedule; Appendix A2 Turnitin report.
