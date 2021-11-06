import React, { Component } from 'react';
import FormInput from '../FormInput/form-input.component';
import CustomButton from '../CustomButton/custom-button.component';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';

class SignUp extends Component {

  render() {
    return (
      <SignUpContainer>
        <SignUpTitle>I already have an account</SignUpTitle>
        <span>Sign in with your email and password.</span>
        <form className='sign-up-form'>
          <FormInput
            type='text'
            name='displayName'
            value='Display Name'
            label='Display Name'
            onChange={() => console.log('test')}
          />
          <FormInput
            type='email'
            name='email'
            value='Email'
            label='Email'
            onChange={() => console.log('test')}
          />
          <FormInput
            type='password'
            name='password'
            value='Password'
            label='Password'
            onChange={() => console.log('test')}
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value='Password'
            label='Confirm Password'
            onChange={() => console.log('test')}
          />
          <CustomButton>Sign Up</CustomButton>
        </form>
      </SignUpContainer>
    );
  }
}

export default SignUp;
