"use client"
import * as THREE from 'three';
import { use, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, GradientTexture, useCursor, OrbitControls } from '@react-three/drei'



function Flag(){
    const ref = useRef()
    const [hovered,hover] = useState(false)
    useCursor(hovered)

    useFrame(()=>{
        ref.current.distort = THREE.MathUtils.lerp(ref.current.distort, hovered ? 0.4 : 0, hovered ? 0.05 : 0.01)
    })
    return(
        <mesh onPointerOver={()=>hover(true)} onPointerOut={() => hover(false)} scale={[8,4,1]}>
            <planeGeometry args={[1,1,32,32]} />
            <MeshDistortMaterial ref={ref} speed={5}>
                <GradientTexture stops={[0,0.8,1]} colors={['#e63946', '#f1faee', '#a8dadc']} size={100} />
            </MeshDistortMaterial>
        </mesh>
    )
}

export default function DistortMaterial() {

    return(
        <div className="canvasContainer">
        <Canvas>
            <ambientLight />
            <Flag />
            <directionalLight color="yellow" position={[1, 3, 5]} />
            
        </Canvas>
        </div>
    )
}