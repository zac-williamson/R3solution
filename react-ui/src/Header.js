import React from 'react';
import PropTypes from 'prop-types';

import Auth from './modules/Auth';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';
const iconStyles = {
  marginBottom: -5
};

const subHeaderStyle = {
  color: '#0097A7'
}

let shorten = (_long) => {
  let out = _long.substring(0, 1);
  return out;
}

//#################################
//Header
//#################################

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      loginStatusString: 'Login',
      loginModalOpen: false,
      signupResult: false,
      signupResultMessage: '',
      errors: {},
      loggedIn: false
    };

  }

  componentDidMount() {
    let loggedIn = Auth.isUserAuthenticated();
    this.setState({
      loggedIn:loggedIn
    });
  }

  loginDialog() {
    this.setState({
      loginModalOpen: true,
      registerEmail: '',
      registerPassword: '',
      registerConfirmPassword: '',
      registerUsername: '',
      loginEmail: '',
      loginPassword: '',
      tabValue: '0',
      passwordErrorText: '',
    });
  }

  register() {
    // prevent default action. in this case, action is the form submission event
    let passwordErrorText = '';
    if (this.state.registerPassword !== this.state.registerConfirmPassword) {
      passwordErrorText = 'Passwords do not match';
    }
    if (passwordErrorText !== this.state.passwordErrorText) {
      this.setState({
        passwordErrorText: passwordErrorText
      });
      return;
    }

    //validate password
    //validate email

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.registerUsername);
    const email = encodeURIComponent(this.state.registerEmail);
    const password = encodeURIComponent(this.state.registerPassword);
    const formData = `name=${name}&email=${email}&password=${password}`;
    // create an AJAX request
    console.log('form data = ' + formData);
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3001/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log("xhr status = " + xhr.status);
      if (xhr.status === 200) {
        // success
        console.log('success');
        // change the component-container state
        this.setState({
          errors: {},
          signupResult: 'true',
          signupResultMessage: 'Account successfully created! Please log in.'
        });
        // set a message
        localStorage.setItem('successMessage', xhr.response.message);
      } else {
        // failure
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        console.log(JSON.stringify(errors));
        this.setState({
          errors: errors,
          signupResult: 'true',
          signupResultMessage: 'Oh no! Something went wrong, please try again.'
        });
      }
    });
    xhr.send(formData);
  }

  logOut() {
    Auth.clearLocalStorage();
    this.context.router.history.push('/');
  }

  login() {
    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.loginEmail);
    const password = encodeURIComponent(this.state.loginPassword);
    const formData = `email=${email}&password=${password}`;
    console.log("submitting form data " + formData);
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3001/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state
        this.setState({
          errors: {}
        });
        // save the token
        Auth.authenticateUser(xhr.response.token, this.state.loginEmail, this.state.loginAddress);
        // change the current URL to /
        this.context.router.history.push('/dashboard');
      } else {
        // failure
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors: errors,
          signupResult: true,
          signupResultMessage: 'Oh no! There was a problem logging in, please try again',
        });
      }
    });
    xhr.send(formData);
  }

  render() {

    return (
      <div style={{ width: '100%', marginBottom: '30px' }}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <AppBar titleStyle={{ textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Impact' }}
              title={
                <span>R3solution{/*<span style={{fontSize:'small', verticalAlign:'super', fontFamily:'sans-serif', fontWeight:'bold', color:'#FF2222'}}>
                  &nbsp; put your money where your mouth is!</span>*/}</span>
              }
              iconElementRight={
                <div>
                  <FlatButton style={{ color: 'white' }} label="Browse" onClick={() => { }} />
                  <FlatButton style={{ color: 'white' }} label="New" onClick={() => { }} />
                  {this.state.loggedIn ? <FlatButton style={{ color: 'white' }} label='Log Out' onClick={() => { this.logOut() }} /> : 
                                         <FlatButton style={{ color: 'white' }} label={this.state.loginStatusString} onClick={() => { this.loginDialog() }} /> }
                </div>
              }
            />

            <div>
              <Dialog

                modal={false}
                open={this.state.loginModalOpen}
                onRequestClose={() => { this.setState({ loginModalOpen: false }) }}
                titleStyle={{ fontFamily: 'Impact', color: 'white', backgroundColor: getMuiTheme().palette.primary1Color }}
                bodyStyle={{ padding: '0' }}
                contentStyle={{ width: "40%", minWidth: "400px", maxWidth: "none" }}
              >
                <Tabs value={this.state.tabValue} onChange={(value) => { this.setState({ tabValue: value }) }}>
                  <Tab label="Login" value='0'>
                    <div style={{ margin: '10px' }}>
                      <TextField floatingLabelText="Email" value={this.state.loginEmail} onChange={(e) => { this.setState({ loginEmail: e.target.value }) }} /><br />
                      <TextField floatingLabelText="Password" type="password" value={this.state.loginPassword} onChange={(e) => { this.setState({ loginPassword: e.target.value }) }} /><br />
                      <RaisedButton style={{ width: '100%' }} primary={true} label="Log In" onClick={() => { this.login() }} />
                    </div>
                  </Tab>
                  <Tab label="Signup" value='1'>
                    <div style={{ margin: '10px' }}>
                      <TextField floatingLabelText="Email" value={this.state.registerEmail} onChange={(e) => { this.setState({ registerEmail: e.target.value }) }} /><br />
                      <TextField floatingLabelText="Username" value={this.state.registerUsername} onChange={(e) => { this.setState({ registerUsername: e.target.value }) }} /><br />
                      <TextField floatingLabelText="Password" type="password" value={this.state.registerPassword} onChange={(e) => { this.setState({ registerPassword: e.target.value }) }} /><br />
                      <TextField floatingLabelText="Confirm Password" errorText={this.state.passwordErrorText} type="password" value={this.state.registerConfirmPassword} onChange={(e) => { this.setState({ registerConfirmPassword: e.target.value }) }} /><br />
                      <RaisedButton style={{ width: '100%' }} primary={true} label="Create Account" onClick={() => { this.register() }} />
                    </div>
                  </Tab>
                </Tabs>
              </Dialog>
              <Dialog
                modal={false}
                open={this.state.signupResult}
                onRequestClose={() => { this.setState({ signupResult: false }) }}
              >
                {this.state.signupResultMessage}<br />{JSON.stringify(this.state.errors)}
              </Dialog>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
