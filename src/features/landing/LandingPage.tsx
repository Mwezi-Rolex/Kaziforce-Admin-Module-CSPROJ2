import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/ui/primitives'

// CON-WEB-001: minimal landing page, designed strictly from the export's
// tokens (colors, Newsreader/Work Sans/DM Mono, 2px radii). No fabricated
// product claims — it introduces the governance console and links to sign-in.
export function LandingPage() {
  return (
    <div className="login-shell" style={{ gridTemplateColumns: '1fr' }}>
      <div className="login-rule" aria-hidden="true" />
      <section className="mx-auto flex w-full max-w-3xl flex-col items-start justify-center px-8 py-24">
        <div className="mb-10 flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="font-serif text-xl leading-none">Kaziforce</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[.2em] text-[#798078]">Governance console</p>
          </div>
        </div>
        <p className="eyebrow">Admin &amp; moderation module</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-[#17332f]">
          Accountable
          <br />
          by design.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-6 text-[#627069]">
          The governance layer of the digital workforce marketplace: role-based operator access, a
          human-in-the-loop content moderation queue, and an immutable audit record of every decision.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link to="/login" className="primary-button">
            Operator sign in <span aria-hidden="true">→</span>
          </Link>
        </div>
        <dl className="mt-16 grid w-full gap-6 border-t border-[#deded4] pt-8 sm:grid-cols-3">
          {[
            ['Role-based access', 'Viewer, Moderator and Super Admin tiers, enforced on every request.'],
            ['Moderation queue', 'Approve, reject, or escalate flagged listings, reviews, and portfolios.'],
            ['Immutable audit log', 'An append-only record of every operator action, with CSV export.'],
          ].map(([term, desc]) => (
            <div key={term}>
              <dt className="font-serif text-lg">{term}</dt>
              <dd className="mt-2 text-xs leading-5 text-[#68736c]">{desc}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
