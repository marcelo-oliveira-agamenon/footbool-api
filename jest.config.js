module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/mocks/fileMock.js',
  },
};
