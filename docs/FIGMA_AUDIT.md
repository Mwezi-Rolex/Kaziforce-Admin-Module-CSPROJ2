# FIGMA_AUDIT.md — Phase 0 inspection of the Figma export

Audited: 2026-10-29. Everything below was verified by reading the actual files, not assumed.

## What the export is

A **Figma Make** export (`package.json` name: `figma-make-app`; `.figma/make/site.json`, vite plugins `figmaMakeKitPlugin` etc.) of a product branded **"Tendaji — Governance console"**: the **admin & moderation (operator) side** of the digital workforce marketplace. The marketplace project itself is named **Kaziforce** in the supervisor documents; the console brand mark is a serif "T". No marketing/user-facing marketplace screens exist in the export.

## Stack (as exported)

| Layer | Export | Note |
|---|---|---|
| UI | React **19** + TypeScript 5.7 | single component tree |
| Build | Vite **8**, `@vitejs/plugin-react` | dev server on port 8443 |
| Styling | Tailwind CSS **v4** (`@tailwindcss/vite`) + hand-written component CSS in `src/index.css` | utility classes mixed with custom classes (`.pill-*`, `.nav-item`, `.primary-button`…) |
| Format | `oxfmt` (`pnpm format`) | no ESLint/test runner configured |
| Package mgr | pnpm (`pnpm-lock.yaml`; `.mise.toml` pins tooling) | |
| Router | **none** | navigation is a `useState<Page>` union in `App.tsx` |
| State/data | **none** | all data hardcoded as module-level arrays |
| Backend | **none** | pure static SPA export |

## Where everything lives

- `src/App.tsx` (121 dense, near-minified lines, 26 KB): **the entire app in one file** — all screens, all components, all mock data. No `src/components/`, no pages directory.
- `src/index.css` (10 KB): design tokens + all component classes. Some rules are duplicated verbatim (`.bulkbar`, `.login-shell`, `.detail-list` blocks appear twice).
- `index.html`: Figma template placeholders (`<!-- figma:title -->`), so the built page has **no title/lang set**.
- `vite.config.ts`: `@` → `./src` alias; Figma deploy tooling.
- `src/main.tsx`: standard React root; `src/vite-env.d.ts`: types.
- `src/assets/attachments/reference-1..4`: **not app assets** — four Obsidian notes (two identical copies of the project proposal chapters 1–3, two identical copies of the UML diagrams note). Extensionless "Ruby script" files; they are source material, misfiled as attachments.
- `src/imports/`: the converted supervisor documents (markdown) + 14 extracted PNGs (`image0–13.png`). **Read-only source material; not app code.**

## Screens (state-based, no routes)

`Page` union in `App.tsx`: `login | dashboard | users | queue | audit | settings`.

| Screen | Component | Contents |
|---|---|---|
| Login | `Login` | two-column layout; email/password form (prefilled demo values), JWT messaging, marketing aside |
| Dashboard Analytics | `Dashboard` | intentionally **unpopulated** — explicit note "The source documentation does not define a dashboard KPI set… Metric definitions pending" |
| User Control Centre | `Users` | searchable/filterable user table (Account, ID, Role, Status, Created), account-record side panel with flags reported + content owned, Suspend, Assign role (Super Admin), Permanently ban (Super Admin, 2-step modal) |
| Moderation Queue | `Queue` | flag table (content, reporter, severity, status), severity/status filters, bulk-select bar (approve/reject/escalate), Super-Admin-only **Escalation review** lane (overrule / uphold and ban) |
| Audit Explorer | `Audit` | date-range + actor filters, event table (Event ID, actor, action, target, timestamp), "Export CSV" button (currently `alert()`) |
| System Settings | `Settings` | Super-Admin-only key/value config table + feature toggle; keys intentionally marked "[Key not specified]" per doc gap |
| Shared | `ConfirmModal` | 2-step destructive-action confirmation (ban / bulk decision / feature toggle) |
| Shared | sidebar shell | nav rail with queue badge count, role-gated Settings entry, current-operator card, **wireframe role switcher** (Viewer/Moderator/Super Admin dropdown — a demo affordance, not a real feature) |

## Mock data (hardcoded in `App.tsx`)

`users` (4 accounts), `flags` (4 moderation flags), `contentItems` (4), `events` (4 audit events). IDs follow the documented conventions (`usr_*`, `flg_*`, `cnt_*`, `evt_*`, `op_*`); fields (`severity`, `flag_status`, `content_item_id`, `operator_id`, `target_entity_id`) mirror the documented DB schema — a good sign the export was built against the same docs.

## Design tokens (from `src/index.css` + inline Tailwind colors)

**Colors**
- Ink/text: `#17332f`; body background: `#f7f5ef`; card background: `#fcfbf7`; sidebar: `#eeece3`
- Primary deep green: `#183a35` (buttons, active nav, login aside), hover `#28534b`
- Accent gold: `#c99434` / `#c99735` (focus ring, top rule, markers)
- Danger red: `#a83f27` (danger button), hover `#8f301e`; badge red `#b54528`; status green `#3e7d5b`
- Borders: `#d8d8ce`, `#deded5`, `#d3d5cd`; muted text: `#6c756e`, `#708078`, `#758078`
- Status pills: high `#963721/#fff0eb`, medium `#8a661d/#fff7df`, low/active `#246144/#e9f4eb`, suspended `#6c5242/#f1ece7`

**Typography** (Google Fonts, imported in CSS)
- Body/UI: **Work Sans** (400–700)
- Display/headings: **Newsreader** (serif, opsz axis, 400–600)
- Labels/meta/mono: **DM Mono** (400/500), used for eyebrows (10px, uppercase, +0.15em tracking), IDs, table headers

**Shape & components**: 2px radius (buttons/inputs), 999px pills and toggle; thin 1px borders; table style `#f1f0ea` header; eyebrow/mono microcopy everywhere; 252px fixed sidebar; 76px header; max-width 1440px content.

**Assets**: none used by the app — no images, no icon library; icons are unicode glyphs (▦ ◎ ≡ ◫ ⚙). The only image files in the repo belong to `src/imports/` source documents.

## Accessibility observations (as exported)

Present: focus-visible outline (3px gold), `sr-only` label on role select, `aria-label`s on checkboxes/toggle/close buttons, semantic `<table>/<dl>`, one `@media (max-width: 1000px)` responsive collapse.
Gaps to fix later: login form prefilled credentials, no skip link, no landmarks beyond `<main>/<aside>`, no `<head>` title/lang, color-only pill meaning (mitigated by text), no keyboard docs, hardcoded queue badge "3" drifts from data length (shows 3 while 4 flags exist).

## Conflicts / gaps between export and documents (to resolve in Phase 1)

1. **Stack divergence**: the report's Table 3.1 says React.js + **Bootstrap**; the export is Tailwind v4. The TDD/FWED decide the final stack — Tailwind matches the export's look; keep tokens, decide per TDD, log in DECISIONS.md.
2. **No router**: screens are `useState`-swapped, not URL-addressable. The FWED/TDD route list must be mapped onto real routes in Phase 2.
3. **One-file architecture**: everything in `App.tsx` must be decomposed into shared components (per AGENTS.md refactor rule).
4. **Dashboard intentionally empty** and **settings keys unnamed** — the export explicitly refuses to invent KPIs/config keys. This matches the "never invent a requirement" rule; dashboard KPI set is an OPEN_QUESTION.
5. **Duplicate CSS blocks** in `index.css` (`.bulkbar`, `.login-shell`… defined twice) — cleanup candidate in Phase 2.
6. **Queue badge count is hardcoded** (`3`) while data has 4 flags — defect to fix when making data dynamic.
7. Export shows **CSV export via `alert()`** — real export behaviour must follow BED.
8. `index.html` title/lang placeholders never filled — fix in Phase 2.

## Panels that list report content or options (BRIEF scroll requirement, 2026-10-29)

BRIEF.md requires every such panel to scroll inside its container instead of clipping. Enumerated from the export:

| # | Panel | Location in export | Current behaviour | Fix |
|---|---|---|---|---|
| 1 | Account record panel — "Flags reported" and "Content owned" lists | `Users` component, right `<aside>` (`history-block`) | grows unbounded; can overflow the viewport on long records | fixed max-height + `overflow-y: auto` inside the panel |
| 2 | Moderation queue flag table | `Queue` component, `<table>` | page-height table; rows clip below the fold with no in-panel scroll | scroll container wrapping the table (`.user-table-scroll` pattern already in `index.css` is unused by this table) |
| 3 | Audit explorer event table | `Audit` component, `<table>` | same as above | same scroll container |
| 4 | User Control Centre account table | `Users` component, `<table>` | same as above | same scroll container |
| 5 | Sidebar navigation rail | fixed `<aside>` | long nav could clip on short viewports | `overflow-y: auto` on the rail |
