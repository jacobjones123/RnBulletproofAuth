/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '.',
  testMatch: ['<rootDir>/src/test-utils/e2e/tests/**/*.ts'],
  testTimeout: 180000,
  maxWorkers: 1,

  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',

  transform: { '^.+\\.tsx?$': 'ts-jest' },
  verbose: true,
};
