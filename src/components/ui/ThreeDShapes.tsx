"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDShapesProps {
  shape: "leaf" | "recycle" | "torus";
  className?: string;
}

export default function ThreeDShapes({ shape, className = "" }: ThreeDShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 200;
    const height = container.clientHeight || 200;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2));
    container.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Objects Group
    const group = new THREE.Group();
    scene.add(group);

    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.Material | THREE.Material[] | null = null;
    let mesh: THREE.Object3D | null = null;

    if (shape === "torus") {
      // Stunning glowing wireframe torus knot
      geometry = new THREE.TorusKnotGeometry(0.8, 0.28, 120, 16);
      material = new THREE.MeshStandardMaterial({
        color: 0x2d6a4f,
        wireframe: true,
        roughness: 0.1,
        metalness: 0.8,
      });
      mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);

      // Inner solid core
      const coreGeo = new THREE.IcosahedronGeometry(0.4, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x52b788,
        flatShading: true,
        roughness: 0.2,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

    } else if (shape === "recycle") {
      // Simulated interactive recycling triangle structure
      const count = 3;
      const radius = 1.0;
      material = new THREE.MeshStandardMaterial({
        color: 0x2d6a4f,
        roughness: 0.3,
        metalness: 0.5,
      });

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Custom pointer capsule
        const capsuleGeo = new THREE.CapsuleGeometry(0.12, 0.7, 8, 16);
        const capsule = new THREE.Mesh(capsuleGeo, material);
        capsule.position.set(x, y, 0);
        capsule.rotation.z = angle + Math.PI / 2;
        group.add(capsule);
      }

      // Add a rotating inner ring
      const ringGeo = new THREE.TorusGeometry(0.8, 0.05, 8, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x74c69d, wireframe: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      group.add(ring);

    } else if (shape === "leaf") {
      // Interactive floating green particle leaves
      const particleCount = 120;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorGreen = new THREE.Color("#40916c");
      const colorLight = new THREE.Color("#d8f3dc");

      for (let i = 0; i < particleCount; i++) {
        // Distribute points in a cylinder shape
        const radius = Math.random() * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const x = Math.cos(theta) * radius;
        const y = (Math.random() - 0.5) * 2.5;
        const z = Math.sin(theta) * radius;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Leaf movements velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.005; // X
        velocities[i * 3 + 1] = 0.005 + Math.random() * 0.01; // Y (floating up)
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005; // Z

        const mixed = colorGreen.clone().lerp(colorLight, Math.random());
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
      });

      mesh = new THREE.Points(geometry, material);
      group.add(mesh);
    }

    // Interactive mouse controls
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - width / 2;
      const y = event.clientY - rect.top - height / 2;
      mouseX = (x / (width / 2)) * 0.4;
      mouseY = (y / (height / 2)) * 0.4;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking interpolation
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      // Group rotation
      group.rotation.y = elapsedTime * 0.35 + targetX;
      group.rotation.x = elapsedTime * 0.15 + targetY;

      // Special particle animations for floating leaf type
      if (shape === "leaf" && geometry && mesh) {
        const positionsArr = geometry.attributes.position.array as Float32Array;
        const particleCount = positionsArr.length / 3;

        for (let i = 0; i < particleCount; i++) {
          // Floating upwards
          positionsArr[i * 3 + 1] += 0.003 + Math.sin(elapsedTime + i) * 0.001; // float Y
          positionsArr[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.002; // sway X

          // Reset if particle goes above screen
          if (positionsArr[i * 3 + 1] > 1.8) {
            positionsArr[i * 3 + 1] = -1.8;
            positionsArr[i * 3] = (Math.random() - 0.5) * 2;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) {
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose());
        } else {
          material.dispose();
        }
      }
    };
  }, [shape]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-[160px] flex items-center justify-center relative select-none cursor-grab active:cursor-grabbing ${className}`}
    />
  );
}
