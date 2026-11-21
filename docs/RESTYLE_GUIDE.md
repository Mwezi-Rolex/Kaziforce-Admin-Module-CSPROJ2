# Restyle guide: give the Kaziforce console the Figma Make appearance

**For:** the teammate doing the restyle.
**Goal:** the deployed website should look like the Figma Make hosted version
(folder `Figma\CS Project II v3`, called **F** below). Only the frontend's
appearance changes. The API, database, permissions, audit log and model service
stay exactly as they are.
**Decision:** requested by the project owner on 21 November 2026 (D-072). It
replaces the "do not restyle" note in `docs/draft/DISCREPANCIES.md` row 16.

If you're using an AI agent, start it with `docs/prompts/restyle-figma-make.md`.
When you finish, send the work back as described in section 8. It will be
proofread, tested, redeployed and recorded in the report.

---

## 1. What you need

| Tool | Version | Check with |
|---|---|---|
| Windows 10/11 | — | The root `package.json` pins a Windows-only build binding (`@rolldown/binding-win32-x64-msvc`). On macOS or Linux, remove that one line locally and **do not commit the removal**. |
| Node.js | **22.x** | `node --version`. Node 20 is too old for Vite 8. If you can't install 22, prefix commands with `npx -y node@22`. |
| pnpm | 10.34.3 | `npx --yes pnpm@10.34.3 --version` |
| PostgreSQL | 16 or later | Needed so you can sign in and see the console screens |
| Python 3.12 | optional | Only needed to see model suggestions; without it the queue shows "Suggestion unavailable", which is fine for styling |
| Git | any | — |

You also need a copy of **F**. Its look is the target:
- `src/app/(frontend)/styles.css`: every colour, font, spacing and component class
- `src/components/console/ConsoleApp.tsx`: layout and structure of the console screens
- the font files that `styles.css` loads (self-hosted DM Sans, DM Mono, Newsreader)
- `docs/draft/screenshots/*.png`: eleven reference images, one per screen

## 2. Copy the project

On the owner's machine (or a shared drive), copy the project **without** local
secrets, databases or installed packages. In PowerShell:

```powershell
robocopy "C:\Users\smmwe\Documents\OpenCode Projects\CS Project II v2" "D:\Kaziforce-restyle" /E `
  /XD node_modules dist .pgdata .venv models __pycache__ .pytest_cache `
  /XF .env *.pgdata.log
```

Never copy `server\.env` or `server\.pgdata`. They hold the owner's database
passwords and data. You will create your own.

Then, in the copy:

```powershell
cd D:\Kaziforce-restyle
git status                       # should be clean
git switch -c restyle/figma-make # do all work on this branch
```

## 3. Run it locally

```powershell
pnpm install                      # root (frontend)
cd server; pnpm install
$env:PGPASSWORD = '<your own postgres superuser password>'
npm run bootstrap                 # creates the two roles and server\.env
Remove-Item Env:PGPASSWORD
npm run migrate; npm run seed     # the seed prints three demo sign-ins (local only)
cd ..
npm run dev:all                   # API :3000, website :8443, model :8000 if Python is set up
```

Open `http://localhost:8443`. The seed prints the Viewer, Moderator and Super
Admin sign-ins. They're for your local copy only; don't put them in any document.

If port 3000 is busy, use `$env:API_PORT='3100'; $env:API_ORIGIN='http://localhost:3100'; npm run dev:all`.

## 4. What you may change and what you must not

**Change only these:**

| Path | What it is |
|---|---|
| `src/index.css` | All global styles; most of the work happens here |
| `src/app/layouts/ConsoleLayout.tsx` | Side menu (rail) and header |
| `src/app/layouts/PublicLayout.tsx` | Public header and footer |
| `src/components/ui/*.tsx` | Buttons, pills, fields, panels, toolbar, notices, `ConfirmDialog` |
| `src/features/**/*Page.tsx` | Page markup and class names |
| `index.html` | Font links only |
| `public/` (create it if needed) | Self-hosted font files copied from F |
| `tests/*.test.tsx` | Only where a test checks wording or markup you deliberately changed |

**Do not change:**
- `server/`, `ml/`, `deploy/`, `scripts/`: no API, database or model changes
- `src/imports/`, `src/legacy/`, any `.docx` or `.pdf`
- `src/lib/api.ts`, `src/lib/permissions.ts`, `src/app/SessionContext.tsx`, `src/app/guards.tsx`: these hold the role rules
- `docs/draft/`: the report is updated after review
- `package.json` dependencies: don't add Next.js, Payload or any other library. F is built on Next.js and Payload; copy its **look**, not its code. If a new package seems unavoidable, ask first.

**Behaviour that must survive the restyle** (the panel will test these):
1. A Viewer never sees the **Export CSV** control, and the server still refuses with 403.
2. A Viewer and a Moderator never see System Settings, and `/console/settings` still shows "access denied" to them.
3. Moderation suggestions stay labelled **"Suggestion only"**, and "Suggestion unavailable" still appears when the model is down.
4. The product name stays **Kaziforce**. F's screens may show other placeholder names; don't copy them. No role switcher.
5. Report and option lists keep scrolling inside their panels (CON-UI-001).
6. Keyboard focus stays visible, and text contrast stays at least **4.5:1**. F's lime `#d1f77b` fails on white, so use it only on the dark forest backgrounds or as a non-text accent.

## 5. The changes to make

Open each F screenshot next to the same screen in your local copy and work
through these in order.

### 5.1 Colours and fonts (`src/index.css`, `index.html`)

O currently writes colours as literal hex values throughout the code (for
example `#183a35`, `#17332f`, `#c99434`, `#f7f5ef`). F uses CSS variables.
1. Add F's variables to `:root` in `src/index.css`, copying the values from F's `styles.css`. These include:
   `--forest #103e32`, `--ink #173e32`, `--muted #7a847e`, `--line #e3e8e1`, `--lime #d1f77b`, the base text colour `#183b32`, the page background `#f7f9f6`, and `--serif` (Newsreader).
2. Replace the old literal colours with those variables, in `index.css` and in Tailwind classes such as `bg-[#183a35]` inside the `.tsx` files. Map them consistently:
   - old dark green → `var(--forest)`
   - old ink → `var(--ink)`
   - old gold accent → `var(--lime)`, on dark backgrounds only
   - old cream background → F's background
3. Fonts: F self-hosts DM Sans, DM Mono and Newsreader; O loads Work Sans from Google Fonts. Copy F's font files into `public/fonts/`, add `@font-face` rules, set the body font to DM Sans, and remove the Google Fonts `<link>` from `index.html`. Self-hosted fonts also satisfy the server's security policy (CSP).
4. A quick search tells you when you're done: `Select-String -Path src\**\*.tsx,src\index.css -Pattern '#183a35|#c99434|#17332f'` should return nothing.

### 5.2 Four-item rail and a secondary settings route (`ConsoleLayout.tsx`)

- The rail keeps four entries: Dashboard, User Control Centre, Moderation Queue, Audit Explorer. Each keeps its permission filter.
- **Remove System Settings from the rail.** Add a small settings control in the console header, shown only when `can(user.permissions, PERMISSIONS.settingsManage)` is true, that links to `/console/settings`. Match F's header button.
- Keep the route `/console/settings` and its `SettingsGate` in `src/App.tsx` unchanged.
- Match F's rail: width, active item style, brand block, operator block and sign-out placement.

### 5.3 Horizontal account record (`src/features/users/UsersPage.tsx`, `.account-record` in `index.css`)

Today the table and the record panel stack in one narrow column at 1440 px, and
the Role column is cut off (DISCREPANCIES row 19). F shows the table across the
page and the selected account's record laid out horizontally beside or beneath
it (see F's `04-users-moderator.png`).
- Make the table use the full content width.
- Lay out the record's fields in a horizontal band, as F does, with the report-history and content lists in fixed-height scroll boxes (F uses a 240 px viewport).
- Check at 1440 px, 1200 px and 900 px widths.

### 5.4 Two-step confirmation on every decision

Today only the permanent ban asks for confirmation; approve, reject and escalate
apply as soon as they're clicked. F confirms every decision.
- Use the existing `src/components/ui/ConfirmDialog.tsx`, restyled to F.
- Put it in front of: single approve, reject and escalate; the three bulk actions; overrule; uphold and ban; suspend; role change; unlock. The ban already uses it.
- The dialog states the action, the target and the number of items, plus "This is recorded in the immutable audit log".
- Cancel must change nothing. Escape closes it, and focus returns to the button that opened it.
- Don't change the API calls themselves. Only add the confirmation step before them.

### 5.5 Every other screen

Restyle each to match F's screenshot of the same screen:

| Screen | Local route | F reference image |
|---|---|---|
| Landing | `/` | `01-landing.png` |
| Sign-in | `/login` | `02-login.png` |
| Dashboard (Viewer) | `/console/dashboard` | `03-dashboard-viewer.png` |
| Users (Moderator) | `/console/users` | `04-users-moderator.png`, `04b-...scrolled.png` |
| Queue with bulk bar | `/console/queue` | `05-queue-moderator.png` |
| Audit (Moderator) | `/console/audit` | `06-audit-moderator.png` |
| Audit (Viewer) | `/console/audit` | `07-audit-viewer-no-export.png` |
| Settings (Super Admin) | `/console/settings` | `08-settings-superadmin.png` |
| Escalation lane | `/console/queue`, Escalation tab | `09-escalation-superadmin.png` |
| Not found | any unknown path | `10-not-found.png` |

**Keep O's content where F differs.** F's audit view has no outcome pill and its
CSV has 7 columns. Keep O's **Outcome** pill and filter; restyle them only. Keep
O's three `sample.*` settings keys and its wording.

## 6. Check your work before sending it

Run these from the project root. All must pass.

```powershell
npx --yes pnpm@10.34.3 typecheck          # exit 0
npx --yes pnpm@10.34.3 test               # 7 passed (update a test only if it checked wording you changed on purpose)
npx --yes pnpm@10.34.3 build              # succeeds
cd server; npm test                       # 86 passed; you shouldn't have touched server/, so this must not change
```

Then sign in as each role and tick off:

- [ ] Viewer: four rail items or fewer, no settings control, no Export CSV, dashboard renders
- [ ] Moderator: queue decisions ask for confirmation; Cancel changes nothing; Export CSV downloads
- [ ] Super Admin: header settings control opens settings; escalation lane shows Overrule and Uphold and ban, both confirmed
- [ ] Users screen at 1440 px: no clipped columns; the record panel is horizontal
- [ ] Keyboard only: Tab reaches every control, focus is visible, Escape closes dialogs
- [ ] The page shows "Kaziforce" and never another product name

## 7. Commit messages

Commit in small steps on `restyle/figma-make`, using this form:

```
style(ui): <what changed> [CON-UI-001]
```

For example: `style(ui): F colour tokens and self-hosted fonts`,
`style(ui): four-item rail, header settings control`,
`style(ui): confirm every moderation and account decision`.
Don't push anywhere, and don't merge into `master`.

## 8. Send the work back

In the copy, create one file containing your branch:

```powershell
git bundle create kaziforce-restyle.bundle master..restyle/figma-make
```

Send `kaziforce-restyle.bundle` with a short note covering:
- anything from section 5 you couldn't match, and why
- any test you changed, and why
- anything that looked wrong but you left alone

Don't send `server\.env`, your database, or any password.

## 9. What happens next (for the owner)

1. The bundle is fetched into the original project as a separate branch, so `master` is untouched until review passes.
2. Review: the diff is read line by line against section 4; every check in section 6 is rerun; each screen is compared with F's image.
3. If it passes, the branch is merged, the ten report screenshots are retaken, and DISCREPANCIES rows 16 and 19 and Chapter 5 are updated.
4. The new frontend is uploaded to the Azure VM and the installer rerun. It keeps the existing passwords and data. The smoke test then runs again over HTTPS.
