import { Box3, Vector3 } from "three";

export type GroundedTransform = {
  scale: number;
  position: [number, number, number];
};

export function calculateGroundedTransform(bounds: Box3, targetHeight: number): GroundedTransform {
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const scale = targetHeight / Math.max(size.x, size.y);
  return {
    scale,
    position: [-center.x * scale, -bounds.min.y * scale, -center.z * scale],
  };
}
