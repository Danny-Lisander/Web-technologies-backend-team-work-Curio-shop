const express = require("express");
const ProductController = require("../controllers/ProductController");
const CC = require("currency-converter-lt");
const ProductModel = require("../models/ProductModel");
const {response} = require("express");
const router = express.Router();
router.get('/', (req, res) =>{
    ProductController.findAll(req, res);
})

router.get("/:CUR", (req, res) => {
    ProductController.findAllCUR(req, res);
})

router.get("/product/:id", (req,res) => {
    ProductController.findOne(req, res);
})

module.exports = router;