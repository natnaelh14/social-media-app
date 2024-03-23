import { ReactComponent as Logo } from "../../assets/logo.svg";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithGithub } from "../../firebase/firebase.utils";
import { signInWithTwitter } from "../../firebase/firebase.utils";
import {
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";
import { AboutUs } from "../AboutUs/AboutUs";
import { Footer } from "../Footer/Footer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import heroOne from "./hero-01.jpg";
import heroTwo from "./hero-02.jpg";

export const SignIn = () => {
  return (
    <Parallax pages={3}>
      <ParallaxLayer
        offset={0}
        speed={1}
        factor={1}
        className="flex items-center justify-center lg:justify-end"
        style={{
          backgroundImage: `url(${heroOne})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center p-12 gap-2 bg-[#001219]/25 lg:backdrop-blur-0 lg:bg-transparent backdrop-blur-md rounded-2xl">
          <Logo className="logo" />
          <h1 className="text-center text-white">Welcome to Crypto Connect</h1>
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
      </ParallaxLayer>
      <ParallaxLayer
        offset={1}
        speed={1}
        factor={1}
        className="flex items-center justify-center lg:justify-end"
        style={{
          backgroundImage: `url(${heroTwo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <AboutUs />
      </ParallaxLayer>
      <ParallaxLayer offset={2} speed={1} factor={1}>
        <Footer />
      </ParallaxLayer>
    </Parallax>
  );
};
