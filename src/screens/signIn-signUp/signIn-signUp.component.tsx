import SignIn from '../../components/signIn/signIn.component';
import SignUp from '../../components/signUp/signUp.component';

import { SignInAndSignUpContainer } from './signIn-signUp.styles';

const SigninAndSignupPage = () => (
  <SignInAndSignUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndSignUpContainer>
);

export default SigninAndSignupPage;
