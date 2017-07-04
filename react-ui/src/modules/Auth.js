import axios from 'axios';

class Auth {


  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static authenticateUser(token, email, userAddress, companyName) {
    console.log(token);
    localStorage.setItem('token', token);
    if (this.isUserAuthenticated()) {
      axios.get('http://localhost:3001/api/users/' + email, {
        email: email,
      }).then(function (response) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('username', response.data[0].name);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  static clearLocalStorage() {
    localStorage.clear();
  }

  static getUserEmail() {
    return localStorage.getItem('email');
  }
  static getUsername() {
    return localStorage.getItem('username');
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;