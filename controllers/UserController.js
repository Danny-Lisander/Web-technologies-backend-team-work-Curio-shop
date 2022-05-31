const UserModel = require('../models/UserModel');
const Role = require('../models/Role');
const {validationResult, check} = require("express-validator");
const bcrypt = require("bcryptjs");
const {secret} = require('../config/config')
const jwt = require("jsonwebtoken");

// Create and Save a new user
exports.create = async (req, res) => {
    const errors = validationResult(req)

    const userRole = await Role.findOne({value: "User"})
    const user = new UserModel({
        name: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        roles: [userRole.value]
    });

    // Hash password and save user
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) throw err;
            // Set password to hashed
            user.password = hash;

            user.save().then(data => {
                res.redirect('/signInPage');
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating user"
                });
            });
    }))
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).render('adminPanelOptions/users', {
            n: 3,
            page: ["Users", "Products", "Proposition"],
            classes: ["fa-users", "fa-cart-shopping", "fa-file"],
            link: ["users","products","propositions"],
            mydata: user
        });
    } catch(error) {
        res.status(404).render('adminPanelOptions/users', { mydata: error.message });
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.getUsers = async (req, res) =>{
    try{

    } catch (error){
        res.status(400).json({ message: error.message});
    }
}

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({
                message: "User deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};




const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    const token =  jwt.sign(payload, secret, { expiresIn: "1h"})
    return res.cookie("curio_access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
}

exports.signIN = async (req, res) => {
    try{
        let errors = [];
        const email = req.body.email;
        const password = req.body.password;
        await UserModel.findOne({email: email})
            .then(data => {
                if(!data) {
                    errors.push({msg: "This email is registered!"})
                    res.render("SignInPage", {
                        ID: 0,
                        Role: 0,
                        errors
                    })
                } else {
                    const validPassword = bcrypt.compareSync(password, data.password)
                    if(!validPassword){
                        errors.push({msg: "Password is not correct!"})
                        res.render("SignInPage", {
                            ID: 0,
                            Role: 0,
                            errors
                        })
                    }
                    else{
                        // const token = generateAccessToken(data._id, data.roles)
                        let id = data._id
                        let roles = data.roles
                        const payload = {
                            id,
                            roles
                        }

                        const token =  jwt.sign(payload, secret, { expiresIn: "1h"})
                        res.cookie("curio_access_token", token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                        })

                        res.redirect('/');
                    }
                }
            })
            .catch(err => console.log(err));
    } catch (error){
        res.status(500).send( {message: error.message} )
    }
};

exports.logOUT = async (req, res) => {
    return res
        .clearCookie("curio_access_token")
        .status(200)
        .redirect('/signInPage')
}

exports.verification = async (req, res) => {
    const token = req.cookies.curio_access_token;
    let id = 0;
    if (token) {
        const data = jwt.verify(token, secret);
        id = await UserModel.find({ _id: data.id });
        name = id.name;
    }
    return id
}