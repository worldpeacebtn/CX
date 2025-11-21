// src/components/HeroCanvas.jsx
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, PerspectiveCamera, Text, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

// ---------------- AUTO THEME --------------------
function useAutoTheme() {
  const hour = typeof window !== "undefined" ? new Date().getHours() : 20;
  return hour >= 18 || hour <= 6 ? "night" : "day";
}

// ---------------- STARS (glow + subtle trails) --------------------
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
      // small drifting with occasional twinkle
      arr[i] += Math.sin(t * 0.2 + i) * 0.0002;
      arr[i + 1] += Math.cos(t * 0.18 + i) * 0.00018;
      if (Math.random() > 0.9995) arr[i + 2] += (Math.random() - 0.5) * 0.8;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent size={0.08} color={theme === "day" ? "#bfb3ff" : "#c8a8ff"} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

// ---------------- HOLO CUBES --------------------
function HoloCube({ pos, rotSpeed }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * rotSpeed;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.6;
  });
  return (
    <mesh ref={ref} position={pos} scale={[0.6, 0.6, 0.6]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9d72ff" emissive="#bfa8ff" roughness={0.15} metalness={0.9} />
    </mesh>
  );
}
function HoloCubes() {
  return (
    <>
      {new Array(6).fill(0).map((_, i) => (
        <HoloCube
          key={i}
          pos={[(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 6]}
          rotSpeed={0.2 + Math.random() * 0.8}
        />
      ))}
    </>
  );
}

// ---------------- QUANTUM DUST --------------------
function QuantumDust() {
  const count = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 10;
      arr[i + 1] = (Math.random() - 0.5) * 8;
      arr[i + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.06;
    ref.current.rotation.x = Math.sin(t * 0.08) * 0.1;
  });
  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.03} color="#aee7ff" transparent opacity={0.6} />
    </Points>
  );
}

// ---------------- WORMHOLE --------------------
function Wormhole({ theme }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.22;
    ref.current.scale.x = 1 + Math.sin(t * 1.1) * 0.06;
    ref.current.scale.y = 1 + Math.cos(t * 1.05) * 0.06;
  });
  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <torusGeometry args={[5.2, 0.25, 12, 200]} />
      <meshBasicMaterial wireframe color={theme === "day" ? "#d6c8ff" : "#a48fff"} transparent opacity={0.34} />
    </mesh>
  );
}

// ---------------- CENTER LOGO --------------------
function X42Logo() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.7;
    ref.current.rotation.x = Math.sin(t * 0.28) * 0.35;
  });
  return (
    <mesh ref={ref} scale={[1.7, 1.7, 1.7]} position={[0, 0, -2]}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshStandardMaterial color="#9d72ff" emissive="#c8a8ff" emissiveIntensity={1.6} metalness={0.9} roughness={0.06} />
    </mesh>
  );
}

// ---------------- CINEMATIC CAMERA (glide + dolly) --------------------
function CinematicCamera() {
  const ref = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef(new THREE.Vector3(0, 0, 14)); // base pos

  useFrame((state, dt) => {
    // pointer parallax
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, 0.08);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, 0.08);

    const t = state.clock.getElapsedTime();
    // slow dolly (in/out)
    const dolly = 14 + Math.sin(t * 0.12) * 1.2; // move camera z slowly
    // small orbit/glide
    const orbitX = Math.sin(t * 0.07) * 0.6;
    const orbitY = Math.cos(t * 0.05) * 0.45;

    // desired position
    const desired = new THREE.Vector3(orbitX + pointer.current.x * 0.8, orbitY + pointer.current.y * 0.6, dolly);
    // smooth lerp to desired
    ref.current.position.lerp(desired, 0.06);
    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={ref} makeDefault fov={50} />;
}

// ---------------- BACKGROUND IMAGE (optional environment) --------------------
function SceneBackground({ src }) {
  const { scene } = useThree();
  const tex = useLoader(THREE.TextureLoader, src);
  // slight blur / darken
  tex.encoding = THREE.sRGBEncoding;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  // set as scene background
  scene.background = tex;
  return null;
}

// ---------------- ROOT CANVAS --------------------
export default function HeroCanvas({ bgImage = "/mnt/data/CC4E1C06-DA1C-40BA-9957-85ACEBC6F074.jpeg" }) {
  const theme = useAutoTheme();

  return (
<div className="heroCanvas" style={{ zIndex: -10, pointerEvents: 'none' }} aria-hidden>

      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          {/* optional: load your uploaded image as scene background (use public/ in production) */}
          <SceneBackground src={bgImage} />

          <CinematicCamera />
          <ambientLight intensity={0.9} />
          <directionalLight intensity={0.6} position={[6, 4, 6]} />

          <Stars theme={theme} />
          <QuantumDust />
          <HoloCubes />
          <Wormhole theme={theme} />
          <X42Logo />
        </Canvas>
      </Suspense>
      {/* subtle overlay to give cinematic glow */}
      <div className="hudVignette" />
    </div>
  );
}
