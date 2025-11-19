import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";

function Stars() {
  const points = new Array(600).fill().map((_, i) => [
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 30
  ]);
  return (
    <Points limit={600} range={10}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attachObject={['attributes', 'position']} array={new Float32Array(points.flat())} count={points.length} itemSize={3} />
      </bufferGeometry>
      <PointMaterial attach="material" size={0.08} color="#7f5bff" sizeAttenuation />
    </Points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="heroCanvas" aria-hidden>
      <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight intensity={0.4} position={[10, 10, 5]} />
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
