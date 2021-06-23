import React from 'react';
import VideoPost from './VideoPost';

function Post({ post }) {
  console.log(post);
  return (
    <>
      {post && (
        <div className="post-wrapper">
          <div className="post-header">
            <div className="post-username">
              <span className="username">OnlyFans</span>
              <span className="post-details">12 hour ago</span>
            </div>
            <span className="post-avatar"></span>
          </div>
          <div
            className="post-text"
            dangerouslySetInnerHTML={{ __html: post.text }}
          ></div>
          <div className="post-media">
            <VideoPost src={post.src} />
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
