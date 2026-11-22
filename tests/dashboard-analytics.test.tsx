import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from '../src/features/dashboard/DashboardPage'
import { SessionProvider } from '../src/app/SessionContext'

// Dashboard analytics UI tests (CON-DASH-001; D-098).
//
// Claims under test:
//  - the analytics cell renders the four live KPI cards and the 14-day trend
//    served by GET /api/v1/analytics/dashboard, replacing the old
//    "Not configured / Meaningful measures come first" placeholder;
//  - when the analytics endpoint fails, the cell shows the error and never
//    invents numbers (the fail-safe rule, same as the model suggestions);
//  - a zero-activity window shows the empty state, not an empty chart.

const user = {
  id: 'op',
  email: 'viewer@kaziforce.local',
  fullName: 'Vera Operator (Demo)',
  role: 'viewer',
  permissions: ['users.view', 'audit.view'],
}

const analyticsPayload = {
  accounts: { total: 9, active: 6, suspended: 2, terminated: 1 },
  queue: { pending: 12, escalated: 3, highSeverityPending: 4, resolved: 40 },
  decisions7d: { approved: 5, rejected: 2, escalated: 1 },
  audit: { total: 58, last24h: 7, last7d: 30 },
  trend: Array.from({ length: 14 }, (_, i) => ({ day: `2026-11-${String(10 + i).padStart(2, '0')}`, events: i % 4 })),
}

const recentAudit = Array.from({ length: 4 }, (_, i) => ({
  id: `00000000-0000-0000-0000-${String(i).padStart(12, '0')}`,
  operatorId: 'op',
  operatorEmail: 'viewer@kaziforce.local',
  actionType: 'Operator Login',
  targetEntityType: 'operator',
  targetEntityId: 'op',
  outcome: 'Success',
  createdAt: new Date().toISOString(),
}))

function envelope(ok: boolean, body: unknown) {
  return new Response(JSON.stringify(ok ? body : { success: false, error: body }), { status: ok ? 200 : 500 })
}

function installFetchStub(options: { analyticsOk: boolean } = { analyticsOk: true }) {
  global.fetch = vi.fn(async (url: string | URL | Request) => {
    const path = String(url)
    if (path.endsWith('/api/v1/auth/me')) {
      return envelope(true, { success: true, data: user, timestamp: '' })
    }
    if (path.startsWith('/api/v1/analytics/dashboard')) {
      return options.analyticsOk
        ? envelope(true, { success: true, data: analyticsPayload, meta: { generatedAt: '' }, timestamp: '' })
        : envelope(false, { code: 'SYSTEM-001', message: 'Analytics is unavailable' })
    }
    if (path.startsWith('/api/v1/audit')) {
      return envelope(true, { success: true, data: recentAudit, timestamp: '' })
    }
    return envelope(false, { code: 'X', message: 'unexpected' })
  }) as unknown as typeof fetch
}

describe('Dashboard analytics (D-098)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the four live KPI cards and a 14-day trend', async () => {
    installFetchStub()
    render(
      <MemoryRouter><SessionProvider>
        <DashboardPage />
      </SessionProvider></MemoryRouter>,
    )
    await waitFor(() => expect(screen.getByText('Live data')).toBeInTheDocument())
    // The KPI figures come from the stubbed payload — each card shows its number.
    expect(screen.getByText('9')).toBeInTheDocument() // accounts total
    expect(screen.getByText('12')).toBeInTheDocument() // queue pending
    expect(screen.getByText('58')).toBeInTheDocument() // audit total
    expect(screen.getByText('8')).toBeInTheDocument() // decisions 5+2+1
    // 14 trend bars + the screen-reader series summary.
    const bars = document.querySelectorAll('.kz-trend-bar')
    expect(bars).toHaveLength(14)
    expect(screen.getByText(/Audit events per day over the last 14 days/)).toBeInTheDocument()
    // The placeholder state is gone.
    expect(screen.queryByText(/Meaningful measures come first/)).not.toBeInTheDocument()
    expect(screen.queryByText('Not configured')).not.toBeInTheDocument()
  })

  it('fails safe: an unavailable analytics service shows an error, never invented numbers', async () => {
    installFetchStub({ analyticsOk: false })
    render(
      <MemoryRouter><SessionProvider>
        <DashboardPage />
      </SessionProvider></MemoryRouter>,
    )
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(screen.getByText(/Analytics is unavailable/)).toBeInTheDocument()
    // No KPI figures are rendered while the data is unavailable.
    expect(screen.queryByText('Live data')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.kz-kpi-num')).toHaveLength(0)
  })

  it('shows the empty state when the 14-day window has no events', async () => {
    // Reinstall the stub with a zeroed trend.
    global.fetch = vi.fn(async (url: string | URL | Request) => {
      const path = String(url)
      if (path.endsWith('/api/v1/auth/me')) {
        return envelope(true, { success: true, data: user, timestamp: '' })
      }
      if (path.startsWith('/api/v1/analytics/dashboard')) {
        return envelope(true, {
          success: true,
          data: { ...analyticsPayload, trend: analyticsPayload.trend.map((p) => ({ ...p, events: 0 })) },
          timestamp: '',
        })
      }
      if (path.startsWith('/api/v1/audit')) {
        return envelope(true, { success: true, data: recentAudit, timestamp: '' })
      }
      return envelope(false, { code: 'X', message: 'unexpected' })
    }) as unknown as typeof fetch
    render(
      <MemoryRouter><SessionProvider>
        <DashboardPage />
      </SessionProvider></MemoryRouter>,
    )
    await waitFor(() => expect(screen.getByText(/No audit events in the last 14 days/)).toBeInTheDocument())
    expect(document.querySelectorAll('.kz-trend-bar')).toHaveLength(0)
  })
})
