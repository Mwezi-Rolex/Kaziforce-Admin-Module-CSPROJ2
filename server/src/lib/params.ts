// Shared request-parameter schemas. The UUID grammar for path parameters was
// duplicated per route with slightly different messages; this is the one
// place it is defined.
import { z } from 'zod'

export function uuidParamSchema(label: string) {
  return z.string().uuid(`${label} must be a UUID`)
}
