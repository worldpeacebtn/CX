import React, { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 40;   // x
      arr[i + 1] = (Math.random() - 0.5) * 20; // y
      arr[i + 2] = (Math.random() - 0.5) * 30; // z
    }
    return arr;
  }, []);

  return (
    <Points positions={positions}>
      <PointMaterial
        transparent
        size={0.1}
        color="#9a6bff"
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="heroCanvas" aria-hidden>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 18], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <Stars />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
