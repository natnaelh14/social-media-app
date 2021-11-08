import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Input,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import Comment from "../../components/Comment/comment.component";

const PostDetails = () => {

    return (
        <Box>
            <Box borderBottom="1px solid #ccc" padding="8px 20px">
                <Grid container alignItems="center">
                    <Grid item sx={{ mr: "10px" }}>
                        <IconButton onClick={() => console.log('hello world')}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Post</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box height="92vh" sx={{ overflowY: "scroll" }}>
                <Box padding="0 20px">
                    <Box>
                        <Grid container alignItems="center">
                            <Grid item>
                                <img src="https://res.cloudinary.com/doalzf6o2/image/upload/v1635983850/hero-image_yccwx5.png" alt="lgogo" width="60px" />
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                                            Natnael Haile
                                        </Typography>
                                        <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                            @hnatnael14
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "20px" }}>
                            This is a message. This is a message. This is a message. This is a message.
                        </Typography>
                    </Box>
                    <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
                        <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                            12:21 AM
                        </Typography>
                        <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                            .
                        </Typography>
                        <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                            Oct 05, 2021
                        </Typography>
                    </Box>
                    <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
                        <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                            <strong>12</strong>{" "}
                            Likes
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-around"
                        padding=".5rem 0"
                        borderBottom="1px solid #ccc"
                    >
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
                    <Box>
                        <Grid>
                            <Grid item>
                                <img src="https://res.cloudinary.com/doalzf6o2/image/upload/v1635983850/hero-image_yccwx5.png" alt="logo" width="60px" />
                            </Grid>
                            <Grid item>
                                <Box padding=".5rem 0">
                                    <Input
                                        onChange={() => console.log('Hello WOrld')}
                                        value=''
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
                                        onClick={() => console.log('Hello WOrld')}
                                        variant="contained"
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
                        </Grid>
                        <Box textAlign="center" marginTop="1rem">
                        </Box>
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default PostDetails;