// Shared domain types — mirror the DDD tables and the API contracts.
export type Role = 'viewer' | 'moderator' | 'super_admin'

export type SessionUser = {
  id: string
  email: string
  fullName: string
  role: Role
  permissions: string[]
}

export type AccountStatus = 'Active' | 'Suspended' | 'Terminated'

export type Account = {
  id: string
  email: string
  fullName: string
  role: Role
  status: AccountStatus
  createdAt: string
  /** ISO timestamp while a login lockout is active; null/absent when not locked. */
  lockedUntil?: string | null
  failedAttempts?: number
}

export type FlagStatus = 'Pending' | 'Approved' | 'Rejected' | 'Escalated'
export type Severity = 'Low' | 'Medium' | 'High'

export type Flag = {
  id: string
  contentItemId: string
  contentType: string
  contentSummary: string
  reportedBy: string
  reporterEmail?: string | null
  severity: Severity
  flagStatus: FlagStatus
  reason: string
  createdAt: string
  decidedBy?: string | null
  decidedAt?: string | null
}

export type AuditOutcome = 'Success' | 'Failure' | 'Blocked'

export type AuditEvent = {
  id: string
  operatorId: string | null
  operatorEmail?: string | null
  actionType: string
  targetEntityType: string
  targetEntityId: string | null
  /** How the action ended (BED §6.15 "Result"). */
  outcome: AuditOutcome
  /** Source address of the request, when recorded. */
  actorIp?: string | null
  /** Correlation id tying the row to the API response that produced it. */
  correlationId?: string | null
  metadata?: Record<string, unknown>
  createdAt: string
}

export type SystemSetting = {
  key: string
  value: string
  isFeatureToggle: boolean
  updatedAt: string
  updatedByEmail?: string | null
}

export type Page<T> = {
  items: T[]
  page: number
  size: number
  total: number
}

/** GET /api/v1/analytics/dashboard (CON-DASH-001; D-098) — live DB counts. */
export type DashboardAnalytics = {
  accounts: { total: number; active: number; suspended: number; terminated: number }
  queue: { pending: number; escalated: number; highSeverityPending: number; resolved: number }
  decisions7d: { approved: number; rejected: number; escalated: number }
  audit: { total: number; last24h: number; last7d: number }
  trend: Array<{ day: string; events: number }>
}
