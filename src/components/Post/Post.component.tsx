

import {
    Grid,
    IconButton,
    Input,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";


const Post = () => {
    return (
        <>
            <Link
                to={`/posts`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
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
                                                Natnael Haile
                                            </Typography>
                                            <Typography
                                                sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                                            >
                                                @natnaelh14
                                            </Typography>
                                            <Typography
                                                sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                                            >
                                                .
                                            </Typography>
                                            <Typography
                                                sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                                            >
                                                11/03/2021
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                                Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
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
            </Link>
        </>
    )
}

export default Post
