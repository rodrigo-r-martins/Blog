import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import axios from "axios";
import AddPost from "./AddPost";

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

  editPost = (postIndex, title, body) => {
    this.setState({
      id: postIndex + 1,
      title: title,
      body: body,
    });
  };

  addPost = (e) => {
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

    if (this.state.data.length === 0) {
      return <h1>Loading posts...</h1>;
    } else {
      return (
        <div className="App">
          <div>
            <Header />
            <AddPost functions={functions} state={states} />
          </div>
          {this.state.data.length === 0 ? (
            <h1>Loading Posts...</h1>
          ) : (
            this.state.data.map((post, index) => (
              <article key={index}>
                <h2>
                  {index + 1}- {post.title}
                </h2>
                <p>{post.body}...</p>
                <button
                  onClick={() => this.deletePost(index)}
                  className="delete"
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      );
    }
  }
}

export default App;
