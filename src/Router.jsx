import Header from './components/Header/header.component';
import SigninAndSignupPage from './screens/SignInAndSignUp/SignInAndSignUp.component';
import HomePage from "./components/HomePage/homepage.component";
import { Route, Routes } from 'react-router-dom';


const Router = () => {
    return (
        <div>
           <Header />
           <SigninAndSignupPage />
           <Routes>
                <Route exact path='/signin' component={SigninAndSignupPage} />
                <Route  exact path='/' component={HomePage} />
           </Routes> 
        </div>
    )
}

export default Router
