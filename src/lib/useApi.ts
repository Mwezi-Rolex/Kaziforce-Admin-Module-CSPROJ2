import { useCallback, useEffect, useState } from 'react'
import { api } from './api'

// Minimal data hook: loading / error / reload per slice error-state rule.
export function useApi<T>(path: string | null) {
  const [state, setState] = useState<{ data: T | null; meta?: Record<string, unknown>; loading: boolean; error: string | null }>({
    data: null,
    loading: Boolean(path),
    error: null,
  })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null })
      return
    }
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    api<T>(path)
      .then(({ data, meta }) => {
        if (!cancelled) setState({ data, meta, loading: false, error: null })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message })
      })
    return () => {
      cancelled = true
    }
  }, [path, tick])

  const reload = useCallback(() => setTick((t) => t + 1), [])
  return { ...state, reload }
}
