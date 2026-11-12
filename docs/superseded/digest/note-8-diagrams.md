# Note 8 diagrams digest

Source: `src/imports/ICS_410X_CS_Project_II_-_Note_8.md` (about 400 lines). Teaching note with project-specific diagram drafts; useful for documentation, not a product specification.

## What it defines

1. Actors: Viewer, Moderator and Super Admin, with Viewer ← Moderator ← Super Admin inheritance — lines 16–21.
2. Use cases: Login/Authenticate, View Dashboard Analytics, Search/Filter Audit Log, Export Audit Log CSV, Review Moderation Queue, Approve Content, Reject Content, Escalate Content, Suspend User Account, Assign Role, Permanently Ban Account, Modify System Settings — lines 25–36.
3. A ChatGPT sequence diagram with Moderator as an actor — line 57 onward.
4. A Grok class diagram named `Class_Diagram_Admin_Moderation` — line 162 onward.
5. A Claude entity-relationship diagram — line 289 onward.
6. A Claude activity diagram — line 358 onward.
7. A Claude system architecture diagram — line 393 onward.

## Relevance to the build

8. The use-case list matches the five-module scope in Chapter 5 §1.5.1 and includes the exact moderation actions the Figma queue implements: review, approve, reject, escalate.
9. It adds two actions Chapter 5 implies but does not separate: Assign Role and Permanently Ban Account as distinct use cases.
10. Dashboard Analytics is a use case for Viewer, supporting the read-only dashboard.
11. The sequence/class/ERD/activity/architecture drafts should be reconciled against the BED and DDD before being used in documentation.

## Gaps

12. No endpoint inventory, data dictionary, screen inventory or test evidence.
13. The diagrams are teaching drafts from multiple tools; class and ERD contents were not fully reconciled in this digest.
14. If these diagrams conflict with Chapter 5, Chapter 5 wins.
