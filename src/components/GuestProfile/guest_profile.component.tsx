import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link as RouteLink } from "react-router-dom";
import Post from "../Post/Post.component";
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_POSTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
const Moment = require('moment')
import { userProps } from "../../index.types";
import CryptoDoughnut from "../CryptoDoughnut/crypto_doughnut.component";

const GuestProfile = () => {
    const { profileId } = useParams<{ profileId: string | undefined }>();
    // const [postArrays, setPostArrays] = useState<Array<{
    //     id: number,
    //     user_id: string,
    //     text: string,
    //     created_at: Date
    // }>
    // >([])
    if (profileId) {
        var { loading, error, data } = useQuery(QUERY_USER, {
            variables: {
                id: profileId
            },
        });
    }
    if (data) {
        var { userProfile }: { userProfile: userProps } = data;
    }
    // if (userProfile) {
    //     var { loading: postLoading, error: postError, data: postData } = useQuery(QUERY_POSTS, {
    //         variables: {
    //             user_id: userProfile.id
    //         },
    //     });
    // }
    // if (postData) {
    //     var { posts } = postData;
    //     setPostArrays([...posts])
    // }
    // [...posts].sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));
    // useEffect(() => {
    // }, [postData])
    // var postArray: Array<{
    //     id: number,
    //     user_id: string,
    //     text: string,
    //     created_at: Date
    // }> = []
    // if (postData) {
    //     var { posts } = postData;
    //     var postArray: Array<{
    //         id: number,
    //         user_id: string,
    //         text: string,
    //         created_at: Date
    //     }> = posts
    // }

    // useEffect(() => {
    //     // console.log('meow', userProfile.id)
    // }, [userProfile])

    return (
        <div style={{ width: '66%', margin: '20px' }}>
            {(loading || error) && (
                <CircularProgress color="success" />
            )}
            {(userProfile) && (
                <Fade in={true} timeout={1000}>
                    <div style={{ padding: '20px' }}>
                        <>
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
                                            {userProfile.handle}
                                        </Typography>
                                        <Typography sx={{ fontSize: "12px", color: "#555" }}>
                                            {/* {postArray ? postArray.length : 0} posts */}
                                            0 posts
                                        </Typography>{" "}
                                    </Grid>
                                </Grid>
                            </Box>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Box pr='1.5rem'>
                                    <Box padding="10px 20px" display="flex" alignItems="center" sx={{ flexDirection: 'column' }}>
                                        <img width="100px" src={userProfile.avatar} alt="profile" />
                                        <Button
                                            onClick={() => console.log('Hello THere')}
                                            size="small"
                                            sx={{
                                                textTransform: "capitalize",
                                                padding: "6px 20px",
                                                marginTop: '5px',
                                                background: "black",
                                                "&:hover": {
                                                    background: "#333",
                                                },
                                            }}
                                            variant="contained"
                                        >
                                            Follow
                                        </Button>
                                        <Typography textAlign='center' variant="h6" sx={{ fontWeight: "500" }}>
                                            {userProfile.handle}
                                        </Typography>
                                        <Typography textAlign='center' sx={{ fontSize: "14px", color: "#555" }}>
                                            @{userProfile.handle.trim().toLowerCase()}
                                        </Typography>
                                        <Box display="flex">
                                            <LocationOnIcon htmlColor="#555" />
                                            <Typography sx={{ ml: "6px", color: "#555" }}>
                                                {userProfile.city}, {userProfile.state}, {userProfile.country}
                                            </Typography>
                                        </Box>
                                        <Box display="flex">
                                            <DateRangeIcon htmlColor="#555" />
                                            <Typography sx={{ ml: "6px", color: "#555" }}>
                                                {Moment(userProfile.birth_date).format('MMMM Do YYYY')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box padding="0px 0px">
                                        <Typography fontSize="16px" color="#333" padding="10px 0">
                                            {userProfile.bio}
                                        </Typography>

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
                                            <Typography color="#555" marginRight="1rem">Member Since {Moment(userProfile.created_at).format('YYYY')}</Typography>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box>
                                    {userProfile.id && (
                                        <CryptoDoughnut currentUser={userProfile.id} />
                                    )}
                                </Box>
                            </div>
                            <Box sx={{ overflowY: "scroll" }} >
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
                                </Box >
                                {/* {postArray &&
                                    postArray.map((post) => {
                                        return <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />
                                    }
                                    )
                                } */}
                            </Box>
                        </>
                    </div>
                </Fade>
            )}

            {/* {openModal && (
                <Modal
                    open={openModal}
                    handleClose={handleModalClose}
                >
                    <UpdateUserProfile />
                </Modal>
            )} */}
        </div>
    );
}

export default GuestProfile;