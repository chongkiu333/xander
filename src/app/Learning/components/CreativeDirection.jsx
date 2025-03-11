"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF,Loader,Image as DreiImage} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import React, { Suspense, useRef ,useEffect, useState} from 'react';
import {Select , Selection } from "@react-three/postprocessing";
import styles from './CreativeDirection.module.css';
import Link from "next/link";


export function CreativeDirection() {
    return (
        <Canvas className={styles.canvas}  style={{ height: '100%'}} alpha={false}>
      <Suspense fallback={null}>
        <Selection>
        
        
  
      <OrthographicCamera
          makeDefault // 设置为默认摄像机
          position={[0, 30, 20]} // 摄像机位置
          zoom={80} // 调整缩放程度
          near={0.1}
          far={1000}
        />
  
  
    
      
      <Model position={[0,0,0]} />

        <ambientLight intensity={2} />
        <directionalLight color="white" position={[1, 3, 5]} />
                  
        <OrbitControls enableZoom={true}  />
     
        <Environment preset="forest" background={false} ground={false}  />
        </Selection>
  
  
        </Suspense>
     </Canvas> 
       
    
  
   
    );
}



export function Model2(props) {
    const { nodes, materials } = useGLTF('/page/cd.glb')
    const modelRef = useRef();

    useFrame((state, delta) => {
        if (modelRef.current) {
          modelRef.current.rotation.y += delta * 0.1; // Y轴旋转
          
          
        }
      });

    return (
      <group {...props} dispose={null} ref={modelRef}>
        <group
          position={[-1.673, 1.476, 1.049]}
          rotation={[0.925, 0.858, -0.923]}
          scale={[0.034, 0.624, 0.536]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.立方体005_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.立方体005_2.geometry}
            material={materials.材质}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.立方体005_3.geometry}
            material={materials.Material}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.圆环.geometry}
          material={materials.原油}
          position={[0.078, 0.367, -0.07]}
          scale={[1, 0.629, 1]}
        />
      </group>
    )
  }



function Model(props) {
  const { nodes, materials } = useGLTF("/model2/ring2.gltf")
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ring.geometry}
        material={materials.oil}
        position={[0.011, 0.367, -0.012]}
        scale={[1, 1, 1]}
      />

      <BasicBlock position={[0,1.5,0]} />
    </group>
  )
}

function BasicBlock(props){
  const texture = useLoader(THREE.TextureLoader, '/cd/1R5A7235.jpg')
  const aspectRatio = texture.image.width / texture.image.height

  return (
    <mesh {...props} rotation={[0,0,Math.PI/4]}>
      <boxGeometry args={[aspectRatio*1.3, 1.3, 0.06]} />
      <meshBasicMaterial color="black" />
      <DreiImage
        url="/cd/1R5A7235.jpg"
        position={[0, 0, 0.031]}
        rotation={[0, 0, 0]}
        scale={[aspectRatio*1.2, 1.2, 1.2]}
        radius={0.1}
        transparent={true}
      />

<DreiImage
        url="/cd/1R5A7235.jpg"
        position={[0, 0, -0.031]}
        rotation={[0, Math.PI, 0]}
        scale={[aspectRatio*1.2, 1.2, 1.2]}
        radius={0.1}
        transparent={true}
      />
   
    </mesh>
  )
}