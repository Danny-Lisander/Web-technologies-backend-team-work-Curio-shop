const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get('/', (req, res) =>{
    ProductController.findAll(req, res);
})

router.get("/product/:id", (req,res) => {
    // const pId = Number(req.params.id);
    // res.render("Product", {
    //     id: pId,
    //     ProdNum: 3, // when we'll add DB, we'll can change this
    //     price: [5, 3, 7], // the same, like ProdNum
    //     currency:'USD',
    //     descriptions: ["Some awesome description.", "Very nice description", "Facinating description"],
    // })
    ProductController.findOne(req, res);
})

module.exports = router;