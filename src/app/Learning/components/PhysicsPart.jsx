import { Canvas,useFrame ,useThree} from '@react-three/fiber';
import * as THREE from "three";
import { Physics, usePlane, useBox ,useCompoundBody , useSphere, useCylinder , usePointToPointConstraint} from '@react-three/cannon';
import { Environment , OrbitControls , useGLTF ,Loader} from '@react-three/drei';
import { useState , useEffect } from "react";
import React, { useRef } from 'react';
import styles from './PhysicsPart.module.css';
import Image from "next/image";
import Link from "next/link";


const albums = [
  
  { id: "1BFzYg3qyrsCkcg7An1IrS", name: "I7sas Gayed" },
  { id: "0f4OC1KOk5Uo2MVaP0kIbS", name: "Kotshina" },
];


function Floors({setCurrentAlbum}, props) {
  const { nodes: nodes1 ,materials: materials1 } = useGLTF('/model2/ring3.gltf'); 
  const { nodes: nodes2, materials: materials2 } = useGLTF('/model/gltf2.gltf');
  const { nodes: nodes3, materials: materials3 } = useGLTF('/album/kotshina.gltf');
  const { nodes: nodes4, materials: materials4 } = useGLTF('/album/galeedi.gltf');
  const { nodes: nodes5, materials: materials5 } = useGLTF('/album/banzeen.gltf');
  const { nodes: nodes6, materials: materials6 } = useGLTF('/album/tamasee7.gltf');
  // const { nodes: nodes7, materials: materials7 } = useGLTF('/album/tamasee7.gltf');

  const [sphereref] = useSphere(() => ({ 
    mass: 1, 
    position: [0, 10, 20],
    material:{
      friction: 1,
      restitution: 0.01,
    } ,
    ...props }));

   

  // Floor 的物理主体
  const [floorRef, floorApi] = useCylinder(() => ({
    type: 'Static',
    mass: 1,
    position: [0, -1, 0],
    args: [28, 28, 2.5],
    rotation: [0, 0, 0],
    material: {
      friction: 2,
      restitution: 0.1,
    },
  }));

  const [albumref] = useBox(() => ({
    
    mass: 1, 
    position: [-8,4.8, 0], 
    args: [10, 10, 0.36], 
    rotation: [0.2, 0, 0],
    material: {
      friction: 2,
      restitution: 0.2,
    },
    onCollide: (e) => {
      // 碰撞时触发 alert
      if (e.body === sphereref.current) {
        setCurrentAlbum({
          id: "1BFzYg3qyrsCkcg7An1IrS",
          name: "I7sas Gayed",
          tracks: [
            "Minamela", "Fo2", "Atbaneg", "Asetou", "Maskoun"
          ],
          imageUrl: "/album/1.png"
        });


      }
 
    },
   
  }));

  const [kotshinaref] = useBox(() => ({
    
    mass: 1, 
    position: [0,4.8, 0], 
    args: [10, 10, 0.36], 
    rotation: [0.6, 0, 0],
    material: {
      friction: 2,
      restitution: 0.2,
    },
    onCollide: (e) => {
      // 碰撞时触发 alert
      if (e.body === sphereref.current) {
        setCurrentAlbum({
          id: "0f4OC1KOk5Uo2MVaP0kIbS",
          name: "Kotshina",
          tracks: [
            "Kotshina"
          ],
          imageUrl: "/album/2.png"
        });
      }
 
    },
   
  }));

  const [galeediref] = useBox(() => ({
    
    mass: 1, 
    position: [0,4.8, 0], 
    args: [10, 10, 0.36], 
    rotation: [0.3, 0, 0],
    material: {
      friction: 2,
      restitution: 0.2,
    },
    onCollide: (e) => {
      // 碰撞时触发 alert
      if (e.body === sphereref.current) {
        setCurrentAlbum({
          id: "1BFzYg3qyrsCkcg7An1IrS",
          name: "Galeedi",
          tracks: [
            "BMT BMF", "Marra Kol 100 Sana", "Mouve", "Samra", "To2"
          ],
          imageUrl: "/album/3.png"
        });


      }
 
    },
   
  }));



  const [banzeenref] = useBox(() => ({
    
    mass: 1, 
    position: [0,4.8, 0], 
    args: [10, 10, 0.36], 
    rotation: [0.3, 0, 0],
    material: {
      friction: 2,
      restitution: 0.2,
    },
    onCollide: (e) => {
      // 碰撞时触发 alert
      if (e.body === sphereref.current) {
        setCurrentAlbum({
          id: "1BFzYg3qyrsCkcg7An1IrS",
          name: "Banzeen",
          tracks: [
            "Banzeen"
          ],
          imageUrl: "/album/4.png"
        });
      }
 
    },
   
  }));



  const [tamasee7ref] = useBox(() => ({
    
    mass: 1, 
    position: [0,4.8, 0], 
    args: [10, 10, 0.36], 
    rotation: [0, 0, -0.9],
    material: {
      friction: 2,
      restitution: 0.2,
    },
    onCollide: (e) => {
      // 碰撞时触发 alert
      if (e.body === sphereref.current) {
        setCurrentAlbum({
          id: "1BFzYg3qyrsCkcg7An1IrS",
          name: "Tamasee7",
          tracks: [
            "Tamasee7"
          ],
          imageUrl: "/album/5.png"
        });
      }
 
    },
   
  }));

  


  


  usePointToPointConstraint(floorRef, kotshinaref, {
    pivotA: [-15, 0, 8], // Floor 上的连接点
    pivotB: [0, -6, 0.1], // Box 上的连接点
  });

  usePointToPointConstraint(floorRef, galeediref, {
    pivotA: [-8, 0, -15], // Floor 上的连接点
    pivotB: [0, -6, 0.1], // Box 上的连接点
  });

  usePointToPointConstraint(floorRef, banzeenref, {
    pivotA: [9, 0, -7], // Floor 上的连接点
    pivotB: [0, -6, 0.1], // Box 上的连接点
  });


  usePointToPointConstraint(floorRef, tamasee7ref, {
    pivotA: [14, 0, 8], // Floor 上的连接点
    pivotB: [0, -6, 0.1], // Box 上的连接点
  });

  usePointToPointConstraint(floorRef, albumref, {
    pivotA: [2, 0, 6], // Floor 上的连接点
    pivotB: [0, -6, 0.1], // Box 上的连接点
  });

 

  // 鼠标拖拽相关状态
  const dragging = useRef(false);
  const initialMouse = useRef([0, 0]);

 

  // 处理鼠标按下事件
  const handlePointerDown = (event) => {
    dragging.current = true;
    initialMouse.current = [event.clientX, event.clientY];
  };

  // 处理鼠标拖动事件
  const handlePointerMove = (event) => {
    if (dragging.current) {
      const [initX, initY] = initialMouse.current;
      const deltaX = (event.clientX - initX) * 0.01 * 0.1;
      const deltaY = (event.clientY - initY) * 0.01 * 0.1;
      
      floorApi.rotation.set(deltaY, 0, -deltaX);
    }
  };

  // 处理鼠标松开事件
  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <group>
      {/* Floor */}
      <group
        ref={floorRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <mesh
        castShadow
        receiveShadow
        geometry={nodes1.ring.geometry}
        material={materials1.oil}
        position={[0.008, -0.2, -0.035]}
        scale={[5,2.5,5]}
      />
      </group>

      

<mesh receiveShadow castShadow ref={sphereref}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial 
        color={"gray"}
        emissive= {"black"}
        metalness={1}
        roughness={0.14}
        envMapIntensity={1.5}
        />
    </mesh>


      {/*album*/}
      <group  ref={albumref}   scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes2.cube_1.geometry} material={materials2.m001} />
        <mesh castShadow receiveShadow geometry={nodes2.cube_2.geometry} material={materials2.m002} />
      </group>

      {/*album*/}
      <group  ref={kotshinaref}   scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes3.cube_1.geometry} material={materials3.m001} />
        <mesh castShadow receiveShadow geometry={nodes3.cube_2.geometry} material={materials3.m002} />
      </group>


      <group  ref={galeediref}   scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes4.cube_1.geometry} material={materials4.m001} />
        <mesh castShadow receiveShadow geometry={nodes4.cube_2.geometry} material={materials4.m002} />
      </group>


      <group  ref={banzeenref}   scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes5.cube_1.geometry} material={materials5.m001} />
        <mesh castShadow receiveShadow geometry={nodes5.cube_2.geometry} material={materials5.m002} />
      </group>


      <group  ref={tamasee7ref}   scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes6.cube_1.geometry} material={materials6.m001} />
        <mesh castShadow receiveShadow geometry={nodes6.cube_2.geometry} material={materials6.m002} />
      </group>
    </group>
  );
}








function Sphere(props){

  const [ref] = useSphere(() => ({ 
    mass: 1, 
    position: [0, 1, 0],
    material:{
      friction: 1,
      restitution: 0.01,
    } ,
    ...props }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial 
        color={"gray"}
        emissive= {"black"}
        metalness={1}
        roughness={0.14}
        envMapIntensity={1.5}
        />
    </mesh>
  );
}


function Box(props){
  const [ref] = useBox(() => ({ 
    type:'Dynamic',
    mass: 1, 
    position: props.position || [0, 5, 0], 
    args: [10, 10, 0.72], 
    rotation:props.rotation || [0, 0, 0],
    onCollide: (e) => {
      // 碰撞时触发 alert
      
      
    },
    material:{
      friction: 2,
      restitution: 0.05,
    },
     ...props }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry  args={[10, 10, 0.72]} />
      <meshStandardMaterial 
        color={"white"}
        emissive= {"black"}
        metalness={1}
        roughness={0.14}
        envMapIntensity={1.5}
        />
    </mesh>
  );
}







export default function PhysicsPart() {
  const [currentAlbum, setCurrentAlbum] = useState({
    id: "1BFzYg3qyrsCkcg7An1IrS",  // 默认专辑ID
    name: "I7sas Gayed",           // 默认专辑名称
    tracks: [
      "Minamela", "Fo2", "Atbaneg", "Asetou", "Maskoun"
    ],                             // 默认歌曲列表
    imageUrl: "/album/1.png"       // 默认专辑图片
  });
  

  
  return (
    <div className={styles.canvasContainer}>
    
    <div className={styles.headContainer}>
      <Link className={styles.title}  href="/">
      <div className={styles.innertitle} >
      XanderGhost<div className={styles.point}></div> 
      </div>
      </Link>
    <div className={styles.album}>
    <div className={styles.albumTitle}><div class={styles.trapezoidRight}></div> {currentAlbum.name} </div>
    <div className={styles.albumList}>
    {currentAlbum.tracks.map((track, index) => (
              <div key={index}>{`${index + 1}. ${track}`}</div>
            ))}
      

    </div>


    <div className={styles.albumImage}>
    <Image  className={styles.img} alt='albumimg'  src={currentAlbum.imageUrl} layout="responsive" width={100} height={100} />
    </div>


    </div>

    {/* <div className={styles.player}>Player</div> */}

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
    <Canvas camera={{ position: [0, 30, 25] }}  style={{ height: '100%'}} alpha={false}>

     
      
      
      <Physics>
        
        
        <Floors setCurrentAlbum={setCurrentAlbum}  />
        

      </Physics>

    

      <ambientLight intensity={10} />
      <directionalLight color="white" position={[1, 3, 5]} />
      <Environment preset="forest" background={false} ground={false} envMapIntensity={0.2} />
     
   
      
    
   </Canvas>
    </div>
  );
}







