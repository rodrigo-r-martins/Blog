import React from 'react';
import './Post.css';

const Post = ({ article }) => {
    const { title, body } = article;
    return (
        <div className='post'>
            <h2 className='title'>{title}</h2>
            <section className='body'>{body}</section>
        </div>
    )
}

export default Post;
