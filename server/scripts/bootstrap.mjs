#!/usr/bin/env node
// One-time database bootstrap — run by the operator, never by CI.
//
//   cd server
//   PGPASSWORD='<your postgres superuser password>' npm run bootstrap
//
// What it does (as the postgres superuser, via the PGPASSWORD env var):
//   1. refuses to run if server/.env already exists (see below)
//   2. generates two random role passwords and a JWT secret in memory
//   3. creates the login roles kaziforce_owner (schema owner, migrations/seed)
//      and kaziforce_app (runtime, restricted grants — see migrations/006)
//   4. creates the `kaziforce` database owned by kaziforce_owner
//   5. writes server/.env with the generated credentials
//
// SAFETY
//   * The superuser password is read from the environment and never stored.
//   * Generated secrets are written ONLY to server/.env and are NEVER printed.
//   * server/.env is gitignored and must never be committed.
//   * An existing .env is not overwritten: this script rotates the role
//     passwords, so silently rewriting the file would lock the operator out
//     of a database whose credentials they had already recorded elsewhere.
//     To deliberately start over, delete server/.env first, or pass --force.
import { randomBytes } from 'node:crypto'
import { existsSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = join(root, '.env')
const force = process.argv.includes('--force')

// Checked BEFORE any database work: creating the roles rotates their passwords,
// so refusing after that point would leave .env and the database out of step.
if (existsSync(envPath) && !force) {
  console.error('server/.env already exists — refusing to overwrite it.')
  console.error('')
  console.error('That file holds the database passwords and JWT secret this script would replace.')
  console.error('Overwriting it would invalidate the credentials recorded anywhere else.')
  console.error('')
  console.error('Do one of the following:')
  console.error('  * to use the existing configuration, skip this step and run:')
  console.error('      npm run migrate && npm run seed')
  console.error('  * to regenerate everything from scratch, delete it first:')
  console.error('      rm .env && PGPASSWORD=\'...\' npm run bootstrap')
  console.error('  * to rotate the role passwords deliberately:')
  console.error('      PGPASSWORD=\'...\' npm run bootstrap -- --force')
  process.exit(1)
}

const superPassword = process.env.PGPASSWORD
if (!superPassword) {
  console.error('Set the postgres superuser password via the environment, e.g.:')
  console.error("  PGPASSWORD='<your password>' npm run bootstrap")
  process.exit(1)
}

const ownerPassword = randomBytes(24).toString('base64url')
const appPassword = randomBytes(24).toString('base64url')
const jwtSecret = randomBytes(48).toString('base64url')

const admin = new pg.Client({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'postgres',
  password: superPassword,
})
await admin.connect()

async function roleExists(name) {
  const { rows } = await admin.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [name])
  return rows.length > 0
}
async function dbExists(name) {
  const { rows } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [name])
  return rows.length > 0
}

if (!(await roleExists('kaziforce_owner'))) {
  await admin.query(`CREATE ROLE kaziforce_owner LOGIN PASSWORD '${ownerPassword}'`)
  console.log('created role kaziforce_owner')
} else {
  await admin.query(`ALTER ROLE kaziforce_owner LOGIN PASSWORD '${ownerPassword}'`)
  console.log('rotated password for existing role kaziforce_owner')
}
if (!(await roleExists('kaziforce_app'))) {
  await admin.query(`CREATE ROLE kaziforce_app LOGIN PASSWORD '${appPassword}' NOCREATEDB NOCREATEROLE`)
  console.log('created role kaziforce_app')
} else {
  await admin.query(`ALTER ROLE kaziforce_app LOGIN PASSWORD '${appPassword}' NOCREATEDB NOCREATEROLE`)
  console.log('rotated password for existing role kaziforce_app')
}

if (!(await dbExists('kaziforce'))) {
  await admin.query('CREATE DATABASE kaziforce OWNER kaziforce_owner')
  console.log('created database kaziforce (owner: kaziforce_owner)')
} else {
  await admin.query('ALTER DATABASE kaziforce OWNER TO kaziforce_owner')
  console.log('database kaziforce exists; owner set to kaziforce_owner')
}
await admin.end()

const pgHost = process.env.PGHOST || 'localhost'
const pgPort = process.env.PGPORT || 5432

// Written from generated values in memory. Nothing here is echoed to stdout.
const lines = {
  DATABASE_URL: `postgresql://kaziforce_app:${appPassword}@${pgHost}:${pgPort}/kaziforce`,
  OWNER_DATABASE_URL: `postgresql://kaziforce_owner:${ownerPassword}@${pgHost}:${pgPort}/kaziforce`,
  JWT_SECRET: jwtSecret,
  PORT: '3000',
  NODE_ENV: 'development',
  JWT_TTL_HOURS: '8',
  RATE_LIMIT_MAX: '600',
  RATE_LIMIT_WINDOW_MS: '300000',
  MODEL_SERVICE_URL: 'http://127.0.0.1:8000',
  MODEL_TIMEOUT_MS: '800',
}

const header = [
  '# Generated by server/scripts/bootstrap.mjs — never commit this file.',
  '# Holds the database passwords and the JWT signing secret.',
  '# For production seeding, add SEED_VIEWER_PASSWORD, SEED_MODERATOR_PASSWORD',
  '# and SEED_SUPERADMIN_PASSWORD (see deploy/.env.production.example).',
  '',
].join('\n')

writeFileSync(envPath, header + Object.entries(lines).map(([k, v]) => `${k}=${v}`).join('\n') + '\n', {
  mode: 0o600, // owner read/write only where the platform honours it
})
console.log('wrote server/.env (gitignored, not shown)')
console.log('next: npm run migrate && npm run seed')
