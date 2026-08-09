import { expect, test } from "@playwright/test";

test("home presents the Menma identity and complete navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Menma" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  if ((page.viewportSize()?.width ?? 1_000) < 800) await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("link", { name: "All work" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Writing" })).toBeVisible();
});

test("home section tabs follow clicks and scroll position", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 800, "Desktop-only section tabs");
  await page.goto("/");
  const sections = page.getByRole("navigation", { name: "Homepage sections" });
  const projects = sections.getByRole("link", { name: "Projects" });
  await projects.click();
  await expect(projects).toHaveAttribute("aria-current", "location");
  await expect(sections.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current", "location");

  await page.locator(".menma-scroll").evaluate((element) => { element.scrollTop = element.scrollHeight; });
  await expect(sections.getByRole("link", { name: "Experience" })).toHaveAttribute("aria-current", "location");
});

test("retro mode boots and accepts terminal commands", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await page.getByRole("button", { name: "Open retro computer terminal" }).click();
  const terminal = page.getByTestId("retro-terminal");
  const canvas = page.getByTestId("macintosh-canvas").locator("canvas");
  await expect(canvas).toBeVisible();
  await expect(terminal).toContainText("Complete!", { timeout: 20_000 });
  await expect(terminal).toContainText("███╗   ███╗███████╗");
  await page.keyboard.type("helxp");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("Delete");
  await page.keyboard.press("Enter");
  await expect(terminal).toContainText("MENMA.OS commands");
  await expect(terminal).toContainText("Delete forward");
  await page.keyboard.type("pwd");
  await page.keyboard.press("Enter");
  await expect(terminal).toContainText("/home/guest");
  await expect(terminal).toContainText("guest@menma:~$");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  await expect(terminal).toContainText("/home/guest\nguest@menma:~$ pwd");
  await page.keyboard.type("echo draft restored");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(terminal).toContainText("draft restored");

  const audioState = await page.locator(".retro-crt-shell audio").evaluateAll((elements) => elements.map((element) => {
    const audio = element as HTMLAudioElement;
    return { muted: audio.muted, volume: audio.volume };
  }));
  expect(audioState).toHaveLength(4);
  expect(audioState[0]).toMatchObject({ muted: false, volume: 0.025 });
  expect(audioState.slice(1).map((audio) => audio.volume)).toEqual([0.38, 0.34, 0.28]);
  await page.keyboard.type("exit");
  await page.keyboard.press("Enter");
  await expect(terminal).toContainText("Saving terminal session...");
  await expect(terminal).toContainText("Closing MENMA.OS terminal...");
  await expect(terminal).toContainText("logout");
  await expect(page.getByRole("heading", { level: 1, name: "Menma" })).toBeVisible();
});

test("public deep routes remain available", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 1, name: "Selected work" })).toBeVisible();
  await page.getByRole("link", { name: /Kandid AI Commerce Platform/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Kandid AI Commerce Platform");
  await page.goto("/writing/multi-channel-ai-commerce-agent");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Multi-Channel AI Commerce Agent");
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1, name: "Contact" })).toBeVisible();
});

test("guestbook and admin authentication surfaces render", async ({ page }) => {
  await page.goto("/guestbook");
  await expect(page.getByRole("heading", { name: "Guestbook" })).toBeVisible();
  await page.goto("/admin/login");
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});
