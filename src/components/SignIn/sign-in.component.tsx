import React, { Component } from 'react';
import FormInput from '../FormInput/form-input.component';
import CustomButton from '../CustomButton/custom-button.component';
import {
    SigninContainer,
    SigninTitle,
    ButtonsBarContainer
} from './sign-in.styles';

class SignIn extends Component {

    render() {
        return (
            <SigninContainer>
                <SigninTitle>I already have an account</SigninTitle>
                <span>Sign in with your email and password.</span>
                <form className='sign-in-form'>
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
                    <ButtonsBarContainer>
                        <CustomButton type='submit' >Sign In</CustomButton>
                        <CustomButton onClick={() => console.log('test')} googleSignin={true}>
                            Sign In With Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SigninContainer>
        );
    }
}

export default SignIn;
