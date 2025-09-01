// components/Room.tsx
import { useMemo } from 'react'
import * as THREE from 'three'

export default function Room() {
    const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: 'white' }), [])

    return (
        <>
            {/* Floor */}
            <mesh name="floor" position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#222" />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 2, -5]} receiveShadow>
                <planeGeometry args={[10, 4]} />
                {wallMaterial && <primitive object={wallMaterial} />}
            </mesh>

            {/* Left Wall */}
            <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[10, 4]} />
                {wallMaterial && <primitive object={wallMaterial} />}
            </mesh>

            {/* Right Wall */}
            <mesh position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[10, 4]} />
                {wallMaterial && <primitive object={wallMaterial} />}
            </mesh>
        </>
    )
}
