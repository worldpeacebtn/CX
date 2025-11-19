import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Points,
  PointMaterial,
  PerspectiveCamera,
  Text,
  Float,
  MeshTransmissionMaterial
} from "@react-three/drei";

// ---------------- AUTO THEME --------------------
function useAutoTheme() {
  const hour =
    typeof window !== "undefined" ? new Date().getHours() : 20;
  return hour >= 18 || hour <= 6 ? "night" : "day";
}

// ---------------- STARFIELD --------------------
function Stars({ theme }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(1800 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 120;
      arr[i + 1] = (Math.random() - 0.5) * 80;
      arr[i + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += Math.sin(t + i) * 0.0001;
      arr[i + 1] += Math.cos(t * 0.25 + i) * 0.00008;

      if (Math.random() > 0.9993)
        arr[i + 2] += (Math.random() - 0.5) * 0.5;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={theme === "day" ? 0.09 : 0.14}
        color={theme === "day" ? "#6d4bff" : "#a47cff"}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// ---------------- HOLOGRAPHIC CUBES --------------------
function HoloCubes() {
  const cubes = new Array(7).fill().map(() => ({
    pos: [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 5
    ],
    rotSpeed: Math.random() * 0.6 + 0.2
  }));

  return (
    <>
      {cubes.map((c, i) => (
        <HoloCube key={i} pos={c.pos} rotSpeed={c.rotSpeed} />
      ))}
    </>
  );
}

function HoloCube({ pos, rotSpeed }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * rotSpeed;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.8;
  });

  return (
    <mesh ref={ref} position={pos} scale={0.6}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        samples={8}
        thickness={0.8}
        roughness={0.1}
        transmission={1}
        chromaticAberration={0.25}
        anisotropy={0.4}
        iridescence={1}
        iridescenceIOR={1.4}
        color="#8b5cf6"
      />
    </mesh>
  );
}

// ---------------- QUANTUM DUST --------------------
function QuantumDust() {
  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 8;
      arr[i + 1] = (Math.random() - 0.5) * 6;
      arr[i + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.14) * 0.2;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        size={0.032}
        color="#ffffff"
        transparent
        opacity={0.55}
      />
    </Points>
  );
}

// ---------------- WORMHOLE --------------------
function Wormhole({ theme }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.25;
    ref.current.scale.x = 1 + Math.sin(t * 1.2) * 0.06;
    ref.current.scale.y = 1 + Math.cos(t * 1.1) * 0.06;
  });

  return (
    <mesh ref={ref} position={[0, 0, -7]}>
      <torusGeometry args={[6, 0.35, 16, 200]} />
      <meshBasicMaterial
        wireframe
        color={theme === "day" ? "#bba7ff" : "#8a2be2"}
        opacity={0.35}
        transparent
      />
    </mesh>
  );
}

// ---------------- FLOATING TEXT --------------------
function FloatingText() {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.7}>
      <Text
        color="#ffffff"
        fontSize={0.72}
        position={[0, 2.1, 0]}
        letterSpacing={0.05}
        anchorX="center"
        anchorY="middle"
      >
        X42 QUANTUM DIVISION
      </Text>
    </Float>
  );
}

// ---------------- CENTER LOGO --------------------
function X42Logo() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.8;
    ref.current.rotation.x = Math.sin(t * 0.35) * 0.4;
  });

  return (
    <mesh ref={ref} scale={1.5}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshStandardMaterial
        color="#9d72ff"
        emissive="#c8a8ff"
        emissiveIntensity={2.1}
        metalness={0.9}
        roughness={0.07}
      />
    </mesh>
  );
}

// ---------------- CAMERA --------------------
function CinematicCamera() {
  const ref = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const radius = 1.1;
    const baseX = Math.sin(t * 0.11) * radius;
    const baseY = Math.cos(t * 0.09) * radius * 0.7;

    const parallaxX = pointer.current.x * 0.35;
    const parallaxY = pointer.current.y * 0.22;

    const shakeX = Math.sin(t * 6.8) * 0.018;
    const shakeY = Math.cos(t * 7.7) * 0.018;

    ref.current.position.x = baseX + parallaxX + shakeX;
    ref.current.position.y = baseY + parallaxY + shakeY;
    ref.current.position.z = 19 + Math.sin(t * 0.25) * 0.4;

    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={ref} makeDefault fov={55} />;
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
        height: "100vh",
        pointerEvents: "none",
        background:
          theme === "day"
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.15)",
        backdropFilter: "blur(4px)",
        transition: "background 0.6s ease"
      }}
    >
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <CinematicCamera />

          <ambientLight intensity={0.9} />
          <directionalLight intensity={0.5} position={[5, 5, 5]} />

          <Stars theme={theme} />
          <QuantumDust />
          <HoloCubes />
          <Wormhole theme={theme} />
          <X42Logo />
          <FloatingText />

          <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
