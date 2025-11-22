import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Points,
  PointMaterial,
  PerspectiveCamera,
  Text,
  Float
} from "@react-three/drei";

// ---------------- AUTO THEME --------------------
function useAutoTheme() {
  if (typeof window === "undefined") return "day";
  const hr = new Date().getHours();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isNight = prefersDark || hr >= 18 || hr <= 6;
  return isNight ? "night" : "day";
}

// ---------------- STARFIELD --------------------
function Stars({ theme }) {
  const count = 1400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 90;
      arr[i + 1] = (Math.random() - 0.5) * 60;
      arr[i + 2] = (Math.random() - 0.5) * 80;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += Math.sin(t + i) * 0.00006;
      arr[i + 1] += Math.cos(t * 0.25 + i) * 0.00004;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={theme === "day" ? 0.07 : 0.12}
        color={theme === "day" ? "#754df9" : "#b38aff"}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// ---------------- QUANTUM DUST --------------------
function QuantumDust() {
  const count = 500;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 6;
      arr[i + 1] = (Math.random() - 0.5) * 4;
      arr[i + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.07;
    ref.current.rotation.x = Math.sin(t * 0.14) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.03} color="#ffffff" transparent opacity={0.7} />
    </Points>
  );
}

// ---------------- NEON FLOATING CUBES --------------------
function NeonCubes() {
  const cubes = new Array(18).fill(0).map((_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    ],
    scale: 0.3 + Math.random() * 0.4
  }));

  return (
    <>
      {cubes.map(({ id, position, scale }) => (
        <mesh key={id} position={position} scale={scale}>
          <boxGeometry />
          <meshStandardMaterial
            color="#9d6bff"
            emissive="#c5a2ff"
            emissiveIntensity={1.8}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
    </>
  );
}

// ---------------- HOLOGRAPHIC GLASS PANELS --------------------
function HoloPanels() {
  return (
    <>
      <mesh position={[0, -1.4, -1]}>
        <planeGeometry args={[5, 2.3]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh position={[0, 1.3, -1]}>
        <planeGeometry args={[4, 1.5]} />
        <meshStandardMaterial
          color="#b088ff"
          transparent
          opacity={0.04}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </>
  );
}

// ---------------- WORMHOLE --------------------
function Wormhole({ theme }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.12;
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <torusGeometry args={[5, 0.28, 16, 180]} />
      <meshBasicMaterial
        wireframe
        color={theme === "day" ? "#bba8ff" : "#a020f0"}
        transparent
        opacity={theme === "day" ? 0.22 : 0.40}
      />
    </mesh>
  );
}

// ---------------- FLOATING TEXT --------------------
function FloatingText() {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <Text
        color="#ffffff"
        fontSize={0.65}
        position={[0, 1.7, 0]}
        letterSpacing={0.04}
      >
        X42 QUANTUM DIVISION
      </Text>
    </Float>
  );
}

// ---------------- LOGO --------------------
function X42Logo() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.6;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.25;
  });

  return (
    <mesh ref={ref} scale={1.5} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#c69aff"
        emissiveIntensity={1.8}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// ---------------- CINEMATIC CAMERA --------------------
function CinematicCamera() {
  const ref = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const r = 0.95; // circular movement
    ref.current.position.x = Math.sin(t * 0.1) * r + pointer.current.x * 0.35;
    ref.current.position.y = Math.cos(t * 0.13) * 0.7 + pointer.current.y * 0.25;
    ref.current.position.z = 18 + Math.sin(t * 0.2) * 0.25;

    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={ref} makeDefault fov={52} position={[0, 0, 20]} />;
}

// ---------------- ROOT CANVAS --------------------
export default function HeroCanvas() {
  const theme = useAutoTheme();

  return (
    <div
      className="heroCanvas"
      aria-hidden
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.8]}
          frameloop="demand"
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0); // full transparency
          }}
        >
          <CinematicCamera />

          <ambientLight intensity={theme === "day" ? 1.1 : 0.5} />
          <directionalLight intensity={0.4} position={[10, 10, 5]} />

          <Stars theme={theme} />
          <QuantumDust />
          <NeonCubes />
          <HoloPanels />
          <Wormhole theme={theme} />
          <X42Logo />
          <FloatingText />

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
