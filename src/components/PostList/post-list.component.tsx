import React, { useEffect } from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';
import { Fade } from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import { CircularProgress, Box } from "@mui/material";
import { listPosts } from '../../redux/actions/postActions';

const PostList: React.FC = () => {

  const postList = useAppSelector((state) => state.postList);
  const { posts, loading } = postList

  // useEffect(() => {
  //   dispatch(listPosts(data))

  // }, [dispatch])

  return (

    <Fade in={true} timeout={1000}>
      <div style={{ border: '1px solid #cdcdcd', padding: '20px', margin: '50px' }}>
        <AddPost />
        <Box>
          {loading && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>

        <Box>
          {posts &&
         (<div>Hello</div>)}
            {/* posts.map((post: any) => <Post key={post.id} text={post.text} />)} */}
        </Box>

      </div>
    </Fade>
  )
}

export default PostList;
