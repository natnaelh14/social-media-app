import React from 'react';
import { SigninContainer, SigninTitle } from './sign-in.styles';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { Button, Box, Typography } from '@mui/material';
import ParticlesBackground from '../ParticlesBackground/particles_background.component';

const SignIn: React.FunctionComponent = () => {

    return (
        <>
            <ParticlesBackground />
            <SigninContainer>
                <Box
                    sx={{
                        width: 400,
                        height: 400,
                        backgroundColor: 'primary.main',
                        // '&:hover': {
                        //     backgroundColor: 'primary.main',
                        //     opacity: [0.9, 0.8, 0.7],
                        // },
                    }}
                >
                    <Typography align='center'>
                        <Button size="large" color='inherit'>Welcome, Please Sign in</Button>
                        <Button size="medium" color='inherit' variant="contained" disableElevation onClick={signInWithGoogle}>Sign in with Google</Button>
                    </Typography>

                </Box>
            </SigninContainer>
            

        </>


    );
}

export default SignIn;
