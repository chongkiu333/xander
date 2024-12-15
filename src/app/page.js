"use client"
import Image from "next/image";
import styles from "./page.module.css";
import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import { Environment,OrbitControls} from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber'
import { useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

function Model({ url }) {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj} scale={0.1} />;
}

function GLTFModel(){
  const gltf = useLoader(GLTFLoader, '/model.gltf');

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0x000000,    // 设置基础颜色
        metalness: 1,       // 完全金属感
        roughness: 0.2,     // 设置粗糙度
        envMapIntensity: 1, // 控制环境贴图的强度
      });
    }
  });
  
  return <primitive object={gltf.scene} scale={0.6} />;
}

export default function Home() {
  const [active, setActive] = useState(false);
  

  return (
    <div className={styles.canvaContainer}>
      

      <Canvas camera={{ position: [0, 0, 40] }} style={{ height: '100%'}}>

        {/* <mesh scale={active ? 1.5 : 1} onPointerEnter={()=>setActive(true)} onPointerLeave={()=>setActive(false)} onClick={()=>alert("Hello World!")}>
          <boxGeometry args={[10, 10, 10]}/>
          <meshPhongMaterial color="royalblue" />
        </mesh> */}

        <GLTFModel />
                 
        <ambientLight intensity={2} />
        <directionalLight color="yellow" position={[1, 3, 5]} />
                  
        <OrbitControls enableZoom={true}  />
        <Environment preset="forest" background />
     </Canvas>
       
    

    </div>
  );
}
