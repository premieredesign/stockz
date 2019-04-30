const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// Load Validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// Load User Model
const User = require('../../models/User');


/*
    @Route GET api/users/test
    @desc Tests users route
    @access Public
 */

router.get('/test', (req, res) => res.json({msg: 'Users works'}));



/*
    @Route POST api/users/register
    @desc Register a user
    @access Public
 */

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
        console.log('isValid', isValid);
        return res.status(400).json(errors);
    }

    // Check if email already exist, otherwise create
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                errors.email = 'Email already exist';
                return res.status(400).json(errors);
            } else {
                // Create new User
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password
                });
                // Encrypt Password and Return User
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw  err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => res.json(user))
                            .catch((e) => console.log('error', e))
                    })
                })
            }
        })
});



/*
    @Route POST api/users/login
    @desc Login a user
    @access Public
 */
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    // Check Validation
    if (!isValid) {
        console.log('isValid', isValid);
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;


    User.findOne({email})
        .then((user) => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secret,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        errors.password = 'Password in incorrect';
                        return res.status(400).json(errors)
                    }
                })
        })
});



/*
    @Route GET api/users/current
    @desc Return current user
    @access Private
 */
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        date: req.user.date,
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
});








module.exports = router;
