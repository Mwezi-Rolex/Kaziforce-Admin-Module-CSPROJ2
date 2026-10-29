# Digest: Research Writing for CS 2 Projects - 2026

**Document:** "Research Writing for CS 2 Projects - 2026" — Strathmore University course guide (Dr. Komondi) for fourth-year BSc. Informatics and Computer Science final projects.

**Purpose:** A writing/process guide governing the FORMAT and STRUCTURE of written deliverables only (proposal chapters 1–3, final documentation chapters 4–6, referencing, submission logistics, sprint process). It does not define product features.

## Key content

### Proposal stage (Lessons 1–5)
- Topic/title: 12–18 words, no filler phrases ("A Study of..."), single or double title; case-study titles name technology, case, and impact.
- Front matter: acknowledgements (formal, research-related only); abstract 100–250 words (~200), components = background, objectives, methods, findings, conclusion; keywords in bold-italics drawn from the abstract.
- Chapter 1: 1.1 Background (gap-driven narrative, heavily cited but concise; distinct from the literature review); 1.2 Problem Statement (~250 words: Ideal → Reality → Consequences, quantified and cited); 1.3 General + Specific Objectives (SMART, roman numerals) and matching Research Questions; 1.4 Justification (current knowledge → gaps → consequences → solution); 1.6 Scope (technical/data/functional/time + exclusions); 1.7 Limitations (unavoidable weaknesses) vs Delimitations (intentional exclusions).
- Chapter 2: thematic literature review; 2.1 introduction; subsections aligned to objectives; related-works subsections per existing system (description, technology, measured performance, gaps); comparative table; 2.4 Gaps in prose with cross-references; 2.5 Conceptual Framework (inputs → processing → outputs diagram + narrative). Sources ideally ≤3 years old (max 5).
- Chapter 3: must state the development paradigm — **SSAD/SSADM or OOAD** (experimental approach allowed for AI projects; AI projects add data acquisition / preprocessing / model training / validation sections). Justify the SDM (Agile/Scrum, Waterfall, RAD, etc.) with literature. Paradigm determines Chapter 4 diagrams: OOAD → use case, class, sequence; SSADM → context diagram, DFDs, ERD. Includes methodology diagram (cited), 3.6 Deliverables, 3.7 Tools and Techniques.
- Referencing: **APA 7th edition** throughout, reference list generated via a manager (Zotero/Mendeley); no undated (n.d. where avoidable), no Wikipedia, prioritise peer-reviewed sources. Appendices numbered ("Appendix 1: Gantt Chart"); timeline runs to end of November 2026.
- Submission logistics: cover page (title, name, admission no., ICS group, supervisor, month/year, project type Capstone/Internal); signed declaration; similarity report as appendix; filename `StudentName_AdmissionNumber_SupervisorSurname.pdf`; proposal defence 13–16 July 2026.

### Semester II rules
- Tense: past for completed work, present for established knowledge and what figures/tables show, future only for genuinely incomplete work; third person; revise the abstract last.
- Resolve proposal feedback via a feedback-resolution matrix (issue, source, affected section, action, status).
- **Responsible AI use**: AI may assist but never fabricate citations, data, results, metrics, screenshots or approvals; maintain an AI-use log; disclose material AI use; verify all AI output.
- Milestones: proposal submission 12 Jun 2026, revision 31 Jul 2026, Chapter 4 due 17 Aug 2026, final defense 23 Nov 2026.

### Chapter 4 — System Analysis and Design
- Requirements: unique IDs (**FR-01, NFR-01, DR-01, IR-01** pattern); one clear requirement per statement; measurable criteria (no vague "fast/secure"); verification method; a requirements catalogue (ID, statement, priority, source, verification).
- 4.2.1 Functional · 4.2.2 Non-functional (ISO/IEC 25010 quality areas) · 4.2.3 Data requirements · 4.2.4 Interface/integration requirements.
- Requirements traceability: requirement ↔ objective ↔ feature ↔ diagram ↔ test.
- Diagrams: narrative before → diagram → interpretation after; every figure numbered and captioned; consistent naming; keep editable sources. OOAD = UML; SSADM = context diagram + DFD Level 0 (distinct from context diagram); logical database schema (not physical) for DB projects.

### Chapter 5 — System Implementation, Testing and Evaluation
- 5.2 Implementation environment: hardware/software/service tables with tested versions and evidence (Tables 5.1/5.2); deployment + reproducibility (env files, migrations, health checks); describe deployment honestly (local prototype vs public).
- 5.3 Implementation organised by modules per project type (for general software: database → modules → integration/user workflows); short code extracts only; record deviations from approved design.
- 5.4 Testing: strategy and acceptance criteria first (unit/integration/system/UAT; black/white-box; positive, negative, boundary, exception); **test-case table format (Table 5.3): Test ID | Traceability (FR-xx etc.) | Scenario, data, conditions | Expected result | Actual result, evidence, verdict**; record defects and retests, never hide failed tests; map every test to a requirement.
- 5.5 Version control evidence: accessible repo, README (problem, setup, run, test), meaningful commits, issues, release tags, .gitignore, no credentials.
- 5.6 AI-use declaration (tool, provider, what it assisted, how checked).
- 5.7 Results, discussion, limitations organised by objective with exact measurements; no fabricated data; state limitations honestly.

### Chapter 6 — Conclusions, Recommendations, Future Works
- Conclusions answer objectives in order using only reported evidence; recommendations are audience-specific and evidence-linked; future works extend the research (not repair missing work). No new experiments, features, results or citations.

### ML Fundamentals (Lessons 1–10) — teaching material for AI projects
- Learning types, parameters vs hyperparameters, training loop, train/validation/test splits, overfitting/underfitting, early stopping, data leakage, model size, dataset quality/coverage, synthetic data risks, confusion matrix, precision/recall/F1/specificity/balanced accuracy, thresholds, QA metrics (exact match, token-overlap F1, answerability, calibration, bias types). Explicitly notes all numeric examples are invented teaching examples.

### Build Phase — Development Sprints
- **Sprint I**: configured dev environment, clean codebase, Git from the start, prepared data/resources, corrections from earlier chapters folded in.
- **Sprint II**: working core workflow (input → processing → output) demonstrated end-to-end; components integrated; initial testing records (expected/actual/corrective); Chapter 5 documentation updated; reproducible repo.
- **Sprint III**: completed functionality with traceability record; working operational release over HTTPS; complete testing/evaluation; full report (Ch.5–6), reproducible handover, final presentation; module-by-module vertical-slice method with HCI checks (error prevention, state visibility, accessibility, responsive).

## Hard constraints / claims the code must match
- Deliverable format governed: chapters 1–6 with the section structures above; APA 7 referencing; numbered/captioned figures and tables; third person, tense rules.
- Requirements must carry unique IDs (FR-xx / NFR-xx / DR-xx / IR-xx) and be traceable to objectives, diagrams, features and tests.
- Test evidence must use the Test ID / Traceability / Expected / Actual / Verdict format; no fabricated or concealed results; name commands/tools behind any measured figure.
- Repo must be accessible with README, meaningful commits, tags, no secrets; AI-use log and declaration required where AI was used materially.
- Paradigm declared in Chapter 3 (OOAD for this project) determines diagram set; Chapter 4 diagrams must match implementation.
- Development follows sprint structure with demonstrable increments and progress reviews.

## Section map
- Lessons 1–2: topic selection; acknowledgements, abstract.
- Lesson 3: Chapter 1 (background, problem, objectives, questions, justification, scope, limitations/delimitations).
- Lesson 4: Chapter 2 (lit review, related works, gaps, conceptual framework).
- Lesson 5: Chapter 3 (paradigm, SDM choice, methodology diagram, deliverables, tools); References (APA 7); Appendices.
- Semester II recall: assessment, tense, responsible AI.
- Chapter 4 guidance: requirements (FR/NFR/DR/IR), analysis + design diagrams, traceability.
- Chapter 5 guidance: environment, implementation routes, testing (Table 5.3), version control, AI declaration, results/limitations.
- Chapter 6 guidance: conclusions, recommendations, future works.
- Proposal submission guidelines; unit assessment & milestones table.
- ML Fundamentals deep dive (Lessons 1–10 + glossary).
- Build Phase: Sprints I–III, HCI guidance, deployment examples (Cloudflare/AWS/Hugging Face/mobile), final worked example, references.
