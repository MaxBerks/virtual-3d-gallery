// src/components/SceneCanvas.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Lighting from './Lighting'
import Room from './Room'
import Painting from './Painting'
import UserController from './UserController'

export default function SceneCanvas() {
    return (
        <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 50 }}>
            <Lighting />
            <Room />
            <Painting position={[0, 1.5, -4.9]} textureUrl="/textures/example.jpg" />
            <UserController />
        </Canvas>
    )
}
