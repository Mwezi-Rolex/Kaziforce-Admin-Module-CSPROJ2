import { useSession } from '../../app/SessionContext'
import { PageTitle, Panel } from '../../components/ui/primitives'
import { PERMISSIONS, ROLE_LABEL, can } from '../../lib/permissions'

// Dashboard shell (CON-DASH-001; FR-ADM-008/046).
//
// The documents define no dashboard KPI set, so the analytics area is
// deliberately unpopulated rather than filled with invented metrics (OQ-2,
// AGENTS.md "never invent a requirement"). What is shown is real session and
// role-scope information, which the documents do support.
export function DashboardPage() {
  const { user } = useSession()

  return (
    <>
      <PageTitle kicker="Governance overview" title="Dashboard">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#636d66]">
          Role scope · {user ? ROLE_LABEL[user.role] : '—'}
        </p>
      </PageTitle>

      <div className="grid grid-cols-[1.3fr_.7fr] gap-5">
        <Panel>
          <p className="eyebrow">Analytics access</p>
          <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight">
            Dashboard analytics are available to all operator tiers.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#636d67]">
            The source documentation does not define a dashboard KPI set. This page intentionally leaves the
            analytical content unpopulated rather than introduce unapproved measures.
          </p>
          <div className="mt-10 flex items-center gap-3 border-t border-[#dfe0d8] pt-5">
            <span className="h-2 w-2 rounded-full bg-[#c99735]" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[.1em] text-[#666c66]">
              Metric definitions pending
            </span>
          </div>
        </Panel>

        <section className="bg-[#183a35] p-7 text-[#f8f5ec]">
          <p className="eyebrow text-[#bcd7c2]">Your operator scope</p>
          <dl className="mt-6 space-y-3 text-sm leading-5">
            <div className="flex justify-between gap-4 border-b border-white/15 pb-2">
              <dt className="text-[#c5d4c7]">Signed in as</dt>
              <dd className="truncate text-right">{user?.email}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/15 pb-2">
              <dt className="text-[#c5d4c7]">Role</dt>
              <dd className="text-right">{user ? ROLE_LABEL[user.role] : '—'}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/15 pb-2">
              <dt className="text-[#c5d4c7]">Moderation decisions</dt>
              <dd className="text-right">{can(user?.permissions, PERMISSIONS.moderationDecide) ? 'Yes' : 'No'}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/15 pb-2">
              <dt className="text-[#c5d4c7]">Log download (CSV)</dt>
              <dd className="text-right">{can(user?.permissions, PERMISSIONS.auditExport) ? 'Yes' : 'No'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#c5d4c7]">System settings</dt>
              <dd className="text-right">{can(user?.permissions, PERMISSIONS.settingsManage) ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  )
}
