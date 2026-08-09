import { describe, expect, it } from "vitest";
import { Box3, Vector3 } from "three";
import { calculateGroundedTransform } from "./macintosh-scene";

describe("calculateGroundedTransform", () => {
  it("places the model minimum exactly on the floor", () => {
    const bounds = new Box3(new Vector3(-2, -0.25, -1), new Vector3(2, 3.75, 1));
    const transform = calculateGroundedTransform(bounds, 2);

    expect(transform.scale).toBe(0.5);
    expect(bounds.min.y * transform.scale + transform.position[1]).toBeCloseTo(0);
    expect(transform.position[0]).toBeCloseTo(0);
    expect(transform.position[2]).toBeCloseTo(0);
  });
});
