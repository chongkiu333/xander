"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useRef } from "react";
import { Select, Selection } from "@react-three/postprocessing";

function GLTFModel({ modelPath, position = [0, 0, 0], scale = 1 }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef();

  // 用于存储边缘线
  const edgesRefs = useRef([]);

  // 遍历模型并初始化材质
  React.useEffect(() => {
    edgesRefs.current = []; // 清空之前的边缘线引用
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // 添加标准网格材质
        child.material = new THREE.MeshStandardMaterial({
          color: 0x303030,
          emissive: 0x333333,
          metalness: 1,
          roughness: 0.14,
          envMapIntensity: 1.5,
        });

        // 创建边缘线
        const edges = new THREE.EdgesGeometry(child.geometry, 18); // 20 是角度阈值
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color: 0x000000, // 边缘线颜色
            linewidth: 2, // 线条宽度
          })
        );
        line.visible = false; // 初始隐藏边缘线
        edgesRefs.current.push(line); // 保存边缘线引用
        child.add(line);
      }
    });
  }, [gltf]);

  // 动态检测摄像机位置，切换材质
  const { camera } = useThree();
  useFrame(() => {
    const isTopView =
      camera.position.y > 8 && Math.abs(camera.position.x) < 2 && Math.abs(camera.position.z) < 2;

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.visible = !isTopView; // 非顶视图显示网格材质
      }
    });

    edgesRefs.current.forEach((line) => {
      line.visible = isTopView; // 顶视图显示边缘线
    });
  });

  // 添加动画效果
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; // Y轴旋转
      modelRef.current.position.y += Math.sin(state.clock.elapsedTime + position[1]) * 0.005;
    }
  });

  return (
    <Select enabled>
      <primitive ref={modelRef} object={gltf.scene} position={position} scale={scale} />
    </Select>
  );
}

export default function Home() {
  return (
    <div className="canvasContainer">
      <Canvas style={{ height: "100%" }} alpha={false}>
        <Selection>
          <OrthographicCamera
            makeDefault // 设置为默认摄像机
            position={[0, 10, 0]} // 摄像机位置
            zoom={50} // 调整缩放程度
            near={0.1}
            far={1000}
          />

          <GLTFModel modelPath="/model/ring1.gltf" position={[0, 8, 0]} scale={1.2} />
          <GLTFModel modelPath="/model/ring3.gltf" position={[0, 3, 0]} scale={1.2} />
          <GLTFModel modelPath="/model/ring2.gltf" position={[0, -2, 0]} scale={1.2} />
          <GLTFModel modelPath="/model/ring4.gltf" position={[0, -8, 0]} scale={1.2} />

          <ambientLight intensity={10} />
          <directionalLight color="white" position={[1, 3, 5]} />
          <OrbitControls enableZoom={true} />
          <Environment preset="forest" background={false} ground={false} />
        </Selection>
      </Canvas>
    </div>
  );
}
