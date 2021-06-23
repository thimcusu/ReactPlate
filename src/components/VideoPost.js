import React from 'react';

function VideoPost({ src }) {
  const randomImage = src + '?random=' + Math.random(400);
  return (
    <div className="video-wrapper">
      <video
        preload="none"
        playsInline="playsinline"
        controlsList="nodownload"
        poster={randomImage}
      ></video>
    </div>
  );
}

export default VideoPost;
