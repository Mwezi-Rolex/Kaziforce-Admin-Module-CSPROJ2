import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuditPage } from '../src/features/audit/AuditPage'
import { SessionProvider } from '../src/app/SessionContext'

// Regression test for the audit CSV export link (SEMANTIC_MODEL.md BUG-1,
// audit branch fix/state-machine-bugs): the old href appended "/export.csv"
// AFTER the query string ("listPath + '/export.csv'" where listPath already
// contained '?'), so the browser requested /api/v1/audit?<filters>/export.csv
// and received the JSON listing — or a 422 with a filter set — never the CSV.
// The fixed contract: the export anchor points at
// /api/v1/audit/export.csv?<filters> with or without filters.

const superAdmin = {
  id: 'op',
  email: 'superadmin@kaziforce.local',
  fullName: 'Sasha Super Admin',
  role: 'super_admin',
  permissions: ['users.view', 'moderation.decide', 'moderation.escalation', 'audit.view', 'audit.export', 'settings.manage'],
}

let requestedUrls: string[] = []

function installFetchStub() {
  requestedUrls = []
  global.fetch = vi.fn(async (url: string | URL | Request) => {
    const path = String(url)
    requestedUrls.push(path)
    if (path.endsWith('/api/v1/auth/me')) {
      return new Response(JSON.stringify({ success: true, data: superAdmin, timestamp: '' }), { status: 200 })
    }
    if (path.startsWith('/api/v1/audit?') || path === '/api/v1/audit' || path.startsWith('/api/v1/audit?')) {
      return new Response(
        JSON.stringify({
          success: true,
          data: Array.from({ length: 25 }, (_, i) => ({
            id: `00000000-0000-0000-0000-${String(i).padStart(12, '0')}`,
            operatorId: 'op',
            operatorEmail: 'superadmin@kaziforce.local',
            actionType: 'Operator Login',
            targetEntityType: 'operator',
            targetEntityId: 'op',
            outcome: 'Success',
            actorIp: '127.0.0.1',
            correlationId: null,
            metadata: {},
            createdAt: new Date().toISOString(),
          })),
          meta: { page: 1, size: 25, total: 60, actionTypes: ['Operator Login'] },
          timestamp: '',
        }),
        { status: 200 },
      )
    }
    return new Response(JSON.stringify({ success: false, error: { code: 'X', message: 'unexpected' } }), { status: 404 })
  }) as unknown as typeof fetch
}

describe('BUG-1: the audit export anchor reaches /export.csv', () => {
  beforeEach(() => {
    installFetchStub()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('points at /api/v1/audit/export.csv with no filters', async () => {
    render(
      <SessionProvider>
        <AuditPage />
      </SessionProvider>,
    )
    await waitFor(() => expect(screen.getByRole('link', { name: /Export CSV/ })).toBeInTheDocument())
    const link = screen.getByRole('link', { name: /Export CSV/ }) as HTMLAnchorElement
    expect(link.getAttribute('href')).toBe('/api/v1/audit/export.csv')
  })

  it('keeps the export path outside the query string when filters are set', async () => {
    render(
      <SessionProvider>
        <AuditPage />
      </SessionProvider>,
    )
    await waitFor(() => expect(screen.getByRole('link', { name: /Export CSV/ })).toBeInTheDocument())
    const from = screen.getByLabelText('From')
    await userEvent.type(from, '2026-01-01')
    await waitFor(() => {
      const link = screen.getByRole('link', { name: /Export CSV/ }) as HTMLAnchorElement
      const href = link.getAttribute('href') ?? ''
      expect(href.startsWith('/api/v1/audit/export.csv')).toBe(true)
      expect(href).toContain('from=2026-01-01')
    })
  })
})
