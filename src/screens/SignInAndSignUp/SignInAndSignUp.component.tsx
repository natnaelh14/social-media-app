import SignIn from '../../components/SignIn/SignIn.component';
import SignUp from '../../components/SignUp/SignUp.component';

import { SignInAndSignUpContainer } from './SignInAndSignUp.styles';

const SigninAndSignupPage = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);

export default SigninAndSignupPage;
