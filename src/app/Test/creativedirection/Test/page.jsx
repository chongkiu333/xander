"use client"


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
        <div>
        <h1>Webflow CMS Data</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {/* 显示项目名称 */}
              <h2>{item.fieldData.name}</h2>

              {/* 显示项目描述 */}
              <p>{item.fieldData['project-description']}</p>

              {/* 显示封面图片 */}
              {item.fieldData.coverimages && (
                <div>
                  <h3>Cover Images:</h3>
                  <ul>
                    {item.fieldData.coverimages.map((image, index) => (
                      <li key={index}>
                        <img src={image.url} alt={image.alt || `Cover Image ${index + 1}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 显示项目图片 */}
              {item.fieldData.projectimage && (
                <div>
                  <h3>Project Images:</h3>
                  <ul>
                    {item.fieldData.projectimage.map((image, index) => (
                      <li key={index}>
                        <img src={image.url} alt={image.alt || `Project Image ${index + 1}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
    } catch (error) {
      console.error('Error fetching data:', error);
      return (
        <div>
          <h1>加载失败</h1>
          <p>错误详情: {error.message}</p>
          <p>请检查:</p>
          <ul>
            <li>网络连接是否正常</li>
            <li>API Token 是否正确</li>
            <li>Collection ID 是否正确</li>
          </ul>
        </div>
      );
    }
  }


