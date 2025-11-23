import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Points,
  PointMaterial,
  PerspectiveCamera,
} from "@react-three/drei";

// ---------------- STARFIELD --------------------

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 40;
      arr[i + 1] = (Math.random() - 0.5) * 20;
      arr[i + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      // cinematic drift
      arr[i + 1] += Math.sin(t + i) * 0.00015;
      arr[i] += Math.cos(t * 0.3 + i) * 0.0001;

      // occasional sparkle
      if (Math.random() > 0.999) {
        arr[i + 2] += (Math.random() - 0.5) * 0.3;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={0.12}
        color="#a47cff"
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// ---------------- MATRIX RAIN --------------------

function MatrixRain() {
  const num = 140;

  const positions = useMemo(() => {
    const arr = new Float32Array(num * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 20;
      arr[i + 1] = Math.random() * 15;
      arr[i + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame((_, delta) => {
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 1] -= delta * 3.0;
      if (arr[i + 1] < -8) arr[i + 1] = 10 + Math.random() * 5;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        size={0.06}
        color="#00ff95"
        sizeAttenuation
        transparent
      />
    </Points>
  );
}

// ---------------- CINEMATIC CAMERA --------------------

function CinematicCamera() {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.12) * 0.4;
    ref.current.position.y = Math.cos(t * 0.08) * 0.3;
    ref.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={ref} makeDefault fov={50} position={[0, 0, 18]} />;
}

// ---------------- HERO CANVAS --------------------

export default function HeroCanvas() {
  return (
    <div className="heroCanvas" aria-hidden>
      <Suspense fallback={null}>
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <CinematicCamera />

          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.3} position={[10, 10, 5]} />

          <Stars />
          <MatrixRain />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
