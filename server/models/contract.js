//model/user_info.js
'use strict';
//import dependency
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.

var ContractSchema = new Schema({
    contractAddress: String,
    transactionHash: String,
    creator: String,
    participants: [String],
    creatorName: String,
    title: String,
    description: String
});

//export our module to use in server.js
module.exports = mongoose.model('Contract', ContractSchema);