import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouteLink } from "react-router-dom";
const Moment = require('moment')
import { Fade } from "@mui/material";
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { userProps } from '../../index.types';
import { useAppSelector } from '../../app/hooks';
import Avatar from '@material-ui/core/Avatar';

type MsgProps = {
  senderId: string,
  sentAt: string,
  text: string
}
const SingleMessage = ({ senderId, sentAt, text }: MsgProps) => {

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: senderId }
  });
  if (data) {
    var { userProfile }: { userProfile: userProps } = data;
  }

  useEffect(() => {
    console.log('text', userProfile)
  }, [userProfile])
  return (
    <>
      {(loading && error) ? (
        <div>Single Message Loading...</div>
      ) : (
        <Box
          padding="1rem"
          width='100%'
          sx={{
            marginTop: '10px',
            marginBottom: '10px',
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ paddingRight: "1rem" }}>
              <Avatar alt="logo" src={userProfile.avatar} />
            </Grid>
            <Box>
              <Grid
                container
              // justifyContent="space-between"
              // alignItems="center"
              // flexWrap="nowrap"
              >
                <Grid width='auto'
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                    <Typography sx={{ fontSize: "15px", color: "#555" }}>
                      {userProfile.handle}
                    </Typography>
                    <Typography sx={{ fontSize: "15px", color: "#555" }}>
                      {sentAt}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "15px", color: "#555" }}>
                      {text}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default SingleMessage;