"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ mouse }) {
  const meshRef = useRef(null);
  const linesRef = useRef(null);
  const count = 260;

  const { positions, basePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const basePos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + (Math.random() - 0.5) * 0.8;
      const x = r * Math.sin(phi) * Math.cos(theta) * 1.35;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.95;
      const z = r * Math.cos(phi) * 1.1;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;
    }
    return { positions: pos, basePositions: basePos };
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      if (t < 0.6) {
        col[i * 3] = 0.9;
        col[i * 3 + 1] = 0.88;
        col[i * 3 + 2] = 0.82;
      } else if (t < 0.85) {
        col[i * 3] = 0.82;
        col[i * 3 + 1] = 0.5;
        col[i * 3 + 2] = 0.2;
      } else {
        col[i * 3] = 0.85;
        col[i * 3 + 1] = 0.65;
        col[i * 3 + 2] = 0.3;
      }
    }
    return col;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const mx = mouse.current ? mouse.current.x : 0;
    const my = mouse.current ? mouse.current.y : 0;

    meshRef.current.rotation.y = time * 0.06 + mx * 0.25;
    meshRef.current.rotation.x = time * 0.03 + my * 0.15;

    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.06 + mx * 0.25;
      linesRef.current.rotation.x = time * 0.03 + my * 0.15;
    }

    const posArr = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArr[idx] = basePositions[idx] + Math.sin(time * 0.4 + i * 0.08) * 0.03;
      posArr[idx + 1] = basePositions[idx + 1] + Math.cos(time * 0.35 + i * 0.12) * 0.03;
      posArr[idx + 2] = basePositions[idx + 2] + Math.sin(time * 0.25 + i * 0.1) * 0.03;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    if (linesRef.current) {
      const linePositions = [];
      const threshold = 1.0;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < threshold) {
            linePositions.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2]);
            linePositions.push(posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]);
          }
        }
      }
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      linesRef.current.geometry.dispose();
      linesRef.current.geometry = lineGeometry;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#d4a050" transparent opacity={0.06} depthWrite={false} />
      </lineSegments>
    </>
  );
}

function InnerGlow() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const scale = 1 + Math.sin(time * 0.6) * 0.04;
    meshRef.current.scale.set(scale * 1.35, scale * 0.95, scale * 1.1);
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshBasicMaterial color="#c87830" transparent opacity={0.012} side={THREE.BackSide} />
    </mesh>
  );
}

function Scene({ mouse }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 6);
  }, [camera]);
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.25} color="#d4a050" />
      <pointLight position={[-5, -5, 3]} intensity={0.15} color="#c87830" />
      <Particles mouse={mouse} />
      <InnerGlow />
    </>
  );
}

export default function NeuralSphere() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,120,48,0.08) 0%, transparent 70%)" }} />
      </div>
    );
  }

  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <Scene mouse={mouseRef} />
    </Canvas>
  );
}
