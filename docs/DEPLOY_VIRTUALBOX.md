# Deploying Kaziforce on a local Ubuntu VM (VirtualBox)

This is the **local-VM variant** of `docs/DEPLOY.md`. `DEPLOY.md` targets a real
Azure VPS with a public IP and a domain. This document assumes what you actually
have: **Oracle VirtualBox on Windows, Ubuntu Server, reached from PowerShell.**

Read the "Blocker" section first — one instruction you were given cannot be
satisfied on a VirtualBox VM, and it is better to know that before you start than
to discover it at step 10.

---

## 0. The blocker: Let's Encrypt cannot issue a certificate for this VM

Your instructions say: *"Give it a DNS name label so Let's Encrypt can issue a
certificate."* That step is an **Azure** instruction and it does not translate to
VirtualBox.

- On Azure, a VM can be given a DNS name label (`myvm.southafricanorth.cloudapp.azure.com`)
  and a public IP, so Let's Encrypt can reach it.
- A VirtualBox VM on the default NAT network has a **private address**
  (`10.0.2.15`) and no inbound route from the internet. Even on a bridged adapter
  it only gets a LAN address unless your router forwards ports to it.
- Let's Encrypt's HTTP-01 challenge fetches
  `http://your-domain/.well-known/acme-challenge/...` **from the public internet**.
  With no public address and no public DNS name, the challenge fails.

So: **certbot will fail on this VM, and that is not a mistake in your setup.**

Choose one of these, and record which you chose:

| Option | What you get | Ceiling |
|---|---|---|
| **A. Local HTTP** (recommended for the panel demo) | The whole system working over `http://localhost:8080`. No TLS. | No HTTPS evidence. Session cookie needs `NODE_ENV=development`. |
| **B. Self-signed certificate** | Real HTTPS with a browser warning; exercises the TLS config. | Browser warns on every visit. Not Let's Encrypt. |
| **C. Cloudflare tunnel** | A public `https://…trycloudflare.com` URL with a valid certificate. | Certificate is Cloudflare's, not Let's Encrypt's. Needs outbound internet from the VM. |
| **D. Real domain + DNS-01** | Genuine Let's Encrypt certificate. | Requires a domain you control and a DNS plugin; the VM still need not be publicly reachable. |

**Recommended: Option A** for the demo, because the marking priorities are the
machine-learning component, audit immutability and role enforcement — not TLS.
Add Option B afterwards if you want a screenshot of the lock icon.

If whoever issued the instructions needs HTTPS evidence specifically, tell them
plainly: *the VM has no public DNS name, so Let's Encrypt cannot validate it; a
tunnel or a real domain is required.* That is a factual constraint, not a
shortcut.

---

## 1. Create the VM

1. Download **Ubuntu Server 24.04 LTS** (the `live-server` ISO) from
   `https://ubuntu.com/download/server`. Do not use Desktop — you asked for the
   CLI, and Desktop wastes ~1 GB of RAM you need.
2. In VirtualBox: **New**
   - Name: `kaziforce`
   - Type: Linux, Version: Ubuntu (64-bit)
   - Memory: **4096 MB** (2048 will struggle: PostgreSQL + Node + the Python
     model service + the frontend build)
   - Processors: **2**
   - Disk: **25 GB**, dynamically allocated
3. **Network** — this is the key setting. Two choices:

   - **NAT (simplest).** The VM is private; you reach services through port
     forwarding (step 3). Everything stays on your machine. Use this for Option A.
   - **Bridged Adapter.** The VM gets a LAN address from your router. Use this if
     you want the VM reachable by other devices, and if you are attempting
     Option C or D.

   Either way, note the adapter name so you can change it later.
4. Start the VM and install Ubuntu Server with these answers:
   - Your own admin user (for example `kaz`) with a **strong password**. This is
     the account you SSH in as; `sudo` will be available.
   - **Install OpenSSH server: yes.** Tick it during setup.
   - No snaps needed beyond the defaults.
5. Reboot and log in at the VM console once, to confirm it boots.

---

## 2. Allow only ports 22, 80 and 443

Your instructions say "allow only ports 22, 80 and 443". On Azure that is a
network security group rule. Here it is two layers.

**Layer 1 — the guest firewall (this is the real control):**

```bash
sudo apt update && sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status verbose
```

Expected: three ALLOW rules and `Default: deny (incoming)`.

**Neither 3000 (API) nor 8000 (model service) is opened.** Both bind to loopback
and are reached only through Nginx or directly by the API. That is deliberate.

**Layer 2 — VirtualBox port forwarding (NAT only):**

VM **Settings → Network → Adapter 1 → Advanced → Port Forwarding**, add:

| Name | Protocol | Host IP | Host Port | Guest IP | Guest Port |
|---|---|---|---|---|---|
| ssh | TCP | 127.0.0.1 | 2222 | 10.0.2.15 | 22 |
| http | TCP | 127.0.0.1 | 8080 | 10.0.2.15 | 80 |
| https | TCP | 127.0.0.1 | 8443 | 10.0.2.15 | 443 |

Binding the host IP to `127.0.0.1` means only your machine can reach the VM —
correct for a local demo. Leave the https rule in place even if you chose Option
A; it costs nothing and is ready if you add a certificate later.

If you chose **Bridged**, skip the forwarding table and use the VM's own address
instead of `localhost` in every command below.

---

## 3. SSH in from PowerShell

```powershell
ssh -p 2222 kaz@localhost
```

Accept the host key on first connection. From here on, **every command in this
document runs inside the VM over this SSH session.**

If SSH refuses, the usual causes are: the OpenSSH server was not ticked during
install (`sudo apt install openssh-server` at the VM console fixes it), or the
forwarding rule's guest IP does not match `ip -4 addr show` inside the VM.

> Keep your SSH key and passwords to yourself. The agent never needs them, and
> nothing in this repository asks for them.

---

## 4. Base packages

Inside the VM:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx postgresql postgresql-contrib ufw ca-certificates rsync

# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version     # expect v20.x

sudo apt install -y python3 python3-venv python3-pip
python3 --version  # expect 3.12.x on Ubuntu 24.04
```

Python **3.12** matters: `ml/requirements.txt` pins `scikit-learn==1.7.2`, which
was built and tested against 3.12. If you ever change the interpreter version,
retrain rather than copying the artifacts.

---

## 5. Service user and directories

```bash
sudo useradd --system --create-home --home-dir /opt/kaziforce --shell /usr/sbin/nologin kaziforce
sudo mkdir -p /opt/kaziforce /var/www/kaziforce /etc/kaziforce
sudo chown -R kaziforce:kaziforce /opt/kaziforce
```

---

## 6. Copy the project from Windows

Build the frontend on Windows first, so the VM does not need to compile it:

```powershell
cd "C:\Users\smmwe\Documents\GLM Projects\Kaziforce"
npx pnpm install
npx pnpm run build
```

Then create an archive that excludes the things that must not travel
(`node_modules`, git history, the local database, the Python virtualenv) and copy
it:

```powershell
cd "C:\Users\smmwe\Documents\GLM Projects\Kaziforce"
tar --exclude=node_modules --exclude=.git --exclude=server/.pgdata* --exclude=ml/.venv --exclude=ml/__pycache__ -czf kaziforce.tar.gz .
scp -P 2222 kaziforce.tar.gz kaz@localhost:~/
```

On the VM, extract it:

```bash
sudo tar -xzf ~/kaziforce.tar.gz -C /opt/kaziforce
sudo chown -R kaziforce:kaziforce /opt/kaziforce
sudo rsync -a --delete /opt/kaziforce/dist/ /var/www/kaziforce/
sudo chown -R www-data:www-data /var/www/kaziforce
ls /opt/kaziforce            # expect deploy/ docs/ ml/ server/ src/ README.md
ls /var/www/kaziforce        # expect index.html assets/
```

`server/.env` is deliberately **not** in the archive — it is gitignored and never
leaves your development machine. You generate fresh secrets on the server in
step 8.

---

## 7. Model artifacts: retrain on the server (recommended)

The artifacts are `ml/models/models.joblib` (22.5 MB) and
`ml/models/anomaly_model.joblib` (3.2 MB). Either copy them or rebuild them.

**Retraining is safer**, because `ml/requirements.txt` pins the exact
scikit-learn version, so the artifacts are guaranteed to match the interpreter:

```bash
cd /opt/kaziforce/ml
sudo -u kaziforce python3 -m venv .venv
sudo -u kaziforce .venv/bin/pip install -r requirements.txt
sudo -u kaziforce .venv/bin/python generate_data.py
sudo -u kaziforce .venv/bin/python train.py
sudo -u kaziforce .venv/bin/python anomaly.py
sudo -u kaziforce .venv/bin/python evaluate.py
```

If you prefer to copy them instead:

```powershell
scp -P 2222 "C:\Users\smmwe\Documents\GLM Projects\Kaziforce\ml\models\models.joblib" `
           "C:\Users\smmwe\Documents\GLM Projects\Kaziforce\ml\models\anomaly_model.joblib" `
           kaz@localhost:~/
```

```bash
sudo mkdir -p /opt/kaziforce/ml/models
sudo mv ~/models.joblib ~/anomaly_model.joblib /opt/kaziforce/ml/models/
sudo chown -R kaziforce:kaziforce /opt/kaziforce/ml/models
```

### Correction to your instructions

They say *"the model service refuses to start if the scikit-learn version
differs."* **It does not refuse to start — and that is by design.** The service
catches the load failure and degrades, so the console keeps working:

```
/health  -> {"status":"degraded","model_version":"unavailable"}
/predict -> HTTP 503
console  -> "Suggestion unavailable"; every moderation action still works
```

So the mismatch check is `/health` reporting `degraded`, not a crash. Verify
immediately after either path:

```bash
curl -s http://127.0.0.1:8000/health
# want: {"status":"ok","model_version":"severity-action-rf-1.0.0"}
```

If it says `degraded`, the artifacts did not load — retrain rather than copying.

---

## 8. Build the backend, then generate secrets **on the server**

```bash
cd /opt/kaziforce/server
sudo -u kaziforce npm ci
sudo -u kaziforce npm run build          # tsc -> server/dist
```

Now the database roles and the environment file. `bootstrap` generates random
passwords for both roles and a JWT secret, and writes them to `server/.env` —
**nothing is copied from your laptop**, and nothing is printed.

**One trap to avoid:** `bootstrap` connects over TCP as the PostgreSQL superuser,
but on a fresh Ubuntu install the `postgres` role only authenticates by *peer*
(over the Unix socket), so `sudo -u postgres npm run bootstrap` fails on
authentication — and running it as `postgres` cannot write `server/.env` anyway,
because that directory belongs to `kaziforce`. Set a temporary password, bootstrap
as the right user, then remove it:

```bash
# 1. temporary password on the superuser role
sudo -u postgres psql -c "ALTER ROLE postgres PASSWORD 'temp-bootstrap-CHANGEME';"

# 2. bootstrap as kaziforce, so it can write server/.env
cd /opt/kaziforce/server
sudo -u kaziforce env PGPASSWORD='temp-bootstrap-CHANGEME' npm run bootstrap

# 3. remove the temporary password immediately
sudo -u postgres psql -c "ALTER ROLE postgres PASSWORD NULL;"
```

Confirm it worked and that the file is not world-readable:

```bash
sudo ls -l /opt/kaziforce/server/.env      # expect 0600 or 0640, owner kaziforce
```

**Never print `.env`.** If you need to check something, check a non-secret
property: `sudo grep -c . /opt/kaziforce/server/.env` (line count only).

---

## 9. Choose the runtime mode, then migrate and seed

This is where Option A and Option B diverge, because of one detail: the session
cookie is marked `Secure` **only when `NODE_ENV=production`**, and browsers will
not send a `Secure` cookie over plain HTTP. Get this wrong and login appears to
succeed but no session is ever established.

| You chose | Set in `/etc/kaziforce/api.env` | Consequence |
|---|---|---|
| **A. Local HTTP** | `NODE_ENV=development` | Cookie works over HTTP. Use strong `SEED_*` passwords anyway. |
| **B/C/D. Any HTTPS** | `NODE_ENV=production` | `Secure` cookie works. Production seed guards active. |

Install the environment template and edit it:

```bash
sudo install -o root -g kaziforce -m 0640 \
  /opt/kaziforce/deploy/.env.production.example /etc/kaziforce/api.env
sudo nano /etc/kaziforce/api.env
```

Fill in, from the `bootstrap` run in step 8:

- `DATABASE_URL` and `OWNER_DATABASE_URL` — **generate fresh on the server.** The
  bootstrap already wrote `server/.env`; copy those two values across, or simply
  stop using `/etc/kaziforce/api.env` and point the systemd unit at
  `server/.env` instead. Do not paste your laptop's values.
- `JWT_SECRET` — `openssl rand -base64 48`, fresh on the server.
- `TRUST_PROXY=1` (Nginx is in front).
- `NODE_ENV` per the table above.
- `SEED_VIEWER_PASSWORD`, `SEED_MODERATOR_PASSWORD`, `SEED_SUPERADMIN_PASSWORD`
  — **strong values**, for example `openssl rand -base64 24` each. In development
  mode these are used when set; in production mode they are **required** and the
  demo passwords are rejected outright.

Then run the schema and the seed. Run them as **separate** commands so a failure
in the first is visible rather than hidden behind the second.

```bash
# 1. migrations (schema-owner role)
sudo -u kaziforce bash -c '
  set -a; . /opt/kaziforce/server/.env; set +a
  cd /opt/kaziforce/server && npm run migrate
'
```

Expected: eight migrations listed, ending `migrations complete`.

```bash
# 2. seed — supply the three strong passwords explicitly
sudo -u kaziforce bash -c '
  set -a; . /opt/kaziforce/server/.env; set +a
  export SEED_VIEWER_PASSWORD="<paste a strong value you have written down>"
  export SEED_MODERATOR_PASSWORD="<paste a strong value you have written down>"
  export SEED_SUPERADMIN_PASSWORD="<paste a strong value you have written down>"
  cd /opt/kaziforce/server && npm run seed
'
```

**Write the three passwords down before you run this**, or generate them to a
file you keep. If you generate them inline with `$(openssl rand -base64 24)`
inside the `sudo` subshell you will never see them again:
in production mode the seed prints nothing, and in development mode it only
prints the *demo* credentials it did not use.

Generate them first, then paste:

```bash
for r in VIEWER MODERATOR SUPERADMIN; do echo "SEED_${r}_PASSWORD=$(openssl rand -base64 24)"; done
```

`NODE_ENV=production` also enforces three rules on these values: all three must be
present, none may be a demo password, and each must be at least 12 characters.
The seed refuses and exits rather than degrading a production system to demo
credentials.

Finally re-assert the audit-ledger restriction and record the output:

```bash
sudo -u postgres psql -d kaziforce -v ON_ERROR_STOP=1 \
  -f /opt/kaziforce/deploy/sql/02_grants.sql
# want: can_select=t, can_insert=t, can_update=f, can_delete=f, can_truncate=f
```

---

## 10. systemd services

```bash
sudo cp /opt/kaziforce/deploy/systemd/kaziforce-api.service /etc/systemd/system/
sudo cp /opt/kaziforce/deploy/systemd/kaziforce-model.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now kaziforce-model kaziforce-api

systemctl status kaziforce-api --no-pager
systemctl status kaziforce-model --no-pager
journalctl -u kaziforce-api -n 40 --no-pager
```

The API unit reads `/etc/kaziforce/api.env`. If you decided in step 9 to use
`server/.env` instead, change one line:

```bash
sudo sed -i 's#^EnvironmentFile=.*#EnvironmentFile=/opt/kaziforce/server/.env#' \
  /etc/systemd/system/kaziforce-api.service
sudo systemctl daemon-reload && sudo systemctl restart kaziforce-api
```

Verify both on the box:

```bash
curl -s http://127.0.0.1:3000/api/v1/health   # {"status":"ok","database":"reachable"}
curl -s http://127.0.0.1:8000/health          # {"status":"ok","model_version":"..."}
```

If the API unit fails, `journalctl -u kaziforce-api -n 50 --no-pager` is the first
place to look; the usual causes are an unreadable env file or a wrong path.

---

## 11. Nginx

**Option A (HTTP only)** — use the shipped config unchanged:

```bash
sudo cp /opt/kaziforce/deploy/nginx/kaziforce.conf /etc/nginx/sites-available/kaziforce
sudo ln -sf /etc/nginx/sites-available/kaziforce /etc/nginx/sites-enabled/kaziforce
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
curl -I http://localhost/          # expect 200 and the security headers
```

**Option B (self-signed)** — add a certificate after the above:

```bash
sudo mkdir -p /etc/ssl/kaziforce
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/kaziforce/kaziforce.key \
  -out /etc/ssl/kaziforce/kaziforce.crt \
  -subj "/CN=kaziforce.local"
```

Then adapt `deploy/nginx/kaziforce-https.conf.example`, replacing the Let's
Encrypt paths with `/etc/ssl/kaziforce/kaziforce.crt` and `.key`, replacing the
domain with `kaziforce.local`, removing the port-80 redirect block (or keeping it
and reaching the site on 8443), and leaving out HSTS until you are sure. Run
`nginx -t` before every reload.

Do **not** run certbot on this VM (see section 0).

---

## 12. Run the smoke test and save the output

The script reads `APP_DATABASE_URL` from `/etc/kaziforce/api.env` automatically
when it is readable, and it needs `psql` and `curl` on the box.

```bash
cd /opt/kaziforce
sudo BASE_URL=http://localhost /opt/kaziforce/deploy/smoke-test.sh | tee /tmp/smoke.txt
```

Use `http://localhost` (**not** `http://localhost:3000`): pointing it at the Nginx
origin lets check 5 — that the model service is not publicly exposed — actually
run instead of skipping.

Expected shape:

```
1. Login works                       PASS x3
2. Viewer refused (403) on export    PASS x3   (403 names audit.export; Moderator 200 as control)
3. Moderator action succeeds+audited PASS x2
4. audit_log immutable               PASS x4   (UPDATE, DELETE, TRUNCATE refused; SELECT works)
5. Model service not exposed         PASS
Summary: 13 passed, 0 failed, 0 skipped
```

Pointing `BASE_URL` at the Nginx origin (rather than at port 3000) is what makes
check 5 run. It POSTs to `/predict` and fails if the response looks like either a
model answer or a FastAPI error, which is how a genuine leak is distinguished from
the SPA fallback returning `index.html` with a 200.

If `BASE_URL` cannot be exported through `sudo`, run it as root with the variable
first:

```bash
sudo -i
BASE_URL=http://localhost /opt/kaziforce/deploy/smoke-test.sh | tee /tmp/smoke.txt
exit
```

Save it into the repository as `docs/DEPLOY_RESULTS.md`:

```bash
sudo tee /opt/kaziforce/docs/DEPLOY_RESULTS.md > /dev/null <<'EOF'
# DEPLOY_RESULTS.md — local Ubuntu VM (VirtualBox)

- Date: <fill in>
- Host: Oracle VirtualBox, Ubuntu Server 24.04 LTS, 2 vCPU / 4 GB / 25 GB
- Network: NAT with port forwarding (2222->22, 8080->80, 8443->443)
- HTTPS: <Option A local HTTP / Option B self-signed / other>
- NODE_ENV: <development / production>

## Smoke test output

```
EOF
cat /tmp/smoke.txt | sudo tee -a /opt/kaziforce/docs/DEPLOY_RESULTS.md > /dev/null
sudo chown kaziforce:kaziforce /opt/kaziforce/docs/DEPLOY_RESULTS.md
```

Then edit it to fill in the date and the two bracketed choices:

```bash
sudo -u kaziforce nano /opt/kaziforce/docs/DEPLOY_RESULTS.md
```

Copy it back to Windows so it lands in the repository you and the agent share:

```powershell
scp -P 2222 kaz@localhost:/opt/kaziforce/docs/DEPLOY_RESULTS.md `
    "C:\Users\smmwe\Documents\GLM Projects\Kaziforce\docs\DEPLOY_RESULTS.md"
```

Also worth capturing alongside it, because the panel will ask:

```bash
{
  echo "## Versions"; node --version; python3 --version; psql --version; nginx -v 2>&1
  echo; echo "## Audit-ledger privileges"
  sudo -u postgres psql -d kaziforce -c "SELECT has_table_privilege('kaziforce_app','audit_log','SELECT') AS sel, has_table_privilege('kaziforce_app','audit_log','UPDATE') AS upd, has_table_privilege('kaziforce_app','audit_log','TRUNCATE') AS trunc;"
  echo; echo "## Services"
  systemctl is-active kaziforce-api kaziforce-model nginx postgresql
  echo; echo "## Listening sockets (expect only 22, 80/443, and loopback 3000/8000)"
  sudo ss -ltnp
} | sudo tee -a /opt/kaziforce/docs/DEPLOY_RESULTS.md > /dev/null
```

---

## 13. Taking a snapshot before you start (rollback)

In VirtualBox, with the VM **powered off**: **Snapshots → Take Snapshot**, name it
`pre-deploy`. If the deployment goes wrong you can revert to a clean Ubuntu in
seconds instead of reinstalling.

Application-level rollback is in `docs/DEPLOY.md` section 12: stop the services,
`git checkout` the previous commit (if you set up git), rebuild, restore the
frontend directory. The database is the only real state — take a dump before any
migration:

```bash
sudo -u postgres pg_dump kaziforce > ~/kaziforce-$(date +%F).sql
```

---

## 14. Report back

Paste back `docs/DEPLOY_RESULTS.md`. It lets the deployment claim be replaced with
observed evidence, and it is the file the agent reads to update the report.

Until that file shows a passing smoke test, the deployment is **not verified** —
the runbook in `docs/DEPLOY.md` has never been executed end to end, and neither
has this one.

---

## Quick reference: what differs from the Azure instructions

| Their instruction | On VirtualBox |
|---|---|
| Create an Ubuntu VM | Same, but use the **Server** ISO and give it 4 GB / 2 vCPU |
| Allow only ports 22, 80, 443 | `ufw` for the guest firewall **plus** VirtualBox port forwarding; nothing else is exposed because 3000/8000 bind to loopback |
| DNS name label for Let's Encrypt | **Not possible on NAT.** Choose Option A/B/C/D in section 0 |
| SSH from PowerShell | `ssh -p 2222 kaz@localhost` with a forwarding rule |
| Never give the agent keys or passwords | Same — nothing here requires them |
| Generate new secrets on the server | `npm run bootstrap` on the VM; never copy `.env` |
| Strong `SEED_*` passwords | Required in `NODE_ENV=production`; supply them in development too |
| Copy `.joblib` or retrain | Both work; retraining is safer because `requirements.txt` pins scikit-learn 1.7.2 |
| Service refuses to start on version mismatch | **It degrades instead**: `/health` reports `degraded`, `/predict` returns 503, the console shows "Suggestion unavailable" |
| Save smoke-test output as `docs/DEPLOY_RESULTS.md` | Section 12, including the `scp` back to Windows |
