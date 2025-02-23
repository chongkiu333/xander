"use client"
import { useGLTF, Image as DreiImage } from '@react-three/drei';

import React, { Suspense, useRef , useState, useEffect} from 'react';
import { easing } from "maath";
import {Select , Selection } from "@react-three/postprocessing";
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, OrthographicCamera} from '@react-three/drei';
import styles from './VideoBox.module.css';



export function VideoBox({thumbnailUrl, ...props}){
    const ref = useRef();
    const [isHover, setIsHover] = useState(false);
    const pointerOver = () => setIsHover(true);
    const pointerOut = () => setIsHover(false);

    useFrame((state,delta)=>{
      easing.damp3(ref.current.position,[
        ref.current.position.x,
        isHover ? 0.6 : 0.3, // y轴位置：hover时上移到0.8，否则保持在0.3
        ref.current.position.z
      ],delta)
    })

    const { nodes, materials } = useGLTF('/page/videoblock.glb')


  return (
    <group ref={ref} {...props} dispose={null} onPointerOver={pointerOver} onPointerOut={pointerOut}>
      <mesh castShadow receiveShadow geometry={nodes.base.geometry} material={materials.原油} />
     
    

    <DreiImage 
        // url="https://i.ytimg.com/vi/ZcO_CLtyXfQ/mqdefault.jpg"
        url={thumbnailUrl}
        position={[-0.06, 0.45, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.55, 0.85, 1]}
      />
      
    </group>
  )
    
  }

  export function Carousel({radius=3.2, count =12, thumbnailUrl}){
    return Array.from({length:count},(_,i)=>(
      <VideoBox 
        key={i}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        thumbnailUrl={thumbnailUrl}
      />
    ))
  }

  export function Model(props) {
    const { nodes, materials } = useGLTF('/page/videoBase.glb')
    return (
      <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.锥体.geometry} material={materials.原油} />
    </group>
    )
  }



  export function VideoScene({ videoDatas }) {
  const [textureLoaded,setTextureLoaded] = useState(false);
  return (
    <Canvas className={styles.canvas} style={{ height: '100%'}} alpha={false}>
      <Suspense fallback={null}>
        <Selection>
          <OrthographicCamera
            makeDefault
            position={[10, 20, 20]}
            zoom={135}
            near={0.1}
            far={1000}
          />
          <Model position={[0,0,0]} />
          <VideoBox 
            thumbnailUrl={videoDatas[4]?.thumbnails?.medium?.url}
            rotation={[0,Math.PI/2,0]} 
            position={[-3.2, 0.3, 0]} 
            onLoad={()=>setTextureLoaded(true)}
          />
          <ambientLight intensity={10} />
          <directionalLight color="white" position={[1, 3, 5]} />
          <OrbitControls enableZoom={true} />
          <Environment preset="forest" background={false} ground={false} />
        </Selection>
      </Suspense>
    </Canvas>
  );
}