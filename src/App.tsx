import { Navigate, Route, Routes } from 'react-router-dom'
import { AccessDenied, RequireAuth } from './app/guards'
import { ConsoleLayout } from './app/layouts/ConsoleLayout'
import { PublicLayout } from './app/layouts/PublicLayout'
import { LoginPage } from './features/auth/LoginPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { AuditPage } from './features/audit/AuditPage'
import { LandingPage } from './features/landing/LandingPage'
import { QueuePage } from './features/moderation/QueuePage'
import { NotFoundPage } from './features/NotFoundPage'
import { SettingsPage } from './features/settings/SettingsPage'
import { UsersPage } from './features/users/UsersPage'
import { PERMISSIONS, can } from './lib/permissions'
import { useSession } from './app/SessionContext'
import { Loading } from './components/ui/primitives'

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
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="queue" element={<QueuePage />} />
        <Route path="audit" element={<AuditPage />} />
        <Route path="settings" element={<SettingsGate />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
