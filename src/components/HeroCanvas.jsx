import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Stars({ theme }) {
  // Reduced counts for mobile stability
  const COUNT = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 80;
      arr[i + 1] = (Math.random() - 0.5) * 40;
      arr[i + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current || !ref.current.geometry) return;
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += Math.sin(t + i) * 0.00008;
      arr[i + 1] += Math.cos(t * 0.25 + i) * 0.00005;
      if (Math.random() > 0.9992) arr[i + 2] += (Math.random() - 0.5) * 0.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={theme === "day" ? 0.07 : 0.12}
        color={theme === "day" ? "#6d4bff" : "#a47cff"}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function QuantumDust() {
  const COUNT = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 8;
      arr[i + 1] = (Math.random() - 0.5) * 6;
      arr[i + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.06;
    ref.current.rotation.x = Math.sin(t * 0.12) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.03} color="#ffffff" transparent opacity={0.55} />
    </Points>
  );
}

function HoloCubes() {
  // low-poly, few cubes for visual interest only
  const cubes = useMemo(() => {
    return new Array(5).fill().map(() => ({
      pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 5],
      rot: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.pos} scale={[0.6, 0.6, 0.6]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#7f5bff" roughness={0.15} metalness={0.6} opacity={0.9} transparent />
        </mesh>
      ))}
    </>
  );
}

function Wormhole({ theme }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.18;
    ref.current.scale.x = 1 + Math.sin(t * 1.2) * 0.045;
    ref.current.scale.y = 1 + Math.cos(t * 1.1) * 0.045;
  });

  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <torusGeometry args={[5, 0.28, 12, 120]} />
      <meshBasicMaterial wireframe color={theme === "day" ? "#b9a3ff" : "#a020f0"} transparent opacity={0.35} />
    </mesh>
  );
}

function CenterLogo() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.55;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.25;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={1.3}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color="#9d72ff" emissive="#c8a8ff" emissiveIntensity={1.2} roughness={0.12} metalness={0.7} />
    </mesh>
  );
}

function CinematicCamera() {
  const ref = useRef();
  const ptr = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    ptr.current.x = state.pointer.x;
    ptr.current.y = state.pointer.y;
  });

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const radius = 1.0;
    const x = Math.sin(t * 0.11) * radius;
    const y = Math.cos(t * 0.08) * radius * 0.7;
    const parallaxX = ptr.current.x * 0.25;
    const parallaxY = ptr.current.y * 0.2;
    const shakeX = Math.sin(t * 5.5) * 0.01;
    const shakeY = Math.cos(t * 5.8) * 0.01;
    ref.current.position.x = x + parallaxX + shakeX;
    ref.current.position.y = y + parallaxY + shakeY;
    ref.current.position.z = 16 + Math.sin(t * 0.18) * 0.25;
    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera makeDefault ref={ref} fov={54} position={[0, 0, 16]} />;
}

export default function HeroCanvas() {
  // detect theme simply
  const hour = typeof window !== "undefined" ? new Date().getHours() : 20;
  const theme = hour >= 18 || hour <= 6 ? "night" : "day";

  // limit DPR and antialiasing for mobile stability
  return (
    <div className="heroCanvas" aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Suspense fallback={null}>
        <Canvas
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 1.4)]}
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl }) => {
            // set a sane pixel ratio for mobile
            gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
            gl.setClearColor(new THREE.Color(0x000000), 0); // keep alpha
          }}
        >
          <CinematicCamera />
          <ambientLight intensity={theme === "day" ? 0.9 : 0.4} />
          <directionalLight intensity={0.35} position={[6, 8, 6]} />

          <Stars theme={theme} />
          <QuantumDust />
          <HoloCubes />
          <Wormhole theme={theme} />
          <CenterLogo />

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
