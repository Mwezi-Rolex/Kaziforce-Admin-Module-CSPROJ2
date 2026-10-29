import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BrandMark, Pill } from '../../components/ui/primitives'
import { PERMISSIONS, ROLE_LABEL, can } from '../../lib/permissions'
import { useSession } from '../SessionContext'

type NavEntry = { to: string; label: string; glyph: string; permission?: string }

// Ch5 §3.4.6 wireframes: persistent left navigation rail across the four
// domains plus Super-Admin settings. Entries the session lacks permission for
// are hidden entirely; the queue count badge appears only with real data.
const NAV: NavEntry[] = [
  { to: '/console/dashboard', label: 'Dashboard Analytics', glyph: '▦' },
  { to: '/console/users', label: 'User Control Centre', glyph: '◎', permission: PERMISSIONS.usersView },
  { to: '/console/queue', label: 'Moderation Queue', glyph: '≡', permission: PERMISSIONS.auditView },
  { to: '/console/audit', label: 'Audit Explorer', glyph: '◫', permission: PERMISSIONS.auditView },
  { to: '/console/settings', label: 'System Settings', glyph: '⚙', permission: PERMISSIONS.settingsManage },
]

export function ConsoleLayout() {
  const { user, logout } = useSession()
  const navigate = useNavigate()
  if (!user) return null

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17332f]">
      <a
        href="#console-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#183a35] focus:px-3 focus:py-2 focus:text-sm focus:text-[#fcfaf2]"
      >
        Skip to content
      </a>
      <aside className="console-sidebar fixed inset-y-0 left-0 z-20 flex w-[252px] flex-col border-r border-[#d8d8ce] bg-[#eeece3] px-4 py-5">
        <div className="flex items-center gap-3 px-2">
          <BrandMark />
          <div>
            <p className="font-serif text-lg leading-none">Kaziforce</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-[#6c756e]">Governance console</p>
          </div>
        </div>
        <div className="mt-12 px-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#7c817a]">Operations</div>
        <nav className="mt-3 space-y-1" aria-label="Console">
          {NAV.filter((entry) => !entry.permission || can(user.permissions, entry.permission)).map((entry) => (
            <NavLink
              key={entry.to}
              to={entry.to}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`}
            >
              <span className="grid h-5 w-5 place-items-center text-[15px] leading-none" aria-hidden="true">
                {entry.glyph}
              </span>
              <span>{entry.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-[#d8d8ce] pt-4">
          <div className="flex items-center gap-3 px-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#d5caae] font-serif text-sm" aria-hidden="true">
              {user.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{user.fullName}</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#747a72]">{ROLE_LABEL[user.role]}</p>
            </div>
          </div>
          <div className="mt-3 px-2">
            <button
              className="minor-button w-full"
              onClick={async () => {
                await logout()
                navigate('/login')
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>
      <section className="ml-[252px] min-h-screen">
        <header className="flex h-[76px] items-center justify-between border-b border-[#deded5] bg-[#faf9f4] px-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[.15em] text-[#718078]">Authenticated · JWT session verified</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#3e7d5b]" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-3">
            <Pill tone="active">{ROLE_LABEL[user.role]}</Pill>
            <span className="font-mono text-[10px] uppercase tracking-[.12em] text-[#7a8179]">{user.email}</span>
          </div>
        </header>
        <div id="console-content" className="mx-auto max-w-[1440px] px-10 py-9">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
