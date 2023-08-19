const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "@/components/(.*)$": "<rootDir>/components/$1",
    "@/pages/(.*)$": "<rootDir>/pages/$1",
    "@/shared/(.*)$": "<rootDir>/shared/$1",
    "@/hooks/(.*)$": "<rootDir>/hooks/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
