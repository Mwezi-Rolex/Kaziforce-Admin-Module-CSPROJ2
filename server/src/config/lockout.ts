// Lockout policy constants (OQ-12, SEC-AUTH-008).
//
// Kept in this dependency-free module so tests and the demo reset script can
// import the policy without importing the database pool. Importing
// `services/authService` pulls in `db/pool`, which validates the environment and
// throws when `DATABASE_URL` is absent — that would make a pure policy test fail
// on a fresh clone that has not run `npm run bootstrap` yet.

export const MAX_FAILED_ATTEMPTS = 5
export const LOCKOUT_MINUTES = 15

/** The lock duration in milliseconds, derived from LOCKOUT_MINUTES. */
export function lockoutIntervalMs(): number {
  return LOCKOUT_MINUTES * 60 * 1000
}
