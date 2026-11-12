# AGENTS.md

## Mission

Build out the school-project website, starting from the Figma-exported project in this repo, so that it satisfies the requirements in the supervisor documents. The Figma export is the visual starting point. It is not the specification.

Read `BRIEF.md` first. It holds the scope, deadline, and constraints the user has confirmed.

## Source of truth (highest priority first)

1. **Supervisor documents** (markdown conversions in `src/imports/`): the Software Requirements Specification (SRS), Technical Design Document (TDD), Backend Engineering Document (BED), Database Design Document (DDD), and Frontend Web Engineering Document (FWED). The SRS decides behaviour. The TDD decides architecture. The BED, DDD, and FWED decide their own layer.
2. **`chapter 5 update`** (markdown conversion in `src/imports/`): the project's current documentation. The code must stay consistent with it. If you find a divergence, record it in `docs/DECISIONS.md`. Never rewrite the document silently.
3. **Documentation templates** (`is_documentation_*`, `reference guide - *`): they govern the format and structure of written deliverables only. They do not define product features.
4. **Figma export**: layout, components, visual style, copy. If it conflicts with items 1 to 2, follow the documents and log the conflict.

**The user's decisions in `BRIEF.md` and in chat outrank every document above.** When one overrides a document, log it in `docs/DECISIONS.md` and name the document and section it overrides.

Never invent a requirement. If something is not in the documents or the brief, add it to `docs/OPEN_QUESTIONS.md` and propose a default.

## Reading the documents

- Do not open `.docx` or `.pdf` files directly. Read the markdown conversions in `src/imports/`. Ignore duplicate files whose names end in ` (2)`.
- If a document has no conversion (the two PDF templates), you may run `pdftotext -layout` or `pandoc` yourself and save the result next to the original in `src/imports/`, then digest the markdown. Never modify an original.
- `src/imports/` is read-only apart from new conversions. Never edit or delete an original. `src/assets/attachments/` holds misfiled copies of reference documents: keep them out of the app bundle and move them outside `src/` once the plan is approved, logging the move.
- The documents are long. On ingest, write one digest per document to `docs/digest/<name>.md` (maximum 150 lines each): every requirement ID with a one-line statement, plus hard constraints. After that, work from the digests and use `grep` on the originals for detail. Cite requirement IDs in code comments, commits, and reports.

## Working method (Plan-and-Solve, then Self-Refine)

Work in phases. Do not start a phase until the previous one is reported.

- **Phase 0, Ingest:** inspect the Figma project (stack, routes, components, assets), write the digests, build `docs/TRACEABILITY.md` (requirement ID, page or component, status). That full file is a reference archive.
- **Scoped traceability:** the SRS covers the whole platform, but this build is the Admin and Moderation console. Track progress in `docs/TRACEABILITY_SCOPE.md`, which lists only in-scope rows: the SRS IDs mapped to a screen, plus the console requirements defined in the proposal and `chapter 5 update`. Generate it from `docs/traceability-gen.mjs` instead of editing rows by hand. Report out-of-scope SRS IDs as a count, never row by row.
- **Phase 1, Plan:** write `docs/PLAN.md` with the architecture, folder structure, page and route list, data approach, slice order, and what is out of scope. Ask clarifying questions here, in one batch, then stop for approval.
- **Phase 2, Foundation:** project structure, design tokens, layout shell, routing, shared components, auth and role scaffolding as the documents require.
- **Phase 3, Vertical slices:** one feature at a time (page, logic, data, validation, error states), in the order set in `PLAN.md`. The machine learning slice comes after the core slices pass their tests. A deployment slice (artifacts and runbook only) follows it.
- **Phase 4, Hardening:** accessibility, responsive checks, security basics, error handling, cleanup, README.
- **Phase 5, Documentation sync:** only if the user asks. Draft markdown sections that follow the templates. Do not overwrite the Word files.

**Self-Refine at the end of every phase and every slice:**
1. List what was built, mapped to requirement IDs.
2. Critique it against the documents: missing requirements, deviations from Figma, broken states, accessibility gaps, security gaps.
3. Fix what the critique found.
4. Report using the format below.

**Questions:** ask only in Phase 1, in a single batch of at most 8, blocking questions only, each with a proposed default. After the plan is approved, do not stop to ask. Make the most reasonable assumption, record it in `docs/DECISIONS.md`, and continue. Stop only for something that would cause data loss or contradict a supervisor document.

## State (your context is limited, so keep it in files)

- At the start of every session, read `docs/PROGRESS.md`, `docs/DECISIONS.md`, `docs/OPEN_QUESTIONS.md`, then `docs/PLAN.md`.
- Update `docs/PROGRESS.md` after every meaningful step with three lines: done, next, blockers.
- Git: if the repo has none, run `git init` once the plan is approved, add a `.gitignore` (node_modules, dist, .env), and commit the untouched export as a baseline before changing anything. Commit after each slice as `feat(<area>): <summary> [REQ-ID]`. Never push or force.

## Engineering rules

- Stack comes from the TDD and FWED. If the Figma export uses a different stack, adapt per the documents and record the decision. Do not add a dependency without a one-line reason in `docs/DECISIONS.md`.
- Keep the Figma design tokens, spacing, and component look. Refactor generated one-off markup into reusable components.
- Do not delete Figma files. Move or refactor them into the new structure and log it.
- If a backend is out of scope per `BRIEF.md`, build a typed data layer that mirrors the BED and DDD contracts, backed by mock data, so a real API can replace it without touching the UI.
- No secrets in the repo. Provide `.env.example`. Validate all input. Follow the authentication and role rules in the BED.
- Responsive and accessible per the FWED: semantic HTML, keyboard navigation, labels, contrast.
- After every slice run the build, lint, type check, and tests that exist. Never claim something passes without running it, and quote the actual output.
- **Scope honesty.** Never describe the build as compliant with the whole SRS. State that it implements the console subset and name that subset.
- **No fabricated metrics.** Do not state coverage percentages, performance figures, test counts, or load results unless a command you ran produced them, and name that command. Otherwise write "not measured".

## Report format (keep it short)

1. What changed (files, one line each)
2. Requirement IDs covered
3. How to verify (exact commands or routes)
4. Assumptions logged
5. Next step

## Machine learning rules

- The model only recommends or flags. It never changes an account, a flag, or a setting by itself. A human operator always decides.
- The model service must fail safe. If it is down or slow, the console works normally and shows "Suggestion unavailable".
- Training data is synthetic, because live platform data is under NDA. Generate it with a fixed seed from a documented script, add documented label noise, and split into train, validation, and test sets before any fitting.
- Report every model against a majority-class baseline and a simple rule baseline. Metrics come only from a script you ran (`ml/reports/metrics.json`), never from hand-typed numbers. Anywhere metrics appear, state that they measure fit to the synthetic generator, not real-world moderation performance.
- Record the model version and whether the operator followed or overrode the suggestion in the audit entry, so real decisions can become labelled data later.

## Documentation rules

- Write in the present tense for what the system is and the past tense for what was done. Use the future tense only in a Future Work section.
- Prose names the organisation as "the industry partner" or "the platform", never by company name. Screenshots may show the interface brand.
- Every test result, version, and metric in a draft cites the command that produced it. Anything else is marked "not measured" or "[student to confirm]".
- Use only references already present in the project's documents, plus the reference candidates the user supplies. Do not invent citations. Mark a missing source as "[reference needed]".
- Drafts go in `docs/draft/`. Never edit the Word files or anything in `src/imports/`.

## Deployment and testing evidence

- You cannot provision cloud resources and must never ask for or store credentials. Produce deployment artifacts and a runbook; the user runs them and pastes back the output.
- You cannot test in browsers you did not run. Write a manual checklist for the user. Only browsers the user reports on appear in the documentation.
## Git and GitHub
- Remote: origin = https://github.com/Samuel-M-M/Test-repo-csprojii.git (private). Default branch: main.
- Never change git config (user.name, user.email) or the remote.
- Work on branches named feat/<slice>, fix/<topic>, or docs/<topic>. Merge into main only after the tests pass. Commit after each slice with the prefixes feat:, fix:, test:, docs:, chore: and requirement IDs.
- You may commit and create branches. You may NOT push, force-push, rewrite history, or run credential commands. I push myself.
- Never commit src/imports/, docs/digest/, docs/TRACEABILITY.md, .env files, .pgdata, .venv, ml/models, logs, or any file over 5 MB.
- Before you say work is ready to push, run the pre-push check and report its real output: clean git status; no tracked or historical path matching the list above; no password or secret patterns outside .env.example and test fixtures; tests passing.
- Document only what the commit history shows. Do not describe a branching workflow in the report that the log does not contain.
