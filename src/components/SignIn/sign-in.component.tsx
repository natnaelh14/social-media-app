import React from 'react';
import { SigninContainer, SigninTitle } from './sign-in.styles';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { Button } from '@mui/material';

const SignIn: React.FunctionComponent = () => {

    return (
        <SigninContainer>
            <SigninTitle>Welcome, Please Sign in </SigninTitle>
            <Button variant="contained" disableElevation onClick={signInWithGoogle}>Sign in with Google</Button>
        </SigninContainer>
    );
}

export default SignIn;
