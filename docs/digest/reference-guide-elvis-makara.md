# Reference guide digest — Elvis Makara 2025

- **Source:** `src/imports/REFERENCE GUIDE - Elvis Makara 2025 (1).pdf`, converted to `src/imports/REFERENCE GUIDE - Elvis Makara 2025 (1).md` (82 pages, text only). The PDF is unchanged.
- **Purpose:** a documentation **format and structure** reference for an ICS final-year project report. It defines no product requirements for this build.
- **Scope marker:** [IN] governs written-deliverable shape · [OUT] domain content belongs to another project (voice biomarkers for Parkinson's disease).

## Front matter

1. Declaration and Approval, Abstract, Table of Contents, List of Figures, List of Tables, List of Equations, List of Abbreviations — pages i–viii.
2. This template carries a List of Equations, which the other templates omit. The Kaziforce build has no equations, so that list is omitted rather than left empty.

## Chapter structure

| Chapter | Sections | Note |
|---|---|---|
| 1 Introduction | 1.1 Background Information, 1.2 Problem Statement, 1.3 Research Objectives (1.3.1 General, 1.3.2 Specific), 1.4 Research Questions, 1.5 Justification, 1.6 Scope, 1.7 Limitations and Delimitations | Limits and delimitations kept as one section |
| 2 Literature Review | 2.1 Introduction, 2.2 Current State (2.2.1 Overview, 2.2.2 Key Challenges), 2.3 Confounders, 2.4 Gaps in Related Works, 2.5 Conceptual Framework | Gaps argued explicitly before the framework |
| 3 Development Methodology | 3.1 Introduction, 3.2 Research Paradigm (3.2.1 Data Acquisition, 3.2.2 Data Processing, 3.2.3 Model Training, 3.2.4 Model Validation and Testing), 3.3 Development Approach (Empathise → Define → Ideate → Prototype Sprints → Test and Refine), 3.4 System Analysis Diagrams (use case, class, sequence, activity, package), 3.5 System Design Diagrams (architecture, wireframes), 3.6 Tools and Techniques, 3.7 System Deliverables (one subsection per module) | Design thinking expressed as five named stages |
| 4 System Analysis and Design | 4.1 Introduction, 4.2 Use Case, 4.3 Class, 4.4 Sequence, 4.5 Activity, 4.6 Package, 4.7 System Architecture, 4.8 Wireframes | Six diagram types plus wireframes |
| 5 System Implementation and Testing | 5.1 Introduction, 5.2 Implementation Environment (5.2.1 Hardware Specifications, 5.2.2 Software Specifications), 5.3 Dataset Description, 5.4 Model Training and Evaluation (5.4.1 Model Components, 5.4.2 Model Evaluation Metrics), 5.5 Functional Testing, 5.6 Results and Discussion, 5.7 GitHub Documentation | Environment split into hardware and software |
| 6 Conclusions, Recommendations and Future Works | 6.1 Conclusions, 6.2 Recommendations, 6.3 Future Works | No separate introduction |
| Back matter | References, Appendix A1 Time Schedule May–July Semester 1, A2 Time Schedule August–November Semester 2, A3–A6 application screens, A7 comparative model analysis, A8 Turnitin Report | Two-semester time schedule, one per semester |

## Rules this template imposes on the drafted chapters

3. Chapter 5 opens with the implementation environment, split into hardware specifications and software specifications, before any testing.
4. Test results are followed by a separate results-and-discussion narrative, and the chapter ends with GitHub documentation evidence.
5. The time schedule is split into the two semesters, matching the course's Semester I and Semester II phases.
6. Model work is documented with model components and evaluation metrics as separate subsections; the analogue for this build is the ML service and `ml/reports/metrics.json`.
7. Figures are numbered by chapter and listed in the List of Figures; the reference guide adds a List of Equations for mathematical work.
8. Only the structure transfers. The Parkinson's domain, dataset and model evaluation content does not.

## Application to this build

9. `docs/draft/chapter-5-implementation-and-testing.md` must present hardware and software specifications before testing, which satisfies both this template and `docs/DELIVERABLES.md`.
10. The model's evaluation metrics must cite `ml/reports/metrics.json` and be labelled as fit to synthetic data, per the AGENTS.md machine-learning rules.
11. `docs/draft/appendices.md` should carry both semester schedules, matching this template, and the user guide, repository, settings and Turnitin evidence required by the other templates.
12. Chapter 6 in this template has no introduction subsection, while the Twayigize template has 6.1 Introduction. The drafted chapter 6 keeps an introduction; that is a harmless superset and is recorded rather than changed.
