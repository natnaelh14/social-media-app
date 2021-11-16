import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Moment = require('moment');

type commentProps = {
  commentId: number,
  postId: number,
  userId: string,
  text: string,
  commentTime: Date
};

const Comment = ({commentId, postId, userId, text, commentTime}: commentProps) => {
  return (
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
          <img src="https://res.cloudinary.com/doalzf6o2/image/upload/v1635983850/hero-image_yccwx5.png" alt="lgoog" width="50px" />
        </Grid>
        <Grid item>
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
                    sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                  >
                    Natnael Haile
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    @natnaelh14
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    .
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {Moment(commentTime).format('MMMM Do YYYY')}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {text}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Grid>
            </Grid>
            {/* <Box
                display="flex"
                justifyContent="space-between"
                marginRight="5rem"
                marginTop=".8rem"
              >
                <IconButton size="small">
                  <ChatBubbleOutlineIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <SyncIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  {comment.isLiked ? (
                    <FavoriteIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton size="small">
                  <IosShareIcon fontSize="small" />
                </IconButton>
              </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
};

export default Comment;