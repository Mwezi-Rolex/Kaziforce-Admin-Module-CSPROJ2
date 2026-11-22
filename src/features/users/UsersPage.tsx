import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSession } from '../../app/SessionContext'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { Pager } from '../../components/ui/Pager'
import { Notice } from '../../components/ui/Notice'
import { Button, EmptyState, ErrorState, Loading, PageTitle, Panel, Pill } from '../../components/ui/primitives'
import { Toolbar } from '../../components/ui/Toolbar'
import { api } from '../../lib/api'
import { PERMISSIONS, ROLE_LABEL, can } from '../../lib/permissions'
import type { Account, AccountStatus, FlagStatus, Severity } from '../../lib/types'
import { useApi } from '../../lib/useApi'
import { formatDateTime, formatTime } from '../../lib/format'

type AccountDetail = Account & {
  flagsReported: Array<{ id: string; severity: Severity; flagStatus: FlagStatus; reason: string; createdAt: string; contentType: string }>
  contentOwned: Array<{ id: string; contentType: string; createdAt: string }>
}

// Shape of the user listing's meta block (page/size/total from the API).
type UsersMeta = { page: number; size: number; total: number }

const STATUS_TONE: Record<AccountStatus, 'active' | 'suspended' | 'neutral'> = {
  Active: 'active',
  Suspended: 'suspended',
  Terminated: 'suspended',
}

// User Control Centre (CON-USR-001…006). No create/delete controls (CON-USR-002).
export function UsersPage() {
  const { user } = useSession()
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [status, setStatus] = useState<'All' | AccountStatus>('All')
  const [role, setRole] = useState<'All' | 'viewer' | 'moderator' | 'super_admin'>('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  // Deep link from the moderation queue (?focus=<accountId>) opens the record.
  useEffect(() => {
    const focus = searchParams.get('focus')
    if (focus) {
      setSelectedId(focus)
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams])
  const [notice, setNotice] = useState('')
  const [banTarget, setBanTarget] = useState<Account | null>(null)
  const [acting, setActing] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), 300)
    return () => window.clearTimeout(t)
  }, [query])

  // A filter or search change resets to the first page.
  useEffect(() => {
    setPage(1)
  }, [debounced, status, role])

  const listPath = useMemo(
    () =>
      `/api/v1/users?query=${encodeURIComponent(debounced)}&status=${encodeURIComponent(status)}&role=${encodeURIComponent(
        role,
      )}&page=${page}&size=20`,
    [debounced, status, role, page],
  )
  const list = useApi<Account[]>(listPath)
  const detail = useApi<AccountDetail>(selectedId ? `/api/v1/users/${selectedId}` : null)
  const listMeta = list.meta as UsersMeta | undefined

  const canSuspend = can(user?.permissions, PERMISSIONS.usersSuspend)
  const canBan = can(user?.permissions, PERMISSIONS.usersBan)
  const canAssignRole = can(user?.permissions, PERMISSIONS.usersAssignRole)
  const canUnlock = can(user?.permissions, PERMISSIONS.usersUnlock)

  // OQ-12: a lock is active only while lockedUntil is in the future.
  const isLocked = (a: { lockedUntil?: string | null }) =>
    Boolean(a.lockedUntil && new Date(a.lockedUntil).getTime() > Date.now())

  const act = async (fn: () => Promise<void>, message: string) => {
    setActing(true)
    setActionError(null)
    try {
      await fn()
      setNotice(message)
      list.reload()
      detail.reload()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Action failed')
    } finally {
      setActing(false)
    }
  }

  const suspend = (account: Account) =>
    act(async () => {
      await api(`/api/v1/users/${account.id}/suspend`, { method: 'POST', body: JSON.stringify({}) })
    }, `Account ${account.email} suspended. Immutable audit event created.`)

  const ban = (account: Account) =>
    act(async () => {
      await api(`/api/v1/users/${account.id}/ban`, { method: 'POST', body: JSON.stringify({}) })
      setBanTarget(null)
    }, `Permanent ban applied to ${account.email}. Immutable audit event created.`)

  const unlock = (account: Account) =>
    act(async () => {
      await api(`/api/v1/users/${account.id}/unlock`, { method: 'POST', body: JSON.stringify({}) })
    }, `Lockout cleared for ${account.email}. Recorded in the audit log.`)

  const assignRole = (account: Account, role: string) =>
    act(async () => {
      await api(`/api/v1/users/${account.id}/role`, { method: 'POST', body: JSON.stringify({ role }) })
    }, `Role assignment for ${account.email} recorded in audit log.`)

  const selected = detail.data

  return (
    <>
      <PageTitle kicker="User management" title="Account control">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#636d66]">
          Search · view · status control · role map
        </p>
      </PageTitle>

      <Toolbar>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by account ID, email, or name"
          aria-label="Search accounts"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as 'All' | AccountStatus)} aria-label="Filter by account state">
          <option value="All">All account states</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Terminated">Terminated</option>
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value as 'All' | 'viewer' | 'moderator' | 'super_admin')} aria-label="Filter by role">
          <option value="All">All roles</option>
          <option value="viewer">Viewer</option>
          <option value="moderator">Moderator</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-[#636d66]">
          {list.loading ? 'Loading…' : `${list.meta?.total ?? 0} matched accounts`}
        </span>
      </Toolbar>

      {actionError && (
        <div className="mt-4">
          <ErrorState message={actionError} hint="The action was not applied." />
        </div>
      )}

      <div className="account-record mt-5">
        <div className="overflow-hidden border border-[#d8d9cf] bg-[#fcfbf7]">
          {list.loading ? (
            <Loading label="Loading accounts…" />
          ) : list.error ? (
            <div className="p-5">
              <ErrorState message={list.error} hint="Adjust the filters or retry." />
            </div>
          ) : !list.data?.length ? (
            <div className="p-5">
              <EmptyState title="No accounts match." hint="Try a different search or account state." />
            </div>
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>View</th>
                    <th>Account</th>
                    <th>Account ID</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.data.map((u) => (
                    <tr key={u.id} className={selectedId === u.id ? 'bg-[#f1f5ed]' : ''}>
                      <td>
                        <Button variant="minor" onClick={() => setSelectedId(u.id)}>
                          View
                        </Button>
                      </td>
                      <td className="font-medium">{u.email}</td>
                      <td className="mono">{u.id.slice(0, 8)}…</td>
                      <td>{ROLE_LABEL[u.role]}</td>
                      <td>
                        <Pill label="Status" tone={STATUS_TONE[u.status]}>
                          {u.status}
                        </Pill>
                        {isLocked(u) && (
                          <span className="ml-2 inline-block align-middle">
                            <Pill tone="suspended">Locked</Pill>
                          </span>
                        )}
                      </td>
                      <td className="text-[#626c66]">{formatDateTime(u.createdAt)}</td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {canUnlock && isLocked(u) && (
                            <Button variant="minor" disabled={acting} onClick={() => unlock(u)}>
                              Unlock
                            </Button>
                          )}
                          {canSuspend && u.status === 'Active' && (
                            <Button variant="minor" disabled={acting} onClick={() => suspend(u)}>
                              Suspend
                            </Button>
                          )}
                          {!canSuspend && !canUnlock && <span className="mono text-[#8c938c]">Read-only</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="border border-[#d8d9cf] bg-[#eeece4] p-5">
          {detail.loading ? (
            <Loading label="Loading account record…" />
          ) : detail.error ? (
            <ErrorState message={detail.error} />
          ) : selected ? (
            <>
              <div className="flex items-start justify-between">
                <p className="eyebrow">Account record</p>
                <button onClick={() => setSelectedId(null)} className="text-sm text-[#636d66]" aria-label="Close account record">
                  ×
                </button>
              </div>
              <h2 className="mt-4 break-all font-serif text-2xl leading-tight">{selected.email}</h2>
              <dl className="detail-list">
                <div>
                  <dt>Account ID</dt>
                  <dd className="mono">{selected.id}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{ROLE_LABEL[selected.role]}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <Pill label="Status" tone={STATUS_TONE[selected.status]}>
                      {selected.status}
                    </Pill>
                  </dd>
                </div>
                <div>
                  <dt>Created</dt>
                  <dd>{formatDateTime(selected.createdAt)}</dd>
                </div>
                {isLocked(selected) && (
                  <div>
                    <dt>Login lock</dt>
                    <dd>
                      <Pill tone="suspended">
                        until {formatTime(selected.lockedUntil as string)}
                      </Pill>
                    </dd>
                  </div>
                )}
              </dl>

              {/* CON-USR-006 / CON-UI-001: lists scroll inside the panel */}
              <div className="history-block panel-scroll">
                <p className="eyebrow">Flags reported · {selected.flagsReported.length}</p>
                {selected.flagsReported.length ? (
                  selected.flagsReported.map((flag) => (
                    <p key={flag.id} className="history-item">
                      <span className="mono">{flag.id.slice(0, 8)}…</span>
                      <Pill label="Severity" tone={flag.severity.toLowerCase() as 'high' | 'medium' | 'low'}>
                        {flag.severity}
                      </Pill>
                    </p>
                  ))
                ) : (
                  <p className="history-empty">No reported flags in this record.</p>
                )}
                <p className="eyebrow mt-4">Content owned · {selected.contentOwned.length}</p>
                {selected.contentOwned.length ? (
                  selected.contentOwned.map((item) => (
                    <p key={item.id} className="history-item">
                      <span>{item.contentType}</span>
                      <span className="mono">{item.id.slice(0, 8)}…</span>
                    </p>
                  ))
                ) : (
                  <p className="history-empty">No owned content in this record.</p>
                )}
              </div>

              <div className="mt-6 border-t border-[#d3d5cb] pt-5">
                {canUnlock && isLocked(selected) && (
                  <Button variant="minor" className="w-full" disabled={acting} onClick={() => unlock(selected)}>
                    Clear login lockout
                  </Button>
                )}
                {canSuspend && selected.status === 'Active' && (
                  <Button variant="minor" className="w-full" disabled={acting} onClick={() => suspend(selected)}>
                    Suspend account
                  </Button>
                )}
                {(canAssignRole || canBan) && (
                  <div className="mt-3">
                    {canAssignRole && (
                      <>
                        <label className="field-label" htmlFor="assign-role">
                          Assign role
                          <select
                            id="assign-role"
                            defaultValue={selected.role}
                            disabled={acting}
                            onChange={(e) => assignRole(selected, e.target.value)}
                          >
                            <option value="viewer">Viewer</option>
                            <option value="moderator">Moderator</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </label>
                        <p className="mt-2 text-xs text-[#656d66]">Assignment is audited and takes effect on the operator's next request.</p>
                      </>
                    )}
                    {canBan && selected.status !== 'Terminated' && (
                      <Button variant="danger" className="mt-4 w-full" disabled={acting} onClick={() => setBanTarget(selected)}>
                        Permanently ban <span aria-hidden="true">→</span>
                      </Button>
                    )}
                  </div>
                )}
                {!canSuspend && (
                  <p className="text-sm leading-6 text-[#656d66]">
                    This role can view account records only. No account actions are authorized.
                  </p>
                )}
                {canSuspend && !canBan && (
                  <p className="mt-4 text-xs leading-5 text-[#656d66]">
                    Role assignment and permanent bans require Super Admin authority.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col justify-between">
              <div>
                <p className="eyebrow">Account record</p>
                <h2 className="mt-4 font-serif text-2xl leading-tight">Select an account to view its authorized controls.</h2>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[.1em] text-[#646d66]">No create, delete, or arbitrary update controls</p>
            </div>
          )}
        </aside>
      </div>

      {!canSuspend && (
        <p className="mt-4 text-xs text-[#656b66]">Role assignment and permanent bans are not available to this operator role.</p>
      )}

      {banTarget && (
        <ConfirmDialog
          title="Permanent account ban?"
          detail="This permanently bans the selected account. This action is destructive and will create an immutable audit event."
          target={banTarget.email}
          confirmLabel="Permanently ban"
          destructive
          onConfirm={() => ban(banTarget)}
          onCancel={() => setBanTarget(null)}
        />
      )}
      <Pager page={page} size={20} total={listMeta?.total ?? 0} onPage={setPage} />
      {notice && <Notice message={notice} onDone={() => setNotice('')} />}
    </>
  )
}
