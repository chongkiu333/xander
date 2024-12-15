"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import React, { useRef } from 'react';



function GLTFModel({ modelPath, position = [0, 0, 0], scale = 1 }) {
    const gltf = useLoader(GLTFLoader, modelPath);
    const modelRef = useRef();
  
    // 遍历模型的所有子元素并设置材质
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x000000,    // 设置基础颜色
          metalness: 1.5,       // 完全金属感
          roughness: 0.1,     // 设置粗糙度
          envMapIntensity: 1.5, // 控制环境贴图的强度
        });
      }
    });

    useFrame((state, delta) => {
        if (modelRef.current) {
          modelRef.current.rotation.y += delta * 0.5; // Y轴旋转
          modelRef.current.position.y += Math.sin(state.clock.elapsedTime + position[1]) * 0.005; 
          
        }
      });
  
    return <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />;
  }

export default function Home() {
  const [active, setActive] = useState(false);
  

  return (
    <div className="canvasContainer">
      

      <Canvas camera={{ position: [0, 0, 20] }} style={{ height: '100%'}}>

      <GLTFModel modelPath="/model/ring5.gltf" position={[0, 9, 0]} scale={0.8} />

      <GLTFModel modelPath="/model/ring1.gltf" position={[0, 8, 0]} scale={1.2} />

      

      <GLTFModel modelPath="/model/ring3.gltf" position={[0, 3, 0]} scale={1.2} />

      <GLTFModel modelPath="/model/ring2.gltf" position={[0, -2, 0]} scale={1.2} />

      <GLTFModel modelPath="/model/ring4.gltf" position={[0, -8, 0]} scale={1.2} />
                 
        <ambientLight intensity={10} />
        <directionalLight color="white" position={[1, 3, 5]} />
                  
        <OrbitControls enableZoom={true}  />
        <color attach="background" args={['lightgray']} />
        <Environment preset="forest" background={false} ground={false} />
     </Canvas>
       
    

    </div>
  );
}
