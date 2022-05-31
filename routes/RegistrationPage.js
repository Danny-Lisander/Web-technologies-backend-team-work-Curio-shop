const express = require("express");
const UserController  = require("../controllers/UserController");
const UserModel = require("../models/UserModel")
const router = express.Router();
const {secret} = require('../config/config')
const jwt = require("jsonwebtoken");


router.get('/', (req, res) => {
    const token = req.cookies.curio_access_token;   // This
    let id = 0;                                     // This
    let role = 0;                                   // This
    if (token) {                                    // This
        const data = jwt.verify(token, secret);     // This
        id = UserModel.find({ _id: data.id });// This
        name = id.name;                             // This
        role = data.roles;}

    res.render('RegistrationPage.ejs', {
        ID: id,
        Role: role,
    });

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