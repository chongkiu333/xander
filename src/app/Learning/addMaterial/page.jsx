"use client"
import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import { Environment,OrbitControls} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useTexture } from "@react-three/drei"



export default function AddMaterialPage() {
    // const colorMap = useLoader(TextureLoader, '/addMaterial/PavingStones092_1K_Color.jpg');

    // const [colorMap, displacementMap, normalMap, roughnessMap,  aoMap] = useTexture([
    // '/addMaterial/PavingStones092_1K_Color.jpg',
    // '/addMaterial/PavingStones092_1K_Displacement.jpg',
    // '/addMaterial/PavingStones092_1K_Normal.jpg',
    // '/addMaterial/PavingStones092_1K_Roughness.jpg',
    // '/addMaterial/PavingStones092_1K_AmbientOcclusion.jpg',
    // ])

    return (
        <div className="canvasContainer">
            <Canvas camera={{ position: [0, 0, 3] }} style={{ height: '100%'}}>

            <Scene />

           
                    
            <ambientLight intensity={2} />
            <directionalLight color="yellow" position={[1, 3, 5]} />
                    
            <OrbitControls enableZoom={true}  />
            <Environment preset="forest" background />
            </Canvas>

        </div>
    )
}

function Scene() {
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
      '/addMaterial/PavingStones092_1K_Color.jpg',
    '/addMaterial/PavingStones092_1K_Displacement.jpg',
    '/addMaterial/PavingStones092_1K_Normal.jpg',
    '/addMaterial/PavingStones092_1K_Roughness.jpg',
    '/addMaterial/PavingStones092_1K_AmbientOcclusion.jpg',
    ])


    const props = useTexture({
        map: '/addMaterial/PavingStones092_1K_Color.jpg',
        displacementMap: '/addMaterial/PavingStones092_1K_Displacement.jpg',
        normalMap: '/addMaterial/PavingStones092_1K_Normal.jpg',
        roughnessMap: '/addMaterial/PavingStones092_1K_Roughness.jpg',
        aoMap: '/addMaterial/PavingStones092_1K_AmbientOcclusion.jpg',
      })
    return (
      <mesh>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial
          displacementScale={0.2}
          {...props}
        />
      </mesh>
    )
  }