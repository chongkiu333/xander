
import Image from "next/image";
import { Loader} from '@react-three/drei';
import React from 'react';
import styles from './page.module.css';
import Link from "next/link";
import { CreativeDirection } from '../../components/CreativeDirection';



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
     
         



<CreativeDirection projectData={items} />

     
  


      
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

