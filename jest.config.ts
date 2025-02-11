export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
  
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-transformer-svg",
    },
  
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    collectCoverage:true,
    coverageThreshold:{
        global:{
          branches:80,
          functions:80,
          lines:80,
          statements:-10
        }
      }
   };