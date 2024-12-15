"use client"
import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import { Environment,OrbitControls} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import React, { use, useRef } from "react";
import { useSpring,animated,config} from '@react-spring/three'
import { useState } from "react";



export default function AnimateWithRSPage() {

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
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly, //丝滑过度
  })
  const myMesh = useRef();

    useFrame(({ clock }) =>{
        myMesh.current.rotation.y = Math.sin(clock.getElapsedTime())
        
    })


   
    return (
      <animated.mesh scale={scale} onClick={() => setActive(!active)} ref={myMesh}>
        {/* Width and height segments for displacementMap */}
        <boxGeometry />
      <meshPhongMaterial color="royalblue" />
      </animated.mesh>
    )
  }