import React from "react";
import "./Posts.css";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      <h1>Latest Posts</h1>
      {posts.map((post, index) => (
        <Post key={index} article={post} />
      ))}
    </div>
  );
};

export default Posts;
