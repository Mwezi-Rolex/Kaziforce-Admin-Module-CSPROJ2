import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../app/SessionContext'
import { Pager } from '../../components/ui/Pager'
import { Notice } from '../../components/ui/Notice'
import { Button, EmptyState, ErrorState, Loading, PageTitle, Pill } from '../../components/ui/primitives'
import { Toolbar } from '../../components/ui/Toolbar'
import { api } from '../../lib/api'
import { PERMISSIONS, can } from '../../lib/permissions'
import type { Flag, FlagStatus, Severity } from '../../lib/types'
import { useApi } from '../../lib/useApi'

const SEVERITY_TONE: Record<Severity, 'high' | 'medium' | 'low'> = { High: 'high', Medium: 'medium', Low: 'low' }
const STATUS_TONE: Partial<Record<FlagStatus, 'neutral' | 'active' | 'suspended'>> = {
  Pending: 'neutral',
  Approved: 'active',
  Rejected: 'suspended',
  Escalated: 'suspended',
}

// Shape returned by POST /api/v1/moderation/suggestions (per flag).
type Suggestion = { available: true; severity: Severity; action: string; confidence: number; modelVersion: string } | { available: false; reason: string }

const SEVERITY_ORDER: Record<Severity, number> = { High: 3, Medium: 2, Low: 1 }

// Shape of the queue listing's meta block (page/size/total from the API).
type QueueMeta = { page: number; size: number; total: number }

// Suggestion-only display. Never a decision: the moderator approves, rejects or
// escalates. When the model service is unavailable this shows the fail-safe text
// and the queue is unaffected (CON-ML-A-001).
export function SuggestionCell({ suggestion }: { suggestion: Suggestion | undefined }) {
  if (!suggestion || !suggestion.available) {
    return <span className="mono text-[#666b66]">Suggestion unavailable</span>
  }
  return (
    <span className="flex flex-col gap-1">
      <span className="eyebrow" style={{ color: '#8a661d' }}>
        Suggestion only
      </span>
      <span className="flex items-center gap-2">
        <Pill tone={SEVERITY_TONE[suggestion.severity]}>{suggestion.severity}</Pill>
        <span className="mono text-[#5d6961]">{suggestion.action}</span>
        <span className="mono text-[#666b66]">{Math.round(suggestion.confidence * 100)}%</span>
      </span>
    </span>
  )
}

// Moderation Queue (CON-MOD-001…004). Decisions are Moderator+; the
// escalation lane is Super Admin only. ML suggestions join in slice 8 as
// "Suggestion only" — the moderator always decides.
export function QueuePage() {
  const { user } = useSession()
  const navigate = useNavigate()
  const [lane, setLane] = useState<'queue' | 'escalated'>('queue')
  const [severity, setSeverity] = useState<'All' | Severity>('All')
  const [status, setStatus] = useState<'All' | FlagStatus>('All')
  const [selected, setSelected] = useState<string[]>([])
  const [notice, setNotice] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [acting, setActing] = useState(false)
  const [suggestions, setSuggestions] = useState<Record<string, Suggestion>>({})
  const [sortByPredicted, setSortByPredicted] = useState(false)
  const [page, setPage] = useState(1)

  const canDecide = can(user?.permissions, PERMISSIONS.moderationDecide)
  const canEscalate = can(user?.permissions, PERMISSIONS.moderationEscalate)
  const effectiveStatus = lane === 'escalated' ? 'Escalated' : status

  // A filter or lane change resets to the first page.
  useEffect(() => {
    setPage(1)
  }, [severity, status, lane])

  const listPath = useMemo(
    () => `/api/v1/moderation/queue?severity=${severity}&status=${effectiveStatus}&page=${page}&size=20`,
    [severity, effectiveStatus, page],
  )
  const list = useApi<Flag[]>(listPath)
  const flags = list.data ?? []
  const meta = list.meta as QueueMeta | undefined

  // Fetch suggestion-only predictions for the visible flags. Fail-safe: if the
  // model service is unreachable the response is available:false per flag and
  // the queue still works (CON-ML-A-001, AGENTS.md ML rules).
  useEffect(() => {
    const ids = (list.data ?? []).map((f) => f.id)
    if (!ids.length) {
      setSuggestions({})
      return
    }
    let cancelled = false
    api<Record<string, Suggestion>>('/api/v1/moderation/suggestions', {
      method: 'POST',
      body: JSON.stringify({ flagIds: ids }),
    })
      .then(({ data }) => {
        if (!cancelled) setSuggestions(data)
      })
      .catch(() => {
        if (!cancelled) setSuggestions({})
      })
    return () => {
      cancelled = true
    }
  }, [list.data])

  const displayedFlags = useMemo(() => {
    if (!sortByPredicted) return flags
    // Sort by predicted severity where a suggestion exists, else by stored severity.
    const rank = (f: Flag) => {
      const s = suggestions[f.id]
      return SEVERITY_ORDER[(s && s.available ? s.severity : f.severity) as Severity] ?? 0
    }
    return [...flags].sort((a, b) => rank(b) - rank(a))
  }, [flags, suggestions, sortByPredicted])

  useEffect(() => setSelected([]), [listPath])

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((i) => i !== id) : [...s, id]))
  const allSelected = flags.length > 0 && selected.length === flags.length

  const run = async (fn: () => Promise<string>, fallbackError: string) => {
    setActing(true)
    setError(null)
    try {
      setNotice(await fn())
      list.reload()
      setSelected([])
    } catch (err) {
      setError(err instanceof Error ? err.message : fallbackError)
    } finally {
      setActing(false)
    }
  }

  const decide = (id: string, decision: 'approve' | 'reject' | 'escalate') =>
    run(async () => {
      await api(`/api/v1/moderation/flags/${id}/decision`, { method: 'POST', body: JSON.stringify({ decision }) })
      return `Decision recorded. Immutable audit event created.`
    }, 'Decision failed')

  const bulk = (decision: 'approve' | 'reject' | 'escalate') =>
    run(async () => {
      const { data } = await api<{ applied: string[]; failed: Array<{ id: string }> }>('/api/v1/moderation/bulk', {
        method: 'POST',
        body: JSON.stringify({ flagIds: selected, decision }),
      })
      const failedNote = data.failed.length ? ` (${data.failed.length} skipped — already decided)` : ''
      return `Bulk ${decision} applied to ${data.applied.length} item${data.applied.length === 1 ? '' : 's'}. Immutable audit events created.${failedNote}`
    }, 'Bulk decision failed')

  const escalate = (id: string, resolution: 'overrule' | 'uphold') =>
    run(async () => {
      await api(`/api/v1/moderation/flags/${id}/escalation`, { method: 'POST', body: JSON.stringify({ resolution }) })
      return resolution === 'overrule'
        ? 'Flag overruled to approved. Immutable audit event created.'
        : 'Escalation upheld — content owner terminated. Immutable audit events created.'
    }, 'Escalation resolution failed')

  return (
    <>
      <PageTitle kicker="Content moderation" title={lane === 'escalated' ? 'Escalation review' : 'Review queue'}>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#636d66]">Rule-based priority queue</p>
          <p className="mt-1 text-xs text-[#636d66]">{canDecide ? 'Decision authority active' : 'Read-only operator view'}</p>
        </div>
      </PageTitle>

      {canEscalate && (
        <div className="mb-5 flex gap-2">
          <button
            onClick={() => setLane('queue')}
            className={`lane-tab ${lane === 'queue' ? 'lane-active' : ''}`}
            aria-pressed={lane === 'queue'}
          >
            Moderation queue
          </button>
          <button
            onClick={() => setLane('escalated')}
            className={`lane-tab ${lane === 'escalated' ? 'lane-active' : ''}`}
            aria-pressed={lane === 'escalated'}
          >
            Escalation review <span aria-hidden="true">·</span>
          </button>
        </div>
      )}
      {lane === 'escalated' && (
        <div className="escalation-note" role="note">
          Super Admin review lane · An escalated item may be overruled to approved, or upheld with a permanent account ban, as
          specified in the activity diagram.
        </div>
      )}

      <Toolbar>
        <select value={severity} onChange={(e) => setSeverity(e.target.value as 'All' | Severity)} aria-label="Filter by severity">
          <option value="All">All severity levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {lane === 'queue' && (
          <select value={status} onChange={(e) => setStatus(e.target.value as 'All' | FlagStatus)} aria-label="Filter by flag status">
            <option value="All">All flag_status values</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        )}
        <label className="inline-label">
          <input
            type="checkbox"
            checked={sortByPredicted}
            onChange={(e) => setSortByPredicted(e.target.checked)}
            aria-label="Sort by predicted severity"
          />
          Sort by predicted severity
        </label>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-[#646d65]">
          {list.loading ? 'Loading…' : `${list.meta?.total ?? 0} flagged items`}
        </span>
      </Toolbar>

      {error && (
        <div className="mt-4">
          <ErrorState message={error} hint="No state was changed by the failed request." />
        </div>
      )}

      {selected.length > 0 && lane === 'queue' && (
        <div className="bulkbar">
          <span className="font-mono text-[10px] uppercase tracking-wider">{selected.length} selected</span>
          {canDecide ? (
            <div className="flex gap-2">
              <Button variant="minor" disabled={acting} onClick={() => bulk('approve')}>
                Approve selected
              </Button>
              <Button variant="minor" disabled={acting} onClick={() => bulk('reject')}>
                Reject selected
              </Button>
              <Button variant="minor" disabled={acting} onClick={() => bulk('escalate')}>
                Escalate selected
              </Button>
            </div>
          ) : (
            <span className="text-xs text-[#636d66]">Moderation actions require Moderator or Super Admin</span>
          )}
        </div>
      )}
      {selected.length > 0 && lane === 'escalated' && canEscalate && (
        <div className="bulkbar">
          <span className="font-mono text-[10px] uppercase tracking-wider">{selected.length} selected</span>
          <div className="flex gap-2">
            <Button variant="minor" disabled={acting} onClick={() => escalate(selected[0], 'overrule')}>
              Overrule
            </Button>
            <Button variant="danger" disabled={acting} onClick={() => escalate(selected[0], 'uphold')}>
              Uphold and ban
            </Button>
          </div>
        </div>
      )}

      <div className="mt-5 overflow-hidden border border-[#d8d9cf] bg-[#fcfbf7]">
        {list.loading ? (
          <Loading label="Loading queue…" />
        ) : list.error ? (
          <div className="p-5">
            <ErrorState message={list.error} />
          </div>
        ) : flags.length === 0 ? (
          <div className="p-5">
            <EmptyState title="No flagged items match." hint="Try clearing the severity or status filter." />
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      aria-label="Select all flags"
                      checked={allSelected}
                      onChange={() => setSelected(allSelected ? [] : flags.map((f) => f.id))}
                    />
                  </th>
                  <th>Target content item</th>
                  <th>Reporting user</th>
                  <th>Severity</th>
                  <th>Model suggestion</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedFlags.map((f) => (
                  <tr key={f.id}>
                    <td>
                      <input
                        type="checkbox"
                        aria-label={`Select ${f.contentType} flag`}
                        checked={selected.includes(f.id)}
                        onChange={() => toggle(f.id)}
                      />
                    </td>
                    <td>
                      <p className="font-medium">{f.contentType}</p>
                      <p className="mono mt-1 text-[#666c66]">{f.id.slice(0, 8)}… · {f.reason || 'No reason recorded'}</p>
                    </td>
                    <td>
                      <button
                        className="mono hover:underline"
                        onClick={() => navigate(`/console/users?focus=${f.reportedBy}`)}
                        title="Open account record"
                      >
                        {f.reporterEmail ?? f.reportedBy.slice(0, 8)}
                      </button>
                    </td>
                    <td>
                      <Pill label="Severity" tone={SEVERITY_TONE[f.severity]}>
                        {f.severity}
                      </Pill>
                    </td>
                    <td data-testid={`suggestion-${f.id}`}>
                      <SuggestionCell suggestion={suggestions[f.id]} />
                    </td>
                    <td>
                      <Pill tone={STATUS_TONE[f.flagStatus] ?? 'neutral'}>{f.flagStatus}</Pill>
                    </td>
                    <td className="text-[#626c66]">{new Date(f.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        {lane === 'queue' && canDecide && f.flagStatus === 'Pending' && (
                          <>
                            <Button variant="minor" disabled={acting} onClick={() => decide(f.id, 'approve')} className="decision approve">
                              Approve
                            </Button>
                            <Button variant="minor" disabled={acting} onClick={() => decide(f.id, 'reject')} className="decision reject">
                              Reject
                            </Button>
                            <Button variant="minor" disabled={acting} onClick={() => decide(f.id, 'escalate')}>
                              Escalate
                            </Button>
                          </>
                        )}
                        {lane === 'escalated' && canEscalate && (
                          <>
                            <Button variant="minor" disabled={acting} onClick={() => escalate(f.id, 'overrule')}>
                              Overrule
                            </Button>
                            <Button variant="danger" disabled={acting} onClick={() => escalate(f.id, 'uphold')}>
                              Uphold and ban
                            </Button>
                          </>
                        )}
                        {((lane === 'queue' && (!canDecide || f.flagStatus !== 'Pending')) || (lane === 'escalated' && !canEscalate)) && (
                          <span className="mono text-[#666b66]">Read-only</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {notice && <Notice message={notice} onDone={() => setNotice('')} />}
      <Pager page={page} size={20} total={meta?.total ?? 0} onPage={setPage} />
    </>
  )
}
