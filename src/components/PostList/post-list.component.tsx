import React from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';

const PostList = () => {
    return (
        <div style={{border: '1px solid #cdcdcd', padding: '20px', margin: '50px'}}>
          <AddPost />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />  
        </div>
    )
}

export default PostList;
