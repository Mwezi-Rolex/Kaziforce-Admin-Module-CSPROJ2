#!/usr/bin/env node
/**
 * Regenerates docs/TRACEABILITY.md from the SRS markdown conversion.
 *
 * Usage: node docs/tools/build-traceability.mjs [srsPath] [outputPath]
 *
 * The SRS markdown has every table cell flattened onto its own line, so a
 * requirement row is: an ID line, the requirement statement, then the priority.
 * Rows whose priority cell is not a known priority are skipped, which removes
 * the false matches produced by cross-reference matrices further down the file.
 *
 * The Figma-screen and layer columns come from the mapping table below, which
 * encodes the Phase 0 decision that only the five Chapter 5 modules are built.
 * The Evidence column is filled in slice by slice; it stays empty until then.
 */
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..', '..')
const srsPath = process.argv[2] ?? path.join(repoRoot, 'src', 'imports', 'Kaziforce_Software_Requirements_Specification__SRS__v2-2.md')
const outPath = process.argv[3] ?? path.join(repoRoot, 'docs', 'TRACEABILITY.md')

const PRIORITIES = new Set(['Critical', 'High', 'Medium', 'Low'])
const ID_RE = /^[A-Z]{2,4}(-[A-Z]{2,6})?-\d{3}$/

/** Requirement ID -> [Figma screen, layer]. Everything not listed maps to "none". */
const SCREEN_MAP = {
  // Authentication and session
  'FR-IAM-016': ['login', 'frontend+backend'],
  'FR-IAM-021': ['login', 'backend'],
  'FR-IAM-022': ['login', 'backend'],
  'FR-IAM-023': ['login', 'backend'],
  'FR-IAM-024': ['login', 'backend'],
  'FR-IAM-025': ['login', 'backend+database'],
  'FR-IAM-031': ['login', 'frontend+backend'],
  'FR-IAM-036': ['login', 'backend'],
  'FR-IAM-058': ['login', 'backend+database'],
  'FR-IAM-063': ['login', 'backend+database'],
  'FR-IAM-065': ['login', 'backend+database'],
  'SEC-AUTH-001': ['login', 'frontend+backend'],
  'SEC-AUTH-008': ['login', 'backend'],
  // User management
  'FR-ADM-001': ['dashboard', 'frontend+backend+database'],
  'FR-ADM-003': ['users', 'frontend+backend+database'],
  'FR-IAM-013': ['users', 'backend+database'],
  'SEC-RBAC-001': ['users', 'frontend+backend+database'],
  'SEC-RBAC-002': ['users', 'frontend+backend+database'],
  'SEC-RBAC-007': ['users', 'backend+database'],
  'SEC-AUTZ-007': ['users', 'backend+database'],
  'BR-USR-004': ['users', 'frontend+backend'],
  'BR-USR-005': ['users', 'backend+database'],
  'BR-USR-008': ['users', 'backend+database'],
  // Content moderation
  'FR-UPM-079': ['queue', 'frontend+backend+database'],
  'FR-PFM-036': ['queue', 'frontend+backend+database'],
  // Audit logging
  'FR-ADM-032': ['audit', 'backend+database'],
  'FR-ADM-033': ['audit', 'backend+database'],
  'FR-ADM-034': ['audit', 'backend+database'],
  'FR-ADM-035': ['audit', 'backend+database'],
  'FR-ADM-036': ['audit', 'frontend+backend'],
  'FR-ADM-037': ['audit', 'frontend+backend+database'],
  'FR-ADM-038': ['audit', 'backend+database'],
  'FR-ADM-039': ['audit', 'backend+database'],
  'SEC-AUD-006': ['audit', 'backend+database'],
  'SEC-AUD-007': ['audit', 'frontend+backend+database'],
  'BR-CMP-004': ['audit', 'backend+database'],
  // System settings
  'FR-ADM-004': ['settings', 'frontend+backend+database'],
  'FR-ADM-005': ['settings', 'frontend+backend+database'],
  'FR-ADM-019': ['settings', 'frontend+backend+database'],
  'FR-ADM-023': ['settings', 'frontend+backend'],
  'FR-ADM-024': ['settings', 'backend+database'],
  'FR-ADM-026': ['settings', 'frontend+backend+database'],
  'FR-ADM-027': ['settings', 'frontend+backend+database'],
  'FR-ADM-030': ['settings', 'frontend+backend+database'],
  'NFR-EXT-006': ['settings', 'frontend+backend+database'],
  'UC-009': ['settings', 'frontend+backend'],
  'US-009': ['settings', 'frontend+backend'],
  // Cross-cutting
  'FR-API-003': ['shell', 'frontend+backend'],
  'FR-API-004': ['shell', 'frontend+backend'],
  'FR-ERR-003': ['shell', 'backend'],
  'FR-ERR-013': ['shell', 'frontend+backend'],
  'FR-EXT-001': ['shell', 'frontend'],
  'NFR-PER-001': ['shell', 'frontend+backend'],
  'NFR-PER-002': ['shell', 'frontend+backend'],
  'NFR-AVL-008': ['login', 'backend'],
  'NFR-ACC-001': ['shell', 'frontend'],
  'SEC-ENC-001': ['login', 'backend']
}

const LAYER_BY_PREFIX = [
  [/^ASM-|^CON-|^RSK-/, 'none'],
  [/^TST-|^ACC-/, 'none'],
  [/^FR-DAT-|^NFR-DR-|^SEC-ENC-/, 'backend+database'],
  [/^FR-EXT-|^NFR-ACC-|^NFR-PER-/, 'frontend+backend'],
  [/^FR-API-|^FR-ERR-|^SEC-API-|^INT-/, 'backend'],
  [/^FR-IAM-|^SEC-AUTH-|^SEC-AUTZ-|^SEC-RBAC-/, 'frontend+backend+database'],
  [/^FR-ADM-/, 'frontend+backend+database'],
  [/^BR-/, 'backend+database'],
  [/^NFR-/, 'backend'],
  [/^SEC-/, 'backend+database'],
  [/^UC-|^US-/, 'frontend+backend'],
  [/^CMP-/, 'backend+database'],
  [/^AI-|^FR-AI-/, 'backend'],
  [/^FR-(COL|UPM|FIN|NOT|ORG|PFM|PJM|REC|TMP|WFM|KM|LND|MOB|TEN)-/, 'frontend+backend+database']
]

function layerFor(id) {
  for (const [pattern, layer] of LAYER_BY_PREFIX) {
    if (pattern.test(id)) return layer
  }
  return 'backend'
}

function parseRequirements(text) {
  const lines = text.split(/\r\n|\n|\r/)
  const rows = new Map()
  let heading = ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^#{1,4}\s/.test(line)) heading = line
    if (!ID_RE.test(line)) continue
    let cursor = i + 1
    const next = () => {
      while (cursor < lines.length && lines[cursor].trim() === '') cursor++
      return (lines[cursor++] ?? '').trim()
    }
    const isCatalog = line.startsWith('UC-') || line.startsWith('US-')
    let statement = next()
    const priority = next()
    if (isCatalog && (!statement || statement.length < 12 || ID_RE.test(statement))) {
      statement = priority
    }
    if (!statement || statement.length < 12) continue
    if (/^\d+(\.\d+)?$/.test(statement) || ID_RE.test(statement) || /^\*\*.*\*\*$/.test(statement)) continue
    const existing = rows.get(line)
    // First occurrence wins: requirement tables and the UC/US catalogs come
    // before the cross-reference matrices, which reuse IDs with short or
    // unrelated text. A later row may not overwrite a real entry.
    if (existing) continue
    if (statement.startsWith('#')) continue
    if (/^(FR|NFR|SEC|BR|INT|UC|US|ACC|CMP)-/.test(statement)) continue
    if (statement.includes('-*')) continue
    rows.set(line, { id: line, statement: statement.replace(/\s+/g, ' ').trim(), heading })
  }
  return rows
}

const text = fs.readFileSync(srsPath, 'utf8')
const rows = [...parseRequirements(text).values()].sort((a, b) => a.id.localeCompare(b.id))
const escape = (value) => value.replace(/\|/g, '\\|')

const out = []
out.push('# Traceability')
out.push('')
out.push('Source: `src/imports/Kaziforce_Software_Requirements_Specification__SRS__v2-2.md`. One row per distinct requirement ID found in the SRS.')
out.push('')
out.push('Regenerate with `node docs/tools/build-traceability.mjs`. Edit the mapping table in that script rather than this file.')
out.push('')
out.push('| Requirement ID | Requirement statement | Figma screen | Layer | Status | Evidence |')
out.push('|---|---|---|---|---|---|')
out.push(`| *Total rows: ${rows.length}* | | | | | |`)
for (const row of rows) {
  const mapped = SCREEN_MAP[row.id]
  const screen = mapped ? mapped[0] : 'none'
  const layer = mapped ? mapped[1] : layerFor(row.id)
  out.push(`| ${row.id} | ${escape(row.statement)} | ${screen} | ${layer} | not started | — |`)
}
fs.writeFileSync(outPath, out.join('\n') + '\n')
console.log(`wrote ${rows.length} requirement rows to ${path.relative(repoRoot, outPath)}`)
