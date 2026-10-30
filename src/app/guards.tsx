import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Panel } from '../components/ui/primitives'
import { useSession } from './SessionContext'

// Route guards. Unauthenticated -> /login (remembering where the user was
// going). Authorization is enforced server-side; these guards only prevent
// rendering UI the session cannot use.
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useSession()
  const location = useLocation()
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center" role="status" aria-live="polite">
        <p className="eyebrow">Restoring session…</p>
      </div>
    )
  }
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  return <>{children}</>
}

export function AccessDenied({ requiredPermission }: { requiredPermission: string }) {
  return (
    <Panel>
      <p className="eyebrow">Access denied</p>
      <h1 className="mt-3 font-serif text-3xl">You are not authorised to open this area.</h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-[#636d67]">
        This screen requires the <span className="mono">{requiredPermission}</span> permission, which your
        operator role does not hold. If you believe this is an error, contact a Super Admin.
      </p>
    </Panel>
  )
}
