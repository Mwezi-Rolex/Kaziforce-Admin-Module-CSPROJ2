import type { ReactNode } from 'react'

// Filter/search toolbar row (export's `.toolbar`).
export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="toolbar">{children}</div>
}
