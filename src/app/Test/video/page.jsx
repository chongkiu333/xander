
import Image from "next/image";
import * as THREE from "three";
import { Canvas , useFrame } from '@react-three/fiber';
import { Environment,OrbitControls , OrthographicCamera ,  Html ,useGLTF,Image as DreiImage} from '@react-three/drei';
import React from 'react';
import styles from './page.module.css';
import Link from "next/link";
import { getChannelVideos, getVideoDetails } from '../../api/youtube.js';
import { VideoScene } from '../../Learning/components/VideoBox';



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