import { Link, Outlet } from 'react-router-dom'
import { BrandMark } from '../../components/ui/primitives'

// Bare public site shell (BRIEF: landing, login, 404 only).
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9f6] text-[#173e32]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#103e32] focus:px-3 focus:py-2 focus:text-sm focus:text-[#fcfaf2]"
      >
        Skip to content
      </a>
      <header className="flex h-[64px] items-center justify-between border-b border-[#e3e8e1] bg-[#fcfdf8] px-8">
        <Link to="/" className="flex items-center gap-3">
          <BrandMark />
          <span className="font-serif text-lg">Kaziforce</span>
          <span className="font-mono text-[9px] uppercase tracking-[.18em] text-[#646d66]">Governance console</span>
        </Link>
        <Link to="/login" className="minor-button">
          Operator sign in
        </Link>
      </header>
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-[#e3e8e1] bg-[#fcfdf8] px-8 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[#666c66]">
          Kaziforce · admin &amp; moderation module · capstone build
        </p>
      </footer>
    </div>
  )
}
