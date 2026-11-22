import { Link } from 'react-router-dom'
import { useSession } from '../../app/SessionContext'
import { useApi } from '../../lib/useApi'
import { can, PERMISSIONS } from '../../lib/permissions'
import { EmptyState, ErrorState } from '../../components/ui/primitives'
import type { AuditEvent, DashboardAnalytics } from '../../lib/types'

// Dashboard (CON-DASH-001): the analytics cell shows live counts served by
// GET /api/v1/analytics/dashboard — raw aggregates over the platform's own
// tables, never derived, projected or hard-coded figures (D-098; Chapter 5
// Figure 4.6 "summary metric cards"). The restyle bands — hero, control-centre
// links and a read-only recent-audit card fed by the same permission-gated
// /audit endpoint every tier can read — are unchanged.
export function DashboardPage() {
  const { user } = useSession()
  const recent = useApi<AuditEvent[]>('/api/v1/audit?size=4')
  const analytics = useApi<DashboardAnalytics>('/api/v1/analytics/dashboard')
  const firstName = user?.fullName.split(' ')[0] ?? 'operator'
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const a = analytics.data
  const maxEvents = a ? Math.max(...a.trend.map((p) => p.events), 1) : 1
  const decided7d =
    a ? a.decisions7d.approved + a.decisions7d.rejected + a.decisions7d.escalated : 0

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

      {/* Live analytics + recent audit */}
      <div className="kz-dash-grid mt-6">
        <div className="kz-card kz-dash-cell">
          <div className="flex items-center justify-between border-b border-[#e3e8e1] px-6 py-4">
            <div>
              <h3 className="text-sm font-medium">Dashboard analytics</h3>
              <p className="mt-1 text-xs text-[#7a847e]">Live counts from the platform database.</p>
            </div>
            {a && <span className="kz-livepill">Live data</span>}
          </div>
          {analytics.loading && !a ? (
            <div className="px-6 py-6" aria-hidden="true">
              <div className="kz-kpi-grid">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="kz-kpi">
                    <span className="kz-skeleton kz-sk-label" />
                    <span className="kz-skeleton kz-sk-num" />
                    <span className="kz-skeleton kz-sk-sub" />
                  </div>
                ))}
              </div>
              <div className="kz-skeleton kz-sk-trend mt-3" />
            </div>
          ) : analytics.error ? (
            <div className="px-6 py-8">
              <ErrorState message={analytics.error} hint="Counts come from the live database. Retry shortly." />
            </div>
          ) : a ? (
            <>
              <div className="kz-kpi-grid px-6 pt-6">
                {[
                  {
                    label: 'Accounts',
                    num: a.accounts.total,
                    sub: `${a.accounts.active} active · ${a.accounts.suspended} suspended · ${a.accounts.terminated} terminated`,
                  },
                  {
                    label: 'Moderation queue',
                    num: a.queue.pending,
                    sub: `${a.queue.escalated} escalated · ${a.queue.highSeverityPending} high-severity · ${a.queue.resolved} resolved`,
                  },
                  {
                    label: 'Operator decisions · 7 days',
                    num: decided7d,
                    sub: `${a.decisions7d.approved} approved · ${a.decisions7d.rejected} rejected · ${a.decisions7d.escalated} escalated`,
                  },
                  {
                    label: 'Audit trail',
                    num: a.audit.total,
                    sub: `${a.audit.last24h} in 24 h · ${a.audit.last7d} in 7 days`,
                  },
                ].map((k) => (
                  <div key={k.label} className="kz-kpi">
                    <p className="kz-kpi-label">{k.label}</p>
                    <p className="kz-kpi-num">{k.num}</p>
                    <p className="kz-kpi-sub">{k.sub}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pt-3">
                {a.trend.every((p) => p.events === 0) ? (
                  <EmptyState
                    title="No audit events in the last 14 days."
                    hint="Activity appears here as operators use the console."
                  />
                ) : (
                  <figure className="kz-trend">
                    <div className="kz-trend-bars" aria-hidden="true">
                      {a.trend.map((p) => (
                        <span key={p.day} className="kz-trend-bar" title={`${p.day}: ${p.events}`}>
                          <span
                            className="kz-trend-fill"
                            style={{ height: `${Math.max((p.events / maxEvents) * 100, p.events > 0 ? 10 : 3)}%` }}
                          />
                        </span>
                      ))}
                    </div>
                    <figcaption className="kz-trend-cap">Audit events · last 14 days</figcaption>
                  </figure>
                )}
                <p className="sr-only">
                  Audit events per day over the last 14 days:{' '}
                  {a.trend.map((p) => `${p.day}: ${p.events}`).join(', ')}.
                </p>
              </div>
            </>
          ) : null}
          <p className="kz-analytics-foot">
            <span aria-hidden="true">◉</span> Live counts · computed from the database · no derived or projected
            figures
          </p>
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
