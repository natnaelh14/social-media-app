import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography, TextField } from "@mui/material";
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

  return (
    <>
      {(loading || error || !userProfile.avatar) && (
        <div>Single Message Loading...</div>
      )}
      {userProfile && (
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
                width='100%'
              >
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {userProfile.handle}
                  </Typography>
                  <Typography sx={{ marginLeft: 'auto', fontSize: "15px", color: "#555" }}>
                    {Moment(sentAt).format('llll')}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {text}
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default SingleMessage;