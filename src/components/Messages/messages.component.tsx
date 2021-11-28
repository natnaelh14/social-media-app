import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouteLink } from "react-router-dom";
const Moment = require('moment')
import { Fade } from "@mui/material";
import { QUERY_MESSAGES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { userProps } from '../../index.types';
import { useAppSelector } from '../../app/hooks';
import { QUERY_USER } from '../../utils/queries';
import SingleMessage from '../SingleMessage/single_message.component'
import SendIcon from '@material-ui/icons/Send';

const Messages = () => {
  const { messagesId } = useParams<{ messagesId: string | undefined }>();

  if (messagesId) {
    var currentUser = useAppSelector(state => state.currentUser)
    var { loading: currentUserLoading, user } = currentUser
    var { loading: guestLoading, data: guestData } = useQuery(QUERY_USER, {
      variables: { id: messagesId }
    });
  }
  if (guestData) {
    var { userProfile }: { userProfile: userProps } = guestData;
  }
  if (user && messagesId) {
    var userInfo: userProps = user
    var { loading: messageLoading, error: messageError, data } = useQuery(QUERY_MESSAGES, {
      variables: { sender_id: userInfo.id, receiver_id: messagesId }
    });
  }
  if (data) {
    var { messages } = data;
  }

  return (
    <>
      {(messageLoading || messageError || !messagesId || currentUserLoading) && (
        <div>Message is loading</div>
      )}
      {userProfile && (
              <div style={{ width: '66%', margin: '20px' }}>
        <Fade in={true} timeout={1000}>
          <div style={{ padding: '20px' }}>
            <Box borderBottom="1px solid #ccc" padding="8px 20px">
              <Grid item sx={{ mr: "10px" }}>
                <RouteLink to="/home/messages">
                  <IconButton>
                    <ArrowBackIcon />
                  </IconButton>
                </RouteLink>
              </Grid>
              <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <img height="75px" width="75px" src={userProfile.avatar} alt="profile" />
                  <Typography>{userProfile.handle}</Typography>
                </Box>
              </Grid>
            </Box>
            <Box sx={{ overflowY: "scroll" }}>
              {messages && (
                messages.map((msg: any, index: any) => {
                  return <SingleMessage key={index} senderId={msg.sender_id} sentAt={msg.sent_at} text={msg.text} />
                })
              )}

            </Box>
            <Box sx={{ width: '100%', marginTop: '30px' }}>
              <TextField variant="filled" label="Send Message..." fullWidth />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton >
                  <SendIcon style={{ width: 40, height: 40, color: '#000000' }} />
                </IconButton>
              </div>
            </Box>
          </div>
        </Fade>
      </div>
      )}

    </>
  )
}

export default Messages;