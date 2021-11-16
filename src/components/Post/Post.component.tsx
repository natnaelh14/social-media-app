import React, { useEffect } from "react";
import {
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { Link } from "react-router-dom";
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';

type postProps = {
    text: string,
    userId: string,
    postTime: Date
};

const Post = ({ text, userId, postTime }: postProps) => {

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { id: userId },
    });
    const user = data.userProfile;

    useEffect(() => {
        console.log('data', data)
    }, [data])

    return (
        <>
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
                            <img src="https://res.cloudinary.com/doalzf6o2/image/upload/v1635983850/hero-image_yccwx5.png" alt="lgoog" width="50px" />
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
                                            {user.handle}
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                                        >
                                            @{user.handle.toLowerCase().trim()}
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
                                    <Link
                                        to={`/home/post`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        <Box>
                                            <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                                {text}
                                            </Typography>
                                        </Box>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginRight="5rem"
                                marginTop=".8rem"
                            >
                                <IconButton
                                    onClick={() => console.log('hello world')}
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
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Post
