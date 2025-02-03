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


export function Model2(props) {
    const { nodes, materials } = useGLTF('/model/glasses.gltf')
    return (
      <group {...props} dispose={null}>
        <group position={[-0.8, 0.5, -1]} rotation={[Math.PI / 2, 0, 0]} scale={0.02}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glasses_1.geometry}
            material={materials.wire_027177148}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glasses_2.geometry}
            material={materials['10___Default']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glasses_3.geometry}
            material={materials['08___Default']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glasses_4.geometry}
            material={materials['09___Default']}
          />

    <Html
         position={[-0.8,0,-1]}// 在模型上方 2 个单位
        center 
        distanceFactor={0.01} 
      >
        <div className={styles.view} >
         
          View Product
         
        </div>
      </Html>
        </group>
      </group>
    )
  }

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
      <Link className={styles.title}  href="/">
      <div className={styles.innertitle} >
      XanderGhost<div className={styles.point}></div> 
      </div>
      </Link>
    <div className={styles.album}>




    <div className={styles.productImage}>
    <Image  className={styles.img} alt='albumimg'  src="/productPicture/1.png" layout="responsive" width={100} height={100} />
    </div>


    <div className={styles.productTitle}>
      <div className={styles.iner}>
      <div>ALKA Orange Fleck</div>
      <div>$310</div>
      </div>
    </div>


    <div className={styles.productDiscription}>
      <div className={styles.iner2}>
      <div>Corten is an acetate frame with stainless steel temples, featuring etched graduations resembling a drill gauge. Featuring lenses with 100% UV protection.</div>
      <div>DIMENSIONS + COMPOSITION
Frame width: 125.0mm
Black acetate frame, stainless steel temples, black nylon lenses</div>
      </div>
    </div>



    <div className={styles.shopButton}><div className={styles.iner}>Shop Now</div></div>


    


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
            zoom={85} // 调整缩放程度
            near={0.1}
            far={1000}
          />
    
    
      
        <Model position={[0,0,0]} />
        <Model2 position={[0,0,0]} />

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