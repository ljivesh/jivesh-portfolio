import { describe, expect, it } from "vitest";
import { completeTerminalInput, parseTerminalCommand, resolveTerminalPath } from "./terminal";

describe("MENMA.OS terminal helpers", () => {
  it("normalizes commands and aliases", () => {
    expect(parseTerminalCommand(" START resume.link ")).toEqual({ command: "open", args: ["resume.link"] });
    expect(parseTerminalCommand("theme GREEN")).toEqual({ command: "theme", args: ["green"] });
  });

  it("completes commands and filesystem entries", () => {
    expect(completeTerminalInput("gue")).toBe("guestbook");
    expect(completeTerminalInput("cat ski", ["skills.txt", "about.txt"])).toBe("cat skills.txt");
  });

  it("resolves root, parent, and child paths", () => {
    expect(resolveTerminalPath(["projects"], "..")).toEqual([]);
    expect(resolveTerminalPath(["projects"], "/")).toEqual([]);
    expect(resolveTerminalPath([], "network")).toEqual(["network"]);
  });
});
