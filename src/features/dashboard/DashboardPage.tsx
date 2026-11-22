import { Link } from 'react-router-dom'
import { useSession } from '../../app/SessionContext'
import { useApi } from '../../lib/useApi'
import { can, PERMISSIONS, ROLE_LABEL } from '../../lib/permissions'
import type { AuditEvent } from '../../lib/types'

// Dashboard (CON-DASH-001): the documents define no KPI set, so analytics stay
// deliberately unpopulated (OQ-2). The restyle adds the F-layout bands — hero,
// control-centre links, analytics placeholder and a read-only recent-audit
// card fed by the same permission-gated /audit endpoint every tier can read.
// No invented metrics: "Meaningful measures come first." stays the rule.
export function DashboardPage() {
  const { user } = useSession()
  const recent = useApi<AuditEvent[]>('/api/v1/audit?size=4')
  const firstName = user?.fullName.split(' ')[0] ?? 'operator'
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="kz-dashboard">
      <p className="eyebrow">Your daily overview</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <h1>
          Welcome back, <em className="kz-serif-em">{firstName}.</em>
        </h1>
        <span className="kz-date-chip">
          <span aria-hidden="true">🗓</span> {today}
        </span>
      </div>
      <p className="kz-sub">A clear view of your workspace. A considered approach to every decision.</p>

      {/* Hero band */}
      <div className="kz-dash-hero">
        <img src="/images/workforce-collab.jpg" alt="" loading="lazy" />
        <div className="kz-dash-hero-overlay" />
        <div className="kz-dash-hero-copy">
          <span className="kz-kicker">
            <span />
            People first. Always.
          </span>
          <h2 className="kz-dash-hero-title">
            Good work starts
            <br />
            with <em>trust.</em>
          </h2>
          <p>Creating a safer, fairer marketplace for Africa's digital workforce.</p>
          <Link to="/console/audit" className="kz-cta lime">
            Explore the audit trail <span aria-hidden="true">→</span>
          </Link>
        </div>
        <span className="kz-dash-hero-caption">BUILT AROUND REAL PEOPLE</span>
      </div>

      {/* Control centre cards */}
      <div className="mt-10 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-medium">Your control centre</h2>
        <p className="text-xs text-[#7a847e]">Purposeful tools. Clear responsibilities.</p>
      </div>
      <div className="kz-control-cards mt-4">
        {[
          {
            to: '/console/users',
            glyph: '◎',
            title: 'People & permissions',
            desc: 'Review account history and manage access with care.',
            link: 'User Control Centre',
            show: can(user?.permissions, PERMISSIONS.usersView),
          },
          {
            to: '/console/queue',
            glyph: '≡',
            title: 'Decisions that matter',
            desc: 'Review flagged content. Keep human judgment at the centre.',
            link: 'Moderation Queue',
            show: can(user?.permissions, PERMISSIONS.auditView),
          },
          {
            to: '/console/audit',
            glyph: '◫',
            title: 'A record you can trust',
            desc: 'Follow every operator action through a read-only audit trail.',
            link: 'Audit Explorer',
            show: can(user?.permissions, PERMISSIONS.auditView),
          },
        ]
          .filter((c) => c.show)
          .map((c) => (
            <Link key={c.to} to={c.to} className="kz-control-card">
              <div className="flex items-start justify-between">
                <span className="kz-control-glyph" aria-hidden="true">
                  {c.glyph}
                </span>
                <span aria-hidden="true" className="kz-control-arrow">
                  ↗
                </span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="kz-control-link">
                {c.link} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
      </div>

      {/* Analytics placeholder + recent audit */}
      <div className="kz-dash-grid mt-6">
        <div className="kz-card kz-dash-cell">
          <div className="flex items-center justify-between border-b border-[#e3e8e1] px-6 py-4">
            <h3 className="text-sm font-medium">Dashboard analytics</h3>
            <span className="kz-notconfigured">Not configured</span>
          </div>
          <div className="grid min-h-[280px] place-items-center px-8 text-center">
            <div>
              <p className="kz-serif-lg">Meaningful measures come first.</p>
              <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-[#7a847e]">
                Analytics will appear here once the project's KPI definitions have been approved.
              </p>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[1.4px] text-[#739055]">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#d1f77b] align-middle" aria-hidden="true" />
                No unverified metrics displayed
              </p>
            </div>
          </div>
        </div>

        <div className="kz-card kz-dash-cell">
          <div className="flex items-center justify-between border-b border-[#e3e8e1] px-6 py-4">
            <div>
              <h3 className="text-sm font-medium">Recent audit activity</h3>
              <p className="mt-1 text-xs text-[#7a847e]">A traceable record of operator decisions.</p>
            </div>
            <Link to="/console/audit" className="text-xs text-[#103e32] underline underline-offset-2">
              View all
            </Link>
          </div>
          {recent.error ? (
            <p className="px-6 py-6 text-xs text-[#a83f27]">{recent.error}</p>
          ) : (
            <ul>
              {(recent.data ?? []).map((e) => (
                <li key={e.id} className="flex items-center justify-between border-b border-[#eef2ec] px-6 py-4">
                  <div>
                    <p className="text-sm">{e.actionType}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-[#7a847e]">{e.operatorEmail ?? 'system'}</p>
                  </div>
                  <time className="font-mono text-[10px] text-[#7a847e]">
                    {new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </li>
              ))}
              {!recent.loading && (recent.data ?? []).length === 0 && (
                <li className="px-6 py-6 text-xs text-[#7a847e]">No events yet.</li>
              )}
            </ul>
          )}
          <p className="flex items-center gap-2 border-t border-[#e3e8e1] px-6 py-3 font-mono text-[9px] uppercase tracking-[1.2px] text-[#7a847e]">
            <span aria-hidden="true">🔒</span> Read-only record · INSERT-only audit model
          </p>
        </div>
      </div>
    </div>
  )
}
