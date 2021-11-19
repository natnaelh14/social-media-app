import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import axios from 'axios';
import {
  Typography,
  Avatar,
  TextField,
  IconButton,
  FormLabel,
  Button,
  Dialog,
  Container,
  CssBaseline,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import { userProps } from '../../index.types';
import { UPDATE_USER_PROFILE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

type ModalProps = {
  open: boolean,
  handleClose: () => void,
}

const UpdateUserProfile = ({
  open,
  handleClose,
}: ModalProps) => {

  const currentUser = useAppSelector((state) => state.currentUser);
  const { user } = currentUser
  const userInfo: userProps = user

  const [bio, setBio] = useState<string>(userInfo.bio)
  const [city, setCity] = useState<string>(userInfo.city)
  const [state, setState] = useState<string>(userInfo.state)
  const [country, setCountry] = useState<string>(userInfo.country)
  const [gender, setGender] = useState<string>(userInfo.gender)
  const [avatar, setAvatar] = useState<FileList | any>()
  const [birthDate, setBirthDate] = useState<Date | any>(userInfo.birth_date)
  const [updateUserProfile, { data, loading, error }] = useMutation(UPDATE_USER_PROFILE)

  const handleUpdateProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const resumeData = new FormData();
      resumeData.append("upload_preset", "resume");
      resumeData.append("file", avatar[0]);
      const resumeRes = await axios.post(
        `https://api.cloudinary.com/v1_1/doalzf6o2/image/upload`,
        resumeData
      );
      const avatarUrl = resumeRes.data.secure_url
      console.log(city, state, country, avatarUrl, gender, birthDate)
      const { data } = await updateUserProfile({
        variables: { 
          id: userInfo.id, 
          handle: userInfo.handle, 
          email: userInfo.email, 
          avatar: avatarUrl, bio, 
          city, 
          state, 
          country,  
          gender, 
          status: userInfo.status, 
          birth_date: birthDate, 
          updated_at: userInfo.updated_at, 
          created_at: userInfo.created_at 
        },
      });
      handleClose();
    } catch (e) {
      handleClose();
      throw new Error('Unable to Update Profile.')
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography textAlign='center' style={{ fontSize: '20px' }}>Update Profile</Typography>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent style={{ height: 'auto' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 80, height: 80, margin: 'auto' }}
              src={userInfo.avatar}
            />
            <Typography textAlign='center' component="h1" variant="h6">
              Natnael Haile
            </Typography>
            <Typography textAlign='center' component="p" variant="subtitle2">
              @natnaelhaile
            </Typography>
            <form noValidate>
            <TextField
                variant="standard"
                margin="normal"
                minRows={3}
                fullWidth
                id="bio"
                label="Bio"
                name="bio"
                autoComplete="off"
                autoFocus
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="off"
                autoFocus
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="off"
                autoFocus
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="off"
                autoFocus
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <FormControl
                style={{ marginTop: "15px", marginBottom: "15px" }}
                fullWidth
              >
                <FormLabel component="legend" sx={{ fontSize: '0.8rem' }} >Gender</FormLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="date"
                variant="standard"
                label="Birthday"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <br />
              <FormLabel component="legend" sx={{ fontSize: '0.8rem' }} >Avatar</FormLabel>
              <br />
              <Button variant="outlined" component="label">
                Upload Avatar
                <input type="file" hidden onChange={(e) => setAvatar(e.target.files)} />
              </Button>
            </form>
          </div>
        </Container>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          size="small"
          sx={{
            textTransform: "capitalize",
            padding: "6px 20px",
            marginBottom: '20px',
            width: "60%",
            background: "black",
            "&:hover": {
              background: "#333",
            },
          }}
          variant="contained"
          onClick={handleUpdateProfile}
        >
          UPDATE PROFILE
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateUserProfile;