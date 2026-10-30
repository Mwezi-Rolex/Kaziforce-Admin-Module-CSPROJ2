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

export type AuditEvent = {
  id: string
  operatorId: string | null
  operatorEmail?: string | null
  actionType: string
  targetEntityType: string
  targetEntityId: string | null
  metadata?: Record<string, unknown>
  createdAt: string
}

export type SystemSetting = {
  key: string
  value: string
  isFeatureToggle: boolean
  updatedAt: string
}

export type Page<T> = {
  items: T[]
  page: number
  size: number
  total: number
}
