import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton,Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, useTheme } from "@mui/system";
// import Typography from "material-ui/styles/typography";

type ModalProps = {
    open: boolean,
    children: React.ReactNode,
    handleClose: () => void;
}

const Modal = ({
  open,
  children,
  handleClose
}: ModalProps) => {
  const theme = useTheme();
  const handleClick = () => {
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth  maxWidth="sm">
      <DialogTitle>
        <Typography textAlign='center' variant="h5">Update Profile</Typography>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent style={{height:'800px'}}>{children}</DialogContent>
      <DialogActions>
        <Button
         
          variant="contained"
          color="primary"
          size="small"
          sx={{
            borderRadius: theme.shape.borderRadius,
            fontSize: "12px",
          }}
          onClick={handleClick}
        >
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;