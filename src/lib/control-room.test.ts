import { describe, expect, it } from "vitest";
import { applyScoreDelta, launchRating } from "./control-room";

describe("control room scoring", () => {
  it("applies all score dimensions", () => expect(applyScoreDelta({ reliability: 5, autonomy: 5, latency: 5, cost: 5 }, { reliability: 2, autonomy: -1, latency: 1, cost: 0 })).toEqual({ reliability: 7, autonomy: 4, latency: 6, cost: 5 }));
  it("assigns release ratings from reliability", () => { expect(launchRating({ reliability: 10, autonomy: 0, latency: 0, cost: 0 })).toBe("PRODUCTION READY"); expect(launchRating({ reliability: 8, autonomy: 0, latency: 0, cost: 0 })).toBe("CONDITIONAL RELEASE"); expect(launchRating({ reliability: 5, autonomy: 0, latency: 0, cost: 0 })).toBe("LAUNCH BLOCKED"); });
});
