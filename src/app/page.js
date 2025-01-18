"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF , useScroll ,ScrollControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense, useRef , useState} from 'react';
import {Select , Selection } from "@react-three/postprocessing";
import styles from './page.module.css';
import Link from "next/link";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';


function RingModel({modelPath, position,scale=1,text,linkPath, ...props}){
  const { nodes, materials } = useGLTF(modelPath)
  const modelRef = useRef();
  const scroll = useScroll(); 

  useFrame((state, delta) => {
    if (modelRef.current) {
      // const startPosition = [0, position[1], 0]; // 第一位和第三位设置为 0
      // const endPosition = position; 

      // const scrollOffset = scroll.offset; // 0 到 1 之间的值
      // const interpolatedPosition = [
      //   startPosition[0] + (endPosition[0] - startPosition[0]) * scrollOffset,
      //   startPosition[1] + (endPosition[1] - startPosition[1]) * scrollOffset,
      //   startPosition[2] + (endPosition[2] - startPosition[2]) * scrollOffset,
      // ];

      // modelRef.current.position.set(...interpolatedPosition);

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

      <Html
        position={[position[0], position[1] + 1, position[2]]} // 在模型上方 2 个单位
        center 
        distanceFactor={0.01} 
      >
        <div className={styles.subTitle} >
          <Link href={linkPath}>
          {text}
          </Link>
        </div>
      </Html>
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

function RotatingGroup() {
  const groupRef = useRef();

  // 使用 useFrame 实现父级 group 的旋转
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.01; // 缓慢增加 Y 轴旋转
    }
  });

  return (
    <group ref={groupRef}>
      {/* 将所有 RingModel 放在同一个 group 中 */}
      <RingModel modelPath="/model2/ring1.gltf" position={[1, 8, -4.5]} text="Shop" linkPath="/Test/shop" />
      <RingModel modelPath="/model2/ring2.gltf" position={[10, 4, 8]} scale={1.25} text="CreativeDirection" linkPath="/Test/creativedirection" />
      <RingModel modelPath="/model2/ring3.gltf" position={[-5, -2,4.5]} scale={1.1} text="Music" linkPath="/Test/music" />
      <RingModel modelPath="/model2/ring4.gltf" position={[-11, -8, -6]} scale={2} text="Video" linkPath="/Test/video" />
    </group>
  );
}

export default function Home() {
  const [show, setShow] = useState(false);
 
  

return (
  <div className="canvasContainer" >

    <div className={styles.headContainer}>
      <span style={{position: 'absolute'}}>
    <div className={styles.title} onClick={() => setShow(!show)}  >
      XanderGhost<div className={styles.point}></div> {show &&<div style={{marginLeft: '5px'}}>about</div>}
      
    </div>

    {show && <div className={styles.about}>
    Xander Ghost epitomizes the quintessential modern renaissance creative, seamlessly blending his talents across various disciplines. With a decade-long tenure in the realms of design, music, and creative direction, he has become a formidable force in the industry.
    <br/>
    In 2018, Xander unveiled his visionary eyewear brand, A Better Feeling, serving as a testament to his commitment to pioneering excellence.
    <br/>
    Mirroring the avant-garde essence of his music, the brand transcends conventional norms, seamlessly intertwining fashion and art. A Better Feeling has swiftly risen to prominence, adorning the shelves of esteemed retailers worldwide, including Ssense, Selfridges, Louisa Via Roma, Lncc, Level Shoes, and numerous others.
    <br/>
    Notably, Xander&apos;s creations have captured the attention of a global audience, including acclaimed celebrities such as Travis Scott, Billie Eilish, Rosalia, and Burna Boy. Through his unparalleled fusion of creativity and innovation, Xander Ghost continues to leave an indelible mark on the cultural landscape, inspiring and captivating audiences around the globe.
    </div>}

    </span>
     
     </div>
    <Canvas className={styles.canvas}  style={{ height: '100%'}} alpha={false}>
    <Suspense fallback={null}>
      <Selection>
      
      

    <OrthographicCamera
        makeDefault // 设置为默认摄像机
        position={[0, 19, 0]} // 摄像机位置
        zoom={65} // 调整缩放程度
        near={0.1}
        far={1000}
      />


  
    

<ScrollControls pages={3}>
<RotatingGroup />
</ScrollControls>

      <ambientLight intensity={10} />
      <directionalLight color="white" position={[1, 3, 5]} />
                
      <OrbitControls enableZoom={true}  />
   
      <Environment preset="forest" background={false} ground={false}  />
      </Selection>


      </Suspense>
   </Canvas>
     
  

  </div>
);
}