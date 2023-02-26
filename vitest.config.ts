import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["**/__tests__/*.spec.ts", "**/__tests__/*.spec.tsx"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.js"],
  },
})
