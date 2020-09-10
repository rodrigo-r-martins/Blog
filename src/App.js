import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import AddPost from "./components/AddPost";
import LoadingPosts from "./components/LoadingPosts";
import Posts from "./components/Posts";

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      data: [],
    };
  }

  changeId = (e) => {
    let id = e.target.value;
    this.setState({
      id: id,
    });
  };

  changeTitle = (e) => {
    let title = e.target.value;
    this.setState({
      title: title,
    });
  };

  changeBody = (e) => {
    let body = e.target.value;
    this.setState({
      body: body,
    });
  };

  addPost = (e) => {
    e.preventDefault();
    if (this.state.title === "" || this.state.body === "") {
      alert("No field should be empty");
      return;
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          id: this.state.id + 1,
          title: this.state.title,
          body: this.state.body,
        })
        .then((res) => {
          console.log(res);
          let newPost = res.data;
          let newData = [...this.state.data, newPost];
          this.setState({
            id: this.state.id + 1,
            title: "",
            body: "",
            data: newData,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  deletePost = (postIndex) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postIndex}`)
      .then((res) => {
        let newData = [...this.state.data];
        newData.splice(postIndex, 1);
        this.setState({
          id: newData.length + 1,
          title: "",
          body: "",
          data: newData,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        let newData = res.data.slice(0, 5);
        this.setState({
          id: newData[newData.length - 1].id + 1,
          data: newData,
        });
      })
      .catch((err) => console.log("Couldn't fetch data. Error: " + err));
  }

  render() {
    const functions = {
      changeId: this.changeId,
      changeTitle: this.changeTitle,
      changeBody: this.changeBody,
      addPost: this.addPost,
    };

    const states = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
    };

    return (
      <div className="App">
        <div>
          <Header />
          <AddPost functions={functions} state={states} />
        </div>
        {this.state.data.length === 0 ? (
          <LoadingPosts />
        ) : (
          this.state.data.map((post, index) => (
            <Posts
              key={index}
              index={index}
              post={post}
              del={this.deletePost}
            />
          ))
        )}
      </div>
    );
  }
}

export default App;
