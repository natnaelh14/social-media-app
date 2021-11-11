import React, { useEffect } from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';
import { Fade } from "@mui/material";
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { listPosts } from '../../redux/actions/postActions';
// import { listUsers } from '../../redux/actions/userActions';

const PostList: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const postList = useAppSelector((state) => state.postList);
  // const { loading, error, posts } = postList;
  // const userList = useAppSelector((state) => state.userList);
  // const { loading: userLoading, error: userError, users } = userList;

  // useEffect(() => {
  //     dispatch(listUsers())
  //     dispatch(listPosts())
  //     console.log('posts', posts)
  //     console.log('users', users)
  // }, [])

  return (
    <Fade in={true} timeout={1000}>
      <div style={{ border: '1px solid #cdcdcd', padding: '20px', margin: '50px' }}>
        <AddPost />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </Fade>


  )
}

export default PostList;
