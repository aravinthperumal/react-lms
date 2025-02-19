export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^globals/(.*)$": "<rootDir>/src/globals/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^_state/(.*)$": "<rootDir>/src/_state/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
