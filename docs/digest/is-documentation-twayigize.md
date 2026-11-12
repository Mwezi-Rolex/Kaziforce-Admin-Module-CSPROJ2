# IS Documentation template digest — Twayigize Bienvenu

- **Source:** `src/imports/IS_Documentation_Twayigize_Bienvenu.pdf`, converted to `src/imports/IS_Documentation_Twayigize_Bienvenu.md` (61 pages, text only). The PDF is unchanged.
- **Purpose:** a documentation **format and structure** template for an ICS final-year project report. It defines no product requirements for this build; its role is the chapter skeleton, front matter and appendix conventions that the drafted chapters must follow.
- **Scope marker:** [IN] governs the shape of written deliverables · [OUT] domain content belongs to another project.

## Front matter

1. Declaration, Abstract, Acknowledgements, Table of Contents, List of Figures, List of Tables — pages i–x.
2. Front-matter numbering uses lower-case Roman numerals; body chapters restart at Arabic 1.
3. The template body also contains a List of Figures and List of Tables that must be regenerated after drafting.

## Chapter structure

| Chapter | Sections in the template | Note |
|---|---|---|
| 1 Introduction | 1.1 Background, 1.2 Problem Statement, 1.3 Aim, 1.4 Specific Objectives, 1.5 Research Questions, 1.6 Justification, 1.7 Scope and Limitation | Single "Aim" section, then objectives |
| 2 Literature Review | 2.1 Introduction, 2.2 Current Practices, 2.3 Challenges, 2.4 Review of Existing Systems (one subsection per system), 2.5 Proposed System, 2.6 Conceptual framework | Domain-specific subsections are placeholders |
| 3 System Development Methodology | 3.1 Introduction, 3.2 Prototyping Methodology (System Planning → Analysis → Design → Build Prototype → Testing → Implementation), 3.3 Justification of the methodology, 3.4 System Analysis (3.4.1 Functional Requirements, 3.4.2 Non-Functional Requirements), 3.5 System Development Tools and Techniques, 3.6 Machine Learning Algorithms and Validation, 3.7 Domain of Execution, 3.8 System Deliverables (one subsection per module) | Deliverables enumerated per module |
| 4 System Analysis, Design and Architecture | 4.1 Introduction, 4.2 System Analysis and Design with 4.2.1 Use Case Diagram, 4.2.2 Sequence Diagram, 4.2.3 Entity Relation Diagram, 4.2.4 Class Diagram | Four named diagrams, no activity or package diagram |
| 5 System Implementation Testing | 5.1 Introduction, 5.1.1 Hardware Specification, 5.1.2 Software Specification, 5.2 Description of Testing (5.2.1 Unit, 5.2.2 Integration, 5.2.3 System), 5.3 Evaluate model performance, 5.4 Test Data and Results, 5.5 Description of Results | Testing split into unit / integration / system |
| 6 Conclusion, Recommendation and Future Works | 6.1 Introduction, 6.2 Conclusion, 6.3 Recommendations, 6.4 Future Work | |
| Back matter | References, Appendix A Time Schedule, Appendix B User Guide and Management, Appendix C–D usage screens, Appendix E GitHub Repository, Appendix F System Settings, Appendix G Turnitin Originality Report | |

## Rules this template imposes on the drafted chapters

4. Every figure and table is numbered by chapter, for example "Figure 4.1: Use case diagram" and "Figure 5.2: Landing Home page", and is listed in the List of Figures or List of Tables.
5. Screenshots of implemented screens appear inside Chapter 5, numbered as figures, not collected only in appendices.
6. Chapter 5 must show the hardware and software specification the system ran on, the three testing levels, the test data, and a narrative description of the results.
7. A time schedule, a user guide, the GitHub repository, settings evidence and the Turnitin report are expected as appendices.
8. The conclusion chapter keeps Recommendations and Future Work as separate subsections.
9. The domain content (lost and found items, CLIP model evaluation) belongs to the template's own project. Only the structure transfers.

## Application to this build

10. `docs/draft/chapter-5-implementation-and-testing.md` must expose an equivalent of 5.1.1 hardware and 5.1.2 software specification, a unit/integration/system test breakdown, test data and a results narrative.
11. `docs/draft/chapter-6-conclusion.md` must keep Conclusion, Recommendations and Future Work as separate subsections.
12. `docs/draft/appendices.md` must cover the time schedule, user guide, repository evidence, settings evidence and the Turnitin report.
13. Chapter 4 needs use case, sequence, ERD and class diagrams. The project's Note 8 drafts already carry use case, sequence, class, ERD, activity and architecture diagrams, which is a superset.
14. This template is the second governing template named in `BRIEF.md` alongside the two example reports, so it ranks behind the example reports for chapter order and equals them for front matter and appendix conventions.
