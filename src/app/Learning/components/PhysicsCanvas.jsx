import { Canvas,useFrame ,useThree} from '@react-three/fiber';
import * as THREE from "three";
import { Physics, usePlane, useBox ,useCompoundBody} from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { useSphere } from '@react-three/cannon'; 
import { useLoader } from '@react-three/fiber'
import { useState , useEffect, use } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { useRef } from 'react';

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0.8], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}

function LimitedPlane(props) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [0, 0, 0], // 平面位置
    args: [30, 0.1, 30], // 平面的长、宽、高
    rotation: [0, 0, 0],
    ...props,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[30, 0.1, 30]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}


function Cube({ size = [1, 1, 1],position, rotation = [0, 0, 0],...props  }) {
  const [ref] = useBox(() => ({
    type:'Static',
    mass: 1,                       // 设置物理质量
    position,                       // 设置位置
    args: size,                     // 设置碰撞体的大小
    rotation,            // 设置初始角度
  }));

  return (
    <mesh
      receiveShadow
      castShadow
      ref={ref}
    >
      {/* 设置渲染网格的大小 */}
      <boxGeometry args={size} />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
}

function CompoundBody(props) {
  const { size } = useThree();
  
  
  const [ref,api] = useCompoundBody(() => ({
    type: 'Static',
    mass: 10, // 总质量
    rotation: [0, 0, 0],
    shapes: [
      { type: 'Box', position: [0, -0.3, 0], args: [30, 0.5, 30] }, // 地板

      { type: 'Box', position: [-10, 1, 0], args: [1, 4, 20] }, // 第二个立方体
      { type: 'Box', position: [0, 1, -10], args: [20, 4, 1] }, // 第三个立方体
      { type: 'Box', position: [10, 1, 0], args: [1, 4, 20] }, // 第四个立方体
      { type: 'Box', position: [0, 1, 10], args: [20, 4, 1] }, // 第四个立方体
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
    <group ref={ref} >
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[30, 0.5, 30]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh position={[-10, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 15]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, 1, -10]} castShadow receiveShadow>
        <boxGeometry args={[15, 2, 1]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      <mesh position={[10, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 15]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      <mesh position={[0, 1, 10]} castShadow receiveShadow>
        <boxGeometry args={[15, 2, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}




function Sphere(props){
  const [ref] = useSphere(() => ({ mass: 1, position: [0, 10, 0], ...props }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}


export default function PhysicsCanvas() {
  return (
    <div className="canvasContainer">
    <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }} camera={{ position: [-1, 20, 40], fov: 45 }} style={{height:'100%'}}>
      <color attach="background" args={['lightblue']} />
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
      <Physics>
      <CompoundBody position={[0, 5, 0]} />
             
        <Sphere position={[0, 30, 0]} />
      </Physics>
      <OrbitControls />
    </Canvas>
    </div>
  );
}
