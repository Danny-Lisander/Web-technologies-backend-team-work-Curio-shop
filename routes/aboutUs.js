const express = require("express");
const router = express.Router();
const UserModel = require('../models/UserModel');
const UserController  = require("../controllers/UserController");
const logMiddleware = require("../middlewaree/logMiddleware")
router.get('/', logMiddleware, (req, res) =>{

    res.render("aboutUs.ejs", {
        ID: req.userId,
        Role: req.userRole
    });
})


module.exports = router;