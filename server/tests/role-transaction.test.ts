import { assignRoleTransaction, type ConnectablePool } from '../src/services/roleService'

// Contract test for the role-assignment transaction (SEMANTIC_MODEL.md BUG-5).
//
// node-pg's Pool checks out a DIFFERENT client for every pool.query() call, so
// a "transaction" written as pool.query('BEGIN') … pool.query('COMMIT') does
// not wrap its statements. This fake pool models that contract: query()
// round-robins over three pooled clients, while connect() hands out a
// dedicated client. The invariant under test: all statements of one role
// assignment run on ONE client — the one obtained from connect().

type Recorded = { client: string; sql: string }

function makeFakePool() {
  const statements: Recorded[] = []
  const releases: string[] = []
  const mkClient = (id: string) => ({
    id,
    query: async (sql: string) => {
      statements.push({ client: id, sql })
      return { rows: [] }
    },
    release: () => {
      releases.push(id)
    },
  })
  const dedicated = mkClient('dedicated')
  const fakePool: ConnectablePool = {
    connect: async () => dedicated,
  }
  return { fakePool, statements, releases }
}

const ROLE_SQL = ['BEGIN', 'DELETE FROM user_roles', 'INSERT INTO user_roles', 'COMMIT']

describe('assignRoleTransaction (SEMANTIC-MODEL BUG-5)', () => {
  it('runs BEGIN, DELETE, INSERT and COMMIT on one client', async () => {
    const { fakePool, statements } = makeFakePool()
    await assignRoleTransaction(fakePool, 'user-1', 'role-1')

    const tx = statements.filter((s) => ROLE_SQL.some((frag) => s.sql.startsWith(frag)))
    expect(tx.map((s) => s.sql.replace(/\s+.*$/, ''))).toEqual(['BEGIN', 'DELETE', 'INSERT', 'COMMIT'])
    const clients = new Set(tx.map((s) => s.client))
    expect(clients.size).toBe(1)
    expect(tx.every((s) => s.client === 'dedicated')).toBe(true)
  })

  it('releases the client exactly once, even when a statement fails', async () => {
    const statements: Recorded[] = []
    const releases: string[] = []
    const fakePool: ConnectablePool = {
      connect: async () => ({
        query: async (sql: string) => {
          // Fail the DELETE (the first real statement of the transaction).
          if (sql.startsWith('DELETE')) throw new Error('boom')
          statements.push({ client: 'dedicated', sql })
          return { rows: [], rowCount: 1 }
        },
        release: () => {
          releases.push('dedicated')
        },
      }),
    }
    await expect(assignRoleTransaction(fakePool, 'user-1', 'role-1')).rejects.toThrow('boom')
    // ROLLBACK was issued on the same client and the client was still released.
    expect(statements.map((s) => s.sql.replace(/\s+.*$/, ''))).toEqual(['BEGIN', 'ROLLBACK'])
    expect(releases).toEqual(['dedicated'])
  })
})
