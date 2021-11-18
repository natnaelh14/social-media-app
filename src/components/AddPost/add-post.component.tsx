
import React, { useState } from "react";
import { Button, Grid, Input, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useMutation } from '@apollo/client';
import { ADD_POST } from "../../utils/mutations";
import { userProps } from '../../index.types';

const AddPost = () => {

  const currentUser = useAppSelector((state) => state.currentUser);
  const { user } = currentUser
  const userInfo: userProps = user

  const [postText, setPostText] = useState("");
  const [mood, setMood] = useState<string>(userInfo.status)
  const [addPost, { data }] = useMutation(ADD_POST);

  const handleAddPost = async () => {
    await addPost({
      variables: {
        user_id: userInfo.id,
        text: postText
      }
    })
    setPostText("");
  }

  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid >
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src={userInfo.avatar} alt="logo" width="50px" />
        </Grid>
        <Grid item >
          <Box padding=".5rem 0">
            <Input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="What's new in Crypto World?"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box
            paddingBottom=".5rem"
            paddingTop=".8rem"
            borderTop="1px solid #ccc"
          >
            <Box textAlign="left">
              <FormControl style={{minWidth: 120}} >
                <InputLabel id="demo-simple-select-label">Mood</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={mood || ""}
                  variant="standard"
                  onChange={() => { console.log('hellow') }}
                >
                  <MenuItem value='HAPPY'>HAPPY 😀</MenuItem>
                  <MenuItem value='SAD'>SAD 😔</MenuItem>
                  <MenuItem value='EXCITED'>EXCITED 😃</MenuItem>
                  <MenuItem value='AMUSED'>AMUSED 🙂</MenuItem>
                  <MenuItem value='OPTIMISTIC'>OPTIMISTIC 😊</MenuItem>
                  <MenuItem value='FRUSTRATED'>FRUSTRATED 😩</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box textAlign="right">
              <Button
                onClick={handleAddPost}
                disabled={postText.length === 0}
                variant="contained"
                color="primary"
                sx={{
                  fontSize: "12px"
                }}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddPost;