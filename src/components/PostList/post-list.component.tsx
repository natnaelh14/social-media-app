import React, { useEffect } from 'react';
import Post from '../Post/Post.component';
import AddPost from '../AddPost/add-post.component';
import { Fade } from "@mui/material";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';
import { CircularProgress, Box } from "@mui/material";

const PostList: React.FC = () => {

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser);
  const { user } = currentUser

  const { error, data, loading } = useQuery(QUERY_POSTS, {
    variables: {
      postsUserId: "chG0WmOFPheLzl528legA3iIpbO2"
    }
  })

  useEffect(() => {
    console.log('user', user.id)
    console.log('data', data)
  }, [user, data])

  return (

    <Fade in={true} timeout={1000}>
      <div style={{ border: '1px solid #cdcdcd', padding: '20px', margin: '50px' }}>
        <AddPost />
        <Box>
          {!data && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>

        <Box>
          {data &&
            data.map((post: any) => <Post key={post.id} text={post.text} />)}
        </Box>

      </div>
    </Fade>
  )
}

export default PostList;
