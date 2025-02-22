"use client"
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF} from '@react-three/drei';
import React, { Suspense, useRef , useState} from 'react';
import {Select , Selection } from "@react-three/postprocessing";
import styles from './page.module.css';
import Link from "next/link";
import { easing } from "maath";
import { getChannelVideos, getVideoDetails } from '../../api/youtube.js';


export function Model(props) {
    const { nodes, materials } = useGLTF('/page/videoBase.glb')
    return (
      <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.锥体.geometry} material={materials.原油} />
    </group>
    )
  }

  function Carousel({radius=3.2, count =12}){
    return Array.from({length:count},(_,i)=>(
      <VideoBox 
      key={i}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
     
      />
    ))
  }

  



  function VideoBox({thumbnailUrl = '/page/thumnail.png', ...props}){
    const ref = useRef();
    const [isHover, setIsHover] = useState(false);
    const pointerOver = () => setIsHover(true);
    const pointerOut = () => setIsHover(false);


    
    useFrame((state,delta)=>{
      easing.damp3(ref.current.position,[
        ref.current.position.x,
        isHover ? 0.6 : 0.3, // y轴位置：hover时上移到0.8，否则保持在0.3
        ref.current.position.z
      ],delta)
    })

    const { nodes, materials } = useGLTF('/page/videoblock.glb')
    const textureLoader = new THREE.TextureLoader();
    const imageTexture = textureLoader.load(thumbnailUrl);


    
  


  return (
    <group ref={ref} {...props} dispose={null} onPointerOver={pointerOver} onPointerOut={pointerOut}>
      <mesh castShadow receiveShadow geometry={nodes.base.geometry} material={materials.原油} />
     
       <mesh position={[-0.06,0.45,0]} rotation={[0,-Math.PI / 2, 0]} >
          <planeGeometry args={[1.55,0.85]} />
          <meshBasicMaterial map={imageTexture} />
        </mesh>
      
    </group>
  )
    
  }


export default async function Page() {
  const channelId = 'UCGUoD8pU7KT4K0D-Rb0sAPg';
  const videos = await getChannelVideos(channelId);
  const firstVideoThumbnail = videos && videos.length > 0 ? 
    videos[0].thumbnails.medium.url : '/page/thumnail.png';


    return (
        <div className="canvasContainer" >

           
    <div className={styles.headContainer}>
    <div>
      {/* {videos.map(video => (
        <div key={video.videoId}>
          <h2>{video.title}</h2>
          <img 
            src={video.thumbnails.medium.url} 
            alt={video.title}
            width={video.thumbnails.medium.width}
            height={video.thumbnails.medium.height}
          />
          <p>{video.description}</p>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))} */}
    </div>
      <Link className={styles.title}  href="/">
      <div className={styles.innertitle} >
      XanderGhost<div className={styles.point}></div> 
      </div>
    </Link>
    <div className={styles.video}>
    <div className={styles.videoTitle}><div className={styles.innertitle}>XANDER GHOST - MASKOUN (OFFICIAL AUDIO) </div></div>

    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' ,marginBottom: '20px'}}>
            <iframe
                src={`https://www.youtube.com/embed/el7BRMW322U`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
        </div>
    <div className={styles.content}>
    Written and Performed : Xander Ghost<br/>
Music Production : Lecha <br/>
Mixing and Mastering : Lecha <br/>

2024 Quality Clique ©<br/>

instagram.com/xanderghost<br/>
instagram.com/lecha.wav<br/>

    </div>



    


    </div>

   

    </div>
        <Canvas className={styles.canvas}  style={{ height: '100%'}} alpha={false}>
        <Suspense fallback={null}>
          <Selection>
          
          
    
        <OrthographicCamera
            makeDefault // 设置为默认摄像机
            position={[10, 20, 20]} // 摄像机位置
            zoom={135} // 调整缩放程度
            near={0.1}
            far={1000}
          />
    
    
      
        
        <Model position={[0,0,0]} />

        <VideoBox rotation={[0,Math.PI/2,0]} position={[-3.2, 0.3, 0]} thumbnailUrl={firstVideoThumbnail} />

      
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