import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  webServer: process.env.PW_NO_SERVER ? undefined : { command: "pnpm exec next dev -p 3000", url: "http://localhost:3000", reuseExistingServer: true, stdout: "pipe", stderr: "pipe" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
