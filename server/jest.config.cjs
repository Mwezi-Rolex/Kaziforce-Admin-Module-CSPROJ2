/** Jest + Supertest per BRIEF stack (Chapter 5 §3.5 testing claim, mapped to this API). */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'commonjs', esModuleInterop: true, strict: true, types: ['node', 'jest'] } }],
  },
  testTimeout: 20000,
  setupFiles: ['dotenv/config'],
}
