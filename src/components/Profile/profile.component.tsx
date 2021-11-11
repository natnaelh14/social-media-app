import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link as RouteLink } from "react-router-dom";
import Post from '../Post/Post.component';
import { Fade } from "@mui/material";

const Profile = () => {

  return (
    <Fade in={true} timeout={1000}>
      <div style={{ margin: '50px' }}>
        <Box>
          <Box borderBottom="1px solid #ccc" padding="8px 20px">
            <Grid container alignItems="center">
              <Grid item sx={{ mr: "10px" }}>
                <RouteLink to="/">
                  <IconButton>
                    <ArrowBackIcon />
                  </IconButton>
                </RouteLink>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Natnael Haile
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#555" }}>
                  120 posts
                </Typography>{" "}
              </Grid>
            </Grid>
          </Box>
          <Box height="90vh" sx={{ overflowY: "scroll" }}>
            <Box position="relative">
              <img
                width="100%"
                src='https://res.cloudinary.com/doalzf6o2/image/upload/v1636321862/587_cfth76.jpg'
                alt="background"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 120,
                  left: 15,
                  background: "#eee",
                  borderRadius: "50%",
                }}
              >
                <img width="150px" src='https://res.cloudinary.com/doalzf6o2/image/upload/v1635983850/hero-image_yccwx5.png' alt="profile" />
              </Box>
            </Box>
            <Box textAlign="right" padding="10px 20px">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              <IconButton>
                <MailOutlineIcon />
              </IconButton>
              <Button
                onClick={() => console.log('Hello THere')}
                size="small"
                sx={{
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Follow
              </Button>
            </Box>
            <Box padding="10px 20px">
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                Natnael Haile
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#555" }}>
                @natnaelh14
              </Typography>
              <Typography fontSize="16px" color="#333" padding="10px 0">
                Hello, I am from Atlanta, GA. It is nice to meet you.
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                padding="6px 0"
                flexWrap="wrap"
              >
                <Box display="flex">
                  <LocationOnIcon htmlColor="#555" />
                  <Typography sx={{ ml: "6px", color: "#555" }}>
                    Atlanta, GA
                  </Typography>
                </Box>
                <Box display="flex" marginLeft="1rem">
                  <DateRangeIcon htmlColor="#555" />
                  <Typography sx={{ ml: "6px", color: "#555" }}>
                    Jan, 2019
                  </Typography>
                </Box>
              </Box>
              <Box display="flex">
                <Typography color="#555" marginRight="1rem">
                  <strong style={{ color: "black" }}>
                    100
                  </strong>
                  Following
                </Typography>
                <Typography color="#555" marginRight="1rem">
                  <strong style={{ color: "black" }}>
                    100
                  </strong>
                  Followers
                </Typography>
              </Box>
            </Box>
            <Box borderBottom="1px solid #ccc">
              <Typography
                display="inline-block"
                variant="caption"
                fontSize="16px"
                marginX="1rem"
                padding="6px 0"
                fontWeight="500"
                borderBottom={`4px solid black`}
              >
                Posts
              </Typography>
            </Box>
            <Post />
            <Post />
            <Post />
            <Post />
          </Box>
        </Box>
      </div>
    </Fade>

  );
}

export default Profile;