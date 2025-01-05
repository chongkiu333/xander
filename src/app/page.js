"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { useRef , useState} from 'react';
import { EffectComposer, Outline , Select , Selection } from "@react-three/postprocessing";
import styles from './page.module.css';


function RingModel({modelPath, position,scale=1, ...props}){
  const { nodes, materials } = useGLTF(modelPath)
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; // Y轴旋转
      modelRef.current.position.y += Math.sin(state.clock.elapsedTime + position[1]) * 0.005; 
      
    }
  });


  return (
    <group {...props} dispose={null}>
      <mesh
      ref={modelRef}
        castShadow
        receiveShadow
        geometry={nodes.ring.geometry}
        material={materials.oil}
        scale={scale}
        position={position}
      />
    </group>
  )
}

function GLTFModel({ modelPath, position = [0, 0, 0], scale = 1 }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef();

  // 遍历模型的所有子元素并设置材质
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0x303030,
        emissive: 0x333333,
        metalness: 1,
        roughness: 0.14,
        envMapIntensity: 1.5,
      });
    }
  });

  useFrame((state, delta) => {
      if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.5; // Y轴旋转
        modelRef.current.position.y += Math.sin(state.clock.elapsedTime + position[1]) * 0.005; 
        
      }
    });

  return(
  <Select enabled>
    <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
    
   </Select>
  );
}



export default function Home() {
  const [hovered, setHovered] = useState(false);


return (
  <div className="canvasContainer" >
    <div
    className={`${styles.title} ${hovered ? styles.hovered : ""}`}
        onPointerOver={() => setHovered(true)} // 鼠标移入
        onPointerOut={() => setHovered(false)} // 鼠标移出
    
     >
     
      XanderGhost
      
     </div>
    
    <Canvas className={styles.canvas}  style={{ height: '100%'}} alpha={false}>

      <Selection>
      
      

    <OrthographicCamera
        makeDefault // 设置为默认摄像机
        position={[0, 20, 0]} // 摄像机位置
        zoom={45} // 调整缩放程度
        near={0.1}
        far={1000}
      />


  
    {/* <GLTFModel modelPath="/model/ring5.gltf" position={[10, 9, -5]} scale={0.8} />
    <GLTFModel modelPath="/model/ring1.gltf" position={[2, 8, -5]} scale={1} />
    <GLTFModel modelPath="/model/ring3.gltf" position={[10, 3, 6]} scale={1.2} />
    <GLTFModel modelPath="/model/ring2.gltf" position={[-3, -2, 4.5]} scale={0.8} />
    <GLTFModel modelPath="/model/ring4.gltf" position={[-9, -8, -4]} scale={1.2} /> */}

        <RingModel modelPath={"/model2/ring1.gltf"} position={[1, 8, -4.5]} />
        <RingModel modelPath={"/model2/ring2.gltf"} position={[10, 4, 6]} scale={1.2} />
        <RingModel modelPath={"/model2/ring3.gltf"} position={[-5, -2, 4.5]} />
        <RingModel modelPath={"/model2/ring4.gltf"} position={[-11, 8, 5]} rotation={[-Math.PI, 0, 0]} scale={2} />
        
      <ambientLight intensity={10} />
      <directionalLight color="white" position={[1, 3, 5]} />
                
      <OrbitControls enableZoom={true}  />
   
      <Environment preset="forest" background={false} ground={false}  />
      </Selection>
   </Canvas>
     
  

  </div>
);
}