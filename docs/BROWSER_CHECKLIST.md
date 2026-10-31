# BROWSER_CHECKLIST.md — manual verification

I cannot test in browsers I did not run, so this is written for **you** to execute.
Record `PASS`, `FAIL`, or `N/A` in the third column. Anything you do not run stays
unverified and must not appear in the report as working.

Target browsers (BRIEF): **Chrome is primary**; Firefox and Edge are secondary and
are checked only if time allows before the 13 Nov freeze. Only browsers you report
on appear in the documentation.

## 0. Before you start

```bash
# Terminal 1 — database (see README.md if not already running)
# Terminal 2 — API
cd server && npm run dev

# Terminal 3 — model service (optional; the console works without it)
cd ml && .venv/Scripts/python -m uvicorn service:app --host 127.0.0.1 --port 8000

# Terminal 4 — frontend
pnpm dev            # http://localhost:8443
```

Seeded demo accounts (printed by `npm run seed`):

| Role | Email | Password |
|---|---|---|
| Viewer | `viewer@kaziforce.local` | `ViewerDemo!2026` |
| Moderator | `moderator@kaziforce.local` | `ModeratorDemo!2026` |
| Super Admin | `superadmin@kaziforce.local` | `SuperDemo!2026` |

Clear cookies before each browser pass (**F12 → Application → Cookies → delete
`kz_session`**), otherwise a previous session carries over.

---

## 1. Chrome — primary (required)

| # | Check | Steps | Expected | Result |
|---|---|---|---|---|
| 1.1 | Landing renders | Open `http://localhost:8443/` | Kaziforce header, hero, three feature blocks, "Operator sign in" button. No console errors in F12. | |
| 1.2 | No legacy branding | Search the page for "Tendaji" (Ctrl+F) | **No match.** Brand is "Kaziforce". | |
| 1.3 | Login validates | Submit the empty form | Two inline messages (email + password). No request sent (Network tab). | |
| 1.4 | Bad credentials | `viewer@kaziforce.local` / `wrong` | Red error panel: "Invalid credentials". Page does not navigate. | |
| 1.5 | Viewer login | `viewer@kaziforce.local` / `ViewerDemo!2026` | Lands on `/console/dashboard`. Header shows role pill "Viewer". | |
| 1.6 | No role switcher | Inspect the sidebar | **There is no role dropdown anywhere.** Only "Sign out". | |
| 1.7 | Role-driven nav | Look at the sidebar | No "System Settings" entry (Viewer lacks it). | |
| 1.8 | Viewer read-only — users | User Control Centre → select an account | "Suspend account" is absent; text says the role can view records only. No "Assign role" or ban control. | |
| 1.9 | Viewer read-only — queue | Moderation Queue | No Approve/Reject/Escalate buttons; each row shows "Read-only". Escalation lane tabs are absent. | |
| 1.10 | **Viewer CSV export hidden** | Audit Explorer | No "Export CSV" button; a note says download requires Moderator or Super Admin. | |
| 1.11 | **Viewer CSV export refused by server** | With the Viewer session, open `http://localhost:8443/api/v1/audit/export.csv` | JSON error: `{"success":false,"error":{"code":"AUTHZ-001",...}}`, HTTP 403. This proves the restriction is not just hidden UI. | |
| 1.12 | Unauthenticated redirect | Sign out, then visit `http://localhost:8443/console/users` | Redirected to `/login`. | |
| 1.13 | 404 page | Visit `http://localhost:8443/nope` | Kaziforce 404 page with links to Overview and Console. | |
| 1.14 | Moderator decisions | Sign in as Moderator → Moderation Queue | Approve / Reject / Escalate appear on Pending rows. | |
| 1.15 | Bulk bar | Tick two checkbox rows | Green bulk bar with "Approve selected / Reject selected / Escalate selected". | |
| 1.16 | Two-step ban confirm | As Super Admin → Users → account → "Permanently ban" | Modal reads "Step 1 of 2"; the action label appears only on step 2. Escape closes it. | |
| 1.17 | Super Admin settings | Settings | Editable value inputs and a working toggle. Save/toggle asks for confirmation. | |
| 1.18 | Settings audited | Settings → change a value → Audit Explorer | A `Configuration Updated` event with before/after metadata. | |
| 1.19 | **Model suggestion label** | Moderation Queue (model service running) | A "Suggestion only" pill per row with predicted severity, action, confidence %. | |
| 1.20 | **Model fail-safe** | Stop the model service, reload the queue | Rows show "Suggestion unavailable". **Approve/Reject/Escalate still work.** This is the key fail-safe check. | |
| 1.21 | Sort by predicted severity | Tick "Sort by predicted severity" | Rows reorder High → Low. | |
| 1.22 | **Scroll inside panels** | On a short window (F12 → device toolbar, height ~600px) open Users → select an account with many flags | "Flags reported" and "Content owned" lists **scroll inside the panel**; the panel does not grow past the viewport. | |
| 1.23 | **Table scroll** | Same short window on Moderation Queue / Audit / Users tables | Each table scrolls inside its bordered container; header stays visible. | |
| 1.24 | Audit filters | Audit Explorer → set From/To, type an actor, pick an action type | Table narrows; the event count updates. | |
| 1.25 | Moderator CSV export | As Moderator → Audit Explorer → Export CSV | File downloads, opens in a spreadsheet with the expected header row. | |
| 1.26 | Keyboard: skip link | Load any console page, press Tab once | "Skip to content" appears; Enter jumps to main content. | |
| 1.27 | Keyboard: focus ring | Tab through the queue toolbar | Every focused control shows a visible 3px gold-brown outline. | |
| 1.28 | Keyboard: modal | Open the ban modal, press Escape | Modal closes; focus returns sensibly. | |
| 1.29 | Contrast spot-check | Look at table headers, eyebrow labels, muted help text | Legible; not washed out on the cream background. | |
| 1.30 | Responsive — tablet | F12 device toolbar at **768×1024** | Sidebar narrows; tables and toolbars still usable; nothing overflows horizontally on the page body. | |
| 1.31 | Responsive — small laptop | **1024×768** | Layout intact, rail narrower than desktop, no clipped controls. | |
| 1.32 | Responsive — desktop | **1440×900** | Full layout; content capped at 1440px and centred. | |
| 1.33 | Responsive — narrow | **375×812** (optional, beyond stated scope) | Usable if imperfect; record honestly. | |
| 1.34 | No console errors | F12 → Console, walk all six screens | No red errors (a favicon or font warning is acceptable). | |
| 1.35 | **Lockout: lock an account** | Sign out, then submit a wrong password for `viewer@kaziforce.local` **5 times** | All five attempts look identical ("Invalid credentials"). No hint that a lock exists. | |
| 1.36 | **Lockout: locked out** | Now try the **correct** password for the Viewer | Still refused with the same generic error. This is intended (no account-state disclosure). | |
| 1.37 | **Lockout: visible to Super Admin** | Sign in as Super Admin → User Control Centre | The Viewer row shows an extra "Locked" pill, and an "Unlock" button appears in its row. | |
| 1.38 | **Lockout: unlock works** | Click "Unlock" (or open the record and use "Clear login lockout") | Success notice; the "Locked" pill disappears; the Viewer can sign in again. | |
| 1.39 | **Lockout: audited** | Audit Explorer → filter action type | Exactly one `Account Locked` and one `Account Unlocked` event. **No** events for the five failed attempts. | |
| 1.40 | Demo reset script | `cd server && npm run demo:reset` | Reports how many accounts it reset; locks cleared. Confirm it does not touch `audit_log`. | |

## 2. Firefox — secondary

| # | Check | Steps | Expected | Result |
|---|---|---|---|---|
| 2.1 | Landing + login | As 1.1, 1.5 | Same as Chrome. | |
| 2.2 | Fonts render | Any screen | Newsreader headings, Work Sans body, DM Mono labels. | |
| 2.3 | Scrollbars visible | Moderation Queue on a short window | Scrollbar appears inside the container (Firefox uses `scrollbar-color`; the track should be tinted, not default grey). | |
| 2.4 | Table scroll | As 1.23 | Tables scroll inside their border. | |
| 2.5 | Decision buttons | As Moderator, act on one flag | Success notice; row status updates. | |
| 2.6 | Viewer 403 export | As 1.11 | Same 403 JSON. | |
| 2.7 | Toggle control | Settings as Super Admin | Toggle switches and persists after reload. | |
| 2.8 | Focus ring | Tab through the queue | Visible outline on every control. | |
| 2.9 | Responsive tablet | 768×1024 | As 1.30. | |

## 3. Edge — secondary

| # | Check | Steps | Expected | Result |
|---|---|---|---|---|
| 3.1 | Landing + login | As 1.1, 1.5 | Same as Chrome (Chromium engine). | |
| 3.2 | Viewer 403 export | As 1.11 | Same 403 JSON. | |
| 3.3 | Scroll inside panels | As 1.22 | Lists scroll in-panel. | |
| 3.4 | Responsive tablet | 768×1024 | As 1.30. | |
| 3.5 | No console errors | Walk all six screens | No red errors. | |

---

## Automated evidence already collected (no browser needed)

These were measured by commands, not by eye. Re-run any of them yourself:

| Check | Command | Measured result |
|---|---|---|
| Text contrast ≥ 4.5:1 on every surface | node script over `src/**/*.{tsx,css}` (see `docs/DECISIONS.md` D-041) | **0 text tokens below 4.5:1**; 31 tokens were darkened to reach it |
| Non-text controls ≥ 3:1 | same script | Scrollbar thumb `#718078` on track `#e6e5dc` = **3.28:1**; focus ring `#ad7f2d` ≥ **3.03:1** on all light surfaces and 3.45:1 on the dark panel |
| Responsive breakpoints shipped | `grep -o "@media[^{]*" dist/assets/*.css` | `@media (width<=1199px)`, `@media (width<=900px)`, `@media (width<=1000px)` present in the built CSS |
| Semantic layout hooks survive the build | `grep console-rail dist/assets/*.css` | `console-rail`, `console-main`, `console-header`, `console-content`, `header-meta` all present |
| Tendaji removed from active code | `grep -ril tendaji src deploy server` | Only `src/legacy/ExportApp.tsx` (the preserved, unwired Figma export) |
| Role switcher removed | `grep -rn "role-select" src/` | Only a comment in `index.css` and the legacy file |

## Recording the result

Fill the Result column, then report back with: browser, version, viewport, and
any FAIL with the console text. Only what you paste back can be documented as
working.
