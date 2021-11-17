import React, { useState } from 'react';
import { SignUpContainer, SignUpTitle } from './update_user_profile.styles';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';

const UpdateUserProfile: React.FunctionComponent = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [handle, setHandle] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const [birthDate, setBirthDate] = useState<string>('')

  // const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // //API call to upload resume and receive a pdf url file
      // const resumeData = new FormData();
      // resumeData.append("upload_preset", "resume");
      // resumeData.append("file", avatar);
      // const resumeRes = await axios.post(
      //   `https://api.cloudinary.com/v1_1/doalzf6o2/image/upload`,
      //   resumeData
      // );
      // const avatarUr = resumeRes.data.secure_url
      // console.log(avatarUr)
      const avatarUrl = 'https://res.cloudinary.com/doalzf6o2/image/upload/v1630350221/l7cectdjrheqnfpt1v7j.pdf'
      // const { data } = await addUser({
      //   variables: { email, password, handle, gender, avatarUrl, birthDate },
      // });
      // Auth.login(data.addUser.token);

    } catch (e) {

    }
  };

  return (
    <SignUpContainer>
      <SignUpTitle>Update Account</SignUpTitle>
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 120,
            left: 15,
            background: "#eee",
            borderRadius: "50%",
          }}
        >
          <img width="150px" src="https://res.cloudinary.com/doalzf6o2/image/upload/v1637106685/hero-image_vzhsrd.png" alt="profile" />
        </Box>
        <Box padding="10px 20px">
          <Typography variant="h6" sx={{ fontWeight: "500" }}>
            Natnael Haile
          </Typography>
        </Box>
      </Box>
      <form className='sign-up-form'>
        <label style={{ fontSize: '13px', marginLeft: '5px' }}>Avatar</label>
        <input
          type='file'
          name='avatar'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <label style={{ fontSize: '13px', marginLeft: '5px' }}>Gender</label>
        <FormControl style={{ marginTop: "15px", marginBottom: "15px" }} fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value='MALE'>Male</MenuItem>
            <MenuItem value='FEMALE'>Female</MenuItem>
            <MenuItem value='OTHER'>Other</MenuItem>
          </Select>
        </FormControl>
        <label style={{ fontSize: '13px', marginLeft: '5px' }}>Birth Date</label>
        <input
          type='date'
          name='birthDate'
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <button type='submit' onClick={handleRegister}>Sign Up</button>
        {/* <CustomButton type='submit' onClick={handleRegister}>Sign Up</CustomButton> */}
      </form>
    </SignUpContainer>
  );
}

export default UpdateUserProfile;
