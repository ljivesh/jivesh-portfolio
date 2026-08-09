import { describe, expect, it } from "vitest";
import { calculateTerminalTextureLayout, TERMINAL_COLUMNS, TERMINAL_ROWS } from "./terminal-texture";

describe("terminal texture layout", () => {
  it("preserves the original 55-column by 30-row CRT layout", () => {
    const context = {
      font: "",
      measureText: () => ({ width: Number.parseFloat(context.font.match(/([\d.]+)px/)?.[1] ?? "0") * 0.6 }),
    } as unknown as CanvasRenderingContext2D;
    const layout = calculateTerminalTextureLayout(context);
    const cellWidth = layout.fontSize * 0.6;

    expect(TERMINAL_COLUMNS).toBe(55);
    expect(TERMINAL_ROWS).toBe(30);
    expect(layout.left).toBe(32);
    expect(layout.firstBaseline).toBe(72);
    expect(cellWidth * TERMINAL_COLUMNS + layout.left * 2).toBeLessThanOrEqual(1280);
    expect(layout.firstBaseline + layout.lineHeight * (TERMINAL_ROWS - 1)).toBeLessThanOrEqual(1024);
    expect(layout.fontSize).toBe(36);
    expect(1024 - (layout.firstBaseline + layout.lineHeight * (TERMINAL_ROWS - 1))).toBeGreaterThanOrEqual(72);
  });
});
