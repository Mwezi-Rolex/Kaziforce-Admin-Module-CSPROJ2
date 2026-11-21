# DEPLOY.md — deploying Kaziforce to an Ubuntu Azure VPS with Nginx

Audience: the operator (you). This runbook targets a **fresh Ubuntu 22.04 or 24.04
LTS VPS**. Every command is meant to be run in order, mostly with `sudo`.

> **Scripted path (Azure VM, Ubuntu 24.04).** `deploy/azure-vm-install.sh` runs
> steps 1–9 below in one pass, generating every secret on the VM. Steps 10
> (HTTPS) and 11 (smoke test) stay manual. See the script header for usage.
> Corrections made while preparing it, which also apply to the manual steps:
> install Node 22 (not 20); install with `pnpm install --frozen-lockfile`
> (`npm ci` fails: there is no `package-lock.json`); and the production seed
> does **not** print passwords: it requires `SEED_*_PASSWORD` in the
> environment (D-050).

> **Verification status — read before you start.**
> I cannot provision a VPS, so I could not run this end to end. What *was* verified
> on a local machine is listed at the end under **Verification status**. Anything
> not run there is marked **[UNVERIFIED]** inline. Do not treat this as a working
> deployment until **you** run the smoke test and paste back its output.

## Conventions

| Placeholder | Meaning |
|---|---|
| `/opt/kaziforce` | application directory on the VPS |
| `kaziforce.example.com` | your domain, if you have one |
| `<VPS_PUBLIC_IP>` | the VPS IP, if you do not |
| `kaziforce` | the Linux service user (no login shell) |

---

## 1. Base system

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx postgresql postgresql-contrib ufw ca-certificates

# Node.js 22 LTS (Vite 8 and the pinned toolchain need 22; see D-065, D-069)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version    # expect v22.x
sudo npm install -g pnpm@10.34.3   # server/ ships pnpm-lock.yaml, not package-lock.json

# Python 3 for the model service
sudo apt install -y python3 python3-venv python3-pip
python3 --version # expect 3.10+ (22.04) or 3.12 (24.04)
```

**[UNVERIFIED]** — package availability and versions depend on the image.

## 2. Service user and directories

```bash
sudo useradd --system --create-home --home-dir /opt/kaziforce --shell /usr/sbin/nologin kaziforce
sudo mkdir -p /opt/kaziforce /var/www/kaziforce /etc/kaziforce
sudo chown -R kaziforce:kaziforce /opt/kaziforce
```

## 3. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status
```

Ports 3000 (API) and 8000 (model service) are **never** opened. Both bind to
loopback only.

## 4. PostgreSQL

Ubuntu installs PostgreSQL listening on `127.0.0.1:5432` by default; leave it there.

```bash
sudo systemctl enable --now postgresql

# Create the database and both roles. First edit the two CHANGE_ME passwords in
# the file you copy over.
scp deploy/sql/01_roles_database.sql you@<vps>:~/
sudo -u postgres psql -v ON_ERROR_STOP=1 -f ~/01_roles_database.sql
```

Expected output ends with the two verification blocks; check that `kaziforce_app`
shows `rolcreatedb = f` and `rolcreaterole = f`.

Generate strong passwords for the two roles. **Use `-hex`, not `-base64`**: base64
can emit `+`, `/` and `=`, which must be percent-encoded inside a PostgreSQL
connection URL and will silently break `DATABASE_URL` if they are not. Hex output is
alphanumeric and safe everywhere.

```bash
openssl rand -hex 24   # paste into 01_roles_database.sql for kaziforce_owner
openssl rand -hex 24   # paste into 01_roles_database.sql for kaziforce_app
```

Keep these for `/etc/kaziforce/api.env` in step 7. **[UNVERIFIED on the VPS]** the
script logic itself was verified locally (see Verification status).

## 5. Copy the application

From your workstation, in the repo root:

```bash
# Build the frontend first, locally
pnpm install
pnpm run build                 # produces dist/

# Copy the code and the built frontend
rsync -av --exclude node_modules --exclude .git --exclude server/.pgdata \
  ./ you@<vps>:/opt/kaziforce/
sudo rsync -av dist/ you@<vps>:/var/www/kaziforce/     # on the VPS, or scp then move
sudo chown -R kaziforce:kaziforce /opt/kaziforce /var/www/kaziforce
```

## 6. Build and install the backend + model service

On the VPS:

```bash
cd /opt/kaziforce/server
sudo -u kaziforce -H pnpm install --frozen-lockfile
sudo -u kaziforce -H pnpm run build      # tsc -> server/dist

cd /opt/kaziforce/ml
sudo -u kaziforce python3 -m venv .venv
sudo -u kaziforce .venv/bin/pip install -r requirements.txt
# Train the models on the VPS so the artifacts exist there (deterministic seed):
sudo -u kaziforce .venv/bin/python generate_data.py
sudo -u kaziforce .venv/bin/python train.py
sudo -u kaziforce .venv/bin/python anomaly.py
sudo -u kaziforce .venv/bin/python evaluate.py
```

If `/opt/kaziforce/ml/models/models.joblib` is missing, the service still starts
and `/health` reports `model_version: "unavailable"`; the console then shows
"Suggestion unavailable". That is the intended fail-safe, not a crash.

## 7. Environment file

```bash
sudo install -o root -g kaziforce -m 0640 \
  /opt/kaziforce/deploy/.env.production.example /etc/kaziforce/api.env
sudo nano /etc/kaziforce/api.env
```

Fill in `DATABASE_URL` and `OWNER_DATABASE_URL` with the passwords from step 4, and
generate `JWT_SECRET`:

```bash
openssl rand -base64 48
```

Then run migrations and the seed **once**, as the owner role. The CLI tools read
their configuration from the process environment (`server/.env` does not exist on
the VPS), so source the env file into the shell with `set -a`:

```bash
sudo -u kaziforce bash -c '
  set -a; . /etc/kaziforce/api.env; set +a
  cd /opt/kaziforce/server
  npm run migrate
  npm run seed
'
```

`set -a` exports every variable the file defines and `.` reads the file as shell
syntax, so `:`, `@`, `+` and `/` inside the connection URLs survive intact.

Do **not** use the common `env $(cat .env | xargs)` idiom. It word-splits on
whitespace: any value containing a space makes the command fail outright
(verified locally — `env: 'world': No such file or directory`, exit 127), so the
migration silently never runs. The `set -a` form above is equivalent and safe.

**With `NODE_ENV=production` the seed refuses to run** unless
`SEED_VIEWER_PASSWORD`, `SEED_MODERATOR_PASSWORD` and `SEED_SUPERADMIN_PASSWORD`
are set (at least 12 characters, not the demo values), and it never prints them.
Put them in `/etc/kaziforce/api.env` before seeding and keep a copy for the panel.

Then re-assert the audit-log restrictions (BRIEF requires the explicit script):

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -f /opt/kaziforce/deploy/sql/02_grants.sql \
  --dbname="$(grep '^OWNER_DATABASE_URL=' /etc/kaziforce/api.env | cut -d= -f2-)"
```

Expected: `can_select = t, can_insert = t, can_update = f, can_delete = f, can_truncate = f`.

## 8. systemd services

```bash
sudo cp /opt/kaziforce/deploy/systemd/kaziforce-api.service /etc/systemd/system/
sudo cp /opt/kaziforce/deploy/systemd/kaziforce-model.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now kaziforce-model kaziforce-api

systemctl status kaziforce-api --no-pager
systemctl status kaziforce-model --no-pager
journalctl -u kaziforce-api -n 40 --no-pager
```

Smoke-check the services on the box before touching Nginx:

```bash
curl -s http://127.0.0.1:3000/api/v1/health
curl -s http://127.0.0.1:8000/health
```

**[UNVERIFIED]** — these unit files were not started (no systemd locally). If a
unit fails, `journalctl -u kaziforce-api -n 50 --no-pager` is the first place to look;
the most common cause is a wrong path or an unreadable `.env`.

## 9. Nginx

```bash
sudo cp /opt/kaziforce/deploy/nginx/kaziforce.conf /etc/nginx/sites-available/kaziforce
sudo ln -sf /etc/nginx/sites-available/kaziforce /etc/nginx/sites-enabled/kaziforce
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

**[UNVERIFIED]** — `nginx -t` was not run (no Nginx locally). Do not reload until
`nginx -t` says `syntax is ok`. Without a domain, the config already uses
`server_name _;`, so the site answers on the VPS IP.

## 10. HTTPS with certbot — only if you have a domain

Prerequisite: a DNS **A record** for your domain pointing at `<VPS_PUBLIC_IP>`,
already propagated (check with `dig +short kaziforce.example.com`).

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kaziforce.example.com -d www.kaziforce.example.com
sudo systemctl status certbot.timer --no-pager   # auto-renewal
sudo certbot renew --dry-run
```

certbot rewrites the Nginx site to add the 443 block, the redirect, and the cert
paths. `deploy/nginx/kaziforce-https.conf.example` is the reference for the
intended end state if you prefer to edit manually.

### If you have no domain

Do **not** run certbot. Two options:

1. **IP over HTTP** (simplest): leave `kaziforce.conf` as-is and use
   `http://<VPS_PUBLIC_IP>`. The app works; traffic is unencrypted. Fine for a
   panel demo on a private network, not for real operator credentials.
2. **Self-signed cert** (encrypted but with a browser warning): **[UNVERIFIED]**
   ```bash
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout /etc/ssl/private/kaziforce.key -out /etc/ssl/certs/kaziforce.crt \
     -subj "/CN=<VPS_PUBLIC_IP>"
   ```
   then add `listen 443 ssl;` with those paths to the site config. Every visitor
   sees a certificate warning; that is expected and cannot be avoided without a
   real domain.

Note: the session cookie is `SameSite=Lax` and marked `Secure` in production. A
`Secure` cookie is **not** sent over plain HTTP, so on the no-domain HTTP path no
session is established. If you take option 1, either set `NODE_ENV=development`
in `/etc/kaziforce/api.env` (which drops the `Secure` flag) or use option 2. This
is the one place where the no-domain path needs a deliberate choice.

## 11. Run the smoke test

From any host that can reach the VPS:

```bash
BASE_URL=https://kaziforce.example.com \
APP_DATABASE_URL='postgresql://kaziforce_app:<password>@127.0.0.1:5432/kaziforce' \
deploy/smoke-test.sh
```

On the VPS itself, `APP_DATABASE_URL` is read automatically from
`/etc/kaziforce/api.env`, so:

```bash
BASE_URL=https://kaziforce.example.com /opt/kaziforce/deploy/smoke-test.sh
```

It checks login, the Viewer 403 on the CSV export (plus a Moderator control),
a successful audited moderator action, and that UPDATE / DELETE / TRUNCATE on
`audit_log` are refused for the application role. Exit code 0 means all executed
checks passed.

**Paste the output back.** Until then, this deployment is not confirmed working.

## 12. Rollback

The database and the static files are the only persistent state.

```bash
# Stop the app
sudo systemctl stop kaziforce-api kaziforce-model

# Roll the code back to a known-good commit
cd /opt/kaziforce
sudo -u kaziforce git fetch --all
sudo -u kaziforce git checkout <previous-good-tag-or-commit>
sudo -u kaziforce bash -c 'cd server && npm ci && npm run build'

# Frontend: restore the previous build
sudo rsync -av --delete /opt/kaziforce/dist/ /var/www/kaziforce/

# Start again
sudo systemctl start kaziforce-api kaziforce-model
curl -s http://127.0.0.1:3000/api/v1/health
```

Database rollback: migrations are forward-only and tracked in `schema_migrations`.
There is no down-migration. To restore, take a backup **before** any migration:

```bash
sudo -u postgres pg_dump kaziforce > kaziforce-$(date +%F).sql
# restore:
sudo -u postgres psql -d kaziforce < kaziforce-YYYY-MM-DD.sql
```

`audit_log` is append-only for the application role, so an accidental data
corruption cannot come from the API; the realistic rollback is a bad **code**
deploy, which `git checkout` + rebuild handles.

---

## Verification status

**Verified locally on a Windows dev machine (real commands, real output):**

| Item | Result |
|---|---|
| `deploy/smoke-test.sh` against a running API + real PostgreSQL, with `psql` on PATH | **12 passed, 0 failed, 1 skipped** against the API directly (the skip is the Nginx-only model-exposure check); **13 passed, 0 failed, 0 skipped** against an Nginx-style origin that proxies `/api` and serves the SPA fallback. Check 5 was also verified to FAIL against a deliberately leaky proxy, so it is not vacuous. |
| `deploy/sql/02_grants.sql` against a real database | Ran clean; `can_select=t, can_insert=t, can_update=f, can_delete=f, can_truncate=f` |
| `deploy/sql/01_roles_database.sql` against scratch role/database names | Ran clean; second run reported no errors (idempotent); app role `rolcreatedb=f, rolcreaterole=f` |
| `bash -n deploy/smoke-test.sh` | syntax ok |
| Frontend `tsc --noEmit`, `vite build`, Vitest | pass (see `docs/PROGRESS.md`) |
| Server `tsc --noEmit`, Jest | pass, 54 tests |

**NOT verified — must be confirmed by you on the VPS:** [UNVERIFIED]

- `nginx -t` on the actual config (no Nginx on the dev machine).
- Starting the systemd units (no systemd on the dev machine); `nssm`/`winsw` were
  not used, so the units are untested.
- certbot issuance and renewal.
- The `Secure`-cookie behaviour on the HTTP-without-domain path (step 10).
- Any Azure-specific networking: NSG rules must allow inbound 80 and 443 in
  addition to `ufw`. **[UNVERIFIED]**
- Absolute paths (`/opt/kaziforce`, `/etc/kaziforce`, `/var/www/kaziforce`) — the
  smoke test ran against a local API, not from these locations.

Nothing in this document should be described as a working deployment until the
smoke test output is pasted back.
