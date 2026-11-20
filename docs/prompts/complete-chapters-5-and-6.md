# Prompt: complete the Chapter 5 and Chapter 6 documentation

Copy everything below the divider into a fresh agent session in the project root.

---

You are completing the **final documentation** for this capstone project. Today is **20 November 2026**, the submission date. The application is feature-frozen and fully tested. Your job is writing only: produce finished Chapter 5 and Chapter 6 text that is complete, evidence-backed, and consistent with the supervisor documents and the confirmed brief.

## 1. Authority order (highest first)

1. `BRIEF.md` — the user's confirmed decisions; these outrank every document.
2. `AGENTS.md` — especially "Documentation rules", "Scope honesty" and "No fabricated metrics".
3. Supervisor documents in `src/imports/` (read-only markdown conversions): SRS, TDD, BED, DDD, FWED, and `Chapter 5 Update.md` (the project's current documentation).
4. Format templates: `docs/digest/example-report-1.md`, `example-report-2.md`, `research-writing.md`, `is-documentation-twayigize.md`, `reference-guide-elvis-makara.md`. They govern structure only.
5. The built system and the command output recorded in the repository.

Do not invent a requirement, a result, a citation or a metric. If something is unknown, mark it explicitly.

## 2. Read these first

State files: `docs/PROGRESS.md`, `docs/DECISIONS.md`, `docs/OPEN_QUESTIONS.md`, `docs/PLAN.md`.

Current drafts to finish:
- `docs/draft/chapter-5-implementation-and-testing.md` (531 lines)
- `docs/draft/chapter-6-conclusion.md` (179 lines)
- `docs/draft/appendices.md`, `docs/draft/references.md`, `docs/draft/chapters-1-4-changes.md`, `docs/draft/DISCREPANCIES.md`

Maps and evidence: `docs/DELIVERABLES.md`, `docs/TRACEABILITY_SCOPE.md`, `docs/digest/*.md`, `README.md`, `docs/DEPLOY.md`, `docs/DEPLOY_VIRTUALBOX.md`, `docs/BROWSER_CHECKLIST.md`, `ml/reports/metrics.json`.

Do **not** edit anything in `src/imports/`, any `.docx`/`.pdf`, or application source code.

## 3. Deliverables

1. A finished `docs/draft/chapter-5-implementation-and-testing.md`.
2. A finished `docs/draft/chapter-6-conclusion.md`.
3. Updated `docs/draft/appendices.md` and `docs/draft/references.md` where the two chapters point at them.
4. `docs/draft/chapters-1-4-changes.md` kept as an **action list only**. Chapters 1–4 are never rewritten.

## 4. Chapter 5 — required structure

Follow the template chapter order (`example-report-1.md` §Chapter 5, `is-documentation-twayigize.md` §Chapter 5, `reference-guide-elvis-makara.md` §Chapter 5) and the research-writing guide (§5.2–5.7). The draft already has these headings; finish and tighten them, do not restructure the numbering:

- **5.1 Introduction** — what this chapter reports and what evidence backs it.
- **5.2 Implementation Environment** — 5.2.1 hardware specification, 5.2.2 software and service versions, 5.2.3 deployment and reproducibility. Include the clone-to-running steps from `README.md` and the fact that the VPS does not yet exist (BRIEF answer), so deployment is prepared, not performed.
- **5.3 System Implementation** — one subsection per delivered module: database layer (including the INSERT-only audit ledger and migration 009 provenance fields), identity and access, user management, moderation queue, audit logging, system settings, model service, public interface. For each, describe the user task, the inputs, rules, stored data, output, and the error/permission states. Reference `docs/TRACEABILITY_SCOPE.md` IDs.
- **5.4 Testing and Evaluation** — 5.4.1 strategy and acceptance criteria; 5.4.2 results summary (Table 5.4); 5.4.3 test cases with **observed** results (Table 5.5, currently TC-01…TC-35); 5.4.4 deployment smoke test; 5.4.5 defects found and corrected; 5.4.6 accessibility and responsive testing. State explicitly that coverage is **not measured**, because no coverage command was run.
- **5.5 Version Control** — meaningful commits, branch, release tag, and what remains outstanding.
- **5.6 Author Oversight and Use of AI-Assisted Tools** — what assistance was used for and how it was verified; the author remains responsible for design, behaviour and conclusions.
- **5.7 Results and Discussion** — results by objective, model metrics from `ml/reports/metrics.json` only, and honest limitations (5.8).
- **5.8 Limitations** — the outstanding evidence, not missing functionality.

## 5. Chapter 6 — required structure

Keep the existing shape: 6.1 Conclusions (one paragraph per specific objective i–iv), 6.2 Recommendations (by audience), 6.3 Future Works. Conclusions may use only evidence already in Chapter 5; no new results or citations here. Future tense appears **only** in 6.3.

## 6. Hard rules

1. **Tense:** present for what the system is; past for what was done; future only in Future Works.
2. **Naming:** prose says "the industry partner" or "the platform", never the product name. Screenshots may show the interface brand. "Tendaji" appears only in the preserved wireframe, never as the product.
3. **Evidence:** every test result, version and metric cites the command that produced it. Quote figures only from the recorded command output in `docs/PROGRESS.md`, `docs/draft/appendices.md` (command log rows 1–21) and `ml/reports/metrics.json`. Verified figures available: server Jest **8 suites, 86 passed / 86** (three consecutive runs with no re-seed); frontend Vitest **7 passed**; `pytest ml/tests` **7 passed**; both `tsc --noEmit` exit 0; `vite build` JS 386.76 kB (116.83 kB gzip), CSS 32.47 kB (7.64 kB gzip); live API check of the audit provenance on port 3100 (correlation header echoed, CSV header `id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,outcome,actorIp,correlationId,metadata`, `?outcome=Blocked` → 25 rows).
4. **No fabricated metrics.** Coverage: "not measured". Performance and load: "not measured". Do not convert test counts into percentages.
5. **Capture the screenshots yourself** — see section 7A. Do not leave them as operator evidence. The VPS deployment run, the Firefox/Edge checks, the screen-reader pass, the repository tag and the remote push remain operator items and stay marked **not yet verified**. Only browsers the agent actually ran (the in-app Chromium browser) may appear as tested; Firefox and Edge stay on the operator's manual checklist.
6. **References:** use only sources already present in the project documents. Every in-text citation without a full entry stays flagged `[reference needed]` in `references.md`. Do not invent authors, titles or years.
7. **Scope honesty:** state that the build implements the **Admin and Moderation console subset**, not the whole platform SRS. Name the subset. Do not describe the system as SRS-compliant.
8. **Record divergences, do not resolve them silently.** `docs/draft/DISCREPANCIES.md` rows 1–15 and `docs/DECISIONS.md` D-060…D-067 already list the known ones. If you find another, append a row with its source and a proposed resolution; never change code to match the documentation.
9. Write to `docs/draft/` only. Never overwrite the Word/PDF originals or `src/imports/`.

## 7. Finish these specific gaps

- Update Chapter 5's audit-ledger section for the provenance fields added by migration 009 (it is already partly written; verify it names `actor_ip`, `outcome`, `correlation_id` and the `x-correlation-id` header).
- Make sure Table 5.5 includes TC-31…TC-35 (audit provenance) and that Table 5.4 says **86 tests**, not 81.
- Ensure the Chapter 6 conclusion reflects the provenance fields and the idempotent moderation tests where relevant, without introducing new claims.
- Add to `appendices.md` any command output cited in the finished chapters but not yet in its command log; keep the "Not measured" paragraph.
- In `chapters-1-4-changes.md`, keep the outstanding-evidence table current. Remove **screenshots** from that table once you have captured them; browser results, deployment results, coverage, full references, tag and push remain outstanding.

## 7A. Screenshots you must capture

You are responsible for producing the report screenshots. Do not write "[screenshot not yet captured]" unless a screen genuinely cannot be reached after the steps below.

**Prepare the running app.**
1. Check for a stale `tsx watch` dev server on port 3000. A watcher started from the previous working copy (`GLM Projects\Kaziforce`) may still serve the old code. Either stop it and restart from this workspace, or run the API on a free port (for example `PORT=3100`) and point the frontend at it. Verify with `GET /api/v1/health` before capturing anything.
2. The local development seed has three demo operators, documented in `README.md` and `server/src/seed/seed.ts`:
   - `viewer@kaziforce.local` / `ViewerDemo!2026`
   - `moderator@kaziforce.local` / `ModeratorDemo!2026`
   - `superadmin@kaziforce.local` / `SuperDemo!2026`
3. Start the frontend (`pnpm dev`) and reach it through the in-app browser on localhost. These credentials are for local development only; never put them in the report or in any `.env` template.

**Capture with the browser tools, in this order:** `tools.browser.tabs.open` for the app URL → `tools.browser.snapshot` to get element refs → `tools.browser.fill` / `tools.browser.fill_form` and `tools.browser.click` to sign in and navigate → `tools.browser.tabs.focus` on the tab → `tools.browser.screenshot({ tabID, fullPage: true, format: 'png' })`. Use `tools.browser.navigate` when moving between routes, then take a fresh snapshot (refs expire after navigation). A captured file returned by `browser.screenshot` is server-local; copy it into the workspace at the path below and verify it opens with `tools.browser.preview`.

**Save to `docs/draft/screenshots/` with these names:**
- `01-landing.png` — public landing page
- `02-login.png` — sign-in screen
- `03-dashboard-viewer.png` — dashboard as a Viewer
- `04-users-moderator.png` — account control with the record panel and its scrolling lists
- `05-queue-moderator.png` — moderation queue with bulk bar and "Suggestion only" panel
- `06-audit-moderator.png` — audit explorer with filters, outcome pill and export control
- `07-audit-viewer-no-export.png` — same screen as a Viewer, showing the download control hidden
- `08-settings-superadmin.png` — system settings with key/value row and feature toggle
- `09-escalation-superadmin.png` — escalation lane with overrule / uphold-and-ban
- `10-not-found.png` — unknown route / 404

**Rules for every screenshot.**
- Capture from the running application, never from the Figma export or the preserved `src/legacy/ExportApp.tsx`.
- The interface may show the product brand; prose in the chapters must still call the organisation "the industry partner" or "the platform".
- Use the `fullPage` option so filters and tables are visible. If a panel's content scrolls, capture a second image with the panel scrolled and name it `05b-...` etc.
- Record each image in the **screenshot register** in `docs/draft/appendices.md`: file name, route, operator role, date captured, and the command/tool used. State that the browser was the in-app Chromium browser; do not claim Chrome, Firefox or Edge results from it.
- Reference each image in the relevant Chapter 5 section with a numbered figure and caption, for example `![Figure 5.1: Moderation queue as a Moderator](screenshots/05-queue-moderator.png)`. Keep figure numbering consistent with the templates and add the entries to the chapter's List of Figures if the draft has one.
- If a screen cannot be reached, write exactly `[screenshot not captured — <reason>]` in that section and in the register, and say so in your report. Do not substitute a wireframe image or an invented description.

## 8. Workflow

1. Read the files in section 2.
2. Draft the two chapters and the appendix/reference updates against the checklist in sections 4–7.
3. Run a **self-refine pass**: list what you wrote; critique it against every rule in section 6; fix what the critique found; then report.
4. Commit with `docs(phase5): <summary> [docs]`. Do not push.

## 9. Report format (short)

1. What changed — one line per file.
2. Requirement IDs / evidence cited — the IDs, commands and screenshots used.
3. How to verify — exact paths and commands, including the `docs/draft/screenshots/` directory and a count of images actually captured.
4. Assumptions — anything still marked `[reference needed]`, "not measured", `[screenshot not captured — …]` or "not yet verified".
5. Next step — the operator actions that remain before submission.

Stop only if a supervisor document directly contradicts a confirmed BRIEF decision. Otherwise make the most reasonable assumption, record it in `docs/DECISIONS.md`, and continue.
