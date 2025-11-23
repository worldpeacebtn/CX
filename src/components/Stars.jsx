import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export const Stars = () => {
  const { scene } = useThree();
  const starGeometry = useRef(null);

  useEffect(() => {
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(generateStars(1000)),
      new THREE.PointsMaterial({
        color: 0x888888,
        size: 0.05
      })
    );
    scene.add(stars);

    return () => {
      scene.remove(stars); // Clean up when the component unmounts
    };
  }, [scene]);

  const generateStars = (count) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(Math.random() * 800 - 400); // x
      positions.push(Math.random() * 800 - 400); // y
      positions.push(Math.random() * 800 - 400); // z
    }
    return positions;
  };

  return null; // No need to render anything directly
};
