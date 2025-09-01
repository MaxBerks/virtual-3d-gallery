// components/Painting.tsx
import { useTexture } from '@react-three/drei'

type Props = {
    position: [number, number, number]
    textureUrl: string
}

export default function Painting({ position, textureUrl }: Props) {
    const texture = useTexture(textureUrl)

    return (
        <mesh position={position}>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}
