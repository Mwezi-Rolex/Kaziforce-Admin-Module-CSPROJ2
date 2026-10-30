import { render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueuePage, SuggestionCell } from '../src/features/moderation/QueuePage'
import { SessionProvider } from '../src/app/SessionContext'

// UI tests for CON-ML-A-001: the "Suggestion only" label appears, and its
// absence (model down) does not break the queue — "Suggestion unavailable" is
// shown instead. No live server: global.fetch is stubbed.

describe('SuggestionCell', () => {
  it('shows the "Suggestion only" label with severity, action and confidence', () => {
    render(
      <SuggestionCell
        suggestion={{ available: true, severity: 'High', action: 'reject', confidence: 0.61, modelVersion: 'v1' }}
      />,
    )
    expect(screen.getByText(/Suggestion only/i)).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
    expect(screen.getByText('reject')).toBeInTheDocument()
    expect(screen.getByText('61%')).toBeInTheDocument()
  })

  it('shows "Suggestion unavailable" when the model is down', () => {
    render(<SuggestionCell suggestion={{ available: false, reason: 'AbortError' }} />)
    expect(screen.getByText(/Suggestion unavailable/i)).toBeInTheDocument()
    expect(screen.queryByText(/Suggestion only/i)).not.toBeInTheDocument()
  })

  it('shows "Suggestion unavailable" when no suggestion was returned at all', () => {
    render(<SuggestionCell suggestion={undefined} />)
    expect(screen.getByText(/Suggestion unavailable/i)).toBeInTheDocument()
  })
})

// Integration: the queue renders rows and stays usable even when the model
// service is unavailable for every flag.
describe('QueuePage with the model service unavailable', () => {
  const flag = {
    id: '11111111-1111-1111-1111-111111111111',
    contentItemId: '22222222-2222-2222-2222-222222222222',
    contentType: 'Gig listing',
    contentSummary: '',
    reportedBy: '33333333-3333-3333-3333-333333333333',
    reporterEmail: 'reporter@example.com',
    severity: 'High',
    flagStatus: 'Pending',
    reason: 'off-platform payment',
    createdAt: new Date().toISOString(),
  }

  beforeEach(() => {
    global.fetch = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      const path = String(url)
      const body = (): { success: boolean; data: unknown } => JSON.parse(String(init?.body ?? '{}'))
      void body
      if (path.endsWith('/api/v1/auth/me')) {
        return new Response(
          JSON.stringify({
            success: true,
            data: { id: 'op', email: 'moderator@kaziforce.local', fullName: 'Marta', role: 'moderator', permissions: ['moderation.decide', 'audit.view'] },
            timestamp: '',
          }),
          { status: 200 },
        )
      }
      if (path.includes('/api/v1/moderation/queue')) {
        return new Response(JSON.stringify({ success: true, data: [flag], meta: { total: 1 }, timestamp: '' }), { status: 200 })
      }
      if (path.endsWith('/api/v1/moderation/suggestions')) {
        // Model service down for every flag (fail-safe).
        return new Response(
          JSON.stringify({
            success: true,
            data: { [flag.id]: { available: false, reason: 'AbortError' } },
            timestamp: '',
          }),
          { status: 200 },
        )
      }
      return new Response(JSON.stringify({ success: false, error: { code: 'X', message: 'unexpected' } }), { status: 404 })
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the queue rows and shows "Suggestion unavailable" without breaking', async () => {
    render(
      <MemoryRouter>
        <SessionProvider>
          <QueuePage />
        </SessionProvider>
      </MemoryRouter>,
    )
    await waitFor(() => expect(screen.getByText('Gig listing')).toBeInTheDocument())
    const cell = screen.getByTestId(`suggestion-${flag.id}`)
    expect(within(cell).getByText(/Suggestion unavailable/i)).toBeInTheDocument()
    // The queue itself still works: the decision controls are present for a Moderator.
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument()
  })
})
