import React from "react";
import "./AddPost.css";

function AddPost(functions, states) {
  return (
    <div className="addpost">
      <form className="form">
        <input
          onChange={functions.changeTitle}
          type="text"
          placeholder="Title"
          value={states.title}
        />
        <textarea
          onChange={functions.changeBody}
          placeholder="Enter Body"
          value={states.body}
        ></textarea>
        <input onClick={functions.addPost} type="submit" value="Add Post" />
      </form>
    </div>
  );
}

export default AddPost;
