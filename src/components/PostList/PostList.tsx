import { useQuery } from "@apollo/client";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Fade, IconButton } from "@mui/material";
import Moment from "moment";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { userProps } from "../../index.types";
import { QUERY_POSTS_BY_FOLLOWING } from "../../utils/queries";
import AddPost from "../AddPost/AddPost";
import Post from "../Post/Post";
import PostLoading from "../Post/post_loading.component";
import { PostListContainer } from "./PostList.styles";

const PostList: React.FC = () => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const {
    error: currentUserError,
    loading: currentUserLoading,
    user,
  } = currentUser;
  const userInfo: userProps = user;
  const {
    error: postsError,
    loading: postsLoading,
    data,
    refetch,
  } = useQuery(QUERY_POSTS_BY_FOLLOWING, {
    variables: {
      user_id: userInfo.id,
    },
  });

  if (data) {
    const { postsByFollowing } = data;
    var postsArray:
      | Array<{
          id: number;
          user_id: string;
          text: string;
          created_at: Date;
        }>
      | undefined = [...postsByFollowing].sort(
      (a: any, b: any) =>
        new Moment(b.created_at).format("YYYYMMDDHHMMSS") -
        new Moment(a.created_at).format("YYYYMMDDHHMMSS"),
    );
  }

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      <PostListContainer>
        <AddPost refetchPosts={refetch} />
        <Box height="90vh" sx={{ overflowY: "scroll" }}>
          {(postsLoading ||
            postsError ||
            currentUserError ||
            currentUserLoading) && (
            <>
              <PostLoading />
              <PostLoading />
              <PostLoading />
              <PostLoading />
              <PostLoading />
            </>
          )}
          {postsArray && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton size="medium" onClick={() => refetch()}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {postsArray &&
            postsArray.map((post: any) => (
              <Post
                key={post.id}
                postId={post.id}
                userId={post.user_id}
                postTime={post.created_at}
                text={post.text}
                refetchPosts={refetch}
              />
            ))}
        </Box>
      </PostListContainer>
    </Fade>
  );
};

export default PostList;
