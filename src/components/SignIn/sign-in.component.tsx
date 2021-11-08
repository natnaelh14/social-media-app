import React, { useState } from 'react';
import FormInput from '../FormInput/form-input.component';
import CustomButton from '../CustomButton/custom-button.component';
import {SigninContainer, SigninTitle, ButtonsBarContainer} from './sign-in.styles';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn: React.FunctionComponent = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('hello there!hello there!hello there!hello there!hello there!hello there!hello there!')
        try {
            console.log('hello there!hello there!hello there!hello there!hello there!hello there!hello there!')
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
        }
        setEmail('')
        setPassword('')
    };
    return (
        <SigninContainer>
            <SigninTitle>I already have an account</SigninTitle>
            <span>Sign in with your email and password.</span>
            <form className='sign-in-form' onSubmit={(e) => handleSubmit}>
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    label='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    label='Password'
                    onChange={(e) => setPassword(e.target.value)}
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

export default SignIn;
