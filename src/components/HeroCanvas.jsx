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
import {
  EffectComposer,
  Bloom,
  ChromaticAberration
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// ---------------- AUTO THEME --------------------

function useAutoTheme() {
  const isNight =
    typeof window !== "undefined" &&
    (window.matchMedia("(prefers-color-scheme: dark)").matches ||
      new Date().getHours() >= 18 ||
      new Date().getHours() <= 6);
  return isNight ? "night" : "day";
}

// ---------------- STARFIELD --------------------

function Stars({ theme }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 80;
      arr[i + 1] = (Math.random() - 0.5) * 40;
      arr[i + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += Math.sin(t + i) * 0.00008;
      arr[i + 1] += Math.cos(t * 0.25 + i) * 0.00005;
      if (Math.random() > 0.9994) arr[i + 2] += (Math.random() - 0.5) * 0.4;
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

// ---------------- QUANTUM DUST --------------------

function QuantumDust() {
  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 6;
      arr[i + 1] = (Math.random() - 0.5) * 3.5;
      arr[i + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.15;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.03} color="#ffffff" transparent opacity={0.7} />
    </Points>
  );
}

// ---------------- MATRIX RAIN (night only) --------------------

function MatrixRain({ theme }) {
  if (theme === "day") return null;

  const num = 160;

  const positions = useMemo(() => {
    const arr = new Float32Array(num * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 25;
      arr[i + 1] = Math.random() * 18;
      arr[i + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame((_, delta) => {
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 1] -= delta * 3.4;
      if (arr[i + 1] < -10) arr[i + 1] = 12 + Math.random() * 6;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.07} color="#00ff95" transparent />
    </Points>
  );
}

// ---------------- WORMHOLE (spiral warp) --------------------

function Wormhole({ theme }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.18;
    ref.current.scale.x = 1 + Math.sin(t * 1.2) * 0.05;
    ref.current.scale.y = 1 + Math.cos(t * 1.1) * 0.05;
  });

  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <torusGeometry args={[5, 0.3, 16, 180]} />
      <meshBasicMaterial
        wireframe
        color={theme === "day" ? "#b9a3ff" : "#a020f0"}
        transparent
        opacity={theme === "day" ? 0.25 : 0.45}
      />
    </mesh>
  );
}

// ---------------- FLOATING 3D TEXT --------------------

function FloatingText() {
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.5}>
      <Text
        color="#ffffff"
        fontSize={0.7}
        position={[0, 1.8, 0]}
        letterSpacing={0.04}
      >
        X42 QUANTUM DIVISION
      </Text>
    </Float>
  );
}

// ---------------- 3D LOGO (your asset orbiting) --------------------

function X42Logo() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.7;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.3;
  });

  // Replace with your GLB/Logo when you have one
  return (
    <mesh ref={ref} scale={1.4} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#b983ff"
        emissiveIntensity={1.5}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// ---------------- CINEMATIC CAMERA 3.0 --------------------

function CinematicCamera() {
  const ref = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const radius = 0.85;
    const x = Math.sin(t * 0.12) * radius;
    const y = Math.cos(t * 0.09) * radius * 0.7;

    const parallaxX = pointer.current.x * 0.3;
    const parallaxY = pointer.current.y * 0.2;

    const shakeX = Math.sin(t * 6.5) * 0.015;
    const shakeY = Math.cos(t * 7.2) * 0.015;

    ref.current.position.x = x + parallaxX + shakeX;
    ref.current.position.y = y + parallaxY + shakeY;
    ref.current.position.z = 18 + Math.sin(t * 0.2) * 0.3;

    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={ref} makeDefault fov={54} position={[0, 0, 18]} />;
}

// ---------------- ROOT HERO CANVAS --------------------

export default function HeroCanvas() {
  const theme = useAutoTheme();

  return (
    <div
      className="heroCanvas"
      aria-hidden
      style={{
        width: "100%",
        height: "100vh",
        background: theme === "day" ? "#ffffff" : "#000000",
        transition: "background 0.6s ease-in-out",
      }}
    >
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <CinematicCamera />

          <ambientLight intensity={theme === "day" ? 1.2 : 0.4} />
          <directionalLight
            intensity={theme === "day" ? 0.6 : 0.3}
            position={[10, 10, 5]}
          />

          <Stars theme={theme} />
          <QuantumDust />
          <MatrixRain theme={theme} />
          <Wormhole theme={theme} />
          <X42Logo />
          <FloatingText />

          <EffectComposer>
            <Bloom
              intensity={1.6}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
            />
            <ChromaticAberration
              offset={[0.0012, 0.0012]}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
