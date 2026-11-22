// CSV serialisation for the audit export (RFC 4180).
//
// A pure helper, deliberately separate from the route module: the route imports
// the database pool, which validates the environment at import time. Keeping the
// formatter here lets it be unit-tested without a database.

/** Quote a field when it contains a comma, quote, CR or LF; double any quote. */
export function csvCell(value: unknown): string {
  const s =
    value === null || value === undefined
      ? ''
      : value instanceof Date
        ? // ISO-8601, not JSON: a JSON.stringify'd Date carries literal quote
          // marks that then get CSV-escaped (SEMANTIC_MODEL.md BUG-13, fixed).
          value.toISOString()
        : typeof value === 'object'
          ? JSON.stringify(value)
          : String(value)
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Render rows as CSV with a header line and CRLF row terminators. */
export function toCsv(rows: Array<Record<string, unknown>>, columns: string[]): string {
  const header = columns.join(',')
  const lines = rows.map((row) => columns.map((c) => csvCell(row[c])).join(','))
  return [header, ...lines].join('\r\n') + '\r\n'
}
