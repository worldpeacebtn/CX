// src/components/HeroCanvas.jsx
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

// ---------------- AUTO THEME --------------------
function useAutoTheme() {
  const hour = typeof window !== "undefined" ? new Date().getHours() : 20;
  return hour >= 18 || hour <= 6 ? "night" : "day";
}

// ---------------- STARS --------------------
function Stars({ theme }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 160;
      arr[i + 1] = (Math.random() - 0.5) * 100;
      arr[i + 2] = (Math.random() - 0.5) * 120;
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += Math.sin(t * 0.2 + i) * 0.0002;
      arr[i + 1] += Math.cos(t * 0.18 + i) * 0.00018;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={0.08}
        color={theme === "day" ? "#bfb3ff" : "#c8a8ff"}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// ---------------- CAMERA --------------------
function CinematicCamera() {
  const ref = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, 0.08);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, 0.08);

    const t = state.clock.getElapsedTime();
    const dolly = 14 + Math.sin(t * 0.12) * 1.2;
    const orbitX = Math.sin(t * 0.07) * 0.6;
    const orbitY = Math.cos(t * 0.05) * 0.45;

    const desired = new THREE.Vector3(
      orbitX + pointer.current.x * 0.8,
      orbitY + pointer.current.y * 0.6,
      dolly
    );

    ref.current.position.lerp(desired, 0.06);
    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={ref} makeDefault fov={50} />;
}

// ---------------- BACKGROUND IMAGE --------------------
function SceneBackground({ src }) {
  const { scene } = useThree();
  const tex = useLoader(THREE.TextureLoader, src);
  tex.encoding = THREE.sRGBEncoding;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  scene.background = tex;
  return null;
}

// ---------------- ROOT CANVAS --------------------
export default function HeroCanvas({ bgImage }) {
  const theme = useAutoTheme();

  return (
    <div
      className="heroCanvas"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          eventSource={undefined}
          eventPrefix="client"
        >
          <SceneBackground src={bgImage} />
          <CinematicCamera />
          <ambientLight intensity={0.9} />
          <directionalLight intensity={0.6} position={[6, 4, 6]} />
          <Stars theme={theme} />
        </Canvas>
      </Suspense>
    </div>
  );
}
