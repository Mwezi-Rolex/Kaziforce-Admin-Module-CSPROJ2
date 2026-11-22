import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { BrandMark, ErrorState, Field } from '../../components/ui/primitives'
import { ApiError } from '../../lib/api'
import { useSession } from '../../app/SessionContext'

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Enter your password'),
})

// CON-AUTH-001/002: real sign-in against the API; the returned session's role
// drives everything. No prefilled credentials, no role switcher.
// Presentation follows the owner's Figma Make design (CS Project II v3,
// PublicScreen login variant): copy + form on the left, the workforce story
// photo panel on the right. All form logic is unchanged.
export function LoginPage() {
  const { login } = useSession()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setApiError(null)
    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      const errs: { email?: string; password?: string } = {}
      for (const issue of parsed.error.issues) errs[issue.path[0] as 'email' | 'password'] = issue.message
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setSubmitting(true)
    try {
      await login(parsed.data.email, parsed.data.password)
      const from = (location.state as { from?: string } | null)?.from
      navigate(from && from.startsWith('/console') ? from : '/console', { replace: true })
    } catch (err) {
      setApiError(err instanceof ApiError ? err.message : 'Sign-in failed. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="kz-public">
      <a
        href="#login-form"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#103e32] focus:px-3 focus:py-2 focus:text-sm focus:text-[#fcfaf2]"
      >
        Skip to the sign-in form
      </a>
      <div className="kz-hero">
        <div className="kz-hero-copy">
          <div className="mb-10 flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="font-serif text-xl leading-none">Kaziforce</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[.2em] text-[#7a847e]">
                Governance console
              </p>
            </div>
          </div>
          <span className="kz-kicker">
            <span />
            Operator access
          </span>
          <h1 className="kz-serif-xl mt-5" style={{ color: '#173e32' }}>
            Welcome back.
            <br />
            <em>Make a difference.</em>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#7a847e]">
            A safer marketplace starts with the people who care for it. Sign in to your
            workspace.
          </p>

          <form
            id="login-form"
            onSubmit={onSubmit}
            className="mt-9 max-w-md space-y-4"
            noValidate
            aria-label="Operator sign-in"
          >
            {apiError && <ErrorState message={apiError} />}
            <Field label="Email" htmlFor="login-email">
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
                required
                className="kz-field"
              />
              {fieldErrors.email && (
                <span id="login-email-error" role="alert" className="mt-1 block text-xs normal-case tracking-normal text-[#963721]">
                  {fieldErrors.email}
                </span>
              )}
            </Field>
            <Field label="Password" htmlFor="login-password">
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
                required
                className="kz-field"
              />
              {fieldErrors.password && (
                <span id="login-password-error" role="alert" className="mt-1 block text-xs normal-case tracking-normal text-[#963721]">
                  {fieldErrors.password}
                </span>
              )}
            </Field>
            <button type="submit" className="kz-cta w-full justify-between" disabled={submitting}>
              {submitting ? 'Authenticating…' : 'Authenticate'}
              <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="mt-8 max-w-md text-xs leading-5 text-[#7a847e]">
            Demo operators are seeded by the server seed script (viewer@, moderator@,
            superadmin@kaziforce.local). Passwords are printed by <span className="mono">npm run seed</span>{' '}
            and are for local use only.
          </p>
          <Link to="/" className="mt-6 inline-block text-xs text-[#7a847e] underline">
            ← Back to overview
          </Link>
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
              A safer marketplace
              <br />
              starts with <em>you.</em>
            </h2>
            <p>
              Human decisions. Lasting accountability.
              <br />A stronger digital workforce for Africa.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
