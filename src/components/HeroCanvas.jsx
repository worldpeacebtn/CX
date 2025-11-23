import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Stars } from "./Stars"; // Assuming you have a custom stars component
import * as THREE from 'three';

function CinematicCamera() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const dolly = 10 + Math.sin(t * 0.12) * 1.2; // closer camera
    const orbitX = Math.sin(t * 0.07) * 0.6;
    const orbitY = Math.cos(t * 0.05) * 0.45;
    const desired = new THREE.Vector3(orbitX, orbitY, dolly);
    ref.current.position.lerp(desired, 0.06);
    ref.current.lookAt(0, 0, 0);
  });
  return <PerspectiveCamera ref={ref} makeDefault fov={50} />;
}

function MetaLogo() {
  return (
    <mesh scale={[2, 2, 2]} position={[0, 0, -2]}>
      <torusGeometry args={[1.5, 0.15, 16, 100]} />
      <meshStandardMaterial color="#7f5bff" emissive="#b78fff" emissiveIntensity={1.5} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

function BunnyHead() {
  return (
    <mesh scale={[1, 1, 1]} position={[0, 0, -2]}>
      <torusGeometry args={[0.8, 0.15, 16, 100]} />
      <meshStandardMaterial color="#fff" emissive="#ff6f00" emissiveIntensity={1.5} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

export default function HeroCanvas() {
  const theme = useAutoTheme();  // Replace with your theme hook

  return (
    <div className="heroCanvas">
      <Suspense fallback={null}>
        <Canvas>
          <CinematicCamera />
          <ambientLight intensity={0.9} />
          <directionalLight intensity={0.6} position={[6, 4, 6]} />
          <Stars theme={theme} />
          <MetaLogo />
          <BunnyHead />
        </Canvas>
      </Suspense>
    </div>
  );
}
