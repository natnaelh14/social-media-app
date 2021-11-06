import './App.css';
import Header from './components/Header/header.component';
import SigninAndSignupPage from './screens/SignInAndSignUp/SignInAndSignUp.component';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/signIn' component={SigninAndSignupPage} />
        {/* <Route exact path='/' component={HomePage} /> */}
      </Switch>
    </div>
  );
}

export default App;
