import { useMutation, useQuery } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Fade, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Moment from "moment";
import React from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import noAvatar from "../../img/no-avatar.png";
import { userProps } from "../../index.types";
import { FRIEND_REQUEST, REMOVE_FOLLOWING } from "../../utils/mutations";
import {
  QUERY_CHECK_FRIENDSHIP,
  QUERY_FOLLOWERS,
  QUERY_FOLLOWINGS,
  QUERY_FRIEND_REQUEST,
  QUERY_POSTS,
  QUERY_USER,
} from "../../utils/queries";
import CryptoDoughnut from "../CryptoDoughnut/crypto_doughnut.component";
import FollowModal from "../FollowModal/follow_modal.component";
import Post from "../Post/Post";
import {
  CryptoCarouselContainer,
  GuestDataContainer,
  GuestUserInfoContainer,
  UserBioContainer,
} from "./guest_profile.styles";
import GuestProfileLoading from "./guest_profile_loading.component";

const moodObj = (currentMood: string) => {
  switch (currentMood) {
    case "HAPPY":
      return "😀";
    case "SAD":
      return "😔";
    case "EXCITED":
      return "😃";
    case "AMUSED":
      return "🙂";
    case "OPTIMISTIC":
      return "😊";
    case "FRUSTRATED":
      return "😩";
    default:
      return "";
  }
};

const GuestProfile = () => {
  const navigateTo = useNavigate();
  const { profileId } = useParams<{ profileId: string | undefined }>();
  const currentUser = useAppSelector((state) => state.currentUser);
  const {
    error: currentUserError,
    loading: currentUserLoading,
    user,
  } = currentUser;
  const userInfo: userProps = user;
  if (profileId === userInfo.id) {
    navigateTo("/home/profile");
  }
  // ! TEST WORLD
  // if (profileId) {
  var {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(QUERY_USER, {
    variables: {
      id: profileId,
    },
  });
  var {
    loading: postsLoading,
    error: postsError,
    data: postsData,
    refetch: postsRefetch,
  } = useQuery(QUERY_POSTS, {
    variables: {
      user_id: profileId,
    },
  });
  var {
    error: followerError,
    loading: followerLoading,
    data: followerData,
    refetch: followerRefetch,
  } = useQuery(QUERY_FOLLOWERS, {
    variables: {
      id: profileId,
    },
  });
  var {
    error: followingError,
    loading: followingLoading,
    data: followingData,
    refetch: followingRefetch,
  } = useQuery(QUERY_FOLLOWINGS, {
    variables: {
      id: profileId,
    },
  });
  // }

  if (followerData) {
    var { followers } = followerData;
  }
  if (followingData) {
    var { followings } = followingData;
  }

  // if (profileId && userInfo) {
  var { data: checkFriendData, refetch } = useQuery(QUERY_CHECK_FRIENDSHIP, {
    variables: {
      follower: userInfo?.id,
      followed: profileId,
    },
  });
  var { data: checkFriendRequestData, refetch: requestRefetch } = useQuery(
    QUERY_FRIEND_REQUEST,
    {
      variables: {
        sender_id: userInfo?.id,
        receiver_id: profileId,
      },
    },
  );
  // }

  const [openFollowingModal, setOpenFollowingModal] = React.useState(false);
  const [openFollowerModal, setOpenFollowerModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenFollowingModal(false);
    setOpenFollowerModal(false);
  };

  const [removeFollowing, {}] = useMutation(REMOVE_FOLLOWING);
  const handleRemoveFollowing = async () => {
    try {
      await removeFollowing({
        variables: {
          follower_user_id: userInfo.id,
          followed_user_id: profileId,
        },
      }).then(() => {
        refetch();
        requestRefetch();
      });
    } catch (e) {
      return e;
    }
  };
  const [followRequest, {}] = useMutation(FRIEND_REQUEST);
  const handleFollowRequest = async () => {
    try {
      await followRequest({
        variables: {
          sender_id: userInfo.id,
          receiver_id: profileId,
        },
      }).then(() => {
        refetch();
        requestRefetch();
      });
    } catch (e) {
      return e;
    }
  };

  const pending =
    userLoading || !checkFriendRequestData || !checkFriendData || !postsData;
  const currentMood = userData?.userProfile?.status;

  return (
    <div style={{ width: "75%", margin: "20px" }}>
      {pending && <GuestProfileLoading />}
      {userData?.userProfile && checkFriendRequestData && checkFriendData && (
        <Fade in={true} timeout={1000}>
          <div style={{ padding: "20px" }}>
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
            <GuestDataContainer>
              <GuestUserInfoContainer>
                <Box
                  padding="10px 20px"
                  display="flex"
                  alignItems="center"
                  sx={{ flexDirection: "column" }}
                >
                  <Avatar
                    style={{ width: "100px", height: "100px" }}
                    alt="guest-profile-image"
                    src={
                      userData?.userProfile?.avatar
                        ? userData?.userProfile?.avatar
                        : noAvatar
                    }
                  />
                  {checkFriendData?.checkFriendship ? (
                    <Button
                      onClick={handleRemoveFollowing}
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        padding: "6px 20px",
                        marginTop: "5px",
                        background: "black",
                        "&:hover": {
                          background: "#333",
                        },
                      }}
                      variant="contained"
                    >
                      UNFOLLOW
                    </Button>
                  ) : checkFriendRequestData?.friendRequest?.status ===
                    "PENDING" ? (
                    <Button
                      size="small"
                      disabled={true}
                      sx={{
                        textTransform: "capitalize",
                        padding: "6px 20px",
                        marginTop: "5px",
                        background: "black",
                        "&:hover": {
                          background: "#333",
                        },
                      }}
                      variant="contained"
                    >
                      PENDING
                    </Button>
                  ) : checkFriendRequestData?.friendRequest?.status ===
                    "BLOCKED" ? (
                    <div>BLOCKED</div>
                  ) : (
                    <Button
                      size="small"
                      onClick={handleFollowRequest}
                      sx={{
                        textTransform: "capitalize",
                        padding: "6px 20px",
                        marginTop: "5px",
                        background: "black",
                        "&:hover": {
                          background: "#333",
                        },
                      }}
                      variant="contained"
                    >
                      FOLLOW
                    </Button>
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      fontFamily="inherit"
                      variant="h6"
                      mr="0.5rem"
                      sx={{ fontWeight: "500" }}
                    >
                      {userData?.userProfile?.handle}
                    </Typography>
                    {userData?.userProfile?.status && (
                      <Typography
                        fontFamily="inherit"
                        variant="h6"
                        sx={{ fontWeight: "500" }}
                      >
                        (
                        {`${userData?.userProfile?.status} ${moodObj(
                          currentMood,
                        )}`}
                        )
                      </Typography>
                    )}
                  </Box>
                  <Typography
                    textAlign="center"
                    sx={{ fontSize: "14px", color: "#555" }}
                  >
                    @
                    {userData?.userProfile?.handle
                      .trim()
                      .replace(/ /g, "")
                      .toLowerCase()}
                  </Typography>
                  {(userData?.userProfile?.city ||
                    userData?.userProfile?.state ||
                    userData?.userProfile?.country) && (
                    <Box display="flex">
                      <LocationOnIcon htmlColor="#555" />
                      <Typography
                        textAlign="center"
                        sx={{ ml: "6px", color: "#555" }}
                      >
                        {userData?.userProfile?.city},{" "}
                        {userData?.userProfile?.state},{" "}
                        {userData?.userProfile?.country}
                      </Typography>
                    </Box>
                  )}
                  {userData?.userProfile?.birth_date && (
                    <Box display="flex" mt="0.5rem">
                      <DateRangeIcon htmlColor="#555" />
                      <Typography sx={{ ml: "6px", color: "#555" }}>
                        {Moment(userData?.userProfile?.birth_date).format(
                          "MMMM Do YYYY",
                        )}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <UserBioContainer>
                  <Typography
                    fontSize="16px"
                    color="#333"
                    textAlign="center"
                    padding="10px 0"
                  >
                    {userData?.userProfile?.bio}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    marginTop="0.25rem"
                  >
                    <Box
                      onClick={() => setOpenFollowingModal(!openFollowingModal)}
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <Typography color="#555" marginRight="1rem">
                        <strong style={{ color: "black" }}>
                          {`${followingData?.followings.length} `}
                        </strong>
                        Following
                      </Typography>
                    </Box>
                    <Box
                      onClick={() => setOpenFollowerModal(!openFollowerModal)}
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <Typography color="#555" marginRight="1rem">
                        <strong style={{ color: "black" }}>
                          {`${followerData?.followers.length} `}
                        </strong>
                        Followers
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    marginTop="0.25rem"
                  >
                    <Typography color="#555">
                      Member Since{" "}
                      {Moment(userData?.userProfile?.created_at).format("YYYY")}
                    </Typography>
                  </Box>
                </UserBioContainer>
              </GuestUserInfoContainer>
              <CryptoCarouselContainer>
                {userData?.userProfile?.id &&
                  checkFriendData?.checkFriendship && (
                    <CryptoDoughnut currentUser={userData?.userProfile?.id} />
                  )}
              </CryptoCarouselContainer>
            </GuestDataContainer>
            <Box sx={{ overflowY: "scroll" }}>
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
              {postsData?.posts &&
                checkFriendData?.checkFriendship &&
                postsData?.posts.map((post: any) => {
                  return (
                    <Post
                      key={post.id}
                      postId={post.id}
                      userId={post.user_id}
                      postTime={post.created_at}
                      text={post.text}
                      refetchPosts={postsRefetch}
                    />
                  );
                })}
            </Box>
          </div>
        </Fade>
      )}
      {openFollowingModal && (
        <FollowModal
          open={openFollowingModal}
          handleClose={handleModalClose}
          follow={followings}
          title="Following"
          action="Following"
          refetch={followingRefetch}
          buttonStatus={false}
        />
      )}
      {openFollowerModal && (
        <FollowModal
          open={openFollowerModal}
          handleClose={handleModalClose}
          follow={followers}
          title="Followers"
          action="Remove"
          refetch={followerRefetch}
          buttonStatus={false}
        />
      )}
    </div>
  );
};

export default GuestProfile;
