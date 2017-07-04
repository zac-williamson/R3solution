import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import createBrowserHistory from 'history/createBrowserHistory'

import CreateContract from './CreateContract';
import Splash from './Splash';
import Dashboard from './Dashboard';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const history = createBrowserHistory();
injectTapEventPlugin();

import './index.css';


ReactDOM.render(
  <Router history={history}>
    <div>
      <Route exact path="/" component={Splash} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/create" component={CreateContract} />
    </div>
  </Router> ,

  document.getElementById('root')
);
