import React, { Component } from 'react';
import FormInput from '../FormInput/form-input.component';
import CustomButton from '../CustomButton/custom-button.component';
import {
    SigninContainer,
    SigninTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

type SigninState = {
    email: string,
    password: string
}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

class SignIn extends Component<{}, SigninState> {

    state = {
        email: '',
        password: ''
    };
    
    handleChange = (e: InputEvent): void => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    handleSubmit = async (e: ButtonEvent): void => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
        }

        this.setState({ email: '', password: '' });
    };

    render() {

        const { email, password } = this.state;

        return (
            <SigninContainer>
                <SigninTitle>I already have an account</SigninTitle>
                <span>Sign in with your email and password.</span>
                <form className='sign-in-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        label='Email'
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        label='Password'
                        onChange={this.handleChange}
                    />
                    <ButtonsBarContainer>
                        <CustomButton type='submit' >Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} googleSignin={true}>
                            Sign In With Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SigninContainer>
        );
    }
}

export default SignIn;
