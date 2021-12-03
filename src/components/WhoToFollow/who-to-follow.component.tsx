import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { userProps } from '../../index.types';
import { useAppSelector } from '../../app/hooks';
import { useMutation } from '@apollo/client';
import { FRIEND_REQUEST } from '../../utils/mutations';

type userInfoProps = {
  id: string,
  handle: string,
  avatar: string,
  isActive: string
};

const WhoToFollow = ({ id, handle, avatar, isActive }: userInfoProps) => {

  const currentUser = useAppSelector(state => state.currentUser)
  const { error, loading, user } = currentUser
  const userInfo: userProps = user

  const [buttonDisable, setButtonDisable] = useState(false)
  const [buttonText, setButtonText] = useState("FOLLOW")
  const [followRequest, { }] = useMutation(FRIEND_REQUEST)
  const handleFollowRequest = async () => {
    try {
        const makeRequest = await followRequest({
            variables: {
                sender_id: userInfo.id,
                receiver_id: id
            }
        })
        if (makeRequest) {
          setButtonText('PENDING')
          setButtonDisable(true)
        }
    } catch (e) {
        return e;
    }
}

  const theme = useTheme();
  return (
    <Box margin="1rem 0">
      <Grid container alignItems="center">
        <Grid item sx={{ paddingRight: "12px" }}>
          <NavLink to={`/home/profile/${id}`}>
            <img src={avatar} width="50px" alt="logo" />
          </NavLink>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography fontFamily='inherit' sx={{ fontSize: "13px", fontWeight: "500" }}>
                {handle}
              </Typography>
              {/* <Typography
                sx={{
                  fontSize: "12px",
                  background: "#ccc",
                  borderRadius: theme.shape.borderRadius,
                  padding: "0 6px",
                  color: "#777",
                }}
              >
                follows you
              </Typography> */}
              <Button
                size="small"
                disabled={buttonDisable}
                onClick={handleFollowRequest}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  fontFamily: 'inherit',
                  fontSize: '10px',
                  mt: "4px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WhoToFollow
