// Role assignment transaction (users.assign_role). Extracted from
// routes/users.ts so the transaction contract can be unit-tested without a
// database (SEMANTIC_MODEL.md BUG-5).
//
// Single-role invariant: the target user ends with exactly one row in
// user_roles, for roleId. The DELETE + INSERT must run atomically on ONE
// client: node-pg's pool.query() checks out a different client per call, so
// issuing BEGIN/DELETE/INSERT/COMMIT through it does not wrap the statements
// (measured in the audit: BEGIN and the write landed on different backend
// pids). The fix checks out one client, runs the transaction on it, and always
// releases it.

type MinimalClient = {
  query: (sql: string, params?: unknown[]) => Promise<unknown>
  release: () => void
}

/** Structural view of a pg Pool: enough to run a one-client transaction. */
export type ConnectablePool = {
  connect: () => Promise<MinimalClient>
}

export async function assignRoleTransaction(db: ConnectablePool, userId: string, roleId: string): Promise<boolean> {
  const client = await db.connect()
  try {
    await client.query('BEGIN')
    await client.query('DELETE FROM user_roles WHERE user_id = $1', [userId])
    // ON CONFLICT DO NOTHING: two concurrent assignments of the same role to
    // one user would otherwise collide on the (user_id, role_id) primary key
    // and 500; the loser's INSERT no-ops instead and the winner's row stands.
    const { rowCount } = (await client.query(
      'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) ON CONFLICT (user_id, role_id) DO NOTHING',
      [userId, roleId],
    )) as { rowCount: number | null }
    await client.query('COMMIT')
    return (rowCount ?? 0) > 0
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}
