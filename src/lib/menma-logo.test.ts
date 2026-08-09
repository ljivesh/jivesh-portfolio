import { describe, expect, it } from "vitest";
import { menmaTerminalLogo } from "./menma-logo";

describe("MENMA logo", () => {
  it("renders the shared five-row terminal wordmark", () => {
    expect(menmaTerminalLogo).toHaveLength(6);
    expect(menmaTerminalLogo[0]).toBe("███╗   ███╗███████╗███╗   ██╗███╗   ███╗ █████╗");
    expect(menmaTerminalLogo.at(-1)).toBe("╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝");
  });
});
