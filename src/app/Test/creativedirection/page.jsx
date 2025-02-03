"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF,Loader} from '@react-three/drei';
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
      <div className={styles.innertitle} >
      XanderGhost<div className={styles.point}></div> 
      </div>
    </Link>
    <div className={styles.album}>
    <div className={styles.albumTitle}><div className={styles.innertitle}>BARRASERB - CAMPAIGN CREATIVE DIRECTION</div></div>
    <div className={styles.content}>
    I crafted a &quot;coming of age&quot; theme, capturing the essence of youth and self-discovery. The campaign showcases a diverse group of young individuals, each embodying a unique style and attitude that reflects the eclectic and rebellious spirit of the brand. The visual direction features a vibrant, energetic backdrop that complements the bold, streetwear-inspired collection. This imagery, with its mix of casual and statement pieces, highlights the journey of growing up and finding one&apos;s identity through fashion, resonating with Barraserb&apos;s core audience.

    </div>

    <div className={styles.imgContainer}>
    <div className={styles.row}>
        <Image src="/cd/1R5A7235.jpg" alt="Image 1" width={200} height={0} layout="intrinsic"/>
      </div>
      <div className={styles.row}>
        <Image src="/cd/1R5A7192.jpg" alt="Image 2" width={200} height={0} layout="intrinsic" />
      </div>
      <div className={styles.row}>
        <Image src="/cd/1R5A7313.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
      </div>

      <div className={styles.row}>
        <Image src="/cd/1R5A7123.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
      </div>

      <div className={styles.row}>
        <Image src="/cd/1R5A7320test.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
      </div>

      <div className={styles.row}>
        <Image src="/cd/1R5A7515.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
      </div>

    </div>


    


    </div>

   

    </div>



<Loader

containerStyles={{
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to bottom, #1a1a1a,#666666,#757575,#ffffff,#ffffff)', // 半透明背景
}}
innerStyles={{
  border:'0.5px solid black',
  width:'300px',
  height:'21px',
  backgroundColor: 'aliceblue', // 背景颜色
  
}}

barStyles={{
  backgroundColor: '#000000', // 进度条颜色
  height: '100%',
  
}}

dataStyles={{
  color: '#fff',
  fontSize: '15px',
  fontFamily: 'ABCDiatype',
 
}}

dataInterpolation={(p) => ``} 
   />
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