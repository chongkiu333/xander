let tokenCache = {
    token: null,
    expires: 0,
  };
  
  export default async function handler(req, res) {
    // 如果缓存的 Token 还有效，直接返回
    if (tokenCache.token && Date.now() < tokenCache.expires) {
      return res.status(200).json({ access_token: tokenCache.token });
    }
  
    // 向 Spotify API 申请新的 Token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
    });
  
    const data = await response.json();
  
    // 把 Token 存入缓存，并设置过期时间
    tokenCache.token = data.access_token;
    tokenCache.expires = Date.now() + data.expires_in * 1000;
  
    // 返回 Token
    res.status(200).json({ access_token: data.access_token });
  }
  