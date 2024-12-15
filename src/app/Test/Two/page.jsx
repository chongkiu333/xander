"use client"

import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import React, { useRef } from 'react';
import {Image} from '@react-three/drei';


function ProductImage() {
    // 使用 TextureLoader 加载图片
    const texture = useLoader(TextureLoader, '/productPicture/IMG_1522.jpg')
  
    return (
      <mesh>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    )
  }


  function AnimatedImage({ url, position, rotation, scale }) {
    const imageRef = useRef();
    
    // 添加动画逻辑
    useFrame((state, delta) => {
      if (imageRef.current) {
        // 平移动画（基于时间变化）
        // imageRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
        imageRef.current.rotation.y = Math.sin(state.clock.elapsedTime *0.2) * Math.PI / 4;
        // 旋转动画
        
      }
    });
  
    return (
      <Image
        ref={imageRef}
        url={url}
        position={position}
        rotation={rotation}
        scale={scale}
        material-side="DoubleSide"
      />
    );
  }


  function GLTFModel2({ modelPath, position = [0, 0, 0], scale = 1 }) {
    const gltf = useLoader(GLTFLoader, modelPath);
    
  
    // 遍历模型的所有子元素并设置材质
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x254d93,    // 设置基础颜色
          metalness: 0.5,       // 完全金属感
          roughness: 0.5,     // 设置粗糙度
          envMapIntensity: 0.5, // 控制环境贴图的强度
        });
      }
    });

   
  
    return <primitive  object={gltf.scene} position={position} scale={scale} />;
  }


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
      

      <Canvas camera={{ position: [0, 5, 10] }} style={{ height: '100%'}} alpha={false}>

      
       
      <GLTFModel2 modelPath="/model/glasses.gltf" position={[0, 3, 0]} scale={0.05} />

        <GLTFModel modelPath="/model/ring3.gltf" position={[0, 0, 0]} scale={2} />
        {/* <AnimatedImage 
        url="/productPicture/A-Better_Feeling-7.jpg"
        position={[0, 2, 2]} 
        rotation={[0, 0, 0]}
        scale={[2.5, 2.5 * 1.22]} 
      /> */}
{/* 
<AnimatedImage 
        url="/productPicture/IMG_1522.jpg"
        position={[-2, 2, -4]} 
        rotation={[0, Math.PI / 3, 0]}
        scale={[2.5, 2.5 * 1.22]} 
      />

<AnimatedImage 
        url="/productPicture/03.jpg"
        position={[2, 2, -4]} 
        rotation={[0, -Math.PI / 3, 0]}
        scale={[2.5, 2.5 * 1.22]} 
      />
      
      <AnimatedImage 
        url="/productPicture/N4sX3VR8.jpeg"
        position={[-3, 2, 4]} 
        rotation={[0, Math.PI / 3, 0]}
        scale={[2.5, 2.5 * 1.22]} 
      />
      
      <AnimatedImage 
        url="/productPicture/PUR_ABF_01_studioimage_assamble_9-2.jpg"
        position={[4, 2, 5]} 
        rotation={[0, -Math.PI / 3, 0]}
        scale={[2.5, 2.5 * 1.22]} 
      />
      
      <AnimatedImage 
        url="/productPicture/Screenshot-2024-05-30-at-16.56.24.png"
        position={[4, 2, 3]} 
        rotation={[0, -Math.PI / 2, 0]}
        scale={[2.5, 2.5 * 1.5]} 
      /> */}
                 
        <ambientLight intensity={10} />
        <directionalLight color="white" position={[1, 3, 5]} />
                  
        <OrbitControls enableZoom={true}  />
        <color attach="background" args={['lightgray']} />
        <Environment preset="forest" background={false} ground={false} />
     </Canvas>
       
    

    </div>
  );
}
