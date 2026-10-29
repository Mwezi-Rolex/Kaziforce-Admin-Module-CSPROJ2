import { useEffect } from 'react'

// Transient confirmation toast (the export's bottom-right notice).
export function Notice({ message, onDone, durationMs = 2800 }: { message: string; onDone: () => void; durationMs?: number }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, durationMs)
    return () => window.clearTimeout(t)
  }, [onDone, durationMs])
  return (
    <div className="notice-toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}
