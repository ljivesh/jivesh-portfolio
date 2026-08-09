"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  Box3,
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector3,
} from "three";
import type { ThemeMode } from "@/lib/terminal";
import { calculateGroundedTransform } from "@/lib/macintosh-scene";
import { createTerminalTexture, drawTerminalTexture, type TerminalSnapshot } from "./terminal-texture";
import { CrtScreen } from "./crt-screen";

type Props = {
  snapshot: TerminalSnapshot;
  theme: ThemeMode;
  onFocus: () => void;
  onKey: (event: Pick<KeyboardEvent, "key" | "ctrlKey" | "altKey" | "metaKey">) => void;
};

type ModelLayout = {
  scene: Group;
  scale: number;
  position: [number, number, number];
  screenGeometry: BufferGeometry;
  screenLightPosition: [number, number, number];
  badgePosition: [number, number, number];
  badgeSize: number;
};

function createMenmaBadgeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#28241f";
    context.font = "900 210px Arial Black, Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("M", 128, 137);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

function createCalibratedScreenGeometry(screen: Mesh | undefined) {
  if (!screen) throw new Error("Macintosh screen mesh is missing");
  screen.updateWorldMatrix(true, false);
  const geometry = screen.geometry.clone();
  geometry.applyMatrix4(screen.matrixWorld);
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox;
  if (!bounds) throw new Error("Macintosh screen bounds are unavailable");
  const positions = geometry.attributes.position;
  const width = bounds.max.x - bounds.min.x;
  const height = bounds.max.y - bounds.min.y;
  const uv = new Float32Array(positions.count * 2);
  for (let index = 0; index < positions.count; index += 1) {
    uv[index * 2] = (positions.getX(index) - bounds.min.x) / width;
    uv[index * 2 + 1] = (positions.getY(index) - bounds.min.y) / height;
  }
  geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  geometry.computeVertexNormals();
  const normalAttribute = geometry.attributes.normal;
  const screenNormal = new Vector3();
  for (let index = 0; index < normalAttribute.count; index += 1) {
    screenNormal.add(new Vector3(normalAttribute.getX(index), normalAttribute.getY(index), normalAttribute.getZ(index)));
  }
  screenNormal.normalize();
  if (screenNormal.z < 0) screenNormal.multiplyScalar(-1);
  const screenCenter = bounds.getCenter(new Vector3());
  const screenLightPosition = screenCenter.addScaledVector(screenNormal, 0.14);
  return {
    geometry,
    screenLightPosition: screenLightPosition.toArray() as [number, number, number],
  };
}

function prepareModel(source: Group): ModelLayout {
  const scene = source.clone(true);
  scene.updateWorldMatrix(true, true);
  const logo = scene.getObjectByName("Logo");
  const logoBounds = logo ? new Box3().setFromObject(logo) : undefined;
  const logoCenter = logoBounds?.getCenter(new Vector3()) ?? new Vector3(-0.081, 0.1, 0.065);
  const logoSize = logoBounds?.getSize(new Vector3()) ?? new Vector3(0.014, 0.014, 0.002);
  let screenSource: Mesh | undefined;
  scene.traverse((object) => {
    if (!(object instanceof Mesh) || screenSource || !object.name.toLowerCase().startsWith("screen")) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    if (materials.some((material) => material.name === "Screen")) screenSource = object;
  });
  const screen = createCalibratedScreenGeometry(screenSource instanceof Mesh ? screenSource : undefined);

  scene.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    if (object.name === "Logo") {
      object.visible = false;
      return;
    }
    const sourceMaterials = Array.isArray(object.material) ? object.material : [object.material];
    const isScreenLayer = object === screenSource
      || object.name.toLowerCase().startsWith("screen")
      || sourceMaterials.some((material) => material.name === "Screen");
    if (isScreenLayer) {
      object.visible = false;
      return;
    }
    const geometry = object.geometry.clone();
    geometry.deleteAttribute("normal");
    object.geometry = mergeVertices(geometry, 1e-4);
    object.geometry.computeVertexNormals();
    object.castShadow = false;
    object.receiveShadow = false;

    const materials = Array.isArray(object.material) ? object.material : [object.material];
    const replacements = materials.map((material) => {
      if (material.name === "beige 2") return new MeshStandardMaterial({ name: material.name, color: 0xbab2a5, roughness: 0.72, metalness: 0, side: DoubleSide });
      if (material.name === "Beige 1") return new MeshStandardMaterial({ name: material.name, color: 0xd8ceb8, roughness: 0.68, metalness: 0, side: DoubleSide });
      return material.clone();
    });
    object.material = Array.isArray(object.material) ? replacements : replacements[0];
  });

  const bounds = new Box3().setFromObject(scene);
  const transform = calculateGroundedTransform(bounds, 1.38);
  let chassis = scene.getObjectByName("Main case") ?? scene.getObjectByName("Main_case");
  if (!chassis) scene.traverse((object) => { if (!chassis && object.name.toLowerCase().startsWith("main")) chassis = object; });
  const chassisCenter = chassis ? new Box3().setFromObject(chassis).getCenter(new Vector3()) : bounds.getCenter(new Vector3());

  return {
    scene,
    scale: transform.scale,
    position: [-chassisCenter.x * transform.scale, transform.position[1], transform.position[2]],
    screenGeometry: screen.geometry,
    screenLightPosition: screen.screenLightPosition,
    badgePosition: [logoCenter.x, logoCenter.y, logoBounds?.max.z ? logoBounds.max.z + 0.001 : logoCenter.z + 0.001],
    badgeSize: Math.max(logoSize.x, logoSize.y) * 1.05,
  };
}

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const distance = aspect < 0.7 ? 3.35 : aspect < 1.1 ? 2.35 : 1.75;
    camera.position.set(0.03, aspect < 0.7 ? 0.48 : 0.5, distance);
    camera.lookAt(0, 0.48, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.height, size.width]);

  return null;
}

function MacintoshModel({ snapshot, theme, freezeAnimation }: Pick<Props, "snapshot" | "theme"> & { freezeAnimation: boolean }) {
  const gltf = useGLTF("/retro/macintosh-1984.glb");
  const layout = useMemo(() => prepareModel(gltf.scene), [gltf.scene]);
  const texture = useMemo(() => createTerminalTexture(), []);
  const badgeTexture = useMemo(() => createMenmaBadgeTexture(), []);

  useEffect(() => {
    drawTerminalTexture(texture, snapshot);
  }, [snapshot, texture]);

  useEffect(() => () => {
    texture.dispose();
    badgeTexture.dispose();
    layout.screenGeometry.dispose();
  }, [badgeTexture, layout.screenGeometry, texture]);

  return (
    <group position={layout.position} scale={layout.scale}>
      <primitive object={layout.scene} />
      <mesh position={layout.badgePosition} renderOrder={2}>
        <planeGeometry args={[layout.badgeSize, layout.badgeSize]} />
        <meshBasicMaterial map={badgeTexture} transparent alphaTest={0.08} toneMapped={false} />
      </mesh>
      <pointLight
        color={theme === "green" ? 0x7dff32 : 0xff9632}
        intensity={0.28}
        distance={0.5}
        decay={2}
        position={layout.screenLightPosition}
      />
      <CrtScreen geometry={layout.screenGeometry} texture={texture} theme={theme} freezeAnimation={freezeAnimation} />
    </group>
  );
}

function Scene({ snapshot, theme, freezeAnimation }: Pick<Props, "snapshot" | "theme"> & { freezeAnimation: boolean }) {
  return (
    <>
      <color attach="background" args={["#171716"]} />
      <fog attach="fog" args={["#171716", 3.2, 7]} />
      <hemisphereLight args={[0xfff8e8, 0x2b2926, 1.65]} />
      <directionalLight color={0xffefd7} intensity={2.35} position={[-2, 3, 3]} />
      <directionalLight color={0xc2d6ec} intensity={0.72} position={[2, 1, 1]} />
      <pointLight color={0xffc77b} intensity={2.4} distance={4} decay={2} position={[-1, 0.7, -0.8]} />

      <MacintoshModel snapshot={snapshot} theme={theme} freezeAnimation={freezeAnimation} />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.004} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={0x292724} roughness={0.92} metalness={0} />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} scale={2.2} opacity={0.34} blur={2.6} far={1.2} frames={1} />

      <ResponsiveCamera />
      <OrbitControls
        makeDefault
        target={[0, 0.48, 0]}
        enablePan={false}
        enableZoom
        zoomSpeed={0.65}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.15}
        maxDistance={3.5}
        minAzimuthAngle={-0.7}
        maxAzimuthAngle={0.7}
        minPolarAngle={1.18}
        maxPolarAngle={1.52}
      />
    </>
  );
}

export function MacintoshScene({ snapshot, theme, onFocus, onKey }: Props) {
  const automated = typeof navigator !== "undefined" && navigator.webdriver;

  return (
    <div
      className="macintosh-scene"
      data-testid="macintosh-canvas"
      tabIndex={0}
      onPointerDownCapture={onFocus}
      onPointerUpCapture={onFocus}
      onKeyDown={(event) => {
        event.preventDefault();
        onKey(event.nativeEvent);
      }}
    >
      <Canvas
        camera={{ fov: 32, near: 0.01, far: 20, position: [0.03, 0.5, 1.75] }}
        dpr={automated ? 1 : [1, 1.75]}
        gl={{ antialias: !automated, powerPreference: "high-performance" }}
        shadows={false}
      >
        <Suspense fallback={null}>
          <Scene snapshot={snapshot} theme={theme} freezeAnimation={automated} />
        </Suspense>
      </Canvas>
      <div className="macintosh-loading" aria-hidden="true">Loading Macintosh 128K…</div>
    </div>
  );
}
