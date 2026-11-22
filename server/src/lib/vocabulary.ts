// Vocabulary — the single place where every cross-cutting domain string lives:
// permission keys, role and status vocabularies, audit action names and error
// codes. Routes, services, middleware and the seed import from here instead of
// repeating literals; the database CHECK constraints (migrations) and the
// client mirror (src/lib/permissions.ts, src/lib/types.ts) stay authoritative
// on their own side and are covered against drift by tests/vocabulary.test.ts
// and the existing suites.
//
// History: these were literals scattered across routes and services (35
// permission literals, 12+ audit-action literals, 27 status literals) until
// refactor/deepen-modules collected them.

export const ROLE_NAMES = ['viewer', 'moderator', 'super_admin'] as const
export type RoleName = (typeof ROLE_NAMES)[number]

export const ACCOUNT_STATUSES = ['Active', 'Suspended', 'Terminated'] as const
export type AccountStatusName = (typeof ACCOUNT_STATUSES)[number]
/** Named access for references in queries and responses. */
export const ACCOUNT_STATUS = { Active: 'Active', Suspended: 'Suspended', Terminated: 'Terminated' } as const

export const FLAG_STATUSES = ['Pending', 'Approved', 'Rejected', 'Escalated'] as const
export type FlagStatusName = (typeof FLAG_STATUSES)[number]
export const FLAG_STATUS = { Pending: 'Pending', Approved: 'Approved', Rejected: 'Rejected', Escalated: 'Escalated' } as const

export const FLAG_SEVERITIES = ['Low', 'Medium', 'High'] as const
export type FlagSeverityName = (typeof FLAG_SEVERITIES)[number]

/** What a moderator may do with a Pending flag (the decision vocabulary). */
export const MODERATION_DECISIONS = ['approve', 'reject', 'escalate'] as const
export type ModerationDecision = (typeof MODERATION_DECISIONS)[number]

/** Ledger outcomes (migration 009 CHECK; auditLogger's AuditOutcome). */
export const AUDIT_OUTCOMES = ['Success', 'Failure', 'Blocked'] as const
export type AuditOutcomeName = (typeof AUDIT_OUTCOMES)[number]

/** Filter dropdown tuples: the list schemas accept 'All' plus the vocabulary. */
export const ACCOUNT_STATUS_FILTERS = ['All', ...ACCOUNT_STATUSES] as const
export const FLAG_STATUS_FILTERS = ['All', ...FLAG_STATUSES] as const
export const FLAG_SEVERITY_FILTERS = ['All', ...FLAG_SEVERITIES] as const

/** Permission keys — must match src/lib/permissions.ts and seed.ts. */
export const PERMISSION_KEYS = {
  usersView: 'users.view',
  usersSuspend: 'users.suspend',
  usersAssignRole: 'users.assign_role',
  usersBan: 'users.ban',
  usersUnlock: 'users.unlock',
  moderationDecide: 'moderation.decide',
  moderationEscalation: 'moderation.escalation',
  auditView: 'audit.view',
  auditExport: 'audit.export',
  settingsManage: 'settings.manage',
} as const
export type PermissionKey = (typeof PERMISSION_KEYS)[keyof typeof PERMISSION_KEYS]

/** Audit ledger action names — free text by schema (migration 004), so this
 * object IS the taxonomy; the audit explorer's filter dropdown reads it from
 * the database via DISTINCT. */
export const AUDIT_ACTIONS = {
  authorizationDenied: 'Authorization Denied',
  accountLocked: 'Account Locked',
  accountUnlocked: 'Account Unlocked',
  accountTerminated: 'Account Terminated',
  userSuspended: 'User Suspended',
  roleAssigned: 'Role Assigned',
  operatorLogin: 'Operator Login',
  operatorLogout: 'Operator Logout',
  configurationUpdated: 'Configuration Updated',
  featureToggleChanged: 'Feature Toggle Changed',
  contentApproved: 'Content Approved',
  contentRejected: 'Content Rejected',
  contentEscalated: 'Content Escalated',
  flagOverruled: 'Flag Overruled',
  escalationUpheld: 'Escalation Upheld',
  /** Marker row appended to a capped CSV export (not a ledger action type). */
  exportTruncated: 'Export Truncated',
} as const

/** Error envelope codes (BED §6 conventions). */
export const ERROR_CODES = {
  validation: 'VALIDATION',
  authInvalid: 'AUTH-001',
  authRequired: 'AUTH-002',
  authNotActive: 'AUTH-003',
  authzDenied: 'AUTHZ-001',
  userNotFound: 'USER-001',
  userSelfAction: 'USER-002',
  userInvalidTransition: 'USER-003',
  userSelfRole: 'USER-004',
  userRoleNoop: 'USER-005',
  roleNotFound: 'ROLE-001',
  flagNotFound: 'FLAG-001',
  flagAlreadyDecided: 'FLAG-002',
  flagNotEscalated: 'FLAG-003',
  flagNoOwner: 'FLAG-004',
  settingNotFound: 'SETTING-001',
  settingNotToggle: 'SETTING-002',
  settingNoop: 'SETTING-003',
  rateLimited: 'RATE_LIMITED',
  system: 'SYSTEM-001',
  notFound: 'NOT_FOUND',
} as const
