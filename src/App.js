import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Posts from './Posts';

class App extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    posts: json,
                })
            });
    }

    render() {
        if (this.state.posts.length === 0) {
            return <h1>Loading posts...</h1>
        } else {
            return (
                <div className="App" >
                    <Header />
                    <Posts posts={this.state.posts} />
                </div>
            );
        }
    }
}

export default App;
