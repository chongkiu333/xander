const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function getChannelVideos(channelId) {
  try {
    // 1. 首先获取频道的播放列表ID
    const channelResponse = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. 获取播放列表中的视频
    const playlistResponse = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsPlaylistId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const playlistData = await playlistResponse.json();

    // 3. 处理返回的数据
    return playlistData.items.map(item => ({
      title: item.snippet.title,
      description: item.snippet.description,
      videoId: item.snippet.resourceId.videoId,
      thumbnails: item.snippet.thumbnails,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
}

// 获取单个视频信息
export async function getVideoDetails(videoId) {
  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnails: video.snippet.thumbnails,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        publishedAt: video.snippet.publishedAt
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
}