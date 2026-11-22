import { csvCell, toCsv } from '../src/lib/csv'

// Regression test for the CSV Date quoting defect (SEMANTIC_MODEL.md BUG-13;
// recorded as DISCREPANCIES row 18): csvCell stringified Date objects with
// JSON.stringify, so an audit export's createdAt cell carried literal quote
// marks ("""2026-11-20T…Z""") and a spreadsheet showed "2026-11-20T…Z".
// The fixed contract: a Date renders as its ISO-8601 string with no quotes.
// Pure unit test — runs without a database.

describe('BUG-13: Date cells serialise as ISO-8601, not JSON', () => {
  it('formats a Date as an unquoted ISO string', () => {
    expect(csvCell(new Date('2026-11-20T10:30:00Z'))).toBe('2026-11-20T10:30:00.000Z')
  })

  it('leaves plain strings untouched', () => {
    expect(csvCell('plain')).toBe('plain')
    expect(csvCell(null)).toBe('')
    expect(csvCell(undefined)).toBe('')
  })

  it('still JSON-stringifies object metadata (RFC 4180-escaped)', () => {
    // The JSON contains quote characters, so the CSV layer escapes them.
    expect(csvCell({ decision: 'approve' })).toBe('"{""decision"":""approve""}"')
  })

  it('emits a clean createdAt cell through toCsv', () => {
    const csv = toCsv([{ createdAt: new Date('2026-11-20T10:30:00Z') }], ['createdAt'])
    expect(csv).toBe('createdAt\r\n2026-11-20T10:30:00.000Z\r\n')
  })
})
