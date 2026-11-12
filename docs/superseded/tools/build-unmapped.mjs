#!/usr/bin/env node
/**
 * Regenerates docs/PHASE0_UNMAPPED.md from docs/TRACEABILITY.md.
 *
 * Usage: node docs/tools/build-unmapped.mjs [traceabilityPath] [outputPath]
 *
 * Lists the requirement IDs that have no Figma screen, grouped by ID family,
 * and the Figma components that are not backed by an SRS requirement ID.
 */
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..', '..')
const tracePath = process.argv[2] ?? path.join(repoRoot, 'docs', 'TRACEABILITY.md')
const outPath = process.argv[3] ?? path.join(repoRoot, 'docs', 'PHASE0_UNMAPPED.md')

const rows = fs
  .readFileSync(tracePath, 'utf8')
  .split(/\r?\n/)
  .filter((line) => /^\| [A-Z]{2,4}(-[A-Z]{2,6})?-\d{3} \|/.test(line))
  .map((line) => {
    const cells = line.split('|').map((cell) => cell.trim())
    return { id: cells[1], statement: cells[2], screen: cells[3], layer: cells[4], status: cells[5], evidence: cells[6] }
  })

const unmapped = rows.filter((row) => row.screen === 'none')
const families = new Map()
for (const row of unmapped) {
  const family = row.id.split('-').slice(0, -1).join('-')
  if (!families.has(family)) families.set(family, [])
  families.get(family).push(row.id)
}

const out = []
out.push('# Requirements and screens with no mapping')
out.push('')
out.push('Generated from `docs/TRACEABILITY.md` by `node docs/tools/build-unmapped.mjs`.')
out.push('')
out.push('## Requirements with no Figma screen')
out.push('')
out.push(`Total: ${unmapped.length} of ${rows.length} requirement IDs.`)
out.push('')
out.push('Most are platform-wide requirements for marketplace modules that are outside this build\'s scope (see `docs/PLAN.md` §8).')
out.push('')
for (const [family, ids] of [...families.entries()].sort()) {
  out.push(`- ${family} (${ids.length}): ${ids.join(', ')}`)
}
out.push('')
out.push('## Figma screens and components with no SRS requirement')
out.push('')
out.push('No whole Figma screen is unmapped. These components are backed by Chapter 5 Update or Note 8 rather than by an SRS statement:')
out.push('')
out.push('- `dashboard` KPI panel: intentionally unpopulated; no KPI requirement exists in the SRS or Chapter 5.')
out.push('- `queue` escalation-review lane with overrule and uphold-and-ban actions: from the Note 8 activity diagram and the Chapter 5 §3.6.4 workflow; the SRS has no moderation-queue requirement.')
out.push('- `queue` bulk approve, reject and escalate controls: required by Chapter 5 §3.6.4; not specified in the SRS.')
out.push('- `ConfirmDialog` two-step destructive confirmation: a UX choice supporting the audit and change-control intent, not an SRS ID.')
out.push('- `settings` key/value and feature-toggle rows: the interfaces are required by FR-ADM-019 and FR-ADM-026, but no key or toggle names are specified in the SRS or Chapter 5.')
out.push('- `login` session-refresh and role-claim wording on the sign-in card: the JWT mechanics come from FR-IAM-021 and FR-IAM-022, but the copy is a Figma decision.')
out.push('')
fs.writeFileSync(outPath, out.join('\n') + '\n')
console.log(`wrote ${unmapped.length} unmapped IDs across ${families.size} families to ${path.relative(repoRoot, outPath)}`)
