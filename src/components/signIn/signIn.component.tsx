import React, { Component } from 'react';
import FormInput from '../FormInput/FormInput.component';
import CustomButton from '../CustomButton/CustomButton.component';
import {
    SigninContainer,
    SigninTitle,
    ButtonsBarContainer
} from './SignIn.styles';

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
                        <CustomButton>Sign In</CustomButton>
                        <CustomButton>
                            Sign In With Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SigninContainer>
        );
    }
}

export default SignIn;
