import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { ERROR_CODES } from '../lib/vocabulary'

// BED §6 conventions: uniform envelope, standard status codes, no stack traces to clients.
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message)
  }
}

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: { code: ERROR_CODES.notFound, message: `No route for ${req.method} ${req.path}` },
    timestamp: new Date().toISOString(),
  })
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // The correlation id ties the failure to the audit ledger and is echoed in
  // the x-correlation-id header (BED §6.7 error envelope).
  const traceId = (req as Request & { correlationId?: string }).correlationId ?? null
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      error: { code: err.code, message: err.message, traceId },
      timestamp: new Date().toISOString(),
    })
    return
  }
  // A validation failure raised by a schema parse must be a 422 with an
  // actionable message, never a 500 that leaks an internal error shape
  // (FR-ERR-002/FR-ERR-004).
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: { code: ERROR_CODES.validation, message: err.issues[0]?.message ?? 'Invalid input', traceId },
      timestamp: new Date().toISOString(),
    })
    return
  }
  console.error('[unhandled]', err) // full context server-side only (FR-ERR-003)
  res.status(500).json({
    success: false,
    error: { code: ERROR_CODES.system, message: 'Internal server error', traceId },
    timestamp: new Date().toISOString(),
  })
}
