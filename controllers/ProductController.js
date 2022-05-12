const ProductModel = require('../models/ProductModel');
const UserModel = require("../models/UserModel");

// Create and Save a new user
exports.create = async (req, res) => {

};

exports.findAll = async (reg, res) =>{
    try {
        const product = await ProductModel.find();
        res.status(200).render('ProductPage', {
            prod: product
        });
    } catch(error) {
        res.status(404).render('adminPanelOptions/users', { mydata: error.message });
    }


};