/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const fs = require("fs");
const {asEnv} = require("./util");
const gitCommitInfo = require("git-commit-info");
const gitVersion = require("git-tag-version");
// const domainSetting = yaml.load(fs.readFileSync("./env.yaml"));
// const themeSetting = yaml.load(fs.readFileSync("./theme.yaml"));
const GIT_TAG_VERSION = asEnv("GIT_TAG_VERSION", gitVersion());
const GIT_COMMIT_INFO = asEnv("GIT_COMMIT_INFO", gitCommitInfo());

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  roots: [
    "<rootDir>",
  ],
  modulePaths: [
    "<rootDir>/src"
  ],
  moduleDirectories: [
    "node_modules",
    "<rootDir>/src"
  ],
  moduleNameMapper: {
    "@/(.*)": [
      "<rootDir>/src/$1",
    ],
    "~/(.*)": [
      "<rootDir>/src/$1",
    ],
    "assets/(.*)": [
      "<rootDir>/images/$1",
      "<rootDir>/photos/$1",
      "<rootDir>/recipes/$1"
    ]
  },
  globals: {
    process: {
      env: {
        NODE_ENV:"test",
        VITE_APP_VERSION:"0.0.1",
        VITE_APP_API_HOST:"",
        VITE_APP_IMG_HOST:"",
        VITE_APP_OUTPUT_DIR: "develop",
      }
    },
    VITE_APP_ENV: "develop",
    VITE_APP_TEST_ENV: true,
    GIT_TAG_VERSION,
    GIT_COMMIT_INFO,
  },
  setupFiles: [
    "<rootDir>/__tests__/helper/criterions.ts"
  ]
};
