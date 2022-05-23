const express = require("express");
const UserController  = require("../controllers/UserController");
const Role = require("../models/Role")
const UserModel = require("../models/UserModel")
const router = express.Router();
const {secret} = require('../config/config')
const ProductController = require("../controllers/ProductController");


router.get('/', (req, res) => {

    res.render('SignInPage.ejs')
})

router.post('/', (req, res)=>{
    UserController.signIN(req, res)
    ProductController.findAll(req, res);
})





module.exports = router;