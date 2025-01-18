"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense, useRef , useState} from 'react';
import {Select , Selection } from "@react-three/postprocessing";
import styles from './page.module.css';
import Link from "next/link";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

export function Model(props) {
    const { nodes, materials } = useGLTF('/model2/ring1.gltf')
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ring.geometry}
          material={materials.oil}
          position={[-0.007, -0.247, -0.044]}
          scale={2.5}
        />
      </group>
    )
  }

export default function Page() {


    return (
        <div className="canvasContainer" >

        <div className={styles.headContainer}>
        
        
    
        
         
         </div>
        <Canvas className={styles.canvas}  style={{ height: '100%'}} alpha={false}>
        <Suspense fallback={null}>
          <Selection>
          
          
    
        <OrthographicCamera
            makeDefault // 设置为默认摄像机
            position={[0, 30, 20]} // 摄像机位置
            zoom={85} // 调整缩放程度
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
         
      
    
      </div>
    );
  }