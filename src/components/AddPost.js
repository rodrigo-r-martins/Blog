import React from "react";

const AddPost = ({ functions, state }) => {
  return (
    <div className="addpost">
      <form className="addpost__form">
        <input
          onChange={functions.changeTitle}
          type="text"
          placeholder="Title"
          value={state.title}
          className="addpost__title"
        />
        <textarea
          onChange={functions.changeBody}
          placeholder="Enter Body"
          value={state.body}
          className="addpost__text"
        ></textarea>
        <input 
          onClick={functions.addPost} 
          type="submit" 
          value="Add Post"
          className="addpost__submit"
        />
      </form>
    </div>
  );
}

export default AddPost;
