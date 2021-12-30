
import React from "react";
import { Button, Grid, Input, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import noAvatar from "../../img/no-avatar.png";
import Avatar from "@material-ui/core/Avatar";

const AddPost = () => {
  return (
        <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
          <Grid >
            <Grid item sx={{ paddingRight: "1rem" }}>
              <Avatar alt="user-image" style={{ width: "50px", height: "50px" }} src={userData?.userProfile?.avatar ? userData?.userProfile?.avatar : noAvatar} />
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
                  sx={{ width: "100%", fontFamily: "inherit" }}
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
                      sx={{ fontFamily: "inherit" }}
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
                    sx={{
                      textTransform: "capitalize",
                      fontFamily: "inherit",
                      borderRadius: "12px",
                      fontSize: "12px",
                      mt: "4px",
                      background: "black",
                      "&:hover": {
                        background: "#333",
                      },
                    }}
                  >
                    POST
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
  );
};

export default AddPost;