import React, { useState } from "react";
import { Grid, IconButton, Typography, Input, Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { Link } from "react-router-dom";
import { QUERY_USER } from '../../utils/queries';
import { DELETE_POST, ADD_COMMENT } from '../../utils/mutations'
import { useQuery, useMutation } from '@apollo/client';
import CommentList from "../CommentList/comment_list.component";

type postProps = {
    postId: number,
    text: string,
    userId: string,
    postTime: Date
};

const Post = ({ postId, text, userId, postTime }: postProps) => {

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { 
            id: userId
         },
      });
    const { userProfile } = data;

    const [deletePost, { }] = useMutation(DELETE_POST);
    const [addComment, { }] = useMutation(ADD_COMMENT);

    const [displayComment, setDisplayComment] = useState(false);
    const [commentText, setCommentText] = useState("");

    const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await deletePost({ variables: { id: postId } });
    }

    const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await addComment({
            variables: {
                user_id: userId,
                post_id: postId,
                text: commentText
            }
        });
        setCommentText("");
    }

    return (
        <>
        {loading && (
            <CircularProgress color="success" />
        )}
        {userProfile && (
            <Box
                padding="1rem"
                sx={{
                    "&:hover": {
                        backgroundColor: "#eee",
                    },
                }}
            >
                <Grid container flexWrap="nowrap">
                    <Grid item sx={{ paddingRight: "1rem" }}>
                        <Link to={`/profile`}>
                            <img src={userProfile.avatar} alt="lgoog" width="50px" />
                        </Link>
                    </Grid>
                    <Grid item >
                        <Box>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="nowrap"
                            >
                                <Grid item>
                                    <Box display="flex">
                                        <Typography
                                            sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                                        >
                                            {userProfile.handle}
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                                        >
                                            @{userProfile.handle.trim().toLowerCase()}
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                                        >
                                            .
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                                        >
                                            {moment(postTime).format('MMMM Do YYYY')}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                            {text}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginRight="5rem"
                                marginTop=".8rem"
                            >
                                <IconButton
                                    onClick={() => setDisplayComment(!displayComment)}
                                    size="small"
                                >
                                    <ChatBubbleOutlineIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={() => console.log('hello world')} size="small">
                                    <FavoriteIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                    <ThumbDownIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                    <IosShareIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={handleDeletePost} size="small">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            {displayComment && (
                                <Box>
                                    <Grid item>
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
                                                    fontSize: "12px",
                                                }}
                                            >
                                                Comment
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Box textAlign="center" marginTop="1rem">
                                        <CommentList postId={postId} />
                                    </Box>
                                </Box>)}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )}
            
        </>
    )
}

export default Post
