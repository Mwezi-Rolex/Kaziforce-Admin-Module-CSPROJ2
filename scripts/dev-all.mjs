#!/usr/bin/env node
// Starts the API, the frontend and the model service together.
//
//   npm run dev:all
//
// The model service port is defined ONCE below and used both for the uvicorn
// arguments and for MODEL_SERVICE_URL handed to the API. They therefore cannot
// drift out of step: if you change MODEL_PORT, the API is pointed at the new
// port in the same run. (Previously MODEL_SERVICE_URL was only ever set in
// server/.env, so a port change there — or a stale value — could silently
// point the API at nothing.)
//
// The frontend dev server proxies /api to the API (see vite.config.ts).
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const API_PORT = Number(process.env.API_PORT || 3000)
const MODEL_PORT = Number(process.env.MODEL_PORT || 8000)
const WEB_PORT = Number(process.env.PORT || 8443)
const MODEL_SERVICE_URL = `http://127.0.0.1:${MODEL_PORT}`

// Locate the model-service interpreter: Windows venv layout first, then POSIX.
const venvWindows = join(root, 'ml', '.venv', 'Scripts', 'python.exe')
const venvPosix = join(root, 'ml', '.venv', 'bin', 'python')
const pythonBin = existsSync(venvWindows) ? venvWindows : venvPosix
const hasVenv = existsSync(pythonBin)
const hasModels = existsSync(join(root, 'ml', 'models', 'models.joblib'))

const RESET = '\x1b[0m'
const services = [
  {
    name: 'api',
    colour: '\x1b[36m',
    cwd: join(root, 'server'),
    command: 'npm',
    args: ['run', 'dev'],
    // npm/npx are .cmd shims on Windows, so they need a shell.
    shell: true,
    // Explicit, and guaranteed to match the uvicorn port below.
    env: { MODEL_SERVICE_URL, MODEL_TIMEOUT_MS: '800', PORT: String(API_PORT) },
    note: `http://localhost:${API_PORT}`,
  },
  {
    name: 'web',
    colour: '\x1b[35m',
    cwd: root,
    command: 'npx',
    args: ['vite'],
    shell: true,
    env: { PORT: String(WEB_PORT) },
    note: `http://localhost:${WEB_PORT}`,
  },
]

if (hasVenv) {
  services.push({
    name: 'model',
    colour: '\x1b[33m',
    cwd: join(root, 'ml'),
    command: pythonBin,
    args: ['-m', 'uvicorn', 'service:app', '--host', '127.0.0.1', '--port', String(MODEL_PORT), '--log-level', 'warning'],
    // A real .exe, so no shell. This matters: with a shell, a path containing a
    // space (e.g. "GLM Projects") is passed to cmd.exe unquoted and fails with
    // "'C:\Users\...\GLM' is not recognized".
    shell: false,
    env: {},
    note: `${MODEL_SERVICE_URL} (loopback only)`,
  })
}

console.log('Starting Kaziforce development services:')
for (const s of services) console.log(`  ${s.name.padEnd(6)} ${s.note}`)
console.log(`  api -> model service URL: ${MODEL_SERVICE_URL}`)
if (!hasVenv) {
  console.log('\n  note: ml/.venv not found — the model service is not started.')
  console.log('        The console still works; suggestions show "Suggestion unavailable".')
  console.log('        Create it with: cd ml && python -m venv .venv && .venv/Scripts/python -m pip install -r requirements.txt')
} else if (!hasModels) {
  console.log('\n  note: ml/models/models.joblib not found — the service will start but report')
  console.log('        model_version "unavailable". Run: cd ml && .venv/Scripts/python train.py')
}
console.log('\nPress Ctrl+C to stop all services.\n')

const children = []
let shuttingDown = false

for (const s of services) {
  const child = spawn(s.command, s.args, {
    cwd: s.cwd,
    env: { ...process.env, ...s.env },
    shell: s.shell,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  children.push(child)

  const prefix = `${s.colour}[${s.name}]${RESET} `
  const forward = (stream, target) => {
    stream.on('data', (chunk) => {
      const text = chunk.toString()
      for (const line of text.split(/\r?\n/)) {
        if (line.trim()) target.write(prefix + line + '\n')
      }
    })
  }
  forward(child.stdout, process.stdout)
  forward(child.stderr, process.stderr)

  child.on('exit', (code) => {
    if (shuttingDown) return
    console.error(`${prefix}exited with code ${code}. Stopping the other services.`)
    shutdown(code ?? 1)
  })
}

function shutdown(code = 0) {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) {
    if (!child.killed) {
      try {
        child.kill('SIGTERM')
      } catch {
        /* already gone */
      }
    }
  }
  setTimeout(() => process.exit(code), 300)
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
