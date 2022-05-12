const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get('/', (req, res) =>{
    ProductController.findAll(req, res)
})

module.exports = router;