const ProductModel = require('../models/ProductModel');
const UserModel = require("../models/UserModel");
const CC = require("currency-converter-lt");
const {response} = require("express");

// Create and Save a new user
exports.create = async (req, res) => {

};

//for MainPage
exports.findAll = async (reg, res) =>{
    let cur = 1;
    try {
        const product = await ProductModel.find({ approved: true });
        // return product; <-- this
        res.status(200).render('ProductPage', {
            prod: product,
            CUR: cur,
            CURRENCY: 'KZT'

        });
    } catch(error) {
        res.status(404).render('ProductPage', { prod: error.message });

    }
};


exports.findAllCUR = async (req, res) =>{
    const _CUR = req.params.CUR;
    let cur;
    if (_CUR !== "KZT"){
    let fromCurrency = "KZT";
    let toCurrency = _CUR;
    let amountToConvert = 1;
    let currencyConverter = new CC(
        {
            from: fromCurrency,
            to: toCurrency,
            amount: amountToConvert
        }
    );
    cur = await currencyConverter.convert()
        .then(
            // (response)
    //         =>{
    //     console.log(amountToConvert + " " + fromCurrency + " is equal to " +
    //         response + " " + toCurrency);
    //     cur = response
    //
    // }
    );
    }
    else{ cur = 1}


    try {
        const product = await ProductModel.find({ approved: true });
        // console.log(cur)
        // return product; <-- this
        res.status(200).render('ProductPage', {
            prod: product,
            CUR: cur,
            CURRENCY: _CUR

        });
    } catch(error) {
        res.status(404).render('ProductPage', { prod: error.message });

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

// Find Product with name
exports.findOneByName = async (req, res) => {
    try {
        const product = await ProductModel.find({
            productName: {$regex: req.query.q, $options: "i"},
            approved: true
        });

        res.status(200).render('ProductSearch', {
            infos: product
        });

        // res.status(200).send(product);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};


// Find a single Product with an id
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