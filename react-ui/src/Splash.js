import React from 'react';

import Header from './Header';

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
//Splash
//#################################

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div style={{ width: '100%', marginBottom: '30px' }}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Header />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Splash;
