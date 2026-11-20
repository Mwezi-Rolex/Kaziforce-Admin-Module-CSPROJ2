# O command results — 20 November 2026

**Evidence track: O** (rerun in this OpenCode workspace on 20 November 2026,
times in EAT, UTC+3). Each line quotes the summary output of the command. The
raw console transcripts were kept outside the repository because the seed
transcript prints the local demo credentials; they are summarised here without
those values.

## Environment

| Item | Observed |
|---|---|
| System Node.js on PATH | v20.15.1 (`node --version`) |
| Node.js used for every command below | v22.23.5 (`npx -y node@22 --version`; its directory was put first on PATH) |
| pnpm | 10.34.3 (`npx --yes pnpm@10.34.3 --version`, the version pinned in `.mise.toml`) |
| PostgreSQL | 18 binaries (`C:\Program Files\PostgreSQL\18\bin`); disposable cluster in `server/.pgdata` on 127.0.0.1:5433 (gitignored), created for this run because the 12 November cluster no longer existed (D-068) |
| Port 3000 | **not listening** at 16:5x EAT; no stale `tsx watch` from R was running, so nothing had to be stopped |
| Browser for screenshots | headless Google Chrome 157.0.8103.79 driven by `puppeteer-core` 24 installed in a temporary folder outside the repository |

## Results

| # | Time | Command (cwd) | Result |
|---|---|---|---|
| O-01 | 17:03:37 | `npm run migrate` (`server/`) on an empty database | applied `001_roles_permissions.sql` … `009_audit_provenance.sql` (9 files), "migrations complete", exit 0 |
| O-02 | 17:03:40 | `npm run seed` (`server/`) | "seed complete — SAMPLE DATA inserted (roles, permissions, 3 demo operators, 4 sample accounts, 4 content items + flags, 3 settings keys)", exit 0 |
| O-03 | 17:03:45 | `npm test` (`server/`), run 1 | Test Suites: 8 passed, 8 total; Tests: 86 passed, 86 total; 83.611 s |
| O-04 | 17:05:21 | `npm test`, run 2, no re-seed | 8 passed / 8; 86 passed / 86; 73.729 s |
| O-05 | 17:06:47 | `npm test`, run 3, no re-seed | 8 passed / 8; 86 passed / 86; 74.533 s |
| O-06 | 17:08:13 | `npm run typecheck` (`server/`, `tsc --noEmit`) | exit 0, no output |
| O-07 | 17:08:19 | `npx pnpm@10.34.3 test` (root, `vitest run`) | Test Files 2 passed (2); Tests 7 passed (7) |
| O-08 | 17:08:32 | `npx pnpm@10.34.3 typecheck` (root, `tsc --noEmit`) | exit 0, no output |
| O-09 | 17:08:46 | `npx pnpm@10.34.3 build` (root, `vite build`, Vite 8.3.5) | 138 modules; `index-*.js` 386.76 kB (gzip 116.83 kB); `index-*.css` 32.47 kB (gzip 7.64 kB); built in 1.54 s |
| O-10 | 17:08:55 | `ml\.venv\Scripts\python -m pytest ml\tests -q` (root) | 7 passed in 14.18 s |
| O-11 | 17:11 | `API_PORT=3100 MODEL_PORT=8100 PORT=8543 API_ORIGIN=http://localhost:3100 npm run dev:all` | api listening on 3100, web (Vite) on 8543, model service on 127.0.0.1:8100 |
| O-12 | 17:12:26 | `GET http://localhost:3100/api/v1/health` | HTTP 200 `{"status":"ok","database":"reachable"}` |
| O-13 | 17:12:27 | `GET http://localhost:8543/api/v1/health` (through the Vite proxy) | HTTP 200, same body, so the frontend reaches O's API and not port 3000 |
| O-14 | 17:12:27 | `POST /api/v1/auth/login` as Moderator with `x-correlation-id: final-recon-20261120` | HTTP 200; response header `x-correlation-id: final-recon-20261120` |
| O-15 | 17:12:28 | `GET /api/v1/audit/export.csv` as Moderator | HTTP 200 `text/csv; charset=utf-8`; header `id,createdAt,operatorId,operatorEmail,actionType,targetEntityType,targetEntityId,outcome,actorIp,correlationId,metadata` (11 columns); the login row carried `Operator Login`, `Success`, `::1`, `final-recon-20261120` |
| O-16 | 17:12:28 | `GET /api/v1/audit?outcome=Blocked` | HTTP 200, 25 rows, all `Blocked`. 25 is the default page size (`size` defaults to 25 in `server/src/routes/audit.ts`) |
| O-17 | 17:13:16 | `GET /api/v1/audit?outcome=Blocked&size=200` | `meta.total` = 58; 58 rows returned, all `Blocked`; ledger total 301 at that moment |
| O-18 | 17:12:28 | `GET /api/v1/audit?outcome=Maybe` | HTTP 422 |
| O-19 | 17:12:28 | `GET /api/v1/audit/export.csv` as Viewer | HTTP 403 `AUTHZ-001` "Permission required: audit.export", with `traceId` |
| O-20 | 17:12:28 | `GET /api/v1/users` with no session | HTTP 401 |
| O-21 | 17:15–17:21 | `node capture.mjs` / `node capture04.mjs` (screenshots, after a re-seed) | 10 PNGs written to `docs/draft/screenshots/`; register in `o-screenshot-register.json` |

Machine-readable output of O-12 … O-20: `o-live-check.json`.

## Observations made while running the commands

1. **CSV timestamp quoting.** In O-15 the `createdAt` cell is written as
   `"""2026-11-20T14:12:27.839Z"""`. `server/src/lib/csv.ts` passes the
   `Date` object returned by `pg` through `JSON.stringify`, which adds literal
   quote marks that are then CSV-escaped. A spreadsheet shows the timestamp with
   quote marks around it. Not fixed: the application is feature-frozen
   (DISCREPANCIES row 18).
2. **Source address form.** O-15 recorded `::1` because the client resolved
   `localhost` to the IPv6 loopback. The 12 November check recorded `127.0.0.1`.
   Both are the loopback address.
3. **"25 rows" is a page, not a count.** O-16 reproduces the 12 November figure
   of 25, but 25 is the default page size; O-17 gives the actual count for
   this database (58). The 12 November total was not recorded.
4. **Jest open-handle warning.** Every Jest run ends with "Jest did not exit one
   second after the test run has completed". The runs still exit 0.
5. **Account record layout.** At a 1440 × 900 viewport the User Control Centre
   stacks the account table and the record panel in one narrow column and clips
   the Role column (screenshot 04). Not fixed (DISCREPANCIES row 19).
