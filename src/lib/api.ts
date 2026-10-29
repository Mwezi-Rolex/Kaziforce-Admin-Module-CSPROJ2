// Typed API client. Every response uses the BED envelope:
//   success: true  -> { success, data, meta?, timestamp }
//   success: false -> { success: false, error: { code, message }, timestamp }
export type Envelope<T> = {
  success: boolean
  data?: T
  meta?: Record<string, unknown>
  error?: { code: string; message: string }
  timestamp: string
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message)
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<{ data: T; meta?: Record<string, unknown> }> {
  const res = await fetch(path, {
    credentials: 'include',
    headers: init?.body ? { 'Content-Type': 'application/json', ...init?.headers } : init?.headers,
    ...init,
  })
  let body: Envelope<T>
  try {
    body = (await res.json()) as Envelope<T>
  } catch {
    throw new ApiError(res.status, 'NETWORK', `Unexpected response from ${path}`)
  }
  if (!res.ok || !body.success) {
    throw new ApiError(res.status, body.error?.code ?? 'UNKNOWN', body.error?.message ?? 'Request failed')
  }
  return { data: body.data as T, meta: body.meta }
}
