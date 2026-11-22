import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PERMISSIONS, ROLE_LABEL, can } from '../../lib/permissions'
import { useSession } from '../SessionContext'

type NavEntry = { to: string; label: string; glyph: string; permission?: string }

// Console shell restyled to the Figma Make design (CS Project II v3):
// dark forest rail with a four-item workspace menu — System Settings moved to
// a header control, shown only to operators holding settings.manage
// (CON-SET-001; RESTYLE_GUIDE §5.2). The route and its SettingsGate are unchanged.
const NAV: NavEntry[] = [
  { to: '/console/dashboard', label: 'Dashboard Analytics', glyph: '▦' },
  { to: '/console/users', label: 'User Control Centre', glyph: '◎', permission: PERMISSIONS.usersView },
  { to: '/console/queue', label: 'Moderation Queue', glyph: '≡', permission: PERMISSIONS.auditView },
  { to: '/console/audit', label: 'Audit Explorer', glyph: '◫', permission: PERMISSIONS.auditView },
]

const TITLES: Record<string, string> = {
  '/console/dashboard': 'Dashboard Analytics',
  '/console/users': 'User Control Centre',
  '/console/queue': 'Moderation Queue',
  '/console/audit': 'Audit Explorer',
  '/console/settings': 'System Settings',
}

export function ConsoleLayout() {
  const { user, logout } = useSession()
  const navigate = useNavigate()
  const location = useLocation()
  if (!user) return null

  const pageTitle = TITLES[location.pathname] ?? 'Workspace'
  const isSettings = location.pathname === '/console/settings'

  return (
    <div className="kz-console">
      <a
        href="#console-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#d1f77b] focus:px-3 focus:py-2 focus:text-sm focus:text-[#103e32]"
      >
        Skip to content
      </a>

      {/* ---- Rail ---------------------------------------------------------- */}
      <aside className="kz-rail">
        <div className="kz-rail-brand">
          <span className="kz-rail-logo" aria-hidden="true">
            K
          </span>
          <span className="kz-rail-brand-name">Kaziforce</span>
          <span className="kz-rail-brand-sub">Governance console</span>
        </div>

        <p className="kz-rail-status">
          <span className="kz-rail-status-dot" aria-hidden="true" />
          Marketplace workspace
        </p>

        <p className="kz-rail-label">Workspace</p>
        <nav className="kz-rail-nav" aria-label="Console">
          {NAV.filter((entry) => !entry.permission || can(user.permissions, entry.permission)).map((entry) => (
            <NavLink
              key={entry.to}
              to={entry.to}
              className={({ isActive }) => `kz-rail-item ${isActive ? 'kz-rail-active' : ''}`}
            >
              <span className="kz-rail-glyph" aria-hidden="true">
                {entry.glyph}
              </span>
              <span>{entry.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="kz-rail-foot">
          <p className="kz-rail-trust">
            Trust is built.
            <br />
            <em>One decision at a time.</em>
          </p>
          <hr className="kz-rail-rule" />
          <p className="kz-rail-copy">A fairer digital workforce starts with accountable governance.</p>
          <div className="kz-rail-session">
            <p className="kz-rail-session-label">
              <span aria-hidden="true">🔒</span> Session access <span className="kz-rail-demo">Demo</span>
            </p>
            <p className="kz-rail-session-role">{ROLE_LABEL[user.role]}</p>
            <p className="kz-rail-session-note">Access is verified on the server.</p>
          </div>
          <div className="kz-rail-operator">
            <span className="kz-rail-avatar" aria-hidden="true">
              {user.fullName.slice(0, 2).toUpperCase()}
            </span>
            <div className="kz-rail-operator-meta">
              <p className="kz-rail-operator-name">{user.fullName}</p>
              <p className="kz-rail-operator-role">{ROLE_LABEL[user.role]}</p>
            </div>
            <button
              type="button"
              className="kz-rail-signout"
              aria-label="Sign out"
              onClick={async () => {
                await logout()
                navigate('/login')
              }}
            >
              ⎋
            </button>
          </div>
        </div>
      </aside>

      {/* ---- Main ---------------------------------------------------------- */}
      <div className="kz-main">
        <header className="kz-header">
          <nav className="kz-breadcrumb" aria-label="Breadcrumb">
            <span className="kz-breadcrumb-glyph" aria-hidden="true">
              ▦
            </span>
            <span>Workspace</span>
            <span aria-hidden="true" className="kz-breadcrumb-sep">
              ›
            </span>
            <span aria-current="page">{pageTitle}</span>
          </nav>
          <div className="kz-header-meta">
            <span className="kz-header-note">
              <span className="kz-header-note-dot" aria-hidden="true" /> Sample workspace · saved records
            </span>
            <span className="kz-role-chip">
              <span aria-hidden="true">🛡</span> {ROLE_LABEL[user.role]}
            </span>
            {can(user.permissions, PERMISSIONS.settingsManage) && (
              <Link
                to="/console/settings"
                className={`kz-header-settings ${isSettings ? 'kz-header-settings-active' : ''}`}
              >
                <span aria-hidden="true">⚙</span> System Settings
              </Link>
            )}
          </div>
        </header>
        <main id="console-content" className="kz-content">
          <Outlet />
        </main>
        <footer className="kz-console-footer">
          <p className="kz-console-footer-left">
            <span aria-hidden="true">🛡</span> <em className="kz-serif-lg-inline">Accountability, by design.</em>
          </p>
          <p className="kz-console-footer-right">Operator actions are recorded · All times UTC</p>
        </footer>
      </div>
    </div>
  )
}
