import React from "react";

function Posts({ index, post, del }) {
  return (
    <article key={index}>
      <h2>
        {index + 1}- {post.title}
      </h2>
      <p>{post.body}</p>
      <button onClick={() => del(index)} className="delete">
        Delete
      </button>
    </article>
  );
}

export default Posts;
