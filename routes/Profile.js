const express = require("express");
const router = express.Router();
const logMiddleware = require("../middlewaree/logMiddleware")
const jwt = require("jsonwebtoken");
const {secret} = require("../config/config");
const UserController = require("../controllers/UserController");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");

router.get('/', async (req,res) => {
});

router.get('/edit',  UserController.findOne);

router.put('/edit',  UserController.update);

module.exports = router;