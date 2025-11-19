import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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
      // Quantum drift wave
      arr[i + 1] += Math.sin(t + i) * 0.00015;
      arr[i] += Math.cos(t * 0.3 + i) * 0.0001;

      // Sparkle effect
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

export default function HeroCanvas() {
  return (
    <div className="heroCanvas" aria-hidden>
      <Suspense fallback={null}>
        <Canvas
          frameloop="always"        // ✔ FIXED
          dpr={[1, 2]}
          camera={{ position: [0, 0, 18], fov: 50 }}
        >
          <ambientLight intensity={0.5} />

          <Stars />

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
