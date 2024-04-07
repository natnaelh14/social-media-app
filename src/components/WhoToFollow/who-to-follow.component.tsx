import { useMutation, useQuery } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import noAvatar from "../../img/no-avatar.png";
import { userProps } from "../../index.types";
import { FRIEND_REQUEST } from "../../utils/mutations";
import {
  QUERY_CHECK_FRIENDSHIP,
  QUERY_FRIEND_REQUEST,
} from "../../utils/queries";

type userInfoProps = {
  id: string;
  handle: string;
  avatar: string;
  isActive: string;
  userRefetch: () => void;
  whoToRefetch: () => void;
};

const useStyles = makeStyles((theme) => ({
  smallScreen: {
    "@media (max-width: 1400px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const WhoToFollow = ({
  id,
  handle,
  avatar,
  isActive,
  userRefetch,
  whoToRefetch,
}: userInfoProps) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const { error, loading, user } = currentUser;
  const userInfo: userProps = user;
  const {
    error: checkFriendError,
    loading: checkFriendLoading,
    data: checkFriendData,
    refetch: checkRefetch,
  } = useQuery(QUERY_CHECK_FRIENDSHIP, {
    variables: {
      follower: userInfo.id,
      followed: id,
    },
  });
  const {
    error: friendRequestError,
    loading: friendRequestLoading,
    data: friendRequestData,
    refetch: queryFriendRefetch,
  } = useQuery(QUERY_FRIEND_REQUEST, {
    variables: {
      receiver_id: id,
      sender_id: userInfo.id,
    },
  });

  const [followRequest, {}] = useMutation(FRIEND_REQUEST);
  const handleFollowRequest = async () => {
    try {
      await followRequest({
        variables: {
          sender_id: userInfo.id,
          receiver_id: id,
        },
      }).then(() => {
        userRefetch();
        whoToRefetch();
        checkRefetch();
        queryFriendRefetch();
      });
    } catch (e) {
      return e;
    }
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    // <Box margin="1rem 0">
    <section className="">
      <Grid item sx={{ paddingRight: "12px" }}>
        <NavLink to={`/home/profile/${id}`}>
          <Avatar
            style={{ height: "50px", width: "50px" }}
            alt="recommended-user"
            src={avatar ? avatar : noAvatar}
          />
        </NavLink>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item>
            <Typography
              ml="0.1rem"
              fontFamily="inherit"
              sx={{ fontSize: "13px", fontWeight: "500" }}
            >
              {handle}
            </Typography>
            <Typography
              ml="0.1rem"
              fontFamily="inherit"
              sx={{ fontSize: "11px", fontWeight: "500" }}
            >
              @{handle.trim().replace(/ /g, "").toLowerCase()}
            </Typography>
            {checkFriendData?.checkFriendship ? (
              <Button
                size="small"
                disabled={true}
                onClick={handleFollowRequest}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  fontFamily: "inherit",
                  fontSize: "10px",
                  mt: "4px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                FOLLOWING
              </Button>
            ) : userInfo.id === id ||
              friendRequestData?.friendRequest?.status === "BLOCKED" ? (
              <div />
            ) : friendRequestData?.friendRequest?.status === "PENDING" ? (
              <Button
                size="small"
                disabled={true}
                onClick={handleFollowRequest}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  fontFamily: "inherit",
                  fontSize: "10px",
                  mt: "4px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                PENDING
              </Button>
            ) : (
              <Button
                size="small"
                disabled={false}
                onClick={handleFollowRequest}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  fontFamily: "inherit",
                  fontSize: "10px",
                  mt: "4px",
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
          </Grid>
        </Grid>
      </Grid>
    </section>
    // </Box>
  );
};

export default WhoToFollow;
