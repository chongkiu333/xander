
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF,Image as DreiImage} from '@react-three/drei';
import React from 'react';
import styles from './page.module.css';
import Link from "next/link";
import { getChannelVideos, getVideoDetails } from '../../api/youtube.js';
import { VideoScene } from '../../Learning/components/VideoBox';

// export function Model(props) {
//     const { nodes, materials } = useGLTF('/page/videoBase.glb')
//     return (
//       <group {...props} dispose={null}>
//       <mesh castShadow receiveShadow geometry={nodes.锥体.geometry} material={materials.原油} />
//     </group>
//     )
//   }

// // 创建一个新的组件来处理视频数据
// function VideoScene({ videoData }) {
//   const [textureLoaded,setTextureLoaded] = useState(false);
//   return (
//     <Canvas className={styles.canvas} style={{ height: '100%'}} alpha={false}>
//       <Suspense fallback={null}>
//         <Selection>
//           <OrthographicCamera
//             makeDefault
//             position={[10, 20, 20]}
//             zoom={135}
//             near={0.1}
//             far={1000}
//           />
//           <Model position={[0,0,0]} />
//           <VideoBox 
           
//             rotation={[0,Math.PI/2,0]} 
//             position={[-3.2, 0.3, 0]} 
//             onLoad={()=>setTextureLoaded(true)}
//           />
//           <ambientLight intensity={10} />
//           <directionalLight color="white" position={[1, 3, 5]} />
//           <OrbitControls enableZoom={true} />
//           <Environment preset="forest" background={false} ground={false} />
//         </Selection>
//       </Suspense>
//     </Canvas>
//   );
// }

export default async function Page() {
  const channelId = 'UCGUoD8pU7KT4K0D-Rb0sAPg';
  let videos = [];
  try {
    videos = await getChannelVideos(channelId);
    if (!videos || videos.length === 0) {
      return (
        <div className="canvasContainer">
          <div className={styles.headContainer}>
            <Link className={styles.title} href="/">
              <div className={styles.innertitle}>
                XanderGhost<div className={styles.point}></div>
              </div>
            </Link>
            <div className={styles.video}>
              <div className={styles.videoTitle}>No Videos Found</div>
            </div>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return (
      <div className="canvasContainer">
        <div className={styles.headContainer}>
          <Link className={styles.title} href="/">
            <div className={styles.innertitle}>
              XanderGhost<div className={styles.point}></div>
            </div>
          </Link>
          <div className={styles.video}>
            <div className={styles.videoTitle}>Error</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    
      <VideoScene
        videoDatas={videos}
        />
    
  );
}