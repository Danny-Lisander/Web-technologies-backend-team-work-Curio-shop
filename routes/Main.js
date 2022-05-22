const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get('/', (req, res) =>{
    ProductController.findAll(req, res);
})

router.get("/product/:id", (req,res) => {
    ProductController.findOne(req, res);
})

module.exports = router;