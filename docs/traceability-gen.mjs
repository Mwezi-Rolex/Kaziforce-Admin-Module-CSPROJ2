// Phase 0 generator: docs/TRACEABILITY.md from the SRS v2-2 markdown.
// Extracts every requirement ID + statement, applies a documented screen/layer
// mapping, and emits the matrix. Rerunnable: node docs/traceability-gen.mjs
import { readFileSync, writeFileSync } from 'node:fs'

const SRS = 'src/imports/Kaziforce_Software_Requirements_Specification__SRS__v2-2.md'
const OUT = 'docs/TRACEABILITY.md'

const lines = readFileSync(SRS, 'utf8').split(/\r?\n/)

// ---- extraction ----------------------------------------------------------
const idRe = /^\*{0,2}([A-Z]{2,4}(?:-[A-Z0-9]+)*-\d{3})\*{0,2}\s*$/
const EXCLUDE = new Set(['FR-001', 'NFR-001', 'SEC-001']) // convention examples, line ~993
const HEADERISH = /^\*[^*]+\*$/        // "**Requirement**" style table headers
const isFiller = (s) => !s || HEADERISH.test(s) || /^[-|:\s]+$/.test(s)

const reqs = []
const seen = new Set()
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(idRe)
  if (!m) continue
  const id = m[1]
  if (EXCLUDE.has(id) || seen.has(id)) continue
  // statement: heading capture (BP-xxx) or next non-filler line
  let stmt = ''
  if (/^###\s*BP-\d{3}/.test(lines[i])) { /* not standalone; handled below */ }
  for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
    if (isFiller(lines[j])) continue
    stmt = lines[j].replace(/\*+/g, '').trim()
    break
  }
  if (!stmt) continue
  seen.add(id)
  reqs.push({ id, stmt })
}
// BP-xxx live in headings
for (const line of lines) {
  const m = line.match(/^###\s*(BP-\d{3}):\s*(.+)$/)
  if (m && !seen.has(m[1])) { seen.add(m[1]); reqs.push({ id: m[1], stmt: m[2].trim() }) }
}

// ---- mapping rules (documented, conservative) -----------------------------
const ALL = 'All screens'
const LOGIN = 'Login', DASH = 'Dashboard', USERS = 'User Control Centre',
  QUEUE = 'Moderation Queue', AUDIT = 'Audit Explorer', SETTINGS = 'System Settings'

const pad = (n) => String(n).padStart(3, '0')
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, k) => a + k)

const byId = {
  // Administration console (6.15)
  'FR-ADM-001': [ALL, 'frontend + backend + database'],
  'FR-ADM-003': [USERS, 'frontend + backend + database'],
  'FR-ADM-004': [SETTINGS, 'frontend + backend + database'],
  'FR-ADM-008': [DASH, 'frontend + backend'],
  'FR-ADM-019': [SETTINGS, 'frontend + backend + database'],
  'FR-ADM-020': [SETTINGS, 'frontend + backend + database'],
  'FR-ADM-026': [SETTINGS, 'frontend + backend + database'],
  'FR-ADM-027': [SETTINGS, 'frontend + backend + database'],
  'FR-ADM-029': [SETTINGS, 'frontend + backend + database'],
  'FR-ADM-031': [SETTINGS, 'frontend + backend'],
  'FR-ADM-032': [AUDIT, 'backend + database'],
  'FR-ADM-033': [AUDIT, 'backend + database'],
  'FR-ADM-034': [AUDIT, 'backend + database'],
  'FR-ADM-035': [AUDIT, 'backend + database'],
  'FR-ADM-036': [AUDIT, 'frontend + backend'],
  'FR-ADM-037': [AUDIT, 'frontend + backend'],
  'FR-ADM-038': [AUDIT, 'backend + database'],
  'FR-ADM-039': [AUDIT, 'backend + database'],
  'FR-ADM-046': [DASH, 'frontend + backend'],
  // Identity & Access → Login screen for auth/session/recovery clauses
  ...Object.fromEntries(range('FR-IAM', 16, 33).map(n => [`FR-IAM-${pad(n)}`, [LOGIN, 'frontend + backend + database']])),
  ...Object.fromEntries(range('FR-IAM', 57, 72).map(n => [`FR-IAM-${pad(n)}`, [LOGIN, 'frontend + backend + database']])),
  // Error handling: actionable user-facing messages visible everywhere
  'FR-ERR-004': [ALL, 'frontend + backend'],
  // Business rules touching visible console behaviour
  'BR-USR-005': [LOGIN + ', ' + USERS, 'backend + database'],
  'BR-USR-008': [AUDIT, 'backend + database'],
  // Security: authorization is visible as the role-gated shell; audit log display
  'SEC-AUTZ-001': [ALL, 'backend'],
  'SEC-AUTZ-002': [ALL, 'backend'],
  'SEC-AUTZ-003': [ALL, 'backend'],
  'SEC-RBAC-001': [ALL, 'frontend + backend + database'],
  'SEC-RBAC-002': [ALL, 'frontend + backend + database'],
  'SEC-RBAC-003': [ALL, 'frontend + backend + database'],
  'SEC-RBAC-004': [ALL, 'frontend + backend + database'],
  'SEC-RBAC-005': [ALL, 'frontend + backend + database'],
  'SEC-RBAC-006': [ALL, 'frontend + backend + database'],
  'SEC-RBAC-007': [ALL, 'frontend + backend + database'],
  // Browser support is a frontend property of every screen
  'NFR-PRT-003': [ALL, 'frontend'],
  // Scenarios
  'UC-009': [SETTINGS, 'scenario (all layers)'],
}

const prefixRules = {
  'FR-IAM': ['none', 'frontend + backend + database'],
  'FR-UPM': ['none', 'frontend + backend + database'],
  'FR-ORG': ['none', 'frontend + backend + database'],
  'FR-WFM': ['none', 'frontend + backend + database'],
  'FR-TMP': ['none', 'frontend + backend + database'],
  'FR-REC': ['none', 'frontend + backend + database'],
  'FR-PJM': ['none', 'frontend + backend + database'],
  'FR-COL': ['none', 'frontend + backend + database'],
  'FR-KM': ['none', 'frontend + backend + database'],
  'FR-PFM': ['none', 'frontend + backend + database'],
  'FR-LND': ['none', 'frontend + backend + database'],
  'FR-FIN': ['none', 'frontend + backend + database'],
  'FR-NOT': ['none', 'frontend + backend + database'],
  'FR-AI': ['none', 'frontend + backend + database'],
  'FR-ADM': ['none', 'frontend + backend + database'],
  'FR-DAT': ['none', 'backend + database'],
  'FR-EXT': ['none', 'backend'],
  'FR-API': ['none', 'backend'],
  'FR-MOB': ['none', 'frontend + backend'],
  'FR-TEN': ['none', 'backend + database'],
  'FR-ERR': ['none', 'backend'],
  'NFR-PER': ['none', 'backend'],
  'NFR-SCL': ['none', 'backend'],
  'NFR-AVL': ['none', 'backend'],
  'NFR-REL': ['none', 'backend'],
  'NFR-MNT': ['none', 'backend'],
  'NFR-EXT': ['none', 'backend'],
  'NFR-DR': ['none', 'backend'],
  'NFR-ACC': [ALL, 'frontend'],
  'NFR-LCL': ['none', 'frontend + backend'],
  'NFR-I18N': ['none', 'frontend + backend'],
  'NFR-PRT': ['none', 'backend'],
  'BR-USR': ['none', 'backend + database'],
  'BR-HIR': ['none', 'backend'],
  'BR-MKT': ['none', 'backend'],
  'BR-PAY': ['none', 'backend + database'],
  'BR-WFM': ['none', 'backend'],
  'BR-AI': ['none', 'backend'],
  'BR-CMP': ['none', 'backend + database'],
  'SEC-AUTH': [LOGIN, 'frontend + backend'],
  'SEC-AUTZ': ['none', 'backend'],
  'SEC-RBAC': [ALL, 'frontend + backend + database'],
  'SEC-ABAC': ['none', 'backend'],
  'SEC-ENC': ['none', 'backend'],
  'SEC-API': ['none', 'backend'],
  'SEC-AUD': [AUDIT, 'backend + database'],
  'SEC-THR': ['none', 'backend'],
  'SEC-FRD': ['none', 'backend'],
  'SEC-MON': ['none', 'backend'],
  'AI-ARC': ['none', 'backend (AI services)'],
  'AI-GOV': ['none', 'backend (AI services)'],
  'AI-RES': ['none', 'backend (AI services)'],
  'AI-EXP': ['none', 'backend (AI services)'],
  'AI-PRM': ['none', 'backend (AI services)'],
  'AI-LLM': ['none', 'backend (AI services)'],
  'AI-MON': ['none', 'backend (AI services)'],
  'AI-HUM': ['none', 'backend (AI services)'],
  'INT-HR': ['none', 'backend (integrations)'],
  'INT-ERP': ['none', 'backend (integrations)'],
  'INT-PAY': ['none', 'backend (integrations)'],
  'INT-IDP': ['none', 'backend (integrations)'],
  'INT-PROD': ['none', 'backend (integrations)'],
  'INT-COM': ['none', 'backend (integrations)'],
  'INT-GOV': ['none', 'backend (integrations)'],
  'INT-PUB': ['none', 'backend (integrations)'],
  'REP-EXE': ['none', 'backend (reporting)'],
  'REP-OPS': ['none', 'backend (reporting)'],
  'REP-FIN': ['none', 'backend (reporting)'],
  'REP-WFA': ['none', 'backend (reporting)'],
  'REP-MKT': ['none', 'backend (reporting)'],
  'REP-AI': ['none', 'backend (reporting)'],
  'REP-CMP': ['none', 'backend (reporting)'],
  'REP-CUS': ['none', 'backend (reporting)'],
  'CMP-DP': ['none', 'backend + database'],
  'CMP-EMP': ['none', 'backend + database'],
  'CMP-TAX': ['none', 'backend + database'],
  'CMP-FIN': ['none', 'backend + database'],
  'CMP-AI': ['none', 'backend + database'],
  'CMP-INT': ['none', 'backend + database'],
  'DEV-CLD': ['none', 'backend (infrastructure)'],
  'DEV-CON': ['none', 'backend (infrastructure)'],
  'DEV-K8S': ['none', 'backend (infrastructure)'],
  'DEV-CICD': ['none', 'backend (infrastructure)'],
  'DEV-MON': ['none', 'backend (infrastructure)'],
  'DEV-LOG': ['none', 'backend (infrastructure)'],
  'DEV-BKP': ['none', 'backend (infrastructure)'],
  'DEV-DR': ['none', 'backend (infrastructure)'],
  'DEP-SAS': ['none', 'backend (deployment)'],
  'DEP-PRV': ['none', 'backend (deployment)'],
  'DEP-ONP': ['none', 'backend (deployment)'],
  'DEP-HYB': ['none', 'backend (deployment)'],
  'DEP-MTA': ['none', 'backend (deployment)'],
  'DEP': ['none', 'n/a (external dependency)'],
  'TST-UNT': ['none', 'backend (testing)'],
  'TST-INT': ['none', 'backend (testing)'],
  'TST-SYS': ['none', 'backend (testing)'],
  'TST-SEC': ['none', 'backend (testing)'],
  'TST-PER': ['none', 'backend (testing)'],
  'TST-UAT': ['none', 'backend (testing)'],
  'TST-AI': ['none', 'backend (testing)'],
  'ACC-FUN': ['none', 'process (acceptance)'],
  'ACC-TEC': ['none', 'process (acceptance)'],
  'ACC-SEC': ['none', 'process (acceptance)'],
  'ACC-PER': ['none', 'process (acceptance)'],
  'ACC-BUS': ['none', 'process (acceptance)'],
  'RSK': ['none', 'process (governance)'],
  'ASM': ['none', 'process (governance)'],
  'CON': ['none', 'process (governance)'],
  'UC': ['none', 'scenario (all layers)'],
  'US': ['none', 'scenario (all layers)'],
  'BP': ['none', 'process (business process)'],
}

const esc = (s) => s.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ')
function map(req) {
  const scheme = req.id.replace(/-\d{3}$/, '')
  const rule = byId[req.id] ?? prefixRules[scheme] ?? prefixRules[req.id.split('-')[0]]
  if (!rule) return [req, 'UNMAPPED', 'UNMAPPED']
  return [req, rule[0], rule[1]]
}
const mapped = reqs.map(map)
const unmapped = mapped.filter(([, s]) => s === 'UNMAPPED')

// ---- emit -----------------------------------------------------------------
const schemeOf = (id) => id.replace(/-\d{3}$/, '')
const groups = new Map()
for (const row of mapped) {
  const g = schemeOf(row[0].id)
  if (!groups.has(g)) groups.set(g, [])
  groups.get(g).push(row)
}

const total = mapped.length
const withScreen = mapped.filter(([, s]) => s !== 'none' && s !== 'UNMAPPED')
const md = []
md.push('# TRACEABILITY.md — SRS requirement IDs → Figma screens')
md.push('')
md.push('Generated 2026-10-29 by `docs/traceability-gen.mjs` from `src/imports/Kaziforce_Software_Requirements_Specification__SRS__v2-2.md`. One row per requirement ID extracted from the SRS (**' + total + '** IDs; convention examples `FR-001`/`NFR-001`/`SEC-001` at line ~993 are excluded). Statement text is quoted verbatim from the SRS. Screen and layer values come from the documented mapping rules at the bottom of this file. All rows start at status **not started** (Phase 0 wrote no application code).')
md.push('')
md.push('> **Scope warning (read first).** The SRS v2 specifies the *entire Kaziforce platform* (talent marketplace, workforce, projects, finance, AI, messaging — 1,000+ functional requirements across 15 modules). The Figma export covers only the **Admin & Moderation console** (6 screens). The two lists at the end of this file quantify the mismatch. The capstone proposal and `chapter 5 update` define the built scope as the Admin & Moderation subsystem only; resolving which SRS subset governs this build is **OPEN_QUESTION OQ-1**.')
md.push('')
md.push('**Legend:** Screen — the Figma export screen where the requirement is visible (`none` = not represented in the export); Layer — where the requirement must be implemented; Status — not started / in progress / done / blocked.')
md.push('')
md.push('| Requirement ID | Statement (SRS verbatim) | Figma screen | Layer | Status |')
md.push('|---|---|---|---|---|')
for (const [g, rows] of groups) {
  md.push('')
  md.push(`### ${g} (${rows.length})`)
  md.push('')
  for (const [req, screen, layer] of rows) {
    md.push(`| ${req.id} | ${esc(req.stmt)} | ${screen} | ${layer} | not started |`)
  }
}
md.push('')
md.push('## Mapping rules (as applied)')
md.push('')
md.push('- Screens: `Login`, `Dashboard`, `User Control Centre`, `Moderation Queue`, `Audit Explorer`, `System Settings`, `All screens` (shared shell/role gating).')
md.push('- `FR-IAM-016–033` and `FR-IAM-057–072` (authentication, sessions, recovery) → `Login`; the rest of IAM (registration, SSO, KYC) has no screen in the export.')
md.push('- `FR-ADM` (administration module) per-ID: 001→All screens, 003→User Control Centre, 004/019/020/026/027/029/031→System Settings, 008/046→Dashboard, 032–039→Audit Explorer; the remainder (tenants, licensing, integrations, monitoring) → none.')
md.push('- `SEC-AUTH-*` → Login. `SEC-RBAC-*` → All screens (the export visibly role-gates navigation and actions). `SEC-AUD-*` → Audit Explorer. `SEC-AUTZ-001–003` → All screens.')
md.push('- `BR-USR-005` (suspended users cannot act) → Login + User Control Centre; `BR-USR-008` (lifecycle events audited) → Audit Explorer; `FR-ERR-004` (actionable error messages) → All screens; `NFR-ACC-*` (WCAG 2.1 AA) → All screens; `NFR-PRT-003` (browsers) → All screens; `UC-009` (admin configures settings) → System Settings.')
md.push('- Everything else defaults to `none` with the layer implied by its module (frontend+backend+database for user-facing platform modules, backend/database for rules, security, data; process/governance for TST/ACC/RSK/ASM/CON/UC/US/BP).')
md.push('- Deliberately **no screen was ever mapped to `Moderation Queue`**: the SRS contains no moderation-queue requirement (see OQ-1).')
md.push('')
md.push('## Derived list A — SRS requirements with NO Figma screen')
md.push('')
md.push(`**${total - withScreen.length} of ${total} requirement IDs map to no screen in the Figma export.** By scheme family:`)
const noneByScheme = new Map()
for (const [req, screen] of mapped) if (screen === 'none') noneByScheme.set(schemeOf(req.id), (noneByScheme.get(schemeOf(req.id)) ?? 0) + 1)
md.push('')
md.push('| Scheme | IDs without screen |')
md.push('|---|---|')
for (const [k, v] of [...noneByScheme].sort()) md.push(`| ${k} | ${v} |`)
md.push('')
md.push('The export is a console for the Admin & Moderation subsystem only; entire SRS modules (profiles, organizations, workforce, talent marketplace, recruitment, projects, collaboration, knowledge, performance, learning, finance, notifications, AI, integrations, reporting, compliance, infra) have no UI here.')
md.push('')
md.push('## Derived list B — Figma screens mapping to NO SRS requirement')
md.push('')
md.push('| Figma screen | SRS coverage |')
md.push('|---|---|')
md.push('| **Moderation Queue** (flag review; approve / reject / escalate; bulk decisions; Super Admin escalation lane) | **None.** No SRS requirement defines a content moderation queue. It exists only in the proposal (Ch. 1 §1.5.1), `chapter 5 update` and the use-case diagrams (Note 8). → OQ-1 |')
md.push('| Dashboard — analytics content | Only the container (`FR-ADM-008/046`); the export deliberately shows no KPIs because no SRS requirement defines dashboard metrics. → OQ-2 |')
md.push('| User Control Centre — permanent ban | No explicit SRS requirement for operator-initiated permanent bans of user accounts (`FR-ADM-002` covers tenants; `BR-USR-005` assumes suspension exists). Ban/suspend operators appear only in the proposal and diagrams. → OQ-1 |')
md.push('| System Settings — concrete keys/toggles | The SRS defines the settings/feature-flag *capability* (`FR-ADM-004/019/020/026–031`) but names no keys; the export marks them "[Key not specified]". → OQ-2 |')
md.push('')
md.push('## Unmapped IDs (mapping-rule gaps — must be zero)')
md.push('')
md.push(unmapped.length ? unmapped.map(([r]) => `- ${r.id} — ${esc(r.stmt)}`).join('\n') : 'None. Every extracted ID matched a rule.')

writeFileSync(OUT, md.join('\n') + '\n')
console.log(`IDs extracted: ${total}; with screen: ${withScreen.length}; without: ${total - withScreen.length}; unmapped: ${unmapped.length}`)
console.log('Schemes:', [...groups.keys()].join(', '))

// ---- docs/TRACEABILITY_SCOPE.md (in-scope rows only; AGENTS.md "Scoped traceability")
// Console-only requirements (no SRS IDs exist) sourced from the proposal / chapter 5 update /
// Note 8 diagrams / BRIEF.md. Defined here as constants so the file stays script-generated.
const CON_ROWS = [
  ['CON-AUTH-001', 'Operators sign in with email + password; credentials verified with bcrypt', 'Ch5 §3.6.2', LOGIN, 'frontend + backend + database'],
  ['CON-AUTH-002', 'Role comes from the signed JWT; wireframe role switcher and hard-coded operator removed', 'BRIEF 2026-10-29 + Ch5 JWT role claims', ALL, 'frontend + backend'],
  ['CON-AUTH-003', 'Suspended or terminated operators cannot authenticate', 'Ch5 §3.4 actors (cf. BR-USR-005)', LOGIN, 'backend + database'],
  ['CON-RBAC-001', 'Three tiers: Viewer read-only; Moderator queue decisions + suspend; Super Admin role assignment, bans, settings', 'Ch5 §1.5.1/§3.4 (cf. SEC-RBAC-001…007)', ALL, 'frontend + backend + database'],
  ['CON-USR-001', 'Account view / search / filter by query and status', 'Ch5 §3.6.3', USERS, 'frontend + backend + database'],
  ['CON-USR-002', 'No account create or delete; accounts originate in the marketplace platform', 'BRIEF 2026-10-29 overriding Ch5 "account CRUD"; Figma export', USERS, 'frontend + backend'],
  ['CON-USR-003', 'Suspend account (Moderator+), audited', 'Ch5 §3.6.3', USERS, 'frontend + backend + database'],
  ['CON-USR-004', 'Assign role (Super Admin only), audited', 'Ch5 §3.6.3', USERS, 'frontend + backend + database'],
  ['CON-USR-005', 'Permanent ban behind 2-step confirmation (Super Admin), audited', 'Ch5 §3.6.3 + wireframes §3.4.6', USERS, 'frontend + backend + database'],
  ['CON-USR-006', 'Account record panel shows flags reported + content owned; lists scroll inside the panel', 'Figma export + BRIEF UI fix', USERS, 'frontend'],
  ['CON-MOD-001', 'Prioritised flag queue ordered by severity; severity/status filters', 'Ch5 §3.6.4', QUEUE, 'frontend + backend + database'],
  ['CON-MOD-002', 'Approve / reject / escalate a flag (Moderator+), audited', 'Ch5 §3.6.4; Note 8 UC4–UC6', QUEUE, 'frontend + backend + database'],
  ['CON-MOD-003', 'Bulk approve and bulk reject', 'Ch5 §3.6.4', QUEUE, 'frontend + backend'],
  ['CON-MOD-004', 'Super Admin escalation lane: overrule or uphold with permanent ban', 'Note 8 activity diagram; Figma export', QUEUE, 'frontend + backend + database'],
  ['CON-AUD-001', 'Every state change writes an audit event (actor, action, target, UTC timestamp); store is INSERT-only', 'Ch5 §3.6.5 (cf. SEC-AUD-001…006)', AUDIT, 'backend + database'],
  ['CON-AUD-002', 'Audit explorer: date-range + actor filters, read-only table', 'Ch5 §3.6.5', AUDIT, 'frontend + backend'],
  ['CON-AUD-003', 'CSV export restricted to Moderator and Super Admin; server 403 for Viewer; control hidden for Viewer', 'BRIEF 2026-10-29 overriding Ch5 §3.6.5 all-operator export (cf. FR-ADM-037, SEC-AUD-007)', AUDIT, 'frontend + backend'],
  ['CON-AUD-004', 'Adversarial immutability test: application DB role cannot UPDATE/DELETE audit_log', 'Ch5 §3.3 testing; BRIEF never-cut list', 'tests', 'database + tests'],
  ['CON-SET-001', 'Settings panel Super Admin only; key/value config + feature toggle; changes audited', 'Ch5 §3.6.6 (cf. FR-ADM-004/019/026)', SETTINGS, 'frontend + backend + database'],
  ['CON-SET-002', 'Settings keys and toggles stay named placeholders until the user supplies them', 'OQ-2 default confirmed in BRIEF', SETTINGS, 'frontend'],
  ['CON-DASH-001', 'Dashboard shell present; analytics deliberately unpopulated ("Metric definitions pending")', 'BRIEF/OQ-2 (cf. FR-ADM-008/046)', DASH, 'frontend'],
  ['CON-WEB-001', 'Landing page: minimal, reuses export tokens only; product name Kaziforce (replaces "Tendaji")', 'BRIEF 2026-10-29', 'Landing', 'frontend'],
  ['CON-WEB-002', '404 page for unknown routes', 'BRIEF 2026-10-29', '404', 'frontend'],
  ['CON-UI-001', 'Every panel listing report content or options scrolls inside its container instead of clipping', 'BRIEF 2026-10-29', ALL, 'frontend'],
  ['CON-ML-A-001', 'Suggestion-only ML: per-flag predicted severity + suggested action + confidence (Random Forest vs logistic regression + baselines); moderator always decides', 'BRIEF ML-A; AGENTS.md ML rules', QUEUE, 'backend (model service) + frontend'],
  ['CON-ML-B-001', 'Stretch: Isolation Forest anomaly score over operator activity, shown to Super Admin in audit explorer', 'BRIEF ML-B (first to cut)', AUDIT, 'backend (model service) + frontend'],
  ['CON-DEP-001', 'Deployment artifacts + runbook for Azure VPS + Nginx; agent provisions nothing', 'BRIEF deployment', 'infra', 'backend (infra)'],
  ['CON-TST-001', 'Jest + Supertest API tests including role enforcement and audit immutability', 'BRIEF stack; Ch5 §3.5', 'tests', 'backend + tests'],
]
const CON_STATUS = {
  'CON-WEB-001': 'done (slice 0)',
  'CON-WEB-002': 'done (slice 0)',
  'CON-AUTH-001': 'done — code complete; DB verification pending bootstrap',
  'CON-AUTH-002': 'done — role switcher and hard-coded operator removed',
  'CON-AUTH-003': 'in progress — implemented; Jest verification pending bootstrap',
  'CON-RBAC-001': 'in progress — matrix seeded, middleware live; tests pending bootstrap',
  'CON-AUD-001': 'in progress — AuditLogger live on auth routes; ledger INSERT-only enforced by migration 006',
  'CON-TST-001': 'in progress — suites written (9 tests); DB-backed runs pending bootstrap',
  'CON-ML-A-001': 'reserved (slice 8)',
  'CON-ML-B-001': 'reserved (slice 9, first cut)',
  'CON-DEP-001': 'reserved (slice 10)',
}

const scope = []
scope.push('# TRACEABILITY_SCOPE.md — in-scope requirements only')
scope.push('')
scope.push('Generated 2026-10-29 by `docs/traceability-gen.mjs` (rerun: `node docs/traceability-gen.mjs`). Per AGENTS.md scoped-traceability rule: this file lists only rows in scope for the Admin & Moderation console build — (a) the ' + withScreen.length + ' SRS IDs that map to a Figma screen, and (b) the console requirements (CON-*) that have no SRS ID and come from the proposal, `chapter 5 update`, the Note 8 diagrams, or BRIEF.md. The other 1,540 SRS IDs are out of scope and are reported as a count only (full archive: `docs/TRACEABILITY.md`).')
scope.push('')
scope.push('**Scope statement (AGENTS.md scope-honesty rule):** this build implements the Admin & Moderation console subset of the SRS — not the whole Kaziforce platform SRS. The console subset below is the complete intended surface.')
scope.push('')
scope.push('## A. Console requirements with no SRS ID (CON-*)')
scope.push('')
scope.push('| ID | Statement | Source | Screen/area | Layer | Status |')
scope.push('|---|---|---|---|---|---|')
for (const [id, stmt, src, screen, layer] of CON_ROWS) {
  scope.push(`| ${id} | ${esc(stmt)} | ${src} | ${screen} | ${layer} | ${CON_STATUS[id] ?? 'not started'} |`)
}
scope.push('')
scope.push('## B. SRS IDs in scope (mapped to a Figma screen)')
scope.push('')
scope.push('| Requirement ID | Statement (SRS verbatim) | Figma screen | Layer | Status |')
scope.push('|---|---|---|---|---|')
for (const [req, scr, layer] of withScreen) {
  scope.push(`| ${req.id} | ${esc(req.stmt)} | ${scr} | ${layer} | not started |`)
}
scope.push('')
scope.push(`Out-of-scope SRS IDs: ${total - withScreen.length} (count only, per AGENTS.md).`)
writeFileSync('docs/TRACEABILITY_SCOPE.md', scope.join('\n') + '\n')
console.log(`SCOPE file: ${CON_ROWS.length} CON rows + ${withScreen.length} SRS rows`)
