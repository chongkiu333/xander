"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF,Loader,Image as DreiImage} from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import React, { Suspense, useRef ,useEffect, useState} from 'react';
import {Select , Selection } from "@react-three/postprocessing";
import styles from './CreativeDirection.module.css';
import Link from "next/link";


export function CreativeDirection({projectData}) {
  const [selectedProjectId, setSelectedProjectId] = useState("67c9c90d8b7ffe940a246b61");
  const [isClosed, setIsClosed] = useState(true);

  


    return (
      <div className="canvasContainer" >
      
            
      <div className={styles.headContainer}>
        <Link className={styles.title}  href="/">
        <div className={styles.innertitle} >
        XanderGhost<div className={styles.point}></div> 
        </div>
      </Link>
      
      <InfoBox projectData={projectData} selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />
      
      
      </div>
        <Canvas className={styles.canvas}  style={{ height: '100%'}} alpha={false}>
      <Suspense fallback={null}>
        <Selection>
        
        
  
      <OrthographicCamera
          makeDefault // 设置为默认摄像机
          position={[0, 30, 20]} // 摄像机位置
          zoom={80} // 调整缩放程度
          near={0.1}
          far={1000}
        />
  
  
    
      
      <Model projectDatas={projectData} selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} position={[0,0,0]} />

        <ambientLight intensity={2} />
        <directionalLight color="white" position={[1, 3, 5]} />
                  
        <OrbitControls enableZoom={true}  />
     
        <Environment preset="forest" background={false} ground={false}  />
        </Selection>
  
  
        </Suspense>
     </Canvas> 
       
    
     </div>
   
    );
}



export function Model2(props) {
    const { nodes, materials } = useGLTF('/page/cd.glb')
    const modelRef = useRef();

    useFrame((state, delta) => {
        if (modelRef.current) {
          modelRef.current.rotation.y += delta * 0.1; // Y轴旋转
          
          
        }
      });

    return (
      <group {...props} dispose={null} ref={modelRef}>
        <group
          position={[-1.673, 1.476, 1.049]}
          rotation={[0.925, 0.858, -0.923]}
          scale={[0.034, 0.624, 0.536]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.立方体005_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.立方体005_2.geometry}
            material={materials.材质}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.立方体005_3.geometry}
            material={materials.Material}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.圆环.geometry}
          material={materials.原油}
          position={[0.078, 0.367, -0.07]}
          scale={[1, 0.629, 1]}
        />
      </group>
    )
  }



function Model({projectDatas,selectedProjectId,setSelectedProjectId,...props}) {
  const { nodes, materials } = useGLTF("/model2/ring2.gltf")

  const onProjectClick = (id) => {
    setSelectedProjectId(id);
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ring.geometry}
        material={materials.oil}
        position={[0.011, 0.367, -0.012]}
        scale={[1, 1, 1]}
      />

      
      {projectDatas.map(projectData => (
        projectData.fieldData.coverimages.map((image, index) => (
          <BasicBlock imgUrl={image.url||"/cd/1R5A7235.jpg"} key={`${projectData.id}-cover-${index}`}  onClick={() => onProjectClick(projectData.id)}  />
        ))
      ))}
    
    </group>
  )
}

function BasicBlock({imgUrl,...props}){
  const texture = useLoader(THREE.TextureLoader, imgUrl)
  const aspectRatio = texture.image.width / texture.image.height;
  const meshRef = useRef();
  const x = Math.random() * 9 - 4;
  const y = 1.6;
  const z = Math.random() * 9 - 4;
  const centerPoint = [0, 1.7, 0];
  const angleY = Math.atan2(centerPoint[0] - x, centerPoint[2] - z);
  

  return (
    
    <mesh ref={meshRef} {...props} position={[ x, y, z ]}  rotation={[0,angleY,0]}>
      <boxGeometry args={[aspectRatio*1.3, 1.3, 0.06]} />
      <meshBasicMaterial color="black" />
      <DreiImage
        url={imgUrl}
        position={[0, 0, 0.031]}
        rotation={[0, 0, 0]}
        scale={[aspectRatio*1.2, 1.2, 1.2]}
        radius={0.1}
        transparent={true}
      />

<DreiImage
        url={imgUrl}
        position={[0, 0, -0.031]}
        rotation={[0, Math.PI, 0]}
        scale={[aspectRatio*1.2, 1.2, 1.2]}
        radius={0.1}
        transparent={true}
      />
   
    </mesh>
  )
}


export function InfoBox({ projectData,selectedProjectId,setSelectedProjectId }){
  const [selectvideoId,setSelectvideoId] = useState("67c9c90d8b7ffe940a246b61");
  const targetProject = projectData.find(item => item.id === selectedProjectId);
  const project = targetProject?.fieldData;



  return(
    <div className={styles.info}>
    <div className={styles.infoTitle}><div className={styles.innertitle}>{project.name}</div></div>
    <div className={styles.content}>
{project['project-description']}

    </div>

    <div className={styles.imgContainer}>
{project.projectimage.map((image, index) => (
                      
                      <div key={index} className={styles.row}>
                      <Image src={image.url} alt={image.alt || `Cover Image ${index + 1}`} width={200} height={0} layout="intrinsic"/>
                    </div>
                      
                    ))}
</div>

</div>

  )
}