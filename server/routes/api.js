const express = require('express');
const Web3 = require('web3');

const router = new express.Router();
var User = require('../models/user');
var Contract = require('../models/contract');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
router.get('/dealLoad', function (req, res) {
    console.log("aaaaaaa");
    res.status(200).json({
        isValid: true
    });
});

function validateContract(payload) {
    console.log("validating contract");
    const errors = {};
    let isContractValid = true;
    let message = '';

    return {
        success: isContractValid,
        message,
        errors
    };
}

router.get('/users/:email', function (req, res) {
    console.log("finding user " + req.params.email);
    User.find({ email : req.params.email }, function(err, user) {
        if (err) {
            res.send(err);
        };
        res.json(user);
    });
});

router.get('/users', function (req, res) {
    //looks at our Comment Schema
    console.log("getting users");
    User.find(function (err, user) {
        console.log("PATH = " + req.url);
        var imagePath = req.url;
        var url = 'http://localhost:3001/api/' + imagePath;
        if (err) {
            res.send(err);
        }
        //responds with a json object of our database comments.
        res.json(user);
    });
});

router.get('/contracts/:transactionHash', function (req, res) {
    console.log("finding transaction hash " + req.params.transactionHash);
    Contract.find({ transactionHash : req.params.transactionHash }, function(err, contract) {
        if (err) {
            res.send(err);
        };
        res.json(contract)
    })
});

router.get('/contracts', (req, res) => {
    return new Promise((resolve, reject) => {
        Contract.find((err, contracts) => {

            if(err) {
                res.send(err);
            }
            console.log('found contracts' + contracts);
            res.json(contracts);
        });
    });
});

router.post('/contracts', (req, res, next) => {
    console.log('req.body = ' + JSON.stringify(req.body));
    const newContract = new Contract(req.body);
    console.log('new contract = ' + JSON.stringify(newContract));
    newContract.save((err) => {
        if (err) { return next(err); }
        return res.status(200).json({
            success: true,
            message: "meep",
            errors: "errorMeep"
        });
        //return next(null);
    })
});


module.exports = router;