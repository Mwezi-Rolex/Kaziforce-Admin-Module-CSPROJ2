import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Frontend unit tests (Vitest + RTL) per BRIEF stack. Coverage is only ever
// reported from `pnpm test -- --coverage` output, never estimated.
//
// `import.meta.dirname` rather than `__dirname`: Vite's native config loader
// (the future default) does not provide `__dirname` and warns about it.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // server/ has its own Jest + Supertest runner (BRIEF stack split).
    exclude: ['**/node_modules/**', 'server/**', 'dist/**'],
  },
})
