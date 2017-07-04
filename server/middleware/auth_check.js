const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');

//The Auth Checker middleware function
module.exports = (req, res, next) => {
    // console.log(req.headers);
    // if (!req.headers.authorization) {
    //     return res.status(401).end();
    // }

    // //get last part from auth header string like 'bearer token-value'
    // const token = req.headers.authorization.split(' ')[1];

    //decode the token using a secret key-phrase
    //return jwt.verify(token, config.jwtSecret, (err, deccoded) => {
        //if (err) { return res.status(401).end(); }

        // const userId = decoded.sub;

        // //check if user exists
        // return User.findById(userId, (userErr, user) => {
        //     if (userErr || !user) {
        //         return res.status(401).end();
        //     }

            return next();
      //  })
   // })
}