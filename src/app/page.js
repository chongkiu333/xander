"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF , useScroll ,ScrollControls ,Loader} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense, useRef , useState} from 'react';
import {Select , Selection } from "@react-three/postprocessing";
import styles from './page.module.css';
import Link from "next/link";



function RingModel({modelPath, position,scale=1,text,linkPath, ...props}){
  const { nodes, materials } = useGLTF(modelPath)
  const modelRef = useRef();
  const scroll = useScroll(); 

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
        position={[0, 19, 0]} // 摄像机位置
        zoom={65} // 调整缩放程度
        near={0.1}
        far={1000}
      />


  
    


<RotatingGroup />


      <ambientLight intensity={10} />
      <directionalLight color="white" position={[1, 3, 5]} />
                
      <OrbitControls enableZoom={true}  />
   
      <Environment preset="forest" background={false} ground={false}  />
      </Selection>


      </Suspense>
   </Canvas>
   
     
  
   <div className={styles.headContainer}>
      <span style={{position: 'absolute'}}>
    <div className={styles.title} onClick={() => setShow(!show)}  >
      <div  className={styles.inertitle}>
      XanderGhost<div className={styles.point}></div> {show &&<div style={{marginLeft: '5px'}}>about</div>}
      </div>
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

  </div>
);
}