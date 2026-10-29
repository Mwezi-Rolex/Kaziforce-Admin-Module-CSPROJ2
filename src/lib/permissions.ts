import type { Role } from './types'

// Client-side mirror of the server's permission matrix (seed.ts ROLE_MATRIX).
// The server is the enforcement point; this only drives visibility (hide
// controls the role cannot use) and never authorizes anything by itself.
export const PERMISSIONS = {
  usersView: 'users.view',
  usersSuspend: 'users.suspend',
  usersAssignRole: 'users.assign_role',
  usersBan: 'users.ban',
  moderationDecide: 'moderation.decide',
  auditView: 'audit.view',
  auditExport: 'audit.export',
  settingsManage: 'settings.manage',
} as const

export const ROLE_LABEL: Record<Role, string> = {
  viewer: 'Viewer',
  moderator: 'Moderator',
  super_admin: 'Super Admin',
}

export function can(permissions: string[] | undefined, key: string): boolean {
  return Boolean(permissions?.includes(key))
}
