//model/user_info.js
'use strict';
//import dependency
const mongoose = require('mongoose');

module.exports.connect = (uri) => {
    console.log("uri = " + uri);
    mongoose.connect(uri);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error: ${err}');
        process.exit(1);
    });

    // Load models
    require('./user');
};