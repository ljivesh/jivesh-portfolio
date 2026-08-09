import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: { baseURL, trace: "on-first-retry" },
  webServer: process.env.PW_NO_SERVER ? undefined : { command: "pnpm exec next dev -p 3000", url: baseURL, reuseExistingServer: true, stdout: "pipe", stderr: "pipe" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
