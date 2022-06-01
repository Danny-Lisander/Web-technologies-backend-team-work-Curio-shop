const express = require("express");
const UserController  = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController")
const jwt = require("jsonwebtoken");
const {secret} = require("../config/config");
const UserModel = require("../models/UserModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
    const token = req.cookies.curio_access_token;
    let id = 0;
    let role = 0;
    if (token) {
        await jwt.verify(token, secret, async (err,data) => {
            if (err) {
                UserController.logOUT(req,res);
            }
            else {
                id = await UserModel.find({_id: data.id});
                name = id.name;
                role = data.roles;
            }
        });
    }
    res.render("AdminPanel",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["/adminPanel/users","/adminPanel/products","/adminPanel/propositions"],
        ID: id,
        Role: role
    })
})

router.get("/users", UserController.findAll);

router.get("/products",  ProductController.findall);

// Proposition - a person leaves a request for his product to be added to the list on the site.
router.get("/propositions", ProductController.findPropositions);

router.get('/propositions/delete/:id', ProductController.destroyFromPropositionSide);

module.exports = router;