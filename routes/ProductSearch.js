const express = require("express");
const https = require("https");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const logMiddleware = require("../middlewaree/logMiddleware");

router.get('/', logMiddleware, ProductController.findOneByName);


module.exports = router;