import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/ui/primitives'

// Public landing (CON-WEB-001, restyled to the image-heavy Figma Make design —
// CS Project II v3). Photography: Pexels, credited in public/images/CREDITS.md.
// No fabricated claims: the facts band states what the console actually does.
export function LandingPage() {
  return (
    <div className="kz-public">
      {/* ---- Hero: copy + full-bleed story photo -------------------------- */}
      <section className="kz-hero">
        <div className="kz-hero-copy">
          <span className="kz-kicker">
            <span />
            Admin &amp; moderation module
          </span>
          <h1 className="kz-serif-xl mt-6" style={{ color: '#173e32' }}>
            A fairer marketplace.
            <br />
            <em>A stronger workforce.</em>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-6 text-[#7a847e]">
            The governance layer of the digital workforce marketplace: role-based operator
            access, human-in-the-loop moderation, and an immutable record of every decision.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/login" className="kz-cta">
              Enter your workspace <span aria-hidden="true">→</span>
            </Link>
            <a href="#how-it-works" className="kz-cta ghost">
              See how it works
            </a>
          </div>
        </div>
        <div className="kz-hero-story">
          <img
            src="/images/workforce-studio.png"
            alt="Digital professionals collaborating in a sunlit studio"
          />
          <div className="kz-hero-story-overlay" />
          <span className="kz-kicker">
            <span />
            The people behind the platform
          </span>
          <div className="kz-hero-story-copy">
            <h2>
              Good work starts
              <br />
              with <em>trust.</em>
            </h2>
            <p>
              Every thoughtful review. Every fair decision.
              <br />A stronger digital workforce for Africa.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Facts: what the console actually does ------------------------ */}
      <section className="kz-band">
        <div className="kz-band-inner">
          <span className="kz-band-label">
            <span />
            At a glance
          </span>
          <h2 className="kz-h2 mt-4 max-w-xl">
            Governance you can <em>check,</em> not just trust.
          </h2>
          <dl className="kz-facts mt-10">
            {[
              ['3 permission tiers', 'Viewer, Moderator and Super Admin — enforced on every request, before any handler runs.'],
              ['Every action recorded', 'Sign-ins, decisions, sanctions and configuration changes are written to an append-only ledger.'],
              ['One immutable record', 'The audit log accepts INSERT and SELECT only — history cannot be rewritten, by the app or the database.'],
            ].map(([term, desc]) => (
              <div key={term} className="kz-fact">
                <dt>{term}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- How it works: three photographed steps ----------------------- */}
      <section className="kz-band" id="how-it-works">
        <div className="kz-band-inner">
          <span className="kz-band-label">
            <span />
            How Kaziforce works
          </span>
          <h2 className="kz-h2 mt-4 max-w-2xl">
            From report to record, <em>one considered path.</em>
          </h2>
          <div className="kz-steps mt-10">
            {[
              {
                img: '/images/workforce-collab.jpg',
                no: 'Step 01',
                title: 'The marketplace reports',
                desc: 'Flagged listings, reviews and portfolios arrive from the marketplace with context, category and history.',
              },
              {
                img: '/images/workforce-review.jpg',
                no: 'Step 02',
                title: 'A human reviews',
                desc: 'Operators see the report, the content and the account — severity-ranked, with suggestions that never decide.',
              },
              {
                img: '/images/workforce-hands.jpg',
                no: 'Step 03',
                title: 'The record remains',
                desc: 'Every approve, reject and escalation is written to an append-only ledger with provenance — exportable as CSV.',
              },
            ].map((s) => (
              <article key={s.no} className="kz-step-card">
                <img src={s.img} alt="" loading="lazy" />
                <div className="kz-step-card-body">
                  <p className="kz-step-no">{s.no}</p>
                  <h3 className="mt-1">{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Story band: the accountability statement --------------------- */}
      <section className="kz-band">
        <div className="kz-band-inner">
          <div className="kz-story-band">
            <img src="/images/workforce-trust.jpg" alt="" loading="lazy" />
            <div className="kz-story-band-overlay" />
            <div className="kz-story-band-copy">
              <span className="kz-kicker">
                <span />
                Human decisions. Lasting accountability.
              </span>
              <h2 className="mt-4">
                Trust is the product.
                <br />
                The ledger is <em>the proof.</em>
              </h2>
              <p>
                Moderators review with full context. Super Admins escalate with care. Nothing is
                decided by the model, and nothing disappears from the record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- People: the three operator tiers ----------------------------- */}
      <section className="kz-band">
        <div className="kz-band-inner">
          <span className="kz-band-label">
            <span />
            Operator tiers
          </span>
          <h2 className="kz-h2 mt-4 max-w-2xl">
            Three levels of authority, <em>one record.</em>
          </h2>
          <div className="kz-people mt-10">
            {[
              {
                img: '/images/operator-portrait-2.jpg',
                tier: 'Viewer',
                desc: 'Sees the queue and the audit log — the read-only tier.',
              },
              {
                img: '/images/operator-portrait-1.jpg',
                tier: 'Moderator',
                desc: 'Decides on flags, suspends platform accounts, exports the audit log.',
              },
              {
                img: '/images/operator-portrait-3.jpg',
                tier: 'Super Admin',
                desc: 'Assigns roles, bans accounts, unlocks logins, controls settings.',
              },
            ].map((p) => (
              <figure key={p.tier} className="kz-person">
                <img src={p.img} alt={`Illustrative portrait for the ${p.tier} operator tier`} loading="lazy" />
                <figcaption className="kz-person-caption">
                  <h3>{p.tier}</h3>
                  <p>{p.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#7a847e]">
            Portraits are illustrative (Pexels); the demo operators are seeded separately.
          </p>
        </div>
      </section>

      {/* ---- CTA ---------------------------------------------------------- */}
      <section className="kz-band">
        <div className="kz-band-inner">
          <div className="kz-cta-band">
            <div>
              <h2>
                Ready to see governance <em>that holds?</em>
              </h2>
              <p>Sign in with a demo operator, or bring the marketplace reports.</p>
            </div>
            <Link to="/login" className="kz-cta lime">
              Operator sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="font-serif text-lg leading-none">Kaziforce</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-[#646d66]">
                Governance console
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
