import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three';

// Cinematic Camera for dynamic movement
function CinematicCamera() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const dolly = 10 + Math.sin(t * 0.12) * 1.2;
    const orbitX = Math.sin(t * 0.07) * 0.6;
    const orbitY = Math.cos(t * 0.05) * 0.45;
    const desired = new THREE.Vector3(orbitX, orbitY, dolly);
    ref.current.position.lerp(desired, 0.06);
    ref.current.lookAt(0, 0, 0);
  });
  return <PerspectiveCamera ref={ref} makeDefault fov={50} />;
}

// Particle effect for photon-like visual
function ParticleEffect() {
  const positions = useMemo(() => {
    const arr = new Float32Array(100 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 2;
      arr[i + 1] = (Math.random() - 0.5) * 2;
      arr[i + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, []);
  const ref = useRef();
  useFrame(() => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" count={positions.length / 3} itemSize={3} array={positions} />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.02} color="#ff6f00" transparent opacity={0.7} />
    </points>
  );
}

// 3D Meta Logo with an Infinity Symbol
function MetaLogo() {
  return (
    <group>
      {/* Infinity Symbol (3D Glow) */}
      <mesh position={[0, 0, -2]}>
        <torusGeometry args={[1.5, 0.15, 16, 100]} />
        <meshStandardMaterial color="#7f5bff" emissive="#b78fff" emissiveIntensity={1.5} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Bunny Head */}
      <mesh position={[0, 0, -2]}>
        <torusGeometry args={[0.8, 0.15, 16, 100]} />
        <meshStandardMaterial color="#fff" emissive="#ff6f00" emissiveIntensity={1.5} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Photon Effect */}
      <ParticleEffect />
    </group>
  );
}

// HeroCanvas Component
export default function HeroCanvas() {
  return (
    <div className="heroCanvas">
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          {/* Cinematic Camera */}
          <CinematicCamera />

          {/* Lighting */}
          <ambientLight intensity={0.9} />
          <directionalLight intensity={0.6} position={[6, 4, 6]} />

          {/* Stars and other background elements */}
          <Stars /> {/* Ensure this component is correctly implemented */}

          {/* Main 3D elements */}
          <MetaLogo />
        </Canvas>
      </Suspense>
    </div>
  );
}

// Stars Component (basic example for background stars)
function Stars() {
  const count = 1000;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 100;
      arr[i + 1] = (Math.random() - 0.5) * 100;
      arr[i + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" count={positions.length / 3} itemSize={3} array={positions} />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}
