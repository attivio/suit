module.exports = {
  verbose: true,
  roots: [
    "<rootDir>",
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*index.{js,jsx,ts,tsx}",
  ],
  setupFiles: [
    "react-app-polyfill/jsdom",
  ],
  setupFilesAfterEnv: [],
  testMatch: [
    "<rootDir>/tests/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/tests/**/*-test.{js,jsx,ts,tsx}",
    "<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*-test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.test.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jest-environment-jsdom-fourteen",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  modulePaths: [],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/tests/mocks/fileMock.js",
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
