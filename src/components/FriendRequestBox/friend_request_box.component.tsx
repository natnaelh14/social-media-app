import React, { useState } from 'react';
import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

type RequestsProps = {
    userId: string,
    userHandle: string,
    userAvatar: string
}

const FriendRequestBox = ({ userId, userHandle, userAvatar }: RequestsProps) => {

    const [visibleMsg, setVisibleMsg] = useState(false);

    return (
        <>
            <Box
                padding="1rem"
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
                        <Link to={`/home/profile`}>
                            <img src={userAvatar} alt="logo" width="50px" />
                        </Link>
                    </Grid>
                    <Box>
                        <Grid
                            container
                            onClick={() => { setVisibleMsg(!visibleMsg) }}
                            justifyContent="space-between"
                            alignItems="center"
                            flexWrap="nowrap"
                        >
                            <Grid item>
                                <Box>
                                    <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                        {`${userHandle} is requesting to follow you.`}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        {visibleMsg && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginRight="5rem"
                                marginTop=".8rem"
                            >
                                <Button sx={{ marginRight: "1rem" }} color='primary' variant="outlined" size="small">APPROVE</Button>
                                <Button sx={{ marginRight: "1rem" }} color='error' variant="outlined" size="small">DECLINE</Button>
                                <Button sx={{ marginRight: "1rem" }} color='error' variant="outlined" size="small">BLOCK</Button>
                            </Box>
                        )}

                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default FriendRequestBox
