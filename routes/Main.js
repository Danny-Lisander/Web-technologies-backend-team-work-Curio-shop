const express = require("express");
const ProductController = require("../controllers/ProductController");
const CC = require("currency-converter-lt");
const ProductModel = require("../models/ProductModel");
const {response} = require("express");
const router = express.Router();

router.get('/', ProductController.findAll);

router.get("/convert/:CUR", ProductController.findAllCUR);

router.get("/product/:id", ProductController.findOne);

router.get("/product/delete/:id", ProductController.destroyFromUserSide);

router.get("/product/approved/:id", ProductController.approveProduct);

router.get("/wishlist/:id", ProductController.addToWishlist);

module.exports = router;