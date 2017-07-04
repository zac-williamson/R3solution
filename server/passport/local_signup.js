const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;


//return passport local strategy object
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {
    console.log('hello????');
    console.log('username = ' + username);
    console.log('password = ' + password);
    console.log('req.body = ' + (req.body.name));
    const userData = {
        email: username.trim(),
        password: password.trim(),
        username: req.body.name.trim(),
    };
    console.log("making new user");
    console.log("email = " + userData.email);
    console.log("username = " + userData.username);
    const newUser = new User(userData);
    newUser.email = userData.email;
    newUser.save((err) => {
        if (err) { return done(err); }
        return done(null);
    })
})