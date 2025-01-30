import { Canvas,useFrame ,useThree} from '@react-three/fiber';
import * as THREE from "three";
import { Physics, usePlane, useBox ,useCompoundBody , useSphere, useCylinder , usePointToPointConstraint} from '@react-three/cannon';
import { Environment , OrbitControls , useGLTF , Html} from '@react-three/drei';
import { useState , useEffect } from "react";
import React, { useRef } from 'react';
import styles from './PhysicsPart.module.css';
import Image from "next/image";
import Link from "next/link";


function Floors(props) {
  const { nodes: nodes1 ,materials: materials1 } = useGLTF('/model2/ring3.gltf'); 
  const { nodes: nodes2, materials: materials2 } = useGLTF('/model/gltf2.gltf');
  const { nodes: nodes3, materials: materials3 } = useGLTF('/album/kotshina.gltf');
  const { nodes: nodes4, materials: materials4 } = useGLTF('/album/galeedi.gltf');
  const { nodes: nodes5, materials: materials5 } = useGLTF('/album/banzeen.gltf');
  const { nodes: nodes6, materials: materials6 } = useGLTF('/album/tamasee7.gltf');
  const { nodes: nodes7, materials: materials7 } = useGLTF('/album/tamasee7.gltf');

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
        // alert('与小球发生碰撞!');
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
        // alert('与小球发生碰撞!');
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
        // alert('与小球发生碰撞!');
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
        // alert('与小球发生碰撞!');
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
        // alert('与小球发生碰撞!');
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

  // 创建约束：连接 Floor 和 Box
  // usePointToPointConstraint(floorRef, boxRef, {
  //   pivotA: [5, 0, 15], // Floor 上的连接点
  //   pivotB: [0, -5, 0.5], // Box 上的连接点
  // });

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

      {/* Box */}
      {/* <mesh ref={boxRef} castShadow receiveShadow>
        <boxGeometry args={[10, 10, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh> */}

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



function Album1(props){
  const { nodes: nodes2, materials: materials2 } = useGLTF('/model/gltf2.gltf');
  const [albumref] = useBox(() => ({
    type: 'Static',
    mass: 1, 
    position: [0,4.8, 0], 
    args: [10, 10, 0.36], 
    friction: 100,
   
  }))

  return(
    <group  ref={albumref}   scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes2.cube_1.geometry} material={materials2.m001} />
        <mesh castShadow receiveShadow geometry={nodes2.cube_2.geometry} material={materials2.m002} />
      </group>
  )
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
  return (
    <div className={styles.canvasContainer}>
    
    <div className={styles.headContainer}>
      <Link className={styles.title}  href="/">
      <div className={styles.innertitle} >
      XanderGhost<div className={styles.point}></div> 
      </div>
      </Link>
    <div className={styles.album}>
    <div className={styles.albumTitle}><div class={styles.trapezoidRight}></div>17sas Gayed</div>
    <div className={styles.albumList}>
     <div>1. Minamela</div>
      <div>2. Fo2</div>
      <div>3. Atbaneg</div>
      <div>4. Asetou</div>
      <div>5. Maskoun</div>
      

    </div>


    <div className={styles.albumImage}>
    <Image  className={styles.img} alt='albumimg'  src="/album/1.png" layout="responsive" width={100} height={100} />
    </div>


    </div>

    {/* <div className={styles.player}>Player</div> */}

    </div>
    <Canvas camera={{ position: [0, 30, 25] }}  style={{ height: '100%'}} alpha={false}>

     
      
      
      <Physics>
        
        
        <Floors   />
        

      </Physics>

    

      <ambientLight intensity={10} />
      <directionalLight color="white" position={[1, 3, 5]} />
      <Environment preset="forest" background={false} ground={false} envMapIntensity={0.2} />
     
   
      
    
   </Canvas>
    </div>
  );
}








function CompoundBody(props) {
  const { size } = useThree();
  
   // 加载第一个模型
   const { nodes: nodes1 } = useGLTF('/model/ring2.gltf'); 

   // 加载第二个模型
   const { nodes: nodes2, materials: materials2 } = useGLTF('/model/album1.gltf');
  //  const { nodes: nodes3, materials: materials3 } = useGLTF('/model/album2.gltf');


  const [ref,api] = useCompoundBody(() => ({
    type: 'Static',
    mass: 10, // 总质量
    rotation: [0, 0, 0],
    material:{
      friction: 1,
      restitution: 0.1,
    },
    shapes: [
      { type: 'Cylinder', position: [0, -10, 0], args: [28, 28, 5.68] },  // 地板
      { 
        type: 'Box', 
        position: [0, 6.5, 0], 
        args: [10, 10, 0.36] , 
        
    },
      // { type: 'Box', position: [15, 6.5, -10], args: [10, 10, 0.36] },
      
      
    ],
    ...props,
  }));


   // 鼠标拖拽相关状态
   const dragging = useRef(false); // 是否正在拖拽
   const initialMouse = useRef([0, 0]); // 鼠标初始位置
 
   // 处理鼠标按下事件
   const handlePointerDown = (event) => {
     dragging.current = true;
     initialMouse.current = [event.clientX, event.clientY];
   };
 
   // 处理鼠标拖动事件
   const handlePointerMove = (event) => {
     if (dragging.current) {
       const [initX, initY] = initialMouse.current;
       const deltaX = (event.clientX - initX) * 0.01*0.5; // 计算鼠标移动的 X 偏移量
       const deltaY = (event.clientY - initY) * 0.01*0.5; // 计算鼠标移动的 Y 偏移量
 
       // 根据鼠标拖动，设置物理引擎的旋转
       api.rotation.set(deltaY, 0, -deltaX);
     }
   };
 
   // 处理鼠标松开事件
   const handlePointerUp = () => {
     dragging.current = false;
   };


   




  return (
    <>
    <group 
    ref={ref}
    onPointerDown={handlePointerDown} 
      onPointerMove={handlePointerMove} 
      onPointerUp={handlePointerUp}
     >
      <mesh
       
        geometry={nodes1.ring.geometry} // 使用加载的 GLTF 模型的几何体
        scale={[5,3,5]} 
        castShadow
        receiveShadow
      >
        {/* 简单的材质 */}
        <meshStandardMaterial 
        color={"gray"}
        emissive= {"black"}
        metalness={1}
        roughness={0.14}
        envMapIntensity={1.5}
        />
      </mesh>

      <group  position={[0, 6.5, 0]}  scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes2.cube_1.geometry} material={materials2.m001} />
        <mesh castShadow receiveShadow geometry={nodes2.cube_2.geometry} material={materials2.m002} />
      </group>

      {/* <group position={[15, 6.5, -10]} rotation={[0, 0.3, 0]} scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes3.cube_1.geometry} material={materials3.m001} />
        <mesh castShadow receiveShadow geometry={nodes3.cube_2.geometry} material={materials3.m002} />
      </group> */}



      
    </group>

    
    </>
  );
}