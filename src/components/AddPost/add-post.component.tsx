
import React, { useState, MouseEvent } from "react";
import { Button, Grid, Input, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, UPDATE_USER_PROFILE } from "../../utils/mutations";
import { userProps } from '../../index.types';
import { QUERY_POSTS_BY_FOLLOWING } from '../../utils/queries';
import { listPostsByFollowing } from '../../redux/actions/postActions';
import AddPostLoading from './add_post_loading.component';
import noAvatar from '../../img/no-avatar.png';

const AddPost = () => {

  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.currentUser);
  const { user, loading: userLoading } = currentUser
  const userInfo: userProps = user

  const [postText, setPostText] = useState("");
  const [mood, setMood] = useState<string>(userInfo.status)
  const [addPost, { }] = useMutation(ADD_POST,
    {
      refetchQueries: [
        { query: QUERY_POSTS_BY_FOLLOWING }
      ]
    }
  );
  const [updateProfile, { }] = useMutation(UPDATE_USER_PROFILE)

  const handleAddPost = async () => {
    try {
      const res = await addPost({
        variables: {
          user_id: userInfo.id,
          text: postText
        }
      })
      if (res) {
        setPostText("");
        const { loading, error, data: { postsByFollowing } } = await useQuery(QUERY_POSTS_BY_FOLLOWING, {
          variables: {
            id: userInfo.id
          },
        });
        dispatch(listPostsByFollowing(postsByFollowing))
      }
    } catch (e) {

    }

  }

  const handleChangeMood = async (event: SelectChangeEvent<any>) => {
    event.preventDefault();
    try {
      setMood(event.target.value)
      const updatedUser = await updateProfile({
        variables: {
          ...userInfo,
          status: event.target.value
        }
      })
      // await dispatch(setCurrentUser(updatedUser))
    } catch (e) {
      throw new Error('Unable to Update Profile')
    }
  }

  return (
    <>
      {(userLoading) ? (
        <AddPostLoading />
      ) : (
        <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
          <Grid >
            <Grid item sx={{ paddingRight: "1rem" }}>
              <img src={userInfo.avatar ? userInfo.avatar : noAvatar} alt="logo" width="50px" />
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
                  sx={{ width: "100%", fontFamily: 'inherit' }}
                />
              </Box>
              <Box
                paddingBottom=".5rem"
                paddingTop=".8rem"
                borderTop="1px solid #ccc"
              >
                <Box textAlign="left">
                  <FormControl style={{ minWidth: 120 }} >
                    <InputLabel id="demo-simple-select-label">Mood</InputLabel>
                    <Select
                      id="demo-simple-select"
                      value={mood ? mood : ""}
                      defaultValue={mood}
                      variant="standard"
                      onChange={handleChangeMood}
                      sx={{ fontFamily: 'inherit' }}
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
                      fontSize: "12px",
                      fontFamily: 'inherit'
                    }}
                  >
                    POST
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default AddPost;