const express = require("express");
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
    res.render("adminPanelOptions/users",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["users","products","propositions"],
        usersAmount: 3, // it's all like the example, how it will work
        userName: ["Konysbay Nurkuisa","Dosmukhamedov Aizat","Alexandrov Daniil"],
        email: ["nurkuisa@email.com", "aizat@email.com", "daniil@email.com"],
        password: ["qwertyujiksnbjhvabksjnvmkl26+af2b+asf", "jiksnbjhvabksjnvmkl26+af2b+asfasasgasd", "aisfbvaskv54151asv5a4sasvads1v5adsfb"]
    })
})

router.get("/products", (req, res, next) => {
    res.render("adminPanelOptions/products",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["users","products","propositions"],
        productsAmount: 3,  // it's all like the example, how it will work
        productName: ["Product 1","Product 2","Product 3"],
        productPrice: ["100", "200", "300"],
        ownerId: ["1", "2", "3"]
    })
})

// Proposition - a person leaves a request for his product to be added to the list on the site.
router.get("/propositions", (req, res, next) => {
    res.render("adminPanelOptions/propositions",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["users","products","propositions"],
        propositionsAmount: 1,  // it's all like the example, how it will work
        productName: ["Product 1"],
        description: ["This is the 150 years old vase."],
        ownerId: ["1"]
    })
})

module.exports = router;