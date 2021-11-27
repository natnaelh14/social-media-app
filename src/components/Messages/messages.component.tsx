import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouteLink } from "react-router-dom";
const Moment = require('moment')
import { Fade } from "@mui/material";
import { QUERY_MESSAGES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { userProps } from '../../index.types';
import { useAppSelector } from '../../app/hooks';
import SingleMessage from '../SingleMessage/single_message.component'

const Messages = () => {

  const { messagesId } = useParams<{ messagesId: string | undefined }>();
  if (messagesId) {
    var currentUser = useAppSelector(state => state.currentUser)
    var { loading, user } = currentUser
  }

  if (user && messagesId) {
    var userInfo: userProps = user
    var { loading: MessageLoading, error, data } = useQuery(QUERY_MESSAGES, {
      variables: { sender_id: userInfo.id, receiver_id: messagesId }
    });
  }
  if (data) {
    var { messages } = data;
  }

  useEffect(() => {
    console.log('liz', messages)
  }, [messages])

  return (
    <div style={{ width: '66%', margin: '20px' }}>
      <Fade in={true} timeout={1000}>
        <div style={{ padding: '20px' }}>
          <Box borderBottom="1px solid #ccc" padding="8px 20px">
            <Grid container alignItems="center">
              <Grid item sx={{ mr: "10px" }}>
                <RouteLink to="/home/messages">
                  <IconButton>
                    <ArrowBackIcon />
                  </IconButton>
                </RouteLink>
              </Grid>
              <Grid item sx={{ mr: "10px" }}>
                <Box>
                  <img width="75px" src="https://res.cloudinary.com/doalzf6o2/image/upload/v1637122383/photo-03_dzsekt.png" alt="profile" />
                  <Typography>Natnael Haile </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box height="90vh" sx={{ overflowY: "scroll" }}>
            {(MessageLoading && error) && (
              <div>Message is Loading...</div>
            )}
            {messages && (
              messages.map((msg: any, index: any) => {
                return <SingleMessage key={index} senderId={msg.sender_id} sentAt={msg.sent_at} text={msg.text} />
              })
            )}

          </Box>
        </div>
      </Fade>
    </div>
  )
}

export default Messages;