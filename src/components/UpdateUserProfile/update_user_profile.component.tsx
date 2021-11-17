import React, { useState } from 'react';
import {  SignUpContainer, SignUpTitle } from './update_user_profile.styles';
import { FormControl, Select, MenuItem } from '@mui/material';

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
      <SignUpTitle>I already have an account</SignUpTitle>
      <span>Sign in with your email and password.</span>
      <form className='sign-up-form'>
      <input
          type='email'
          name='email'
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
                <input
          type='confirmPassword'
          name='confirmPassword'
          value={confirmPassword}
          autoComplete="off"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type='text'
          name='handle'
          value={handle}
          autoComplete="off"
          onChange={(e) => setHandle(e.target.value)}
        />
        <label style={{ fontSize: '13px', marginLeft: '5px' }}>Avatar</label>
        <input
          type='file'
          name='avatar'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <label style={{ fontSize: '13px', marginLeft: '5px' }}>Gender</label>
        <FormControl style={{marginTop: "15px", marginBottom: "15px"}} fullWidth>  
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
