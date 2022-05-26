const express = require("express");
const UserController  = require("../controllers/UserController");
const Role = require("../models/Role")
const UserModel = require("../models/UserModel")
const router = express.Router();
const {secret} = require('../config/config')
const ProductController = require("../controllers/ProductController");
const authMiddleware = require("../middlewaree/authMiddleware")
const jwt = require("jsonwebtoken");

authorization = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    const token = req.cookies.curio_access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, secret);
        req.userId = data.id;
        req.userRole = data.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

router.get('/', authMiddleware, (req, res) => {
    res.render('SignInPage.ejs')
})

router.post('/',  (req, res)=>{
    UserController.signIN(req, res)
})





module.exports = router;