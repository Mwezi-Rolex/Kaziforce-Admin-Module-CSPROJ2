import { useEffect, useMemo, useState } from 'react'
import { useSession } from '../../app/SessionContext'
import { Pager } from '../../components/ui/Pager'
import { Button, EmptyState, ErrorState, Loading, PageTitle, Pill } from '../../components/ui/primitives'
import { Toolbar } from '../../components/ui/Toolbar'
import { PERMISSIONS, can } from '../../lib/permissions'
import type { AuditEvent, AuditOutcome } from '../../lib/types'
import { useApi } from '../../lib/useApi'

type AuditMeta = { page: number; size: number; total: number; actionTypes: string[] }

// The outcome is shown next to the action type in the same cell, so the table
// keeps the five columns of the Figma export while the ledger's result field
// (BED §6.15) stays visible. Colour is never the only signal: the word is
// always written out (NFR-ACC-006).
const OUTCOME_TONE: Record<AuditOutcome, 'active' | 'high' | 'medium'> = {
  Success: 'active',
  Blocked: 'high',
  Failure: 'medium',
}

// Audit Explorer (CON-AUD-002/003; Ch5 §3.6.5).
// The ledger is append-only and read-only in this interface. CSV export is
// Moderator+ only: the control is hidden for Viewers and the server returns 403
// regardless (BRIEF override of Ch5's all-operator export).
export function AuditPage() {
  const { user } = useSession()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [actor, setActor] = useState('')
  const [action, setAction] = useState('')
  const [outcome, setOutcome] = useState<'' | AuditOutcome>('')
  const [page, setPage] = useState(1)

  const canExport = can(user?.permissions, PERMISSIONS.auditExport)

  const filterParams = useMemo(() => {
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    if (actor.trim()) params.set('actor', actor.trim())
    if (action) params.set('action', action)
    if (outcome) params.set('outcome', outcome)
    return params
  }, [from, to, actor, action, outcome])

  // Any filter change resets to the first page (a filter can invalidate a
  // later page number).
  useEffect(() => {
    setPage(1)
  }, [filterParams])

  const listPath = useMemo(() => {
    const params = new URLSearchParams(filterParams)
    params.set('page', String(page))
    params.set('size', '25')
    return `/api/v1/audit?${params.toString()}`
  }, [filterParams, page])

  // The export href must keep /export.csv on the PATH: appending it to
  // listPath (which already contains '?') put it inside the query string, so
  // the browser fetched the JSON listing — or a 422 with a filter set — and
  // never the CSV (SEMANTIC_MODEL.md BUG-1, fixed).
  const exportHref = useMemo(() => {
    const query = filterParams.toString()
    return `/api/v1/audit/export.csv${query ? `?${query}` : ''}`
  }, [filterParams])

  const list = useApi<AuditEvent[]>(listPath)
  const events = list.data ?? []
  const meta = list.meta as AuditMeta | undefined

  return (
    <>
      <PageTitle kicker="Immutable record" title="Audit log explorer">
        {canExport ? (
          <a className="primary-button" href={exportHref} download>
            Export CSV <span aria-hidden="true">↓</span>
          </a>
        ) : (
          <p className="max-w-xs text-right font-mono text-[10px] uppercase leading-4 tracking-[.1em] text-[#666c66]">
            Log download requires Moderator or Super Admin
          </p>
        )}
      </PageTitle>

      <Toolbar>
        <label className="inline-label">
          From
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label className="inline-label">
          To
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <input
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          placeholder="Filter by actor / operator ID"
          aria-label="Filter by actor or operator ID"
        />
        <select value={action} onChange={(e) => setAction(e.target.value)} aria-label="Filter by action type">
          <option value="">All action types</option>
          {(meta?.actionTypes ?? []).map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          value={outcome}
          onChange={(e) => setOutcome(e.target.value as '' | AuditOutcome)}
          aria-label="Filter by outcome"
        >
          <option value="">All outcomes</option>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
          <option value="Blocked">Blocked</option>
        </select>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-[#616e67]">
          {list.loading ? 'Loading…' : `${meta?.total ?? 0} events`}
        </span>
      </Toolbar>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[.1em] text-[#616e67]">
        Append-only · server-generated timestamp · no update or delete privileges
      </p>

      <div className="mt-4 overflow-hidden border border-[#d8d9cf] bg-[#fcfbf7]">
        {list.loading ? (
          <Loading label="Loading audit events…" />
        ) : list.error ? (
          <div className="p-5">
            <ErrorState message={list.error} hint="Adjust the filters or retry." />
          </div>
        ) : events.length === 0 ? (
          <div className="p-5">
            <EmptyState title="No audit events match." hint="Widen the date range or clear the filters." />
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Operator / actor</th>
                  <th>Action type</th>
                  <th>Target entity</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id}>
                    <td className="mono">{e.id.slice(0, 8)}…</td>
                    <td className="mono">{e.operatorEmail ?? e.operatorId?.slice(0, 8) ?? 'system'}</td>
                    <td>
                      <Pill>{e.actionType}</Pill>{' '}
                      <Pill tone={OUTCOME_TONE[e.outcome] ?? 'neutral'} label="Outcome">
                        {e.outcome}
                      </Pill>
                    </td>
                    <td className="mono">
                      {e.targetEntityType}
                      {e.targetEntityId ? ` · ${e.targetEntityId.slice(0, 8)}…` : ''}
                    </td>
                    <td className="text-[#626c66]">{new Date(e.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!canExport && (
        <p className="mt-4 text-xs leading-5 text-[#656b66]">
          This role may read the audit log but not download it. The restriction is enforced by the server, not
          only by hiding the control.
        </p>
      )}

      <Pager page={page} size={meta?.size ?? 25} total={meta?.total ?? 0} onPage={setPage} />
    </>
  )
}
