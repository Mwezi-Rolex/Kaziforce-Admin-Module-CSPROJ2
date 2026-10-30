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
    <main className="login-shell">
      <div className="login-rule" aria-hidden="true" />
      <section className="login-card">
        <div className="mb-12 flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="font-serif text-xl">Kaziforce</p>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#666c65]">Governance console</p>
          </div>
        </div>
        <p className="eyebrow">Operator access</p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.02] text-[#17332f]">
          Accountable
          <br />
          by design.
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-6 text-[#606e67]">
          Sign in to access the marketplace governance system. Your role claim determines the actions available to you.
        </p>
        {apiError && (
          <div className="mt-6">
            <ErrorState message={apiError} />
          </div>
        )}
        <form onSubmit={onSubmit} className="mt-10 space-y-4" noValidate>
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
            />
            {fieldErrors.password && (
              <span id="login-password-error" role="alert" className="mt-1 block text-xs normal-case tracking-normal text-[#963721]">
                {fieldErrors.password}
              </span>
            )}
          </Field>
          <button type="submit" className="primary-button mt-3 w-full" disabled={submitting}>
            {submitting ? 'Authenticating…' : 'Authenticate'} <span aria-hidden="true">→</span>
          </button>
        </form>
        <div className="mt-8 border-t border-[#deded4] pt-4 font-mono text-[9px] uppercase tracking-[.1em] text-[#666d66]">
          JWT session · role-gated routes · secure credential validation
        </div>
        <div className="mt-4 text-xs leading-5 text-[#656d66]">
          Demo operators are seeded by the server seed script (viewer@, moderator@, superadmin@kaziforce.local).
          Passwords are printed by <span className="mono">npm run seed</span> and are for local use only.
        </div>
        <div className="mt-4">
          <Link to="/" className="text-xs text-[#636d66] underline">
            ← Back to overview
          </Link>
        </div>
      </section>
      <aside className="login-aside">
        <div>
          <p className="eyebrow text-[#b9d6bd]">Governance layer</p>
          <p className="mt-5 max-w-xs font-serif text-3xl leading-tight">
            Every decision is traceable. Every action is accountable.
          </p>
        </div>
        <div className="border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-[.16em] text-[#c5d4c7]">
          Digital workforce marketplace
          <br />
          Web operator interface
        </div>
      </aside>
    </main>
  )
}
