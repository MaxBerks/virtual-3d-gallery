// components/Lighting.tsx

export default function Lighting() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                castShadow
                intensity={1}
                position={[4, 5, 2]}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
        </>
    )
}
