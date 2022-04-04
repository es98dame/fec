const { defaults } = require('jest-config');

const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!dateformat)'
  ],
};

module.exports = config;