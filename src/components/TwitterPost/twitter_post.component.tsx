import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import IosShareIcon from "@mui/icons-material/IosShare";
import moment from 'moment';
import { Link } from "react-router-dom";

const TwitterPost = () => {

    return (
        <>
            <Box
                padding="1rem"
                sx={{
                    "&:hover": {
                        backgroundColor: "#eee",
                    },
                }}
            >
                <Grid container flexWrap="nowrap">
                    <Grid item sx={{ paddingRight: "1rem" }}>
                        <Link to={`/home/profile`}>
                            <img src='https://res.cloudinary.com/doalzf6o2/image/upload/v1637140264/ke1cuam372joicd5mamc.png' alt="logo" width="50px" />
                        </Link>
                    </Grid>
                    <Grid item >
                        <Box>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="nowrap"
                            >
                                <Grid item>
                                    <Box display="flex">
                                        <Typography
                                            sx={{ fontSize: "16px", fontWeight: 500, mr: "10px" }}
                                        >
                                            twitter user
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: "15px", mr: "10px", color: "#555" }}
                                        >
                                            @twitter-user
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: "15px", mr: "10px", color: "#555" }}
                                        >
                                            {moment().format('MMM DD YY')}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                            Let the legal team take care of it, & learn to coexist in #crypto space. Total market cap of #cryptocurrency being just under 3T which is 1/30 as compared to stock market , I think there is scope for both #Saita & #Shiba Rocket
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                marginRight="5rem"
                                marginTop=".8rem"
                            >
                                <IconButton size="small">
                                    <IosShareIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default TwitterPost