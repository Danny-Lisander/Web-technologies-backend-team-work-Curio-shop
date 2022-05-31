const express = require("express");
const UserController  = require("../controllers/UserController");
const Role = require("../models/Role")
const UserModel = require("../models/UserModel")
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authMiddleware = require("../middlewaree/authMiddleware")


router.get('/', authMiddleware, (req, res) => {
    res.render('SignInPage.ejs',{
        ID: 0,
        Role: 0,
    })
})

router.post('/',  (req, res)=>{
    UserController.signIN(req, res)
})





module.exports = router;