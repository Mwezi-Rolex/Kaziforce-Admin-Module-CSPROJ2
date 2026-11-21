# Azure VM deployment: operator transcript, 21 November 2026

**Evidence track: D** (deployed instance). The operator ran each command on the
Azure VM over SSH and pasted the raw output into the agent session; it is
reproduced below unchanged, apart from the operator's email address in the
certbot command, which is redacted. No password or secret appears in the
output, because `deploy/azure-vm-install.sh` and `deploy/smoke-test.sh` never
print them.

## Host

| Item | Value |
|---|---|
| Provider | Microsoft Azure, Azure for Students subscription |
| Region | Spain Central (the subscription's region policy refused East US and East Asia with `RequestDisallowedByAzure`) |
| VM | `kaziforce-vm`, Ubuntu 24.04.5 LTS (noble), 2 vCPU, 3.8 GiB RAM, 29 GB disk |
| Hostname | `kaziforce-demo.spaincentral.cloudapp.azure.com` (Azure DNS label) |
| Inbound | NSG: 22 (operator IP only), 80 and 443 (any); ufw: OpenSSH, Nginx Full |
| Installed by | `deploy/azure-vm-install.sh` at commit `f7c13fc`, from `git archive HEAD` plus a locally built `dist/` |

```
azureuser@kaziforce-vm:~$ lsb_release -a; nproc; free -h; df -h /
Distributor ID: Ubuntu
Description:    Ubuntu 24.04.5 LTS
Release:        24.04
Codename:       noble
2
               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       540Mi       2.7Gi       4.0Mi       785Mi       3.2Gi
Swap:             0B          0B          0B
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        29G  2.1G   26G   8% /general-task-execution
```

(The mount point reads `/general-task-execution` in the pasted text, which
looks like a copy-and-paste artefact; on a standard image `/dev/root` is
mounted at `/`. Kept as pasted.)

## Install script, final checks (`tail -n 40 ~/install.log`, excerpt)

```
==> 10/11 systemd services
Created symlink /etc/systemd/system/multi-user.target.wants/kaziforce-model.service → /etc/systemd/system/kaziforce-model.service.
Created symlink /etc/systemd/system/multi-user.target.wants/kaziforce-api.service → /etc/systemd/system/kaziforce-api.service.
==> 11/11 Nginx site for kaziforce-demo.spaincentral.cloudapp.azure.com
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
==> Checks
  OK   API on loopback                  {"success":true,"data":{"status":"ok","database":"reachable"},"timestamp":"2026-11-21T19:31:44.518Z"}
  OK   model service loopback           {"status":"ok","model_version":"severity-action-rf-1.0.0"}
  OK   API through Nginx                {"success":true,"data":{"status":"ok","database":"reachable"},"timestamp":"2026-11-21T19:31:44.550Z"}
  OK   SPA index served
Install finished (exit 0).
```

## Audit-ledger privileges (`grep -n -B2 -A4 'can_update' ~/install.log`)

```
909---- audit_log privileges for kaziforce_app ---
910: can_select | can_insert | can_update | can_delete | can_truncate
911-------------+------------+------------+------------+--------------
912- t          | t          | f          | f          | f
913-(1 row)
```

The same section reported `audit_rows = 0` after seeding, which is expected:
the seed writes no audit events and no operator had signed in.

## HTTPS

```
$ sudo certbot --nginx -d kaziforce-demo.spaincentral.cloudapp.azure.com --redirect --agree-tos -m <author email>
Account registered.
Requesting a certificate for kaziforce-demo.spaincentral.cloudapp.azure.com
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/kaziforce-demo.spaincentral.cloudapp.azure.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/kaziforce-demo.spaincentral.cloudapp.azure.com/privkey.pem
This certificate expires on 2027-02-19.
Certbot has set up a scheduled task to automatically renew this certificate in the background.
Deploying certificate
Successfully deployed certificate for kaziforce-demo.spaincentral.cloudapp.azure.com to /etc/nginx/sites-enabled/kaziforce
Congratulations! You have successfully enabled HTTPS on https://kaziforce-demo.spaincentral.cloudapp.azure.com

$ curl -sS https://kaziforce-demo.spaincentral.cloudapp.azure.com/api/v1/health
{"success":true,"data":{"status":"ok","database":"reachable"},"timestamp":"2026-11-21T19:35:57.213Z"}
```

## Smoke test against the HTTPS origin

```
$ sudo bash -c 'set -a; . /root/kaziforce-operator-passwords.txt; set +a; BASE_URL=https://kaziforce-demo.spaincentral.cloudapp.azure.com /opt/kaziforce/deploy/smoke-test.sh'
Kaziforce smoke test — target: https://kaziforce-demo.spaincentral.cloudapp.azure.com

1. Login works
  PASS Viewer login returned 200 with a success envelope
  PASS Session cookie kz_session was issued and stored
  PASS Moderator login returned 200

2. Viewer is refused (403) on the audit log download  [CON-AUD-003]
  PASS Viewer CSV export returned 403 (server-enforced, not just hidden in the UI)
  PASS 403 names the required permission (audit.export)
  PASS Moderator CSV export returned 200 (control: endpoint is not broken)

3. A Moderator action succeeds and is audited  [CON-MOD-002]
  PASS Moderator escalated flag 1517776e-83… with 200
  PASS Audit log contains a Content Escalated event for that flag

4. audit_log is immutable for the application role  [CON-AUD-004]
  PASS UPDATE on audit_log refused as kaziforce_app (permission denied)
  PASS DELETE on audit_log refused as kaziforce_app (permission denied)
  PASS TRUNCATE on audit_log refused as kaziforce_app (permission denied)
  PASS SELECT on audit_log still works for kaziforce_app (control)

5. Model service is not exposed publicly  [deployment requirement]
  PASS Model service not exposed at https://kaziforce-demo.spaincentral.cloudapp.azure.com/predict (HTTP 405, no model response)

Summary: 13 passed, 0 failed, 0 skipped
Smoke test PASSED
```

The HTTP 405 on `/predict` comes from Nginx refusing a POST to a static
location; the body carried no model response, which is what check 5 asserts.
Check 3 escalated one sample flag, so the deployed queue has one fewer pending
item than a fresh seed.

## Not covered by this transcript

- No browser sign-in on the deployed site had been reported at the time of
  writing (U).
- Performance, load and uptime of the VM: not measured (U).
- Certificate renewal: `certbot renew --dry-run` was not run (U).
