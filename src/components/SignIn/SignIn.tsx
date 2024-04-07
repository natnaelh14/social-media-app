import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import {
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";
import { AboutUs } from "~/components/AboutUs/AboutUs";
import { Footer } from "~/components/Footer/Footer";
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from "~/firebase/utils";
import heroOne from "./hero-01.jpg";
import heroTwo from "./hero-02.jpg";

const SignIn = () => {
  return (
    <div>
      <Parallax pages={3}>
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={1}
          className="flex items-center justify-center lg:justify-end"
          style={{
            backgroundImage: `url(${heroOne})`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col items-center p-20 gap-4 bg-[#001219]/25 lg:backdrop-blur-0 lg:bg-transparent backdrop-blur-md rounded-2xl">
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
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0.5}
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
        <ParallaxLayer offset={2} speed={0.5} factor={1}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default SignIn;
