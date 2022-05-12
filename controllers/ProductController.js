const ProductModel = require('../models/ProductModel');
const UserModel = require("../models/UserModel");

// Create and Save a new user
exports.create = async (req, res) => {

};
//for MainPage
exports.findAll = async (reg, res) =>{
    try {
        const product = await ProductModel.find({ approved: true });
        // return product;
        res.status(200).render('ProductPage', {
            prod: product
        });
    } catch(error) {
        res.status(404).render('adminPanelOptions/products', { prod: error.message });

    }
};
//for AdminPanel
exports.findall = async (reg, res) =>{
    try {
        const prod = await ProductModel.find({ approved: true });
        res.status(200).render('adminPanelOptions/products', {
            n: 3,
            page: ["Users", "Products", "Proposition"],
            classes: ["fa-users", "fa-cart-shopping", "fa-file"],
            link: ["users","products","propositions"],
            mydata: prod
        });
    } catch(error) {
        res.status(404).render('adminPanelOptions/products', { mydata: error.message });
    }
};

exports.findProposition = async (reg, res) =>{
    try {
        const prod = await ProductModel.find({ approved: false });
        res.status(200).render('adminPanelOptions/propositions', {
            n: 3,
            page: ["Users", "Products", "Proposition"],
            classes: ["fa-users", "fa-cart-shopping", "fa-file"],
            link: ["users","products","propositions"],
            mydata: prod
        });
    } catch(error) {
        res.status(404).render('adminPanelOptions/products', { mydata: error.message });
    }
};


// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).render('Product', {
            prod: product
        });
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};