# Prompt: final work and documentation across the three project copies

Copy everything below the divider into a fresh agent session with the **OpenCode workspace** as the working directory.

---

You are completing the **final work and documentation** for this capstone project. Today is **20 November 2026** — submission day. The demonstration is 23–27 November. The application is feature-frozen. Your job is to reconcile three copies of the project honestly, finish the report, and leave the repository in a defensible state.

## 1. The three copies and what each is for

| Label | Path | What it is | Use it for |
|---|---|---|---|
| **O** | current working directory (`…\OpenCode Projects\CS Project II v2`) | The deliverable. Vite + React 19 + TypeScript + Tailwind 4 SPA, Express + TypeScript API, PostgreSQL 18, JWT in an httpOnly cookie, `bcryptjs`, Jest/Supertest, Vitest, Python 3 + scikit-learn + FastAPI for training and local inference. Migrations 001–009, including the audit-provenance fields. Documentation drafts in `docs/draft/`. | Implementation truth for what will be demonstrated; all command results you rerun here. |
| **R** | `C:\Users\smmwe\Documents\GLM Projects\Kaziforce` | The local PostgreSQL implementation this workspace was copied from, with its 21-commit history (last `d34e106`). Identical to O before the 12 Nov audit-provenance work. It has migrations 001–008, the older 81-test record, and a stale `tsx watch` process on port 3000 serving that old folder. | Historical source claims about Express, SQL migration/grant mechanics, bcrypt, the FastAPI service and the original 81-test suite. Never mistake its stale server for O. |
| **F** | `C:\Users\smmwe\Documents\Figma\CS Project II v3` | The Figma Make hosted adaptation: Next.js 16 + Payload 4 + Tailwind 4, platform-owned database/auth/storage, a portable server-side Random Forest, 11 Node tests, a `figma make verify-deploy` production check, 11 saved screenshots with a register, and its own Chapter 5/6 drafts and evidence in `docs/draft/`. Its `AGENTS.md` is a **Figma Make template instruction**, not report guidance. | **Visual direction and report-writing practice**: forest/lime palette (`--forest`, `--ink`, `--lime`), four-item rail, horizontal account record, two-step confirmation, secondary Super Admin settings route, full-page PNG captures, `docs/draft/DECISIONS.md` rules DOC-01…DOC-08, and the evidence-register format. |

F is a **different implementation**, not a newer version of O. Do not transplant its stack, its 11-test result, its Payload collection rules or its 7-column CSV into the O report.

## 2. Authority and evidence discipline

1. `BRIEF.md` and the user's decisions outrank every document; then `AGENTS.md`; then the supervisor documents in `src/imports/`; then the templates whose digests are in `docs/digest/`.
2. Adopt F's evidence-track discipline (`docs/draft/DECISIONS.md` DOC-01…DOC-08) and extend it with one more label:
   - **O** — rerun by you in this OpenCode workspace, with the command quoted.
   - **R** — a claim recorded in the GLM reference repository, not rerun here.
   - **F** — an observation or command result from the Figma hosted adaptation.
   - **A** — supplied by the author without a raw transcript in the accessible repository.
   - **U** — unverified or not measured.
   Never relabel a result: an A-reported 86-test pass is not an F-hosted verification, and an F-hosted 11-test pass is not an O result.
3. Known conflict to preserve: F's decision DOC-03 records that its accessible reference has migrations 001–008, decisions through D-059 and an 81-test record, and treats migration 009, the 86-test run, the 11-column CSV and TC-31…TC-35 as **author-supplied (A)**. In O those same items are **O-verified** (migration 009 ran; `npm test` → 86/86 three times; live check on port 3100 echoed the correlation id and returned the 11-column CSV). Record both facts; do not claim F verified them, and do not downgrade O's own verification.
4. F's hosted audit view has action pills but no separate outcome pill, a 7-column CSV, and no `x-correlation-id` header. O's build has all three. That is a real divergence, not a documentation error — describe it as such.

## 3. Reconciliation deliverable

Create `docs/FINAL_RECONCILIATION.md` with one row per topic below and columns: **O (verified here)** / **R (reference)** / **F (hosted)** / **authoritative source for the report** / **consequence**.

Topics: runtime and stack; routing and pages; authentication and session; RBAC enforcement point; data layer and persistence; audit immutability mechanism; audit record fields and CSV columns; moderation states, bulk actions and escalation; settings and sample keys; model in production vs training pipeline; design tokens and visual layout; test suites and counts; deployment route; outstanding evidence.

State plainly at the top: **this build implements the Admin and Moderation console subset of the Kaziforce SRS, not the whole platform** (AGENTS.md scope-honesty rule).

## 4. Final work checklist

1. **Fix the runtime hazard.** A stale `tsx watch src/index.ts` from R still listens on port 3000. Stop it or run O on a free port (for example `PORT=3100`), then verify `GET /api/v1/health` before any browser capture. Include the command and result in the evidence log.
2. **Finish Chapter 5 and Chapter 6** in `docs/draft/` using the structure of `docs/prompts/complete-chapters-5-and-6.md` and F's drafts as a *structural* reference. Keep sections 5.1–5.8 and 6.1–6.3. Use O's verified figures; mark R/F/A figures with their labels.
3. **Visual direction.** F prescribes forest/lime, a four-item rail, a horizontal account record, two-step confirmation and a secondary settings route; O currently carries the original export's green/gold tokens. Record the divergence in `docs/draft/DISCREPANCIES.md`; do **not** restyle the application during the freeze. Screenshots must show the actual O app, not F's preview.
4. **Screenshots.** Capture ten full-page PNGs from the running O app with the in-app browser tools into `docs/draft/screenshots/` (names and tool sequence are in `docs/prompts/complete-chapters-5-and-6.md`, section 7A). F's existing PNGs may be used only as a visual comparison, labelled "hosted adaptation"; they must never be presented as O's screens. Register each image with route, role, timestamp, tool and SHA-256.
5. **Evidence honesty.** No coverage figure, performance figure, load result, screen-reader pass, Firefox/Edge execution, VPS deployment or remote push is verified — keep "not measured" / "not yet verified". The model metrics come only from `ml/reports/metrics.json` and are labelled a fit to synthetic data. References absent from the project documents stay `[reference needed]`.
6. **Writing rules.** Present tense for what the system is, past tense for what was done, future tense only in Future Works. Prose says "the industry partner" or "the platform"; screenshots may show the product name. Chapters 1–4 stay an action list in `docs/draft/chapters-1-4-changes.md`, never rewritten. No edits to `src/imports/`, `.docx`, `.pdf`, or application source.
7. **Repository hygiene.** Confirm no secrets or `.env` are tracked; `.gitignore` covers `node_modules`, `dist`, `.venv`, `.env` and local Postgres data. Keep the verified commands reproducible with Node 22 and `pnpm`. Commit with `docs(phase5): <summary> [docs]`; never push.

## 5. Verified evidence you may cite as O

- `cd server && npm test` → 8 suites, **86 passed / 86**, three consecutive runs with no re-seed.
- `pnpm test` → **7 passed**; `ml\.venv\Scripts\python -m pytest ml\tests -q` → **7 passed**.
- Both `tsc --noEmit` → exit 0; `vite build` → JS 386.76 kB (116.83 kB gzip), CSS 32.47 kB (7.64 kB gzip).
- `cd server && npm run migrate` → 9 migrations including `009_audit_provenance.sql`.
- Live API on port 3100: `x-correlation-id: report-smoke-001` echoed in the header; CSV header `id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,outcome,actorIp,correlationId,metadata`; newest row `Success,127.0.0.1` plus the correlation id; `?outcome=Blocked` → 25 rows.
- Full command log: `docs/draft/appendices.md` rows 1–21; F's hosted evidence is in `F:\docs\draft\evidence\` and stays labelled F.

## 6. Workflow and stopping rule

1. Read the state files, the three drafts, F's `docs/draft/DECISIONS.md` and evidence register, and the digests.
2. Write `docs/FINAL_RECONCILIATION.md`.
3. Finish the chapters, appendices, references and the discrepancy list.
4. Capture or explicitly account for every screenshot.
5. Run a self-refine pass: list what you wrote, critique it against sections 2–5, fix what you found, then report.
6. Commit. Stop only for a supervisor-document contradiction or a destructive change; otherwise make the reasonable assumption, record it in `docs/DECISIONS.md`, and continue.

## 7. Report format (short)

1. What changed — one line per file.
2. Requirement IDs and evidence cited — with O/R/F/A/U labels.
3. How to verify — exact commands, paths, screenshot count.
4. Assumptions — everything not measured or not yet verified.
5. Next step — the operator's remaining actions before the panel.
