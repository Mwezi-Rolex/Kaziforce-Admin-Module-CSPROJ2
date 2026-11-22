import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuditPage } from '../src/features/audit/AuditPage'
import { QueuePage } from '../src/features/moderation/QueuePage'
import { SessionProvider } from '../src/app/SessionContext'

// Regression test for list pagination (SEMANTIC_MODEL.md BUG-9, audit branch
// fix/state-machine-bugs): the API supports page/size everywhere, but the UI
// never passed them and rendered no pager, so only the first page of results
// was reachable (measured in the audit: 25 rows shown of 581). The fixed
// contract: each list renders a pager, and paging fetches the next page.

const superAdmin = {
  id: 'op',
  email: 'superadmin@kaziforce.local',
  fullName: 'Sasha Super Admin',
  role: 'super_admin',
  permissions: ['users.view', 'moderation.decide', 'moderation.escalation', 'audit.view', 'audit.export', 'settings.manage'],
}

function event(i: number) {
  return {
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
  }
}

function flag(i: number) {
  return {
    id: `aaaaaaaa-0000-0000-0000-${String(i).padStart(12, '0')}`,
    contentItemId: `bbbbbbbb-0000-0000-0000-${String(i).padStart(12, '0')}`,
    contentType: 'Gig listing',
    reportedBy: 'cccccccc-0000-0000-0000-000000000000',
    reporterEmail: 'reporter@example.com',
    severity: 'Medium',
    flagStatus: 'Pending',
    reason: 'pager probe',
    createdAt: new Date().toISOString(),
    decidedBy: null,
    decidedAt: null,
  }
}

let requestedUrls: string[] = []

function installFetchStub(listPath: string, total: number) {
  requestedUrls = []
  const isQueue = listPath.includes('moderation/queue')
  global.fetch = vi.fn(async (url: string | URL | Request) => {
    const path = String(url)
    requestedUrls.push(path)
    if (path.endsWith('/api/v1/auth/me')) {
      return new Response(JSON.stringify({ success: true, data: superAdmin, timestamp: '' }), { status: 200 })
    }
    if (path.startsWith(listPath)) {
      const data = isQueue ? Array.from({ length: 20 }, (_, i) => flag(i)) : Array.from({ length: 25 }, (_, i) => event(i))
      return new Response(
        JSON.stringify({ success: true, data, meta: { page: 1, size: isQueue ? 20 : 25, total, actionTypes: ['Operator Login'] }, timestamp: '' }),
        { status: 200 },
      )
    }
    if (path.endsWith('/api/v1/moderation/suggestions')) {
      return new Response(JSON.stringify({ success: true, data: {}, timestamp: '' }), { status: 200 })
    }
    return new Response(JSON.stringify({ success: false, error: { code: 'X', message: 'unexpected' } }), { status: 404 })
  }) as unknown as typeof fetch
}

describe('BUG-9: lists paginate', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('the audit explorer shows a pager and fetches page 2 on Next', async () => {
    installFetchStub('/api/v1/audit', 60)
    render(
      <SessionProvider>
        <AuditPage />
      </SessionProvider>,
    )
    await waitFor(() => expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument())
    await userEvent.click(screen.getByRole('button', { name: /Next/ }))
    await waitFor(() => expect(requestedUrls.some((u) => u.includes('page=2'))).toBe(true))
  })

  it('the moderation queue shows a pager and fetches page 2 on Next', async () => {
    installFetchStub('/api/v1/moderation/queue', 45)
    render(
      <MemoryRouter>
        <SessionProvider>
          <QueuePage />
        </SessionProvider>
      </MemoryRouter>,
    )
    await waitFor(() => expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument())
    await userEvent.click(screen.getByRole('button', { name: /Next/ }))
    await waitFor(() => expect(requestedUrls.some((u) => u.includes('moderation/queue') && u.includes('page=2'))).toBe(true))
  })

  it('returns to page 1 when a filter changes', async () => {
    installFetchStub('/api/v1/audit', 60)
    render(
      <SessionProvider>
        <AuditPage />
      </SessionProvider>,
    )
    await waitFor(() => expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument())
    await userEvent.click(screen.getByRole('button', { name: /Next/ }))
    await waitFor(() => expect(requestedUrls.some((u) => u.includes('page=2'))).toBe(true))
    const actionFilter = screen.getByLabelText('Filter by action type')
    await userEvent.selectOptions(actionFilter, 'Operator Login')
    await waitFor(() => {
      const urls = requestedUrls.filter((u) => u.startsWith('/api/v1/audit?'))
      expect(urls[urls.length - 1]).toContain('page=1')
    })
  })
})
