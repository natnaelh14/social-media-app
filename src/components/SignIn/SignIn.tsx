import {
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from "~/firebase/utils";

const SignIn = () => {
  return (
    <div className="bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat flex flex-col items-center p-20 gap-4  lg:backdrop-blur-0 lg:bg-transparent backdrop-blur-md">
      <img src="/logo.svg" alt="" />
      <h1 className="text-center text-white lg:text-4xl">
        Welcome to Crypto Connect
      </h1>
      <p className="text-center text-white">
        A cryptocurrency based social media application
      </p>
      <GoogleLoginButton
        style={{ width: "300px" }}
        onClick={signInWithGoogle}
      />
      <GithubLoginButton
        style={{ width: "300px" }}
        onClick={signInWithGithub}
      />
      <TwitterLoginButton
        style={{ width: "300px" }}
        onClick={signInWithTwitter}
      />
    </div>
  );
};

export default SignIn;
