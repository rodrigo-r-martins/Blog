import React from "react";

const Posts = ({ index, post, del }) => {
  return (
    <article key={index} className="posts">
      <h2>
        {index + 1}- {post.title}
      </h2>
      <p>{post.body}</p>
      <button onClick={() => del(index)} className="posts__delete">
        Delete
      </button>
    </article>
  );
}

export default Posts;
