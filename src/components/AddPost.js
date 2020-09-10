import React from "react";
import "./AddPost.css";

function AddPost({ functions, state }) {
  return (
    <div className="addpost">
      <form className="form">
        <input
          onChange={functions.changeTitle}
          type="text"
          placeholder="Title"
          value={state.title}
        />
        <textarea
          onChange={functions.changeBody}
          placeholder="Enter Body"
          value={state.body}
        ></textarea>
        <input onClick={functions.addPost} type="submit" value="Add Post" />
      </form>
    </div>
  );
}

export default AddPost;
