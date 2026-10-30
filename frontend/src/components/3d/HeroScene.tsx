
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Stars(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(3600), { radius: 1.4 }));
  const { resolvedTheme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useFrame((state, delta) => {
    if (ref.current && !prefersReducedMotion) {
      // Base slow ambient rotation
      ref.current.rotation.x -= delta / 24;
      ref.current.rotation.y -= delta / 30;

      // Subtle responsive tilt to pointer
      ref.current.rotation.x += (state.pointer.y * 0.1 - ref.current.rotation.x * 0.02) * 0.05;
      ref.current.rotation.y += (state.pointer.x * 0.1 - ref.current.rotation.y * 0.02) * 0.05;
    }
  });

  const particleColor = resolvedTheme === "light" ? "#4a5568" : "#94a3b8";
  const particleOpacity = resolvedTheme === "light" ? 0.35 : 0.45;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={particleOpacity}
        />
      </Points>
    </group>
  );
}

export function HeroScene() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none opacity-80 dark:opacity-70 transition-opacity duration-500 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1.2] }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <Stars />
      </Canvas>
    </div>
  );
}
