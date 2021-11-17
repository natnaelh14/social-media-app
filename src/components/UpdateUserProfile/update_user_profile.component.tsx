import axios from 'axios';
import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  TextField,
  FormLabel,
  Button,
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

const UpdateUserProfile: React.FunctionComponent = () => {

  const currentUser = useAppSelector((state) => state.currentUser);
  const { user } = currentUser
  const userInfo: userProps = user

  const [city, setCity] = useState<string>(userInfo.city)
  const [state, setState] = useState<string>(userInfo.state)
  const [country, setCountry] = useState<string>(userInfo.country)
  const [gender, setGender] = useState<string>(userInfo.gender)
  const [avatar, setAvatar] = useState<FileList | any>()
  const [birthDate, setBirthDate] = useState<Date | any>(userInfo.birth_date)

  const [updateUserProfile, { data, loading, error }] = useMutation(UPDATE_USER_PROFILE)


  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        variables: { city, state, country, avatar: avatarUrl, gender, birth_date: birthDate },
      });

    } catch (e) {
      throw new Error ('Unable to upload file and update profile.')
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 80, height: 80, margin: 'auto'}}
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
            <FormLabel component="legend" sx={{ fontSize: '0.8rem'}} >Gender</FormLabel>
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
            defaultValue={userInfo.birth_date}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <FormLabel component="legend" sx={{ fontSize: '0.8rem'}} >Avatar</FormLabel>
          <br />
          <Button variant="outlined" component="label">
            Upload Avatar
            <input type="file" hidden onChange={(e) => setAvatar(e.target.files)} />
          </Button>
          <br />
          <br />
          <br />
          <br />
          <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default UpdateUserProfile;
