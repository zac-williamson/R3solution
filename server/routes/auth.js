const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

const User = require('mongoose').model('User');

function validateSignupForm(payload) {
    console.log("validating signup");
    const errors = {};
    let isFormValid = true;
    let message = '';

    console.log('payload = ' + JSON.stringify(payload));
    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.name != 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

//Validate the login form
function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/users', function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        let modified = false;
        
        console.log('USER = ' + JSON.stringify(user));
        if (req.body.contractTransactionHash) {
            let hash = { hash : req.body.contractTransactionHash };
            user.transactionHashes.push(hash);
            modified = true;
        }
        if (req.body.contractAddress) {
            let contract = { address : req.body.contractAddress };
            user.contracts.push(contract);
            modified = true;
        }
        if (req.body.address) {
            console.log("changing user address");
            user.address = req.body.address;
            modified = true;
        }
        if (req.body.info) {
            console.log("changing user info");
            user.info = req.body.info;
            modified = true;
        }
        if (modified) {

            user.save(function (err) {
                if (err) {
                    console.log('user error! ' + err);
                }
                if (err) return next(err);
                res.status(200).end();
            });
        } else {
            res.status(200).end();
        }
    })
});

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local_signup', (err) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    console.log("calling login");

    const validationResult = validateLoginForm(req.body);
    console.log("email = " + req.body.email);
    console.log("validation result = " + validationResult.success);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }


    return passport.authenticate('local_login', (err, token, userData) => {
        console.log("err =- " + err);
        console.log("authing local login");
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);
});

module.exports = router;
