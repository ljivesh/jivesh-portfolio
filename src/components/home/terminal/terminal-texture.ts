import type { CanvasTexture } from "three";
import { CanvasTexture as ThreeCanvasTexture, LinearFilter, NoColorSpace } from "three";

export const TERMINAL_COLUMNS = 55;
export const TERMINAL_ROWS = 30;
export const TERMINAL_TEXTURE_WIDTH = 1280;
export const TERMINAL_TEXTURE_HEIGHT = 1024;

export type TerminalSnapshot = {
  text: string;
  lines: string[];
  columns: number;
  rows: number;
};

export type TerminalTextureLayout = {
  fontSize: number;
  lineHeight: number;
  left: number;
  firstBaseline: number;
};

export function calculateTerminalTextureLayout(
  context: CanvasRenderingContext2D,
  columns = TERMINAL_COLUMNS,
  rows = TERMINAL_ROWS,
  width = TERMINAL_TEXTURE_WIDTH,
  height = TERMINAL_TEXTURE_HEIGHT,
): TerminalTextureLayout {
  // Match the source portfolio's fixed canvas grid. The physical safe area is
  // applied by the CRT shader, so this texture contains glyphs only.
  const left = 32;
  const firstBaseline = 72;
  const bottomPadding = 72;
  let fontSize = 36;
  context.font = `900 ${fontSize}px monospace`;
  while (fontSize > 26 && context.measureText("M").width * columns + left * 2 > width) {
    fontSize -= 1;
    context.font = `900 ${fontSize}px monospace`;
  }
  const lineHeight = Math.min(30, (height - firstBaseline - bottomPadding) / Math.max(1, rows - 1));
  return { fontSize, lineHeight, left, firstBaseline };
}

export function createTerminalTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = TERMINAL_TEXTURE_WIDTH;
  canvas.height = TERMINAL_TEXTURE_HEIGHT;
  const texture = new ThreeCanvasTexture(canvas);
  texture.colorSpace = NoColorSpace;
  texture.flipY = true;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export function drawTerminalTexture(texture: CanvasTexture, snapshot: TerminalSnapshot) {
  const canvas = texture.image as HTMLCanvasElement;
  const context = canvas.getContext("2d");
  if (!context) return;

  const layout = calculateTerminalTextureLayout(context, snapshot.columns, snapshot.rows, canvas.width, canvas.height);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `900 ${layout.fontSize}px monospace`;
  context.textBaseline = "alphabetic";
  context.fillStyle = "#ffffff";
  context.shadowBlur = 0;

  snapshot.lines.slice(0, snapshot.rows).forEach((line, index) => {
    context.fillText(line.slice(0, snapshot.columns), layout.left, layout.firstBaseline + index * layout.lineHeight);
  });

  texture.needsUpdate = true;
}
