const express = require("express");
const UserController  = require("../controllers/UserController");
const UserModel = require("../models/UserModel")
const router = express.Router();
const {check} = require("express-validator")
const {validationResult} = require('express-validator')


router.get('/', (req, res) => {
    res.render('RegistrationPage.ejs');
})

router.post('/', (req, res) => {
    const username = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    let errors = [];

    //
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        errors.push({msg: "Please fill in all fields!"});
    }
    else {
        if (password !== confirmPassword) {
            errors.push({msg: "Password do not match!"});
        }

        if (password.length < 8) {
            errors.push({msg: "Password length must be more than 8 characters!"});
        }
    }
    if(errors.length > 0){
        res.render('RegistrationPage', {
            errors,
            username,
            email,
            password,
            confirmPassword,
        });
    } else {
        // Check if email already registered
        UserModel.findOne({ email: email })
            .then(user => {
                // if there is a user
                if(user) {
                    // Email already registered
                    errors.push({msg: "Email is already registered"})
                    res.render('RegistrationPage', {
                        errors,
                        username,
                        email,
                        password,
                        confirmPassword,
                    });
                }
                // if there is no user with such email
                else {
                    UserController.create(req, res);
                }
            });
    }
})

module.exports = router;