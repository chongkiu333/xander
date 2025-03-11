
import Image from "next/image";
import { Loader} from '@react-three/drei';
import React from 'react';
import styles from './page.module.css';
import Link from "next/link";
import { CreativeDirection } from '../../Learning/components/CreativeDirection';



export default async function Page() {
  const apiToken = process.env.NEXT_PUBLIC_WEBFLOW_API_TOKEN; // 从环境变量中获取 API Token
  const collectionId = process.env.NEXT_PUBLIC_WEBFLOW_COLLECTION_ID; // 替换为你的 Collection ID

 

  try {
    const response = await fetch(
      `https://api.webflow.com/v2/collections/${collectionId}/items`,
      {
        method: 'GET', // 确保是 GET 方法
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    // 检查响应状态
    if (!response.ok) {
      const errorData = await response.json(); // 获取错误详情
      console.error('API Error:', errorData);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const items = data.items; // Webflow API 返回的数据结构是 { items: [...] }

    return (
     
         <div className="canvasContainer" >

      
<div className={styles.headContainer}>
  <Link className={styles.title}  href="/">
  <div className={styles.innertitle} >
  XanderGhost<div className={styles.point}></div> 
  </div>
</Link>
<div className={styles.album}>
    <div className={styles.albumTitle}><div className={styles.innertitle}>{items[0].fieldData.name}</div></div>
    <div className={styles.content}>
{items[0].fieldData['project-description']}

    </div>

    <div className={styles.imgContainer}>
{items[0].fieldData.projectimage.map((image, index) => (
                      
                      <div key={index} className={styles.row}>
                      <Image src={image.url} alt={image.alt || `Cover Image ${index + 1}`} width={200} height={0} layout="intrinsic"/>
                    </div>
                      
                    ))}
  

</div>

</div>



</div>



<CreativeDirection />

     
  

  </div>
      
  );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div>
        <h1>Fail Loading</h1>
        <p>Error: {error.message}</p>

      </div>
    );
  }
}





// export default async function Page() {
//   const apiToken = process.env.NEXT_PUBLIC_WEBFLOW_API_TOKEN; // 从环境变量中获取 API Token
//   const collectionId = process.env.NEXT_PUBLIC_WEBFLOW_COLLECTION_ID; 

//   try {
//     const response = await fetch(
//       `https://api.webflow.com/v2/collections/${collectionId}/items`,
//       {
//         method: 'GET', // 确保是 GET 方法
//         headers: {
//           Authorization: `Bearer ${apiToken}`,
//         },
//       }
//     );

//     const data = await response.json();
//       const items = data.items;

//     // 检查响应状态
//     if (!response.ok) {
//       const errorData = await response.json(); // 获取错误详情
//       console.error('API Error:', errorData);
//       throw new Error(`API Error: ${response.status} ${response.statusText}`);
//     }
  


//   return (
      <div className="canvasContainer" >

      
  <div className={styles.headContainer}>
    <Link className={styles.title}  href="/">
    <div className={styles.innertitle} >
    XanderGhost<div className={styles.point}></div> 
    </div>
  </Link>
  <div className={styles.album}>
 <div className={styles.albumTitle}><div className={styles.innertitle}>Loading...</div></div>
  <div className={styles.content}>
 

  </div>

  <div className={styles.imgContainer}>
  <div className={styles.row}>
      <Image src="/cd/1R5A7235.jpg" alt="Image 1" width={200} height={0} layout="intrinsic"/>
    </div>
    <div className={styles.row}>
      <Image src="/cd/1R5A7192.jpg" alt="Image 2" width={200} height={0} layout="intrinsic" />
    </div>
    <div className={styles.row}>
      <Image src="/cd/1R5A7313.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
    </div>

    <div className={styles.row}>
      <Image src="/cd/1R5A7123.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
    </div>

    <div className={styles.row}>
      <Image src="/cd/1R5A7320test.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
    </div>

    <div className={styles.row}>
      <Image src="/cd/1R5A7515.jpg" alt="Image 3" width={200} height={0} layout="intrinsic" />
    </div>

  </div>


            
        
          
         


  


  </div>

 

  </div>


 
 <CreativeDirection />
 
       
    
  
    </div>


//   );
// }

