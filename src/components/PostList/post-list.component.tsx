import React, { useEffect } from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';
import { Fade } from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import { CircularProgress, Box } from "@mui/material";
const Moment = require('moment')


const PostList: React.FC = () => {

  const postList = useAppSelector((state) => state.postList)
  const { posts, loading } = postList

  let postsData = [...posts].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));
  let postData: Array<{
    id: number,
    user_id: string,
    text: string,
    created_at: Date
  }> = postsData

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
          {postData &&
            postData.map((post) => <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />)}
        </Box>

      </div>
    </Fade>
  )
}

export default PostList;
