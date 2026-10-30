import { useState } from 'react'
import { useSession } from '../../app/SessionContext'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { Notice } from '../../components/ui/Notice'
import { Button, EmptyState, ErrorState, Loading, PageTitle, Panel, Pill } from '../../components/ui/primitives'
import { api } from '../../lib/api'
import { PERMISSIONS, can } from '../../lib/permissions'
import type { SystemSetting } from '../../lib/types'
import { useApi } from '../../lib/useApi'

// System Settings (CON-SET-001/002; Ch5 §3.6.6; FR-ADM-004/019/020/026/027/029/031).
//
// Super Admin only for mutation. The documents name no concrete keys (OQ-2), so
// the seeded keys are visibly labelled `sample.*` rather than presented as real
// platform settings. Every change is audited server-side.
export function SettingsPage() {
  const { user } = useSession()
  const list = useApi<SystemSetting[]>('/api/v1/settings')
  const [editing, setEditing] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [acting, setActing] = useState(false)
  const [toggleTarget, setToggleTarget] = useState<SystemSetting | null>(null)
  const [saveTarget, setSaveTarget] = useState<SystemSetting | null>(null)

  const canManage = can(user?.permissions, PERMISSIONS.settingsManage)

  const run = async (fn: () => Promise<string>) => {
    setActing(true)
    setError(null)
    try {
      setNotice(await fn())
      list.reload()
      setToggleTarget(null)
      setSaveTarget(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Change failed')
    } finally {
      setActing(false)
    }
  }

  const saveValue = (s: SystemSetting) =>
    run(async () => {
      const value = editing[s.key] ?? s.value
      await api(`/api/v1/settings/${encodeURIComponent(s.key)}`, {
        method: 'PUT',
        body: JSON.stringify({ value }),
      })
      return `Configuration "${s.key}" updated. Change recorded in the audit log.`
    })

  const flipToggle = (s: SystemSetting) =>
    run(async () => {
      const enabled = s.value !== 'true'
      await api(`/api/v1/settings/${encodeURIComponent(s.key)}/toggle`, {
        method: 'POST',
        body: JSON.stringify({ enabled }),
      })
      return `Feature "${s.key}" ${enabled ? 'enabled' : 'disabled'}. Recorded in the audit log; effective without redeployment.`
    })

  const settings = list.data ?? []

  return (
    <>
      <PageTitle kicker={canManage ? 'Super Admin only' : 'Read-only view'} title="System settings">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#636d66]">
          Configuration changes are audited
        </p>
      </PageTitle>

      {error && (
        <div className="mb-4">
          <ErrorState message={error} hint="No change was applied." />
        </div>
      )}

      <div className="overflow-hidden border border-[#d8d9cf] bg-[#fcfbf7]">
        {list.loading ? (
          <Loading label="Loading configuration…" />
        ) : list.error ? (
          <div className="p-5">
            <ErrorState message={list.error} />
          </div>
        ) : settings.length === 0 ? (
          <div className="p-5">
            <EmptyState title="No configuration keys are defined." hint="Seed the database to populate sample keys." />
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Configuration key</th>
                  <th>Value</th>
                  <th>Updated at</th>
                  <th className="text-right">Control</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((s) => (
                  <tr key={s.key}>
                    <td className="mono">{s.key}</td>
                    <td>
                      {s.isFeatureToggle ? (
                        <Pill tone={s.value === 'true' ? 'active' : 'suspended'}>{s.value}</Pill>
                      ) : canManage ? (
                        <input
                          className="table-input"
                          aria-label={`Value for ${s.key}`}
                          value={editing[s.key] ?? s.value}
                          onChange={(e) => setEditing((m) => ({ ...m, [s.key]: e.target.value }))}
                        />
                      ) : (
                        <span className="mono">{s.value}</span>
                      )}
                    </td>
                    <td className="text-[#656c65]">
                      {new Date(s.updatedAt).toLocaleString()}
                      {s.updatedByEmail ? ` · ${s.updatedByEmail}` : ''}
                    </td>
                    <td className="text-right">
                      {canManage ? (
                        s.isFeatureToggle ? (
                          <button
                            type="button"
                            role="switch"
                            aria-checked={s.value === 'true'}
                            aria-label={`Toggle ${s.key}`}
                            onClick={() => setToggleTarget(s)}
                            disabled={acting}
                            className="toggle"
                          >
                            <span className={s.value === 'true' ? 'translate-x-5' : 'translate-x-0'} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="minor-button"
                            disabled={acting || (editing[s.key] ?? s.value) === s.value}
                            onClick={() => setSaveTarget(s)}
                          >
                            Save value
                          </button>
                        )
                      ) : (
                        <span className="mono text-[#666b66]">Read-only</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Panel className="mt-5 max-w-3xl">
        <p className="eyebrow">About these keys</p>
        <p className="mt-3 text-sm leading-6 text-[#656d66]">
          The source documentation establishes a key/value interface and feature toggles but does not name
          individual keys or toggles. The keys shown are labelled <span className="mono">sample.*</span> and are
          demonstration configuration, not real platform settings. See <span className="mono">docs/OPEN_QUESTIONS.md</span> OQ-2.
        </p>
        {!canManage && (
          <p className="mt-3 text-sm leading-6 text-[#656d66]">
            Your role may view active configuration but not change it. Modifying settings requires Super Admin
            authority, enforced by the server.
          </p>
        )}
      </Panel>

      {toggleTarget && (
        <ConfirmDialog
          title="Change feature state?"
          detail="This changes a platform-wide operational state. The change is written to the immutable audit ledger and takes effect without redeployment."
          target={toggleTarget.key}
          confirmLabel="Confirm change"
          onConfirm={() => flipToggle(toggleTarget)}
          onCancel={() => setToggleTarget(null)}
        />
      )}
      {saveTarget && (
        <ConfirmDialog
          title="Save configuration value?"
          detail="This changes a stored configuration value. The change is written to the immutable audit ledger."
          target={`${saveTarget.key} = ${editing[saveTarget.key] ?? saveTarget.value}`}
          confirmLabel="Save value"
          onConfirm={() => saveValue(saveTarget)}
          onCancel={() => setSaveTarget(null)}
        />
      )}
      {notice && <Notice message={notice} onDone={() => setNotice('')} />}
    </>
  )
}
