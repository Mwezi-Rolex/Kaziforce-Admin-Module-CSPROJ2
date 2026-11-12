export type Severity = 'Low' | 'Medium' | 'High'

// Client for the local FastAPI model service (ml/service.py).
//
// The service is reached on loopback only and NEVER through Nginx (BRIEF).
// It must fail safe: if the service is down or slow, this returns
// `{ available: false }` and the console shows "Suggestion unavailable" while
// every other moderation action keeps working (AGENTS.md ML rules).

export type Suggestion = {
  available: true
  modelVersion: string
  severity: Severity
  action: 'approve' | 'reject' | 'escalate'
  confidence: number
}

export type SuggestionUnavailable = { available: false; reason: string }

export type SuggestionResult = Suggestion | SuggestionUnavailable

const DEFAULT_BASE_URL = 'http://127.0.0.1:8000'
// 3 s, not 800 ms: on the development machine the first node->model connection
// takes ~2.4 s (measured), and warm scikit-learn calls take ~220 ms on the
// VirtualBox VM. 3 s still fails fast: a down service fails instantly on
// connect, a stuck one within 3 s, and the queue renders regardless.
const DEFAULT_TIMEOUT_MS = 3000

export type PredictInput = {
  reason_category: string
  content_type: string
  report_text: string
  reporter_history: number
  account_age_days: number
  prior_flags_account: number
}

export type ModelClientOptions = {
  baseUrl?: string
  timeoutMs?: number
  fetchImpl?: typeof fetch
}

export function createModelClient(options: ModelClientOptions = {}) {
  const baseUrl = options.baseUrl ?? process.env.MODEL_SERVICE_URL ?? DEFAULT_BASE_URL
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const doFetch = options.fetchImpl ?? fetch

  async function predict(input: PredictInput): Promise<SuggestionResult> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await doFetch(`${baseUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: controller.signal,
      })
      if (!res.ok) return { available: false, reason: `model service returned ${res.status}` }
      const body = (await res.json()) as {
        model_version?: string
        severity?: string
        action?: string
        confidence?: number
      }
      if (!body.model_version || !body.severity || !body.action || typeof body.confidence !== 'number') {
        return { available: false, reason: 'malformed model response' }
      }
      return {
        available: true,
        modelVersion: body.model_version,
        severity: body.severity as Severity,
        action: body.action as Suggestion['action'],
        confidence: body.confidence,
      }
    } catch (err) {
      // AbortError (timeout), ECONNREFUSED (down), JSON parse error — all fail safe.
      return { available: false, reason: err instanceof Error ? err.name : 'unreachable' }
    } finally {
      clearTimeout(timer)
    }
  }

  return { predict, baseUrl, timeoutMs }
}

export type ModelClient = ReturnType<typeof createModelClient>
