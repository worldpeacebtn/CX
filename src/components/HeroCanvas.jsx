import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Points,
  PointMaterial,
  PerspectiveCamera,
} from "@react-three/drei";

// ---------------- PARALLAX STARFIELD --------------------

function ParallaxStars({ count, spread, speed, size, color }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * spread[0];
      arr[i + 1] = (Math.random() - 0.5) * spread[1];
      arr[i + 2] = (Math.random() - 0.5) * spread[2];
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += Math.sin(t * 0.2 + arr[i]) * speed[0];
      arr[i + 1] += Math.cos(t * 0.15 + arr[i + 1]) * speed[1];
      arr[i + 2] += Math.sin(t * 0.1 + arr[i + 2]) * speed[2];
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={size}
        color={color}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// ---------------- QUANTUM NODES (floating rotating particles) --------------------

function QuantumNodes() {
  const num = 20;
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(num * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 10;
      arr[i + 1] = (Math.random() - 0.5) * 6;
      arr[i + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.25;
    ref.current.rotation.x = t * 0.1;
  });

  return (
    <group ref={ref}>
      <Points positions={positions}>
        <PointMaterial
          color="#9f7cff"
          size={0.35}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </Points>
    </group>
  );
}

// ---------------- ENERGY WAVE --------------------

function EnergyWave() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.scale.x = 1 + Math.sin(t * 0.8) * 0.2;
    ref.current.scale.y = 1 + Math.cos(t * 0.6) * 0.2;
    ref.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, -1, -3]}>
      <ringGeometry args={[3.2, 3.35, 64]} />
      <meshBasicMaterial
        color="#6b4bff"
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

// ---------------- CINEMATIC CAMERA --------------------

function CinematicCamera() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.08) * 0.6;
    ref.current.position.y = Math.cos(t * 0.06) * 0.4;
    ref.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      fov={45}
      position={[0, 0, 16]}
    />
  );
}

// ---------------- HERO CANVAS --------------------

export default function HeroCanvas() {
  return (
    <div className="heroCanvas" aria-hidden>
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <CinematicCamera />
          <ambientLight intensity={0.4} />
          <directionalLight intensity={0.4} position={[10, 10, 5]} />

          {/* Deep space background */}
          <ParallaxStars
            count={900}
            spread={[80, 50, 60]}
            speed={[0.0001, 0.00005, 0.00002]}
            size={0.1}
            color="#5a3aff"
          />

          {/* Mid space */}
          <ParallaxStars
            count={600}
            spread={[50, 30, 40]}
            speed={[0.00025, 0.0002, 0.0001]}
            size={0.12}
            color="#a47cff"
          />

          {/* Foreground particles */}
          <ParallaxStars
            count={250}
            spread={[20, 12, 20]}
            speed={[0.0005, 0.0005, 0.0003]}
            size={0.18}
            color="#d4b3ff"
          />

          <QuantumNodes />
          <EnergyWave />

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
