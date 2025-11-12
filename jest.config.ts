const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
    '@src/(.*)': '<rootDir>/$1',
    '@modules/(.*)': '<rootDir>/modules/$1',
    '@libs/(.*)': '<rootDir>/libs/$1',
  },
};

export default config;
