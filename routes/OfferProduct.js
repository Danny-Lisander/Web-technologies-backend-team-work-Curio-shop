const express = require("express");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/config");
const UserModel = require("../models/UserModel");
const multer = require("multer");
const productModel = require("../models/ProductModel");
const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.cookies.curio_access_token;   // This
    let id = 0;                                     // This
    let role = 0;                                   // This
    if (token) {                                    // This
        const data = jwt.verify(token, secret);     // This
        id = await UserModel.find({ _id: data.id });// This
        name = id.name;                             // This
        role = data.roles;
    }
    res.render("offerProduct", {
        ID: id,     //This
        Role: role, //This
    });
})


//storage image
const Storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req,file,cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: Storage,
}).single('testImage')

router.post('/', async(req, res) =>{
    const prodDescription = req.body.description;
    const prodName = req.body.name;
    const prodPrice = req.body.price;

    const token = req.cookies.curio_access_token;
    let id = 0;
    let role = 0;
    if (token) {
        const data = jwt.verify(token, secret);
        id = await UserModel.find({ _id: data.id });
        role = data.roles;
    }

    let errors = [];

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {

            if (prodDescription === '' || prodName === ''|| prodPrice === '') {
                errors.push({msg: "Please fill in all fields!"})
                res.render('offerProduct', {
                    errors,
                    prodName,
                    prodDescription,
                    prodPrice,
                    ID: id,
                    Role : role,
                })
            }
            if (typeof req.file == 'undefined') {
                errors.push({msg: "please upload an image"});
                res.render('offerProduct', {
                    errors,
                    prodName,
                    prodDescription,
                    prodPrice,
                    ID: id,
                    Role : role,
                })
            } else {
                const prodDescription = req.body.description;
                const prodName = req.body.name;
                const prodPrice = req.body.price;
                console.log(prodName);
                console.log(req.body.name);

                if (prodDescription === '' || prodName === ''|| prodPrice === '') {
                    errors.push({msg: "Please fill in all fields!"})
                    res.render('offerProduct', {
                        errors,
                        prodName,
                        prodDescription,
                        prodPrice,
                        ID: id,
                        Role : role,
                    })
                }
                const newProduct = new productModel({
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    },
                    ownerID: id[0]._id,
                    productName: prodName,
                    description: prodDescription,
                    price: prodPrice,

                })
                newProduct
                    .save()
                    .then(() => res.redirect('/'))
                    .catch(err => console.log(err))
            }
        }
    })
})

module.exports = router;