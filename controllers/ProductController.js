const ProductModel = require('../models/ProductModel');
const UserModel = require("../models/UserModel");
const UserController = require("./UserController")
const CC = require("currency-converter-lt");
const {response} = require("express");
const {secret} = require('../config/config')// This
const jwt = require("jsonwebtoken");        // This

//for MainPage
exports.findAll = async (req, res) =>{
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
    console.log(id + ' ' + role)
    let cur = 1;
    try {
        const product = await ProductModel.find({ approved: "true" });
        // return product;
        res.status(200).render('ProductPage', {
            prod: product,
            CUR: cur,
            CURRENCY: 'KZT',
            ID: id,     //This
            Role: role, //This
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
        const product = await ProductModel.find({ approved: "true" });
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
exports.findall = async (req, res) => {
    try {

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

        const prod = await ProductModel.aggregate([
            { $match: { approved: "true" } },
            { $lookup: {
                    from: "users",
                    localField: "ownerID",
                    foreignField: "_id",
                    as: "ownerInfo",
                }
            }
        ]);

        res.status(200).render('adminPanelOptions/products', {
            n: 3,
            page: ["Users", "Products", "Proposition"],
            classes: ["fa-users", "fa-cart-shopping", "fa-file"],
            link: ["users","products","propositions"],
            mydata: prod,
            ID: id,
            Role: role
        });
    } catch(error) {
        res.status(404).render('adminPanelOptions/products', { mydata: error.message });
    }
};

exports.findPropositions = async (req, res) =>{
    try {
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

        const prod = await ProductModel.aggregate([
            { $match: { approved: "false" } },
            { $lookup: {
                    from: "users",
                    localField: "ownerID",
                    foreignField: "_id",
                    as: "ownerInfo"
                }
            }
        ]);
        console.log(prod);
        res.status(200).render('adminPanelOptions/propositions', {
            n: 3,
            page: ["Users", "Products", "Proposition"],
            classes: ["fa-users", "fa-cart-shopping", "fa-file"],
            link: ["users","products","propositions"],
            mydata: prod,
            ID: id,
            Role: role
        });
    } catch(error) {
        res.status(404).render('adminPanelOptions/propositions', {mydata: error.message});
    }
};

// Find Product with name
exports.findOneByName = async (req, res) => {
    try {
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

        const product = await ProductModel.find({
            productName: {$regex: req.query.q, $options: "i"},
            approved: "true"
        });

        res.status(200).render('ProductSearch', {
            infos: product,
            ID: id,
            Role: role
        });

        // res.status(200).send(product);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};


// Find a single Product with an id
exports.findOne = async (req, res) => {
    try {
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

        const product = await ProductModel.findById(req.params.id);
        res.status(200).render('Product', {
            prod: product,
            ID: id,
            Role: role
        });
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.destroyFromPropositionSide = async (req, res) => {
    await ProductModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).render('adminPanelOptions/propositions', {
                error: 'Product not found.'
            });
        } else {
            res.redirect('/adminPanel/propositions');
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.destroyFromUserSide = async (req, res) => {
    await ProductModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).render('adminPanelOptions/propositions', {
                error: 'Product not found.'
            });
        } else {
            res.redirect('/adminPanel/propositions');
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.destroyFromProductsSide = async (req, res) => {
    await ProductModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).render('adminPanelOptions/products', {
                error: 'Product not found.'
            });
        } else {
            res.redirect('/adminPanel/products');
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.addToWishlist = async (req, res) => {
    try {
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

        const product = await ProductModel.findById(req.params.id);
        res.status(200).render('Product', {
            prod: product,
            ID: id,
            Role: role
        });
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.approveProduct = async (req, res) => {
    const token = req.cookies.curio_access_token;
    let id = 0;
    let role = 0;
    if (token) {
        await jwt.verify(token, secret, async (err,data) => {
            if (err) {
                UserController.logOUT(req,res);
            }
            else {
                id = await UserModel.findById(data.id);
            }
        });
    }
    console.log(id);
    if(!req.body) {
        res.status(400).send({
            err: "Data to update can not be empty!"
        });
    }

    await ProductModel.findByIdAndUpdate(req.params.id, {approved: "true"})
        .then(async data => {
            if (!data) {
                const productInfo = await ProductModel.findById(req.params.id);
                res.render('propositions', {
                    error: "Product not found",
                    mydata: productInfo,
                    ID: id,
                    Role: role
                })
            } else {
                res.redirect("/adminPanel/products")
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
};

