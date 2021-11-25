import React, { useEffect } from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';
import { Fade } from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import { CircularProgress, Box } from "@mui/material";
const Moment = require('moment');

const PostList: React.FC = () => {

  const postList = useAppSelector((state) => state.postList)
  const { posts, loading } = postList
  let postData: Array<{
    id: number,
    user_id: string,
    text: string,
    created_at: Date
  }> = posts
  let postsData = [...postData].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));

  return (
    <div style={{ width: '66%', margin: '10px' }}>
      {/* <Fade in={true} timeout={1000}> */}
        <div style={{ border: '1px solid #cdcdcd', padding: '20px', margin: '50px' }}>
          {postsData && (
            <>
              <AddPost />
              <Box height="90vh" sx={{ overflowY: "scroll" }}>
                {postsData.map((post) => <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />)}
              </Box>
            </>
          )}
        </div>
      {/* </Fade> */}
    </div>
  )
}

export default PostList;
