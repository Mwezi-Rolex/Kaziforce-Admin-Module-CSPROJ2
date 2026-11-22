import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AccessDenied, RequireAuth } from './app/guards'
import { ConsoleLayout } from './app/layouts/ConsoleLayout'
import { PublicLayout } from './app/layouts/PublicLayout'
import { LoginPage } from './features/auth/LoginPage'
import { LandingPage } from './features/landing/LandingPage'
import { NotFoundPage } from './features/NotFoundPage'
import { PERMISSIONS, can } from './lib/permissions'
import { useSession } from './app/SessionContext'
import { Loading } from './components/ui/primitives'

// Route-level code splitting (docs/PERFORMANCE.md): each console screen loads
// on demand, so the initial bundle carries only the shell + landing + login.
// Landing and login stay eager — they are the first paint.
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const UsersPage = lazy(() => import('./features/users/UsersPage').then((m) => ({ default: m.UsersPage })))
const QueuePage = lazy(() => import('./features/moderation/QueuePage').then((m) => ({ default: m.QueuePage })))
const AuditPage = lazy(() => import('./features/audit/AuditPage').then((m) => ({ default: m.AuditPage })))
const SettingsPage = lazy(() => import('./features/settings/SettingsPage').then((m) => ({ default: m.SettingsPage })))

// /console/settings is Super Admin only (CON-SET-001); the sidebar hides the
// entry and the guard defends the route itself (server enforces the API side).
function SettingsGate() {
  const { user } = useSession()
  if (!user) return <Loading label="Checking access…" />
  if (!can(user.permissions, PERMISSIONS.settingsManage)) return <AccessDenied requiredPermission={PERMISSIONS.settingsManage} />
  return <SettingsPage />
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/console"
        element={
          <RequireAuth>
            <ConsoleLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/console/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<Loading label="Loading screen…" />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <Suspense fallback={<Loading label="Loading screen…" />}>
              <UsersPage />
            </Suspense>
          }
        />
        <Route
          path="queue"
          element={
            <Suspense fallback={<Loading label="Loading screen…" />}>
              <QueuePage />
            </Suspense>
          }
        />
        <Route
          path="audit"
          element={
            <Suspense fallback={<Loading label="Loading screen…" />}>
              <AuditPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<Loading label="Loading screen…" />}>
              <SettingsGate />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
