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


export default function Page() {


    return (
        <div className="canvasContainer" >

        
    <div className={styles.headContainer}>
      <Link className={styles.title}  href="/">
    
      XanderGhost<div className={styles.point}></div> 
      
    </Link>
    <div className={styles.album}>
    <div className={styles.albumTitle}>A BETTER FEELING</div>
    <div className={styles.content}>
    Founded, spearheaded creative direction and design at A Better Feeling since its inception in 2018. Recently acquired by serial investor Ahmed El Sewedy i still maintain the creative director role out of our design studio in London.

    </div>


    


    </div>

   

    </div>
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
         
      
    
      </div>
    );
  }