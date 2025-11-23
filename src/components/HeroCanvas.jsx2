import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Points,
  PointMaterial,
  OrbitControls,
  Float,
  Text
} from "@react-three/drei";
import * as THREE from "three";

function Stars() {
  const ref = useRef();
  const count = 1200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100;
    positions[i + 1] = (Math.random() - 0.5) * 80;
    positions[i + 2] = (Math.random() - 0.5) * 90;
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] += Math.cos(t * 0.2 + i) * 0.00005;
      pos[i] += Math.sin(t * 0.17 + i) * 0.00004;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        size={0.1}
        color="#7f5bff"
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function Cubes() {
  const cubes = useRef();
  const count = 12;
  const data = useRef(
    new Array(count).fill().map(() => ({
      pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 8],
      scale: 0.3 + Math.random() * 0.5
    }))
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    cubes.current.rotation.y = t * 0.1;
    cubes.current.rotation.x = Math.sin(t * 0.05) * 0.2;
  });

  return (
    <group ref={cubes}>
      {data.current.map((d, i) => (
        <mesh key={i} position={d.pos} scale={[d.scale, d.scale, d.scale]}>
          <boxGeometry />
          <meshStandardMaterial
            color="#7f5bff"
            emissive="#a18bff"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingLabel() {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text fontSize={0.8} color="#7f5bff">
        X42
      </Text>
    </Float>
  );
}

function Camera() {
  const cam = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const r = 1.0;
    cam.current.position.x = Math.sin(t * 0.08) * r + pointer.current.x * 0.25;
    cam.current.position.y = Math.cos(t * 0.09) * r * 0.7 + pointer.current.y * 0.25;
    cam.current.position.z = 20 + Math.sin(t * 0.2) * 0.6;
    cam.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cam} makeDefault fov={50} />;
}

export default function HeroCanvas() {
  return (
    <div style={{ width: "100%", height: "100vh", pointerEvents: "none" }}>
      <Suspense fallback={null}>
        <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.6]}>
          <Camera />
          <ambientLight intensity={0.8} />
          <directionalLight intensity={0.3} position={[5, 5, 5]} />
          <Stars />
          <Cubes />
          <FloatingLabel />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
