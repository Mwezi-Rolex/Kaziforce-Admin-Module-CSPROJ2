import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Frontend unit tests (Vitest + RTL) per BRIEF stack. Coverage is only ever
// reported from `pnpm test -- --coverage` output, never estimated.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // server/ has its own Jest + Supertest runner (BRIEF stack split).
    exclude: ['**/node_modules/**', 'server/**', 'dist/**'],
  },
})
