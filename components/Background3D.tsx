import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props: any) => {
    const ref = useRef<any>(null);
    const { isDark } = props;

    // Generate random points in a sphere
    const [sphere] = useState(() => {
        const data = random.inSphere(new Float32Array(1000), { radius: 1.5 });
        return data;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={isDark ? "#fca5a5" : "#94a3b8"}
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};

const Background3D: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    return (
        <div className={`fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars isDark={isDark} />
                {/* Ambient light for depth */}
                {/* OrbitControls could be added for interaction but might interfere with scroll */}
            </Canvas>
        </div>
    );
};

export default Background3D;
