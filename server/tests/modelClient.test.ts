import { createModelClient } from '../src/services/modelClient'

// Tests for the model client that do NOT require the FastAPI service or the
// database: the fetch implementation is injected. Covers the fail-safe paths
// required by BRIEF/AGENTS.md — a down or slow model must never break the queue.

const input = {
  reason_category: 'off_platform_payment',
  content_type: 'Gig listing',
  report_text: 'Pay outside the platform',
  reporter_history: 1,
  account_age_days: 10,
  prior_flags_account: 0,
}

describe('model client', () => {
  it('returns an available suggestion on a good response', async () => {
    const client = createModelClient({
      fetchImpl: (async () =>
        new Response(
          JSON.stringify({ model_version: 'severity-action-rf-1.0.0', severity: 'High', action: 'reject', confidence: 0.6 }),
          { status: 200 },
        )) as unknown as typeof fetch,
    })
    const result = await client.predict(input)
    expect(result).toEqual({
      available: true,
      modelVersion: 'severity-action-rf-1.0.0',
      severity: 'High',
      action: 'reject',
      confidence: 0.6,
    })
  })

  it('fails safe when the service is unreachable', async () => {
    const client = createModelClient({
      fetchImpl: (async () => {
        throw new TypeError('fetch failed')
      }) as unknown as typeof fetch,
    })
    const result = await client.predict(input)
    expect(result.available).toBe(false)
  })

  it('fails safe when the service returns a non-2xx status', async () => {
    const client = createModelClient({
      fetchImpl: (async () => new Response('boom', { status: 503 })) as unknown as typeof fetch,
    })
    const result = await client.predict(input)
    expect(result.available).toBe(false)
    if (!result.available) expect(result.reason).toContain('503')
  })

  it('fails safe on a malformed body', async () => {
    const client = createModelClient({
      fetchImpl: (async () => new Response(JSON.stringify({ severity: 'High' }), { status: 200 })) as unknown as typeof fetch,
    })
    const result = await client.predict(input)
    expect(result.available).toBe(false)
  })

  it('times out and fails safe when the service is slow (short timeout)', async () => {
    // A fetch that never resolves before the client aborts.
    const client = createModelClient({
      timeoutMs: 25,
      fetchImpl: ((_url: string, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            const err = new Error('aborted')
            err.name = 'AbortError'
            reject(err)
          })
        })) as unknown as typeof fetch,
    })
    const started = Date.now()
    const result = await client.predict(input)
    expect(result.available).toBe(false)
    if (!result.available) expect(result.reason).toBe('AbortError')
    // The client must not wait for the model beyond its timeout (allow slack).
    expect(Date.now() - started).toBeLessThan(500)
  })
})
