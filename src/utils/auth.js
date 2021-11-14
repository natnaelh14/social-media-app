//Use this to decode a token and get the user's information out of it.
import decode from 'jwt-decode';

//Create a new class to instantiate for a user.
class AuthService {
  //Get user data from JSON web token by decoding it.
  getUser() {
    return decode(this.getToken());
  }
  //Return 'true' or 'false' if token exists (it doesn't verify if it is expired yet.)
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    //Retrieves the user token from localStorage.
    return localStorage.getItem('id_token');
  }

  async login(idToken) {
    //Saves users token to localStorage and reloads the application for logged in status to take effect.
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home/feed');
  }

  logout() {
    //Clears user token and profile data from localStorage
    localStorage.removeItem('id_token');
    //this will reload the page and reset the state of the application
    window.location.assign('/signin');
  }
}

export default new AuthService();