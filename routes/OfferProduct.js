const express = require("express");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/config");
const UserModel = require("../models/UserModel");
const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.cookies.curio_access_token;   // This
    let id = 0;                                     // This
    let role = 0;                                   // This
    if (token) {                                    // This
        const data = jwt.verify(token, secret);     // This
        id = await UserModel.find({ _id: data.id });// This
        name = id.name;                             // This
        role = data.roles;
    }
    res.render("offerProduct", {
        ID: id,     //This
        Role: role, //This
    });
})

module.exports = router;