
   
import { Button, Grid, Input } from "@mui/material";
import { Box } from "@mui/system";

const AddPost = () => {

  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid >
        <Grid item sx={{paddingRight: "1rem" }}>
          <img src="https://res.cloudinary.com/doalzf6o2/image/upload/v1635983850/hero-image_yccwx5.png" alt="lgogo" width="50px" />
        </Grid>
        <Grid item >
          <Box padding=".5rem 0">
            <Input
              value=''
              onChange={() => console.log('hello world')}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="What's happening?"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <Button
              onClick={() => console.log('hello world')}
            //   disabled={postText.length === 0}
              variant="contained"
              color="primary"
              sx={{
                fontSize: "12px"
              }}
            >
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddPost;