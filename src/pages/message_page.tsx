import React, { useEffect } from 'react';
import { Fade, Typography } from "@mui/material";
import MessageBox from '../components/MessageBox/message_box.component';
import { useQuery } from '@apollo/client';
import { QUERY_MESSENGERS, QUERY_MESSAGES } from '../utils/queries';
import { userProps } from '../index.types';
import { useAppSelector } from '../app/hooks';

const MessagePage = () => {

  const currentUser = useAppSelector(state => state.currentUser)
  const { loading: userLoading, user } = currentUser
  const userInfo: userProps = user

  const { loading, error, data } = useQuery(QUERY_MESSENGERS, {
    variables: { id: userInfo.id },
  });
  if (data) {
    var { messengers } = data;
  }

  useEffect(() => {
    console.log('error', data)
  }, [data])
  return (
    <div style={{ width: '66%', margin: '20px' }}>
      <Fade in={true} timeout={1000}>
        <div style={{ border: '1px solid #cdcdcd', padding: '20px' }}>
          <Typography variant='h5' textAlign='center' >Messages</Typography>
          {messengers && (
            messengers.map((msg: any) => {
              return <MessageBox key={msg.id} currentUser={userInfo.id} msgId={msg.id} msgHandle={msg.handle} msgAvatar={msg.avatar} />
            })
          )}
        </div>
      </Fade>
    </div>
  )
}

export default MessagePage;