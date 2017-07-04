'use strict';
//import dependency
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.

var UserSchema = new Schema({
    email: String,
    transactionHashes: [{hash : String }],
    contracts: [{address : String}],
    address: String,
    username: String,
    info: String,
    password: String, //not actual password, stores a hash
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    console.log("comparing passwords");
    bcrypt.compare(password, this.password, callback);
}

//pre-save hook method to hash password
UserSchema.pre('save', function saveHook(next) {
    console.log("save pre hook called");
    const user = this;
    if (!user.isModified('password')) return next();
    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            user.password = hash;
            return next();
        });
    });
});

//export our module to use in server.js
module.exports = mongoose.model('User', UserSchema);