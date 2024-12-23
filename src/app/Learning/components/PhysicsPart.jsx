import { Canvas,useFrame ,useThree} from '@react-three/fiber';
import * as THREE from "three";
import { Physics, usePlane, useBox ,useCompoundBody , useSphere, useCylinder , useWorld } from '@react-three/cannon';
import { Environment , OrbitControls , useGLTF , Html} from '@react-three/drei';
import { useState , useEffect } from "react";
import React, { useRef } from 'react';
import { CannonDebugger } from '@react-three/cannon';








function CompoundBody(props) {
  const { size } = useThree();
  
   // 加载第一个模型
   const { nodes: nodes1 } = useGLTF('/model/ring2.gltf'); 

   // 加载第二个模型
   const { nodes: nodes2, materials: materials2 } = useGLTF('/model/album1.gltf');
   const { nodes: nodes3, materials: materials3 } = useGLTF('/model/album2.gltf');


  const [ref,api] = useCompoundBody(() => ({
    type: 'Static',
    mass: 10, // 总质量
    rotation: [0, 0, 0],
    shapes: [
      { type: 'Cylinder', position: [0, 0, 0], args: [28, 28, 5.68] }, // 地板
      { type: 'Box' ,position: [0,6.2, 0], args: [5, 11, 0.36]}
      
    ],
    ...props,
  }));




  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, z: 0 });

  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size]);

  useFrame(() => {
    const maxRotation = Math.PI / 12;
    
    // 平滑插值
    const targetRotationX = mouseRef.current.y * maxRotation;
    const targetRotationZ = -mouseRef.current.x * maxRotation;
    
    // 使用插值创建平滑过渡
    rotationRef.current.x += (targetRotationX - rotationRef.current.x) * 0.1;
    rotationRef.current.z += (targetRotationZ - rotationRef.current.z) * 0.1;
    
    // 同时更新物理引擎和渲染
    if (ref.current) {
      ref.current.rotation.x = rotationRef.current.x;
      ref.current.rotation.z = rotationRef.current.z;
    }

    // 关键：使用 api 更新物理引擎的旋转
    api.rotation.set(
      rotationRef.current.x, 
      0, 
      rotationRef.current.z
    );
  });

  return (
    <>
    <group ref={ref} >
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

      <group position={[15, 6.5, -10]} rotation={[0, 0.3, 0]} scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes3.cube_1.geometry} material={materials3.m001} />
        <mesh castShadow receiveShadow geometry={nodes3.cube_2.geometry} material={materials3.m002} />
      </group>



      
    </group>

    
    </>
  );
}




function Sphere(props){
  const [ref] = useSphere(() => ({ mass: 1, position: [0, 5, 0], ...props }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <sphereGeometry args={[1.5]} />
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


function GLTFModel(props){
    const group = useRef(); // 用于引用 GLTF 模型的组
  const { nodes } = useGLTF('/model/ring2.gltf') // 加载模型文件
  const [ref] = useCylinder(() => ({
    type: 'Static',
    mass: 1, 
    position: [0, 0, 0], 
    args: [5.68, 0.64, 5.68], 
  }))

  return (
    <group ref={group} dispose={null}>
     
      <mesh
        ref={ref}
        geometry={nodes.ring.geometry} // 使用加载的 GLTF 模型的几何体
        scale={4.5} 
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
    </group>
  )
}



function AlbumModel(){
  const group = useRef(); 
  const { nodes , materials} = useGLTF('/model/album1.gltf') // 加载模型文件
  const [ref] = useBox(() => ({
    type: 'Static',
    mass: 1, 
    position: [0,6.2, 0], 
    args: [5, 11, 0.36], 
  }))



  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t/2)*0.4;
  })

  return(
    <group ref={group} dispose={null}>
      <group ref={ref} position={[0, 6.5, 0]} scale={[5, 5, 0.36]}>
        <mesh castShadow receiveShadow geometry={nodes.cube_1.geometry} material={materials.m001} />
        <mesh castShadow receiveShadow geometry={nodes.cube_2.geometry} material={materials.m002} />
      </group>
    </group>
  )
}


export default function PhysicsPart() {
  return (
    <div className="canvasContainer">
    

    <Canvas camera={{ position: [-1, 20, 40] }}  style={{ height: '100%'}} alpha={false}>

     
      
      
      <Physics>
        <Sphere position={[0, 30, 0]} />
        {/* <GLTFModel />
        <AlbumModel /> */}
        <CompoundBody />

        

      </Physics>

    

      <ambientLight intensity={10} />
      <directionalLight color="white" position={[1, 3, 5]} />
      <Environment preset="forest" background={false} ground={false} envMapIntensity={0.2} />
      <OrbitControls enableZoom={true}  />
   
      
    
   </Canvas>
    </div>
  );
}
