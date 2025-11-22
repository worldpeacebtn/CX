import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4);

    // Lighting
    const light = new THREE.PointLight(0x88ccff, 1.2);
    light.position.set(2, 2, 3);
    scene.add(light);

    // Geometry
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);

    // Shader material — lightweight quantum shimmer
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#6ee7ff") },
        color2: { value: new THREE.Color("#d6b6ff") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        void main() {
          float pulse = sin(vUv.x * 12.0 + time * 2.0) * 0.5 + 0.5;
          vec3 mixed = mix(color1, color2, pulse);
          gl_FragColor = vec4(mixed, 0.9);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    const animate = () => {
      material.uniforms.time.value += 0.01;

      mesh.rotation.x += 0.0025;
      mesh.rotation.y += 0.0035;

      // Smooth 3D drift (quantum feel)
      camera.position.x = Math.sin(material.uniforms.time.value * 0.3) * 0.4;
      camera.position.y = Math.cos(material.uniforms.time.value * 0.25) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    />
  );
}
