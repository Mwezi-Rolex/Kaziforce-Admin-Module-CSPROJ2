import { csvCell, toCsv } from '../src/lib/csv'

// Regression tests for the audit CSV defects tracked in
// docs/draft/DISCREPANCIES.md rows 18 (Date quoting) plus the spreadsheet
// formula-injection hardening requested alongside it.
// Pure unit tests — run without a database.

describe('BUG-13 / row 18: Date cells serialise as ISO-8601, not JSON', () => {
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

describe('formula injection guard: leading = + - @ tab CR get a quote prefix', () => {
  it('prefixes a cell that starts with "="', () => {
    expect(csvCell('=SUM(A1:A9)')).toBe("'=SUM(A1:A9)")
  })

  it('prefixes a cell that starts with "+"', () => {
    expect(csvCell('+1')).toBe("'+1")
  })

  it('prefixes a cell that starts with "-"', () => {
    expect(csvCell('-2 + 2')).toBe("'-2 + 2")
  })

  it('prefixes a cell that starts with "@"', () => {
    expect(csvCell('@risky_call')).toBe("'@risky_call")
  })

  it('prefixes a cell that starts with a tab', () => {
    expect(csvCell('\tSUM(A1)')).toBe("'\tSUM(A1)")
  })

  it('prefixes a cell that starts with CR and still RFC 4180-quotes it', () => {
    // The prefix goes on first; the CR then triggers the RFC quoting, so the
    // final cell is a quoted field whose first data character is the guard.
    expect(csvCell('\rSUM(A1)')).toBe('"\'\rSUM(A1)"')
  })

  it('keeps the RFC 4180 quoting after the prefix (comma inside the value)', () => {
    // '=a,b -> guard prefix -> '=a,b -> contains a comma -> quoted with the
    // guard character INSIDE the quotes: "'=a,b"
    expect(csvCell('=a,b')).toBe('"\'=a,b"')
  })

  it('escapes quotes after the prefix', () => {
    // '=-HYPERLINK("x") -> prefix -> contains " -> escape + wrap.
    expect(csvCell('=-HYPERLINK("x")')).toBe('"\'=-HYPERLINK(""x"")"')
  })

  it('does not prefix safe cells', () => {
    expect(csvCell('2026-11-20T10:30:00.000Z')).toBe('2026-11-20T10:30:00.000Z')
    expect(csvCell('moderator@kaziforce.local')).toBe('moderator@kaziforce.local')
    expect(csvCell('{decision:1}')).toBe('{decision:1}')
    expect(csvCell('')).toBe('')
  })

  it('emits a prefixed correlation id through toCsv', () => {
    const csv = toCsv([{ correlationId: '=-HYPERLINK("x")' }], ['correlationId'])
    expect(csv).toBe('correlationId\r\n"\'=-HYPERLINK(""x"")"\r\n')
  })
})
