import SignIn from '../../components/SignIn/sign-in.component';
import SignUp from '../../components/SignUp/sign-up.component';

import { SignInAndSignUpContainer } from './SignInAndSignUp.styles';

const SigninAndSignupPage = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);

export default SigninAndSignupPage;
