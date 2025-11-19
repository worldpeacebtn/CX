import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";

function Stars() {
  const points = new Array(600).fill().map(() => [
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 30,
  ]);

  return (
    <Points limit={600} range={10}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(points.flat())}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial size={0.08} color="#7f5bff" sizeAttenuation />
    </Points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="heroCanvas" aria-hidden>
      <Suspense fallback={null}>
        <Canvas
          frameloop="demand"           // ✔ Fix #3
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
