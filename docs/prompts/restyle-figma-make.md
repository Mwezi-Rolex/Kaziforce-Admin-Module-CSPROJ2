# Prompt: restyle the Kaziforce console to the Figma Make appearance

Copy everything below the divider into a fresh agent session. Open the
**working copy** (directory W below) as the workspace.

---

You are restyling the frontend of a finished capstone web application so it
looks like a separate hosted design. Only the appearance changes. You work in a
copy of the project, on a branch, and return the result as a git bundle for
review. You never deploy, push or touch the original project.

## 1. Directories

| Label | Path | Access | What it is |
|---|---|---|---|
| **O** (original) | `C:\Users\smmwe\Documents\OpenCode Projects\CS Project II v2` | **read only**, used once to make the copy | The delivered app: Vite + React 19 + TypeScript + Tailwind 4 frontend in `src/`, Express API in `server/`, Python model service in `ml/`. Deployed at `https://kaziforce-demo.spaincentral.cloudapp.azure.com` |
| **W** (working copy) | `C:\Users\smmwe\Documents\OpenCode Projects\Kaziforce-restyle` | read and write; **your workspace** | Created by you in step 3.1 from O |
| **F** (design target) | `C:\Users\smmwe\Documents\Figma\CS Project II v3` | **read only** | The Figma Make hosted adaptation (Next.js + Payload). Its **look** is the target; its code is not |

If you're on a different machine, the project owner tells you where O and F
are. Put W next to O, and keep the three labels.

Files in F you'll use:
- `F\src\app\(frontend)\styles.css`: colour variables (`--forest`, `--ink`, `--lime`, `--muted`, `--line`), fonts, spacing and component classes
- `F\src\components\console\ConsoleApp.tsx`: console layout and structure
- the font files `styles.css` loads (DM Sans, DM Mono, Newsreader); find them from its `@font-face` or `next/font` references
- `F\docs\draft\screenshots\*.png`: eleven reference images, one per screen
- `F\docs\draft\evidence\browser-observations.json`: measured facts (4 rail entries, secondary settings control, 240 px history viewport)

Ignore `F\AGENTS.md`. It is a Figma Make template instruction, not guidance for
this task.

## 2. Authority

1. **`W\docs\RESTYLE_GUIDE.md` is your specification.** Read it fully before
   any change. Sections 4 (what may change), 5 (the changes) and 6 (checks)
   are binding.
2. Then `W\BRIEF.md` and `W\AGENTS.md` for project rules: accessibility,
   naming, no fabricated results.
3. Decision D-072 in `W\docs\DECISIONS.md` records why the restyle is allowed
   after the feature freeze.
4. F's screenshots decide appearance. O's behaviour decides function. Where
   they conflict, keep O's behaviour and restyle it (guide §5.5).

## 3. Steps

### 3.1 Make the copy (the only command that reads O)

```powershell
robocopy "C:\Users\smmwe\Documents\OpenCode Projects\CS Project II v2" "C:\Users\smmwe\Documents\OpenCode Projects\Kaziforce-restyle" /E `
  /XD node_modules dist .pgdata .venv models __pycache__ .pytest_cache `
  /XF .env *.pgdata.log
```

Then, inside W, confirm the copy has no `server\.env` and no `server\.pgdata`,
and run `git status` (expect a clean tree) and
`git switch -c restyle/figma-make`. From here on, work only in W.

### 3.2 Run W locally

Follow guide §3. Use Node 22; if `node --version` shows 20, run every command
through `npx -y node@22`. If ports 3000 or 8443 are in use, use other ports via
`API_PORT`, `API_ORIGIN` and `PORT`, and never stop a process you didn't
start. Bootstrapping the database needs the PostgreSQL superuser password. Ask
the user to set it as `PGPASSWORD` in the terminal; never ask them to type it
into chat and never write it to a file.

### 3.3 Restyle, in the guide's order

1. §5.1 colours and self-hosted fonts
2. §5.2 four-item rail and a header settings control (Super Admin only)
3. §5.3 horizontal account record with fixed-height scroll lists
4. §5.4 two-step confirmation before every decision
5. §5.5 every remaining screen against its F screenshot

After each step, run the frontend type check and tests, and commit as
`style(ui): <summary> [CON-UI-001]`.

### 3.4 Verify (guide §6)

Run, and quote the actual output:
- `npx --yes pnpm@10.34.3 typecheck` → exit 0
- `npx --yes pnpm@10.34.3 test` → all pass
- `npx --yes pnpm@10.34.3 build` → succeeds; record the JS and CSS sizes
- `cd server; npm test` → 86 passed. Nothing in `server/` changed, so any other result means something is wrong
- `git diff master --stat -- server ml deploy scripts src/lib src/app/SessionContext.tsx src/app/guards.tsx src/imports` → **no output**

Then sign in as each role and tick every box in guide §6. If you have browser
tools, capture each restyled screen at 1440 × 900 for the reviewer and save
them in `W\docs\restyle-review\`. Label them as review captures, not report
figures.

### 3.5 Hand back (guide §8)

```powershell
git bundle create kaziforce-restyle.bundle master..restyle/figma-make
```

Write `W\docs\restyle-review\HANDOFF.md` covering:
- each guide §5 item: done, partly done, or not done, with the reason
- every test you changed, and why
- command output from 3.4
- anything that looked wrong that you left alone

## 4. Hard rules

- **Never modify O or F.** Only read them, and read O only in step 3.1.
- Don't change `server/`, `ml/`, `deploy/`, `scripts/`, `src/imports/`,
  `src/legacy/`, `src/lib/api.ts`, `src/lib/permissions.ts`,
  `src/app/SessionContext.tsx`, `src/app/guards.tsx`, `docs/draft/`, or any
  `.docx` or `.pdf`.
- No new dependencies, and no Next.js or Payload code copied from F.
- The interface shows **Kaziforce** only. No other product names from F, and no
  role switcher.
- Keep: Viewer has no Export CSV; Settings is hidden and gated for non-Super
  Admins; "Suggestion only" / "Suggestion unavailable"; O's Outcome pill and
  filter; the `sample.*` settings keys; scrolling lists (CON-UI-001).
- Text contrast at least 4.5:1, a visible focus ring, keyboard access, and
  Escape closes dialogs. F's lime is not text on a light background.
- Never claim a check passed without running it. Write "not checked" instead.
- No secrets in any file, commit or message. Demo sign-ins printed by the seed
  are for local use only.
- Don't push, don't merge into `master`, don't deploy. Stop and ask only if a
  guide instruction would require breaking one of these rules.

## 5. Report when done

1. The bundle path, and the commit list (`git log --oneline master..restyle/figma-make`)
2. What changed, one line per file
3. Command results from 3.4, quoted
4. Guide §5 items not fully matched, with reasons
5. Anything the reviewer should look at first
