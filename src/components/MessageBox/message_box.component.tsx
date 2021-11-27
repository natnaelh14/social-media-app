import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { useQuery } from '@apollo/client';
import { QUERY_MESSAGES } from '../../utils/queries';
import { userProps } from '../../index.types';
import Avatar from '@material-ui/core/Avatar';

type MessageProps = {
  msgId: string,
  msgHandle: string,
  msgAvatar: string,
  currentUser: string
}
const MessageBox = ({ msgId, msgHandle, msgAvatar, currentUser }: MessageProps) => {

  const { loading, error, data } = useQuery(QUERY_MESSAGES, {
    variables: { sender_id: currentUser, receiver_id: msgId },
  });

  if (data) {
    var { messages } = data;
  }

  // useEffect(() => {
  //   console.log('doug', data)
  // }, [data])

  return (
    <>
      <Link
        to={`/home/messages/${msgId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
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
              <Avatar alt="logo" src={msgAvatar} />
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
                      {msgHandle}
                    </Typography>
                    <Typography sx={{ margin: 'auto', fontSize: "15px", color: "#555" }}>
                      Seen
                    </Typography>
                  </Box>
                  <Box>
                    {messages && (
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        {messages[messages.length - 1].text}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Link>
    </>
  )
}

export default MessageBox