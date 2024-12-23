"use client"
import ReactDOM from'react-dom'
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'


import dynamic from 'next/dynamic';

// 使用 dynamic 导入 Canvas 组件并禁用服务器端渲染
const PhysicsPart = dynamic(() => import('../../Learning/components/PhysicsPart'), { ssr: false });

export default function Page() {
    return (
      <div>
        
        <PhysicsPart />
      </div>
    );
  }

