import { useMutation } from "@apollo/client";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import noAvatar from "../../img/no-avatar.png";
import { userProps } from "../../index.types";
import { ADD_POST } from "../../utils/mutations";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
};

const AddPostModal = ({ open, handleClose }: ModalProps) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const { user } = currentUser;
  const userInfo: userProps = user;

  const [postText, setPostText] = useState("");
  const [addPost, { data }] = useMutation(ADD_POST);

  const handleAddPost = async () => {
    await addPost({
      variables: {
        user_id: userInfo.id,
        text: postText,
      },
    });
    setPostText("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography
          fontFamily="inherit"
          textAlign="center"
          style={{ fontSize: "20px" }}
        >
          ADD POST
        </Typography>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent style={{ height: "auto" }}>
        <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
          <Grid>
            <Grid item>
              <Avatar
                alt="user-message-image"
                style={{ width: "60px", height: "60px" }}
                src={userInfo.avatar ? userInfo.avatar : noAvatar}
              />
            </Grid>
            <Grid item>
              <Box padding=".5rem 0">
                <Input
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  multiline
                  rows="2"
                  disableUnderline
                  type="text"
                  placeholder="What's happening?"
                  sx={{ width: "100%", fontFamily: "inherit" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          size="small"
          sx={{
            textTransform: "capitalize",
            padding: "6px 20px",
            marginBottom: "20px",
            width: "60%",
            background: "black",
            borderRadius: "12px",
            fontFamily: "inherit",
            "&:hover": {
              background: "#333",
            },
          }}
          variant="contained"
          onClick={handleAddPost}
        >
          POST
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostModal;
