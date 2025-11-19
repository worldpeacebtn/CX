import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Points,
  PointMaterial,
  PerspectiveCamera
} from "@react-three/drei";

// ---------------- THEME DETECTION --------------------

function useAutoTheme() {
  const isNight = typeof window !== "undefined" && (
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
    new Date().getHours() >= 18 ||
    new Date().getHours() <= 6
  );
  return isNight ? "night" : "day";
}

// ---------------- STARFIELD --------------------

function Stars({ theme }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i]   = (Math.random() - 0.5) * 80;
      arr[i+1] = (Math.random() - 0.5) * 40;
      arr[i+2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i]   += Math.sin(t + i) * 0.00008;
      arr[i+1] += Math.cos(t * 0.25 + i) * 0.00005;

      if (Math.random() > 0.9994) {
        arr[i+2] += (Math.random() - 0.5) * 0.4;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={theme === "day" ? 0.08 : 0.14}
        color={theme === "day" ? "#6d4bff" : "#a47cff"}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// ---------------- MATRIX RAIN (Night-Only) --------------------

function MatrixRain({ theme }) {
  if (theme === "day") return null;

  const num = 160;

  const positions = useMemo(() => {
    const arr = new Float32Array(num * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 25;
      arr[i+1] = Math.random() * 18;
      arr[i+2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame((_, delta) => {
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i+1] -= delta * 3.4;

      if (arr[i+1] < -10) {
        arr[i+1] = 12 + Math.random() * 6;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        size={0.07}
        color="#00ff95"
        transparent
        sizeAttenuation
      />
    </Points>
  );
}

// ---------------- WORMHOLE (Night) / GLOW (Day) --------------------

function Wormhole({ theme }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.z = t * 0.12;
  });

  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <torusGeometry args={[5, 0.25, 16, 100]} />
      <meshBasicMaterial
        wireframe
        color={theme === "day" ? "#b9a3ff" : "#a020f0"}
        transparent
        opacity={theme === "day" ? 0.25 : 0.45}
      />
    </mesh>
  );
}

// ---------------- ADVANCED CINEMATIC CAMERA --------------------

function CinematicCamera() {
  const ref = useRef();

  // store pointer for parallax
  const pointer = useRef({ x: 0, y: 0 });

  // listen to pointer movement — mobile safe
  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // ---- MAIN BEZIER ORBITING MOTION ----
    const radius = 0.85;
    const x = Math.sin(t * 0.12) * radius;
    const y = Math.cos(t * 0.09) * radius * 0.7;

    // ---- PARALLAX BASED ON USER INPUT ----
    const parallaxX = pointer.current.x * 0.3;
    const parallaxY = pointer.current.y * 0.2;

    // ---- MICRO QUANTUM SHAKE ----
    const shakeX = Math.sin(t * 6.5) * 0.015;
    const shakeY = Math.cos(t * 7.2) * 0.015;

    ref.current.position.x = x + parallaxX + shakeX;
    ref.current.position.y = y + parallaxY + shakeY;
    ref.current.position.z = 18 + Math.sin(t * 0.2) * 0.3;

    // always look center
    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={ref} makeDefault fov={54} position={[0, 0, 18]} />;
}
// ---------------- ROOT HERO CANVAS --------------------

export default function HeroCanvas() {
  const theme = useAutoTheme(); // ← Auto-switch Day/Night

  return (
    <div
      className="heroCanvas"
      aria-hidden
      style={{
        width: "100%",
        height: "100vh",
        background: theme === "day" ? "#ffffff" : "#000000",
        transition: "background 0.6s ease-in-out"
      }}
    >
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <CinematicCamera />

          <ambientLight intensity={theme === "day" ? 1.2 : 0.4} />
          <directionalLight intensity={theme === "day" ? 0.6 : 0.3} position={[10, 10, 5]} />

          <Stars theme={theme} />
          <MatrixRain theme={theme} />
          <Wormhole theme={theme} />

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
