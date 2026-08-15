import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Tell Next.js where our application lives.
  // This allows Next.js to load next.config and .env files.
  dir: "./",
});

const config: Config = {
  // Gives Jest a browser-like environment.
  // Useful when testing React components that use
  // window, document, etc.
  testEnvironment: "jsdom",

  // V8 provides code coverage support.
  coverageProvider: "v8",
};

export default createJestConfig(config);