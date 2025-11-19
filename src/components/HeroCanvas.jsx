import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";

function Stars() {
  // generate once, not on every render
  const points = useMemo(() => {
    return new Float32Array(
      new Array(600)
        .fill()
        .flatMap(() => [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30,
        ])
    );
  }, []);

  return (
    <Points limit={600} range={40}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={points}
          count={points.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.08}
        color="#7f5bff"
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
          frameloop="demand"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 18], fov: 50 }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight intensity={0.4} position={[10, 10, 5]} />

          <Stars />

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
