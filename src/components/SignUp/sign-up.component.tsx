import React, { useState } from 'react';
import FormInput from '../FormInput/form-input.component';
import CustomButton from '../CustomButton/custom-button.component';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Input } from '@mui/material';
import { IconButton } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SignUp: React.FunctionComponent = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [handle, setHandle] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const [birthDate, setBirthDate] = useState<string>('')

  return (
    <SignUpContainer>
      <SignUpTitle>I already have an account</SignUpTitle>
      <span>Sign in with your email and password.</span>
      <form className='sign-up-form'>
      <FormInput
          type='email'
          name='email'
          value={email}
          label='Email'
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          label='Password'
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
                <FormInput
          type='confirmPassword'
          name='confirmPassword'
          value={confirmPassword}
          label='Confirm Password'
          autoComplete="off"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormInput
          type='text'
          name='handle'
          value={handle}
          label='Handle'
          autoComplete="off"
          onChange={(e) => setHandle(e.target.value)}
        />
        <label style={{ fontSize: '13px', marginLeft: '5px' }}>Avatar</label>
        <FormInput
          type='file'
          name='avatar'
          value={avatar}
          label=''
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
        <FormInput
          type='date'
          name='birthDate'
          value={birthDate}
          label=''
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <CustomButton type='submit'>Sign Up</CustomButton>
      </form>
    </SignUpContainer>
  );
}

export default SignUp;
