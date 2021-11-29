import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import IosShareIcon from "@mui/icons-material/IosShare";
const Moment = require('moment');
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { DELETE_COMMENT } from '../../utils/mutations';

type commentProps = {
  commentId: number,
  postId: number,
  userId: string,
  text: string,
  commentTime: Date
};

const Comment = ({ commentId, postId, userId, text, commentTime }: commentProps) => {

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: {
      id: userId
    },
  });
  const { userProfile } = data;

  const [deleteComment, {}] = useMutation(DELETE_COMMENT);

  const handleDeleteComment = async() => {
    try {
      await deleteComment({
        variables: { id: commentId }
      })
    } catch (e) {
      throw new Error('Unable to delete comment')
    }
  }

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
          <img src={userProfile.avatar} alt="lgoog" width="50px" />
        </Grid>
        <Box width="100%"
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
          >
            <Grid width='100%' item>
              <Box display="flex">
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                >
                  {userProfile.handle}
                </Typography>
                <Typography
                  sx={{ fontSize: "12px", mr: "8px", color: "#555" }}
                >
                  @{userProfile.handle.toLowerCase().trim()}
                </Typography>
                <Typography
                  sx={{ fontSize: "15px", ml: "auto", color: "#555" }}
                >
                  {Moment(commentTime).format('MMM DD YY')}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "15px", color: "#555", textAlign: "left" }}>
                  {text}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="space-between"
            marginRight="5rem"
            marginTop=".8rem"
            width="100%"
          >
            <IconButton size="small">
              <FavoriteIcon style={{ color: "#e25349" }} fontSize="small" />
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ThumbDownIcon style={{ color: "#e25349" }} fontSize="small" />
              <ThumbDownAltOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <IosShareIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleDeleteComment} >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
};

export default Comment;