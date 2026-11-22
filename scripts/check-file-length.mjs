// Length guard: fails when any source file exceeds 1000 lines, and lists files
// over a reporting threshold (default 400) so growth is visible before it hits
// the gate. No dependencies.
//   node scripts/check-file-length.mjs
//   node scripts/check-file-length.mjs --report 400
// Source areas: src, server/src, server/tests, tests, server/migrations,
// scripts, server/scripts, ml (code files only).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const AREAS = ['src', 'server/src', 'server/tests', 'tests', 'server/migrations', 'scripts', 'server/scripts', 'ml']
const EXTENSIONS = new Set(['.ts', '.tsx', '.py', '.mjs', '.js', '.sql'])
const SKIP_DIRS = new Set(['node_modules', '.venv', '__pycache__', 'dist', 'models'])

const argv = process.argv.slice(2)
const reportIndex = argv.indexOf('--report')
const reportThreshold = reportIndex >= 0 ? Number(argv[reportIndex + 1]) : 400
const GATE = 1000

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIRS.has(entry)) out.push(...walk(full))
    } else if (EXTENSIONS.has(entry.slice(entry.lastIndexOf('.')))) {
      out.push(full)
    }
  }
  return out
}

const counted = AREAS
  .flatMap((area) => {
    try {
      return walk(area)
    } catch {
      return [] // area absent
    }
  })
  .map((file) => ({ file: relative('.', file).replace(/\\/g, '/'), lines: readFileSync(file, 'utf8').split('\n').length }))
  .sort((a, b) => b.lines - a.lines)

const overReport = counted.filter((f) => f.lines > reportThreshold)
const overGate = counted.filter((f) => f.lines > GATE)

if (reportIndex >= 0) {
  console.log(`files over ${reportThreshold} lines: ${overReport.length}`)
  for (const f of overReport) console.log(`${String(f.lines).padStart(5)}  ${f.file}`)
}

if (overGate.length) {
  console.error(`FAIL: files over ${GATE} lines:`)
  for (const f of overGate) console.error(`${String(f.lines).padStart(5)}  ${f.file}`)
  process.exit(1)
}
console.log(`length check OK (${counted.length} files, max ${counted[0]?.lines ?? 0} lines)`)
