import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link as RouteLink } from "react-router-dom";
import Post from "../Post/Post.component";
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_POSTS, QUERY_CHECK_FRIENDSHIP, QUERY_FOLLOWERS, QUERY_FOLLOWINGS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
const Moment = require('moment')
import { userProps } from "../../index.types";
import CryptoDoughnut from "../CryptoDoughnut/crypto_doughnut.component";
import { useAppSelector } from '../../app/hooks';

const GuestProfile = () => {
    const { profileId } = useParams<{ profileId: string | undefined }>();
    const currentUser = useAppSelector(state => state.currentUser)
    const { error: currentUserError, loading: currentUserLoading, user } = currentUser
    const userInfo: userProps = user

    if (profileId) {
        var { loading, error, data: userData } = useQuery(QUERY_USER, {
            variables: {
                id: profileId
            },
        });
        var { loading: postsLoading, error: postsError, data: postsData } = useQuery(QUERY_POSTS, {
            variables: {
                user_id: profileId
            },
        });
        var { loading: followerLoading, data: followerData } = useQuery(QUERY_FOLLOWERS, {
            variables: {
                id: userInfo.id
            }
        });
        var { loading: followingLoading, data: followingData } = useQuery(QUERY_FOLLOWINGS, {
            variables: {
                id: userInfo.id
            }
        });
    }

    if (profileId && userInfo) {
        var { data: checkFriendData } = useQuery(QUERY_CHECK_FRIENDSHIP, {
            variables: {
                follower: userInfo.id,
                followed: profileId
            }
        })
    }

    return (
        <div style={{ width: '66%', margin: '20px' }}>
            {(loading || error) && (
                <CircularProgress color="success" />
            )}
            {(userData?.userProfile) && (
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
                                            {userData?.userProfile?.handle}
                                        </Typography>
                                        <Typography sx={{ fontSize: "12px", color: "#555" }}>
                                            {postsData?.posts ? postsData?.posts.length : 0} posts
                                        </Typography>{" "}
                                    </Grid>
                                </Grid>
                            </Box>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Box pr='1.5rem'>
                                    <Box padding="10px 20px" display="flex" alignItems="center" sx={{ flexDirection: 'column' }}>
                                        <img width="100px" src={userData?.userProfile?.avatar} alt="profile" />
                                        {checkFriendData?.checkFriendship ? (
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
                                        ) : (
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
                                                Unfollow
                                            </Button>
                                        )}
                                        <Typography textAlign='center' variant="h6" sx={{ fontWeight: "500" }}>
                                            {userData?.userProfile?.handle}
                                        </Typography>
                                        <Typography textAlign='center' sx={{ fontSize: "14px", color: "#555" }}>
                                            @{userData?.userProfile?.handle.trim().toLowerCase()}
                                        </Typography>
                                        <Box display="flex">
                                            <LocationOnIcon htmlColor="#555" />
                                            <Typography sx={{ ml: "6px", color: "#555" }}>
                                                {userData?.userProfile?.city}, {userData?.userProfile?.state}, {userData?.userProfile?.country}
                                            </Typography>
                                        </Box>
                                        <Box display="flex">
                                            <DateRangeIcon htmlColor="#555" />
                                            <Typography sx={{ ml: "6px", color: "#555" }}>
                                                {Moment(userData?.userProfile?.birth_date).format('MMMM Do YYYY')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box padding="0px 0px">
                                        <Typography fontSize="16px" color="#333" padding="10px 0">
                                            {userData?.userProfile?.bio}
                                        </Typography>

                                        <Box display="flex" marginTop='1rem'>
                                            <Typography color="#555" marginRight="1rem">
                                                <strong style={{ color: "black" }}>
                                                    {`${followingData?.followings.length} `}
                                                </strong>
                                                Following
                                            </Typography>
                                            <Typography color="#555" marginRight="1rem">
                                                <strong style={{ color: "black" }}>
                                                    {`${followerData?.followers.length} `}
                                                </strong>
                                                Followers
                                            </Typography>
                                        </Box>
                                        <Box display="flex" marginTop='1rem'>
                                            <Typography color="#555" marginRight="1rem">Member Since {Moment(userData?.userProfile?.created_at).format('YYYY')}</Typography>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box>
                                    {userData?.userProfile?.id && (
                                        <CryptoDoughnut currentUser={userData?.userProfile?.id} />
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
                                {postsData?.posts &&
                                    postsData?.posts.map((post: any) => {
                                        return <Post key={post.id} postId={post.id} userId={post.user_id} postTime={post.created_at} text={post.text} />
                                    }
                                    )
                                }
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