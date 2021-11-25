import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

type followProps = {
    id: string,
    handle: string,
    avatar: string,
    buttonText: string
}

const FollowBox = ({ id, handle, avatar, buttonText }: followProps) => {
    return (
        <Box
            padding="0.5rem"
            margin="0.1rem"
            sx={{
                "&:hover": {
                    backgroundColor: "#eee",
                },
            }}
        >
            <Grid sx={{ display: "flex", flexDirection: "row", paddingRight: "1rem" }}>
                <Link to={`/home/profile/${id}`}>
                    <img src={avatar} alt="logo" width="30px" />
                </Link>
                <Typography
                    sx={{ ml: '50px', mt: '10px', fontSize: "16px", fontWeight: 500, textAlign: "center" }}
                >
                    {handle}
                </Typography>
                <Button
                sx={{ marginLeft: 'auto', color: '#000'}}
                >{buttonText}</Button>
            </Grid>
        </Box>
    )
}

export default FollowBox
