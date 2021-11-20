import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link as RouteLink } from "react-router-dom";
const Moment = require('moment')
import { Fade } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { userProps } from '../../index.types';
import Post from "../Post/Post.component";
import UpdateUserProfile from "../UpdateUserProfile/update_user_profile.component";

const Profile = () => {


    const currentUser = useAppSelector(state => state.currentUser)
    const { loading, user } = currentUser
    const userInfo: userProps = user

    const postList = useAppSelector((state) => state.postList)
    const { posts } = postList
    let postData: Array<{
        id: number,
        user_id: string,
        text: string,
        created_at: Date
    }> = posts
    let postsData = [...postData].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));

    const [openModal, setOpenModal] = React.useState(false);


    const handleModalOpen = () => {
        setOpenModal(true);
    };
    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <div style={{ width: '66%', margin: '10px' }}>
            {loading && (
                <CircularProgress color="success" />
            )}
            {userInfo && (
                <Fade in={true} timeout={1000}>
                    <div style={{ margin: '50px' }}>
                        <Box>
                            <Box borderBottom="1px solid #ccc" padding="8px 20px">
                                <Grid container alignItems="center">
                                    <Grid item sx={{ mr: "10px" }}>
                                        <RouteLink to="/">
                                            <IconButton>
                                                <ArrowBackIcon />
                                            </IconButton>
                                        </RouteLink>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">
                                            {userInfo.handle}
                                        </Typography>
                                        <Typography sx={{ fontSize: "12px", color: "#555" }}>
                                            120 posts
                                        </Typography>{" "}
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box height="90vh" sx={{ overflowY: "scroll" }}>
                                <Box position="relative">
                                    <img
                                        width="100%"
                                        src="https://res.cloudinary.com/doalzf6o2/image/upload/v1636321862/587_cfth76.jpg"
                                        alt="background"
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 120,
                                            left: 15,
                                            background: "#eee",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        <img width="150px" src={userInfo.avatar} alt="profile" />
                                    </Box>
                                </Box>
                                <Box textAlign="right" padding="10px 20px">
                                    <Button
                                        onClick={handleModalOpen}
                                        size="small"
                                        sx={{
                                            textTransform: "capitalize",
                                            padding: "6px 20px",
                                            background: "black",
                                            "&:hover": {
                                                background: "#333",
                                            },
                                        }}
                                        variant="contained"

                                    >
                                        Update
                                    </Button>
                                </Box>
                                <Box padding="10px 20px">
                                    <Typography variant="h6" sx={{ fontWeight: "500" }}>
                                        {userInfo.handle}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px", color: "#555" }}>
                                        {/* @{userInfo.handle.trim().toLowerCase()} */}
                                    </Typography>
                                    <Typography fontSize="16px" color="#333" padding="10px 0">
                                        {userInfo.bio}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        padding="6px 0"
                                        flexWrap="wrap"
                                    >
                                        <Box display="flex">
                                            <LocationOnIcon htmlColor="#555" />
                                            <Typography sx={{ ml: "6px", color: "#555" }}>
                                                {userInfo.city}, {userInfo.state}, {userInfo.country}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" marginLeft="1rem">
                                            <DateRangeIcon htmlColor="#555" />
                                            <Typography sx={{ ml: "6px", color: "#555" }}>
                                                {Moment(userInfo.birth_date).format('MMMM Do YYYY')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" marginTop='1rem'>
                                        <Typography color="#555" marginRight="1rem">
                                            <strong style={{ color: "black" }}>
                                                100
                                            </strong>
                                            Following
                                        </Typography>
                                        <Typography color="#555" marginRight="1rem">
                                            <strong style={{ color: "black" }}>
                                                100
                                            </strong>
                                            Followers
                                        </Typography>
                                    </Box>
                                    <Box display="flex" marginTop='1rem'>
                                        <Typography color="#555" marginRight="1rem">Member Since {Moment(userInfo.created_at).format('YYYY')}</Typography>
                                    </Box>
                                </Box>
                                <Box borderBottom="1px solid #ccc">
                                    <Typography
                                        display="inline-block"
                                        variant="caption"
                                        fontSize="16px"
                                        marginX="1rem"
                                        padding="6px 0"
                                        fontWeight="500"
                                        borderBottom={`4px solid black`}
                                    >
                                        Posts
                                    </Typography>
                                </Box>
                                {postsData &&
                                    postsData.map((post) => <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />)}
                            </Box>
                        </Box>
                    </div>
                </Fade>
            )}
            {openModal && (
                <UpdateUserProfile
                    open={openModal}
                    handleClose={handleModalClose}
                />
            )}

        </div>
    );
}

export default Profile;