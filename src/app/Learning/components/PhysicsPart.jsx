import { Canvas,useFrame ,useThree} from '@react-three/fiber';
import * as THREE from "three";
import { Physics, usePlane, useBox ,useCompoundBody , useSphere, useCylinder , usePointToPointConstraint} from '@react-three/cannon';
import { Environment , OrbitControls , useGLTF ,Loader} from '@react-three/drei';
import { useState , useEffect } from "react";
import React, { useRef } from 'react';
import styles from './PhysicsPart.module.css';
import Image from "next/image";
import Link from "next/link";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
});

const albums = [
  
  { id: "1BFzYg3qyrsCkcg7An1IrS", name: "I7sas Gayed" },
  { id: "0f4OC1KOk5Uo2MVaP0kIbS", name: "Kotshina" },
];

const getAlbumInfo = async (albumId) => {
  try {
    // 获取访问令牌
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + 
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
        ),
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    spotifyApi.setAccessToken(data.access_token);

    // 获取专辑信息
    const album = await spotifyApi.getAlbum(albumId);
    
    return {
      id: albumId,
      name: album.body.name,
      tracks: album.body.tracks.items.map(track => ({
        name: track.name,
        id: track.id
      })),
      imageUrl: album.body.images[0].url
    };
  } catch (error) {
    console.error('获取专辑信息失败:', error);
    return null;
  }
};


function Floors({setCurrentAlbum}, props) {
  const { nodes: nodes1 ,materials: materials1 } = useGLTF('/model2/ring3.gltf'); 
  const { nodes: nodes2, materials: materials2 } = useGLTF('/model/gltf2.gltf');
  const { nodes: nodes3, materials: materials3 } = useGLTF('/album/kotshina.gltf');
  const { nodes: nodes4, materials: materials4 } = useGLTF('/album/galeedi.gltf');
  const { nodes: nodes5, materials: materials5 } = useGLTF('/album/banzeen.gltf');
  const { nodes: nodes6, materials: materials6 } = useGLTF('/album/tamasee7.gltf');
  // const { nodes: nodes7, materials: materials7 } = useGLTF('/album/tamasee7.gltf');

  const handleAlbumInteraction = async (albumId) => {
    
    const albumInfo = await getAlbumInfo(albumId);
    if (albumInfo) {
      setCurrentAlbum(albumInfo);
    }
  };

  const [spherePosition, setSpherePosition] = useState([0, 10, 20]);


  const [sphereref, sphereApi] = useSphere(() => ({ 
    mass: 1, 
    position: spherePosition,
    material: {
      friction: 1,
      restitution: 0.01,
    },
    ...props 
  }));

  useEffect(() => {
    // 订阅位置变化
    const unsubscribe = sphereApi.position.subscribe((pos) => {
      // 如果球体低于某个高度（比如 -20），重置位置
      if (pos[1] < -20) {
        sphereApi.position.set(0, 10, 20); // 重置到初始位置
        sphereApi.velocity.set(0, 0, 0);   // 重置速度
      }
    });

    // 清理订阅
    return () => unsubscribe();
  }, [sphereApi]);

   

  // Floor 的物理主体
  const [floorRef, floorApi] = useCylinder(() => ({
    type: 'Static',
    mass: 1,
    position: [0, -1, 0],
    args: [35, 35, 2.5],
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
        handleAlbumInteraction("1BFzYg3qyrsCkcg7An1IrS");


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
        
        handleAlbumInteraction("0f4OC1KOk5Uo2MVaP0kIbS");
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
        

        handleAlbumInteraction("0eGLEj4SyvtZauFqtAdJJj");


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
       

        handleAlbumInteraction("3Sml2WABWri43Eyyhnt9rG");
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
        

        handleAlbumInteraction("5jzNKvcw2NIm9uRDTOg9rQ");
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
        scale={[6,2.5,6]}
      />
      </group>

      

      <mesh receiveShadow castShadow ref={sphereref}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial 
          color={"gray"}
          emissive={"black"}
          metalness={1}
          roughness={0.14}
          envMapIntensity={1.5}
        />
      </mesh>


      {/*album*/}
      <group  ref={albumref}   scale={[5, 5, 0.36]} onClick={(e) => {
          e.stopPropagation(); // 防止事件冒泡
          handleAlbumInteraction("1BFzYg3qyrsCkcg7An1IrS");
        }}>
        <mesh castShadow receiveShadow geometry={nodes2.cube_1.geometry} material={materials2.m001} />
        <mesh castShadow receiveShadow geometry={nodes2.cube_2.geometry} material={materials2.m002} />
      </group>

      {/*album*/}
      <group  ref={kotshinaref}   scale={[5, 5, 0.36]} onClick={(e) => {
          e.stopPropagation(); // 防止事件冒泡
          handleAlbumInteraction("0f4OC1KOk5Uo2MVaP0kIbS");
        }}>
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











export default function PhysicsPart() {
  
  const [currentAlbum, setCurrentAlbum] = useState({
    id: "1BFzYg3qyrsCkcg7An1IrS",
    name: "Loading...",
    tracks: [],
    imageUrl: "/album/1.png"
  });

  const [currentTrack, setCurrentTrack] = useState(null);
  const [showTracks, setShowTracks] = useState(false);


  useEffect(() => {
    const fetchDefaultAlbum = async () => {
      const albumInfo = await getAlbumInfo("1BFzYg3qyrsCkcg7An1IrS");
      if (albumInfo) {
        setCurrentAlbum(albumInfo);
      }
    };
    fetchDefaultAlbum();
  }, []);

  useEffect(() => {
    if (currentAlbum.tracks && currentAlbum.tracks.length > 0) {
      setCurrentTrack(currentAlbum.tracks[0]);
    }
  }, [currentAlbum]);

  
  return (
    <div className={styles.canvasContainer}>
    
    <div className={styles.headContainer}>
      <Link className={styles.title}  href="/">
      <div className={styles.innertitle} >
      XanderGhost<div className={styles.point}></div> 
      </div>
      </Link>
    <div className={styles.album}>
    <div className={styles.albumTitle} onClick={() => setShowTracks(!showTracks)}><div className={styles.innerablbum} ><div class={styles.trapezoidRight}></div> {currentAlbum.name} </div></div>
    <div className={`${styles.albumList} ${showTracks ? styles.show : styles.hide}`}>
    {currentAlbum.tracks.map((track, index) => (
              <div key={index}  className={styles.trackItem} onClick={() => setCurrentTrack(track)} >
                <span>{`${index + 1}. ${track.name}`} </span>
                <span >&rarr;</span>
                </div>
            ))}
      

    </div>


    <div className={styles.albumImage}>
    <Image  className={styles.img} alt='albumimg'  src={currentAlbum.imageUrl} layout="responsive" width={100} height={100} />
    </div>


    </div>

    <div className={styles.spotifyPlayer}>
          {currentTrack && (
            <iframe
              src={`https://open.spotify.com/embed/track/${currentTrack.id}?utm_source=generator`}
              width="100%"
              height="80"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          )}
        </div>

    

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







