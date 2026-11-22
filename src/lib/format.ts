// Date rendering — one place so every list renders timestamps identically.
// The locale/timezone dependence is the browser's; the call sites pass the ISO
// string from the API envelope and get the same output the previous inline
// `new Date(x).toLocaleString()` calls produced.

/** e.g. "22/11/2026, 09:41:12" (browser locale). */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString()
}

/** e.g. "09:41:12" (browser locale) — used for the login-lock countdown. */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString()
}
