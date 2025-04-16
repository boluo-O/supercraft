import { Canvas } from "@react-three/fiber"
import { CameraControls, Center, Grid, useGLTF } from "@react-three/drei"

interface SuziProps {
    rotation?: [number, number, number]
    scale?: number
}

function Suzi(props: SuziProps) {
    const { nodes } = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf"
    )
    return (
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Suzanne.geometry}
            {...props}
        >
            <meshStandardMaterial color="#9d4b4b" />
        </mesh>
    )
}
const App = () => {
    const gridSize: [number, number] = [10.5, 10.5]
    const gridConfig = {
        cellSize: 0.6,
        cellThickness: 1,
        cellColor: "black",
        sectionSize: 3.3,
        sectionThickness: 1.5,
        sectionColor: "#9d4b4b",
        fadeDistance: 25,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true,
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Canvas className="w-full aspect-square bg-white rounded-lg shadow-lg">
                <CameraControls />
                <group position={[0, -0.5, 0]}>
                    <Center top>
                        <Suzi rotation={[-0.63, 0, 0]} scale={2} />
                    </Center>

                    <Grid
                        position={[0, 0, 0]}
                        args={gridSize}
                        // {...gridConfig}
                    />
                </group>
                <mesh position={[0, 5, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial />
                    <ambientLight intensity={0.1} />
                    <directionalLight position={[0, 0, 5]} />
                </mesh>
            </Canvas>
        </div>
    )
}

export default App
