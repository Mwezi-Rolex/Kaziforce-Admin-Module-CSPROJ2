import { randomUUID } from 'node:crypto'
import type { NextFunction, Request, Response } from 'express'

// Correlation id middleware (BED §6.15 "Correlation ID"; DDD §28.2 correlation_id).
//
// Every request gets an id that is returned in the `x-correlation-id` response
// header and recorded on any audit event the request produces, so one operator
// action can be traced across the API response and the immutable ledger. A
// client-supplied id is honoured when it is a plausible token, which lets a
// trace span the API and an upstream system; otherwise one is generated here.

export const CORRELATION_HEADER = 'x-correlation-id'

export type CorrelatedRequest = Request & { correlationId?: string }

const ACCEPTED_ID = /^[A-Za-z0-9_-]{8,128}$/

export function correlation(req: CorrelatedRequest, res: Response, next: NextFunction) {
  const incoming = req.get(CORRELATION_HEADER)
  req.correlationId = incoming && ACCEPTED_ID.test(incoming) ? incoming : randomUUID()
  res.setHeader(CORRELATION_HEADER, req.correlationId)
  next()
}
