
import axios from 'axios';

export default async function handler(req, res) {
    const collectionId = process.env.NEXT_PUBLIC_WEBFLOW_COLLECTION_ID;
    const apiToken = process.env.NEXT_PUBLIC_WEBFLOW_API_TOKEN;

  try {
    const response = await axios.get(`https://api.webflow.com/collections/${collectionId}/items`, {
      headers: {
        'Authorization':`Bearer ${apiToken}`,
        'accept-version': '1.0.0'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Webflow' });
  }
}