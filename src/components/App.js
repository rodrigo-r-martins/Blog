import React, { useEffect, useState } from "react";
import "./styles/App.css";
import Header from "./Header";
import axios from "axios";
import AddPost from "./AddPost";
import Posts from "./Posts";
import Footer from "./Footer";

const App = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState([]);

  const changeTitle = (e) => {
    let title = e.target.value;
    setTitle(title);
  };

  const changeBody = (e) => {
    let body = e.target.value;
    setBody(body);
  };

  const addPost = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert("You must write something!!!");
      return;
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          id: id + 1,
          title: title,
          body: body,
        })
        .then((res) => {
          let newPost = res.data;
          let newData = [...data, newPost];
          setId(id+1);
          setTitle("");
          setBody("");
          setData(newData);
        })
        .catch((err) => console.log(err));
    }
  };

  const deletePost = (postIndex) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postIndex}`)
      .then((res) => {
        let newData = [...data];
        newData.splice(postIndex, 1);
        setId(newData.length + 1);
        setTitle("");
        setBody("");
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => { 
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        let newData = res.data.slice(0, 6);
        setId(newData[newData.length - 1].id + 1);
        setData(newData);
      })
      .catch((err) => console.log("Error: " + err));
  }, []);

  const functions = {
    changeTitle: changeTitle,
    changeBody: changeBody,
    addPost: addPost,
  };

  const states = {
    title: title,
    body: body,
  };

  return (
    <div className="App">
      <div>
        <Header />
        <AddPost functions={functions} state={states} />
      </div>
      { data.length === 0 ? (
        <h1>Loading posts...</h1>
      ) : (
        data.map((post, index) => (
        <Posts
          key={index}
          index={index}
          post={post}
          del={deletePost}
        />
        ))
      )}
      <Footer/>
    </div>
  )};

export default App;
