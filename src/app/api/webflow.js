
export async function GET() {
    const collectionId = process.env.NEXT_PUBLIC_WEBFLOW_COLLECTION_ID;
    const apiToken = process.env.NEXT_PUBLIC_WEBFLOW_API_TOKEN;
  
    const url = `https://api.webflow.com/collections/${collectionId}/items?live=true`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "accept-version": "1.0.0"
        }
      });
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: response.status });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  