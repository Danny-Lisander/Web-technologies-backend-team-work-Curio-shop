const express = require("express");
const UserController  = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController")
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("AdminPanel",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["adminPanel/users","adminPanel/products","adminPanel/propositions"]
    })
})

router.get("/users", (req, res, next) => {
    UserController.findAll(req, res);
})

router.get("/products", (req, res, next) => {
    ProductController.findall(req, res);

})

// Proposition - a person leaves a request for his product to be added to the list on the site.
router.get("/propositions", (req, res, next) => {
    ProductController.findProposition(req, res);
})

module.exports = router;