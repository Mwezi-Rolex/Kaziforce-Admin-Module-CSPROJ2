import type { NextFunction, Request, Response } from 'express'

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
    error: { code: 'NOT_FOUND', message: `No route for ${req.method} ${req.path}` },
    timestamp: new Date().toISOString(),
  })
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      error: { code: err.code, message: err.message },
      timestamp: new Date().toISOString(),
    })
    return
  }
  console.error('[unhandled]', err) // full context server-side only (FR-ERR-003)
  res.status(500).json({
    success: false,
    error: { code: 'SYSTEM-001', message: 'Internal server error' },
    timestamp: new Date().toISOString(),
  })
}
