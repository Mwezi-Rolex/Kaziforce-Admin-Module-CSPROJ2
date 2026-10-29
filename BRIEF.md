# BRIEF.md

Confirmed by the user on 2026-10-29. Items marked INTERPRETED are my reading of a short answer; the agent should follow them but record them in `docs/DECISIONS.md`. Items marked CONFIRM are still open. The Answer after the CONFIRM is the user's clearance on how to proceed.

## Project

- Project name: A Web-based Admin and Moderation Module for a Digital Workforce Marketplace. 
- Product name shown in the UI: Kaziforce. Replace "Tendaji" everywhere in the Figma export.
- Course / unit: Computer Science Project II (ICS 410X)
- Final deadline: 20 November 2026
- Demo or panel date: 23 to 27 November 2026

## Scope

- Must work for the demo: the admin and moderation console (every screen in `docs/FIGMA_AUDIT.md`), the login, and the landing page.
- Public pages: landing, login, and a 404 page only. The landing page is minimal and reuses the export's colours, type, and components.
- Account management: view, search, filter, suspend, ban, and assign role. No create or delete, as the Figma export states.
- Access: the role comes from the signed-in session. Remove the role switcher and the hard-coded operator name. Seed three demo operators (Viewer, Moderator, Super Admin), each with their own credentials. INTERPRETED from "the login should vary for users".
- Log download (CSV export): Moderators and Super Admins only. Enforce it on the server (403 for a Viewer) and hide the control from Viewers. This overrides the Chapter 3 requirement that every operator can export.
- UI fix: report content and option lists scroll inside their panels instead of clipping. INTERPRETED: find every panel in the export that lists report content or options and make it scrollable.
- Placeholders and exclusions: at the agent's discretion. List every one in `docs/PLAN.md` and `docs/DECISIONS.md`.

## Technical constraints

- Backend and database: in scope.
- Machine learning: required. The supervisor wants to see where a model fits in the recommendation or auditing process.
  - A (required): for each flag in the moderation queue, predict severity (Low, Medium, High) and a suggested action (approve, reject, escalate) with a confidence score, using a Random Forest compared against logistic regression and simple baselines. Shown as "Suggestion only". The moderator decides.
  - B (stretch, first to be cut): an Isolation Forest anomaly score over operator activity, shown in the audit log explorer for Super Admin review.
  - Training data is synthetic because live data is under NDA. Metrics are measured by script and always labelled as fit to synthetic data.
- Deployment: Azure VPS with Nginx, as in the Chapter 3 tool list. The agent prepares the artifacts and runbook; you provision and run them. CONFIRM: does the VPS exist, and is there a domain for HTTPS? Answer: no the VPS has not been created, nor does the https exist.
- Stack: Vite + React + Tailwind; Node.js + Express; PostgreSQL; JWT; bcrypt; Jest + Supertest; Vitest + React Testing Library; Python 3 with scikit-learn and FastAPI for the model service.
- Browsers: Chrome is primary. The agent writes a manual checklist for Firefox and Edge; only browsers you report on appear in the documentation.

## Documentation

- Draft documentation after the build: yes. Cover chapter 5 (implementation and testing) through the conclusion, references, and appendices, so the report is complete and not only the app.
- Governing template: example report 1 and example report 2 (structure and chapter order).
- Tense: present for what the system is, past for what was done. No future tense except in Future Work.
- Company name: prose says "the industry partner" or "the platform", consistent with Chapters 1 to 4. CONFIRM: screenshots will show "Kaziforce" in the UI. Decide whether to crop it or allow it. Answer: allow the name to be Kaziforce in the development, but the documentation shouldn't use the name.
- Output goes in `docs/draft/`. The agent also lists the changes Chapters 1 to 4 need (tense, ML status, the export restriction) instead of rewriting them.

## Schedule (agent plans backwards from this)

- By 6 Nov: foundation, authentication and RBAC, user management.
- By 10 Nov: moderation queue, audit log, settings.
- By 13 Nov: ML component A (and B if time). Feature freeze at the end of 13 Nov.
- 14 to 15 Nov: deployment artifacts, then you provision and run the smoke test.
- 14 to 19 Nov: finish documentation (draft chapters as slices complete, then a final pass).
- 20 Nov: submit.
- If behind, cut in this order: ML B, extra dashboard content, frontend component tests, Firefox and Edge checks. Never cut: role enforcement, audit immutability tests, ML A, the deployment runbook, the documentation.

## Marking priorities

- The supervisor cares most about a working machine learning model that adds complexity. Also protect the audit immutability evidence and the role enforcement, which the panel will probe.

## Notes for the agent

- Figma errors already known: the company name is Kaziforce, not Tendaji; the role switcher must go; log download is restricted to Moderators and Super Admins; report and option lists need scroll bars.
- Documentation discrepancies to record in `docs/draft/DISCREPANCIES.md`: "account CRUD" wording versus no create or delete; Bootstrap in the tools table versus Tailwind; Python, scikit-learn, and FastAPI missing from the Chapter 3 tool list; Chapters 1 and 3 describe ML as deferred; all-operator export versus the new restriction; the SRS "v2-2" filename versus its "Version 1.0" title block.