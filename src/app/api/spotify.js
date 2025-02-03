import axios from "axios";

export default async function handler(req, res) {
  try {
    // 调用自定义的 /api/spotify-token 获取有效的 access_token
    const tokenResponse = await fetch("http://localhost:3000/api/spotify-token");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 请求专辑数据（从 query 参数中获取 albumId）
    const { albumId } = req.query;
    const albumResponse = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.status(200).json(albumResponse.data);
  } catch (error) {
    console.error("Spotify API Error:", error);
    res.status(500).json({ error: "Failed to fetch album data" });
  }
}
