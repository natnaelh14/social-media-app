import { useMutation, useQuery } from "@apollo/client";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Grid, IconButton, Input } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment"; // Import Moment type from Moment.js
import React, { useState } from "react";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_COMMENTS } from "../../utils/queries";
import Comment from "../Comment/comment.component";

type postListProps = {
  postId: number;
  userId: string;
};

const CommentList = ({ postId, userId }: postListProps) => {
  const [commentText, setCommentText] = useState("");
  const [addComment, {}] = useMutation(ADD_COMMENT);

  const {
    error,
    loading,
    data,
    refetch: commentsRefetch,
  } = useQuery(QUERY_COMMENTS, {
    variables: { post_id: postId },
  });
  let commentArray;
  if (data) {
    const { comments } = data;
    commentArray = [...comments].sort((a: any, b: any) =>
      moment(b.created_at).diff(moment(a.created_at), "milliseconds"),
    );
  }

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addComment({
      variables: {
        user_id: userId,
        post_id: postId,
        text: commentText,
      },
    }).then(() => {
      commentsRefetch();
    });
    setCommentText("");
  };

  return (
    <>
      <Box>
        <Grid item padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
          <Box padding=".5rem 0">
            <Input
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="Post your comment"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box textAlign="right" paddingBottom=".5rem">
            <Button
              onClick={handleAddComment}
              variant="contained"
              disabled={commentText.length === 0}
              color="primary"
              size="small"
              sx={{
                textTransform: "capitalize",
                fontFamily: "inherit",
                borderRadius: "12px",
                fontSize: "12px",
                mt: "4px",
                background: "black",
                "&:hover": {
                  background: "#333",
                },
              }}
            >
              COMMENT
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton size="medium" onClick={() => commentsRefetch()}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box marginTop="1rem" width="100%">
        {error && <div>No Comment</div>}
        {loading && <div>It is loading</div>}
        {commentArray &&
          commentArray.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              postId={comment.post_id}
              userId={comment.user_id}
              commentTime={comment.created_at}
              text={comment.text}
              commentsRefetch={commentsRefetch}
            />
          ))}
      </Box>
    </>
  );
};
export default CommentList;
