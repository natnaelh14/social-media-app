import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid, IconButton, Typography, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouteLink } from "react-router-dom";
const Moment = require("moment")
import { Fade } from "@mui/material";
import { Link } from "react-router-dom";
import { QUERY_MESSAGES } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { userProps } from "../../index.types";
import { useAppSelector } from "../../app/hooks";
import { QUERY_USER } from "../../utils/queries";
import SingleMessage from "./SingleMessage/single_message.component"
import SendIcon from "@material-ui/icons/Send";
import { ADD_MESSAGE } from "../../utils/mutations";
import SingleMessageLoading from "./SingleMessage/single_message_loading.component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MessagesContainer } from "./messages.styles";
import Avatar from "@material-ui/core/Avatar";
import noAvatar from "../../img/no-avatar.png";
import RefreshIcon from "@mui/icons-material/Refresh";


const Messages = () => {
  const { messagesId } = useParams<{ messagesId: string | undefined }>();
  if (messagesId) {
    const currentUser = useAppSelector(state => state.currentUser)
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
    var { loading: messageLoading, error: messageError, data, refetch: messagesRefetch } = useQuery(QUERY_MESSAGES, {
      variables: { sender_id: userInfo.id, receiver_id: messagesId },
    });
  }
  if (data) {
    var { messages } = data;
  }
  const [messageText, setMessageText] = useState<string>("");
  const [addMessage, { data: addMessageData, loading, error }] = useMutation(ADD_MESSAGE)
  const handleSendMessage = () => {
    try {
      if (messageText) {
        addMessage({
          variables: {
            text: messageText,
            sender_id: userInfo.id,
            receiver_id: messagesId
          },
        }).then(() => {
          messagesRefetch()
        })
      }
      setMessageText("")
    } catch (e) {
      return e;
    }
  }
  const getMessages = () => {
    messagesRefetch()
  }

  return (
    <MessagesContainer>
      <Fade in={true} timeout={1000}>
        <div>
          {userProfile && (
            <div style={{ padding: "20px" }}>
              <Box borderBottom="1px solid #ccc" padding="8px 20px">
                <Grid item sx={{ mr: "10px" }}>
                  <RouteLink to="/home/messages">
                    <IconButton>
                      <ArrowBackIcon />
                    </IconButton>
                  </RouteLink>
                </Grid>
                <Grid item>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                    {(!currentUserLoading) ? (
                      <Link to={`/home/profile/${userProfile.id}`}>
                        <Avatar alt="messenger-image" style={{ height: "75px", width: "75px" }} src={userProfile?.avatar ? userProfile?.avatar : noAvatar} />
                      </Link>
                    ) : (
                      <Skeleton
                        circle
                        height={100}
                        width={100}
                        containerClassName="avatar-skeleton"
                      />
                    )}
                    {(!userProfile.avatar || currentUserLoading) ? (
                      <>
                        <Skeleton
                          width={100}
                        />
                        <Skeleton
                          width={100}
                        />
                      </>
                    ) : (
                      <>
                        <Typography mt='0.5rem' fontFamily='inherit'>{userProfile?.handle.toUpperCase()}</Typography>
                        <Typography fontFamily='inherit'>
                          {`@${userProfile?.handle.trim().replace(/ /g, "").toLowerCase()}`}
                        </Typography>
                      </>

                    )}
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ overflowY: "scroll" }}>
                {(messageLoading || messageError || !messagesId) && (
                  <>
                    <SingleMessageLoading />
                    <SingleMessageLoading />
                    <SingleMessageLoading />
                  </>
                )}
                <Box sx={{ display: "flex", justifyContent: "center" }} >
                  <IconButton size="medium" onClick={getMessages} >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box height="40vh" sx={{ overflowY: "scroll" }}>
                  {messages && (
                    messages.map((msg: any) => {
                      return <SingleMessage key={msg.id} msgId={msg.id} senderId={msg.sender_id} sentAt={msg.sent_at} text={msg.text} refetchMessages={messagesRefetch} />
                    })
                  )};
                </Box>
              </Box>
              <Box sx={{ width: "100%", marginTop: "30px" }}>
                <TextField
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  variant="filled"
                  label="Send Message..."
                  multiline
                  rows={3}
                  style={{ fontFamily: "inherit" }}
                  fullWidth />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={handleSendMessage} >
                    <SendIcon style={{ width: 40, height: 40, color: "#000000" }} />
                  </IconButton>
                </div>
              </Box>
            </div>
          )}
        </div>
      </Fade>
    </MessagesContainer>
  )
}

export default Messages;