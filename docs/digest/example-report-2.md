# Digest: Example Report 2 — ICS 410X CS Project II

- **Title:** "AI-Driven Lost and Found Management System for Institutions" (John Doe / 149329, BBIT 4C, Strathmore University, December 2025).
- **Purpose:** A second complete final-year project REPORT showing an accepted variant of the required documentation structure (Information System / BBIT track).
- **Role:** EXAMPLE REPORT (format/structure model only — its lost-and-found/CLIP subject matter is NOT a feature source for Kaziforce).

## Structure & format rules

- Front matter order: Title page → Declaration → Approval (separate pages) → Abstract (with semicolon-separated Keywords) → Acknowledgements → Table of Contents → List of Figures → List of Tables. (No List of Equations/Abbreviations in this variant.)
- Same six-chapter skeleton as Report 1, with slightly different section naming — accepted variance:
  - Ch 1: Background; Problem Statement; Aim; Specific Objectives; Research Questions; Justification; Scope and Limitation (combined section).
  - Ch 2: Literature Review with a "Review of Existing Systems" subsection (named competitor systems, one subsection each, with screenshots), "Gaps in the existing system", "Proposed System", and "Conceptual framework".
  - Ch 3: System Development Methodology — chosen model (here Prototyping) with phase subsections (Planning, Analysis, Design, Build Prototype, Testing, Implementation), Justification of the methodology, System Analysis (incl. numbered Functional Requirements i–vii and Non-Functional Requirements i–vii), System Development Tools and Techniques (a single table: tool / purpose), Machine Learning Algorithms and Validation, Domain of Execution, System Deliverables (one subsection per module).
  - Ch 4: System Analysis, Design and Architecture — Use Case, Sequence, ERD (notation named, e.g. Crow's Foot), Class Diagram.
  - Ch 5: System Implementation Testing — Hardware Specification, Software Specification, Description of Testing (Unit / Integration / System, all black-box), model performance evaluation with metrics, Test Data and Results (FR + NFR table with Expected/Actual/Status columns), Description of Results (one subsection per module with screenshots).
  - Ch 6: Introduction, Conclusion, Recommendations, Future Work.
- Then References; Appendices lettered A–G (Time Schedule, User Guide and Management, screenshots per feature, GitHub Repository, System Settings, Turnitin Originality Report).
- Referencing: APA author-date; in-text citations placed before/after sentences; some website sources cited as "(Vendor., 2025)" with retrieval dates.
- Figure/Table numbering per chapter (Figure 4.1, Table 3.1); appendix figures lettered (Figure A.1).

## Key content (beyond structure)

- Web system: Laravel + FastAPI (Python AI service) + MySQL + React/Bootstrap; CLIP multimodal matching; role-based access (Finder / Claimant-Owner / Admin).
- Functional requirements list pattern: registration/login, report forms with uploads, matching algorithm, browse/search with filters, admin approval before publication, claim receipts, notifications.
- Non-functional requirements list pattern: usability, performance, reliability/availability, security, scalability, maintainability, audit logging.
- FR/NFR testing table maps each requirement group to expected vs actual results with a Status verdict — the accepted alternative to per-test-case IDs.
- Deliverables subsections mirror modules: registration/login, core reporting module, admin dashboard, AI engine, notifications, administrator module, database management, reporting/analytics, user guides and documentation.

## Section map

1. Front matter: title, declaration, approval, abstract + keywords, acknowledgements, ToC, lists.
2. Ch 1 Introduction: background, problem, aim, specific objectives (i–iv), research questions, justification, scope and limitation.
3. Ch 2 Literature Review: current practices, technologies used, challenges, review of existing systems (Troov, MissingX, Deliverback), gaps, proposed system, conceptual framework.
4. Ch 3 System Development Methodology: prototyping model phases, justification, system analysis with FR/NFR numbered lists, tools table, ML algorithms and validation, domain of execution, deliverables per module.
5. Ch 4 System Analysis, Design and Architecture: use case, sequence, ERD (Crow's Foot), class diagram.
6. Ch 5 System Implementation Testing: HW/SW specs, unit/integration/system testing, CLIP model evaluation, FR+NFR test results table, description of results per module.
7. Ch 6 Conclusion, Recommendation and Future Works.
8. References (APA author-date).
9. Appendices A–G: time schedule, user guide, feature screenshots, GitHub repository, system settings, Turnitin report.
