module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  transformIgnorePatterns: [
    // Don't transform chalk since it uses ES modules
    'node_modules/(?!(chalk)/)'
  ],
  moduleNameMapper: {
    // Mock chalk to avoid ES module issues
    '^chalk$': '<rootDir>/tests/__mocks__/chalk.ts'
  }
};