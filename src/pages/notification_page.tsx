import React from 'react';
import { Fade, Typography } from "@mui/material";

const NotificationPage = () => {

  return (
    <div style={{ width: '66%', margin: '20px' }}>
      <Fade in={true} timeout={1000}>
        <div style={{ border: '1px solid #cdcdcd', padding: '20px'}}>
            <Typography textAlign='center' variant="h5" sx={{ color: 'red'}} >Notification Feature is Under Construction</Typography>
        </div>
      </Fade>
    </div>
  )
}

export default NotificationPage;