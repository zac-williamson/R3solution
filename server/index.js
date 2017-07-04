const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const PassportLocalStrategy = require('passport-local').Strategy;

// connect to the database and load models
console.log(JSON.stringify(config.dbUri));
require('./models').connect(config.dbUri);
console.log("db uri = " + config.dbUri);
const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./static/'));
app.use(express.static('./client/dist/'));
app.use(express.static('./images'));
app.use(express.static('./ipfsApi'));
// // tell the app to parse HTTP body messages

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.

// pass the passport middleware
app.use(passport.initialize());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//load passport strategies
const localSignupStrategy = require('./passport/local_signup');
const localLoginStrategy = require('./passport/local_login');
passport.use('local_login', localLoginStrategy);
passport.use('local_signup', localSignupStrategy);

// // pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth_check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001 or http://127.0.0.1:3001');
});
