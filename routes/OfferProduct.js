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

    const token = req.cookies.curio_access_token;   // This
    let id = 0;                                     // This
    let role = 0;                                   // This
    if (token) {                                    // This
        const data = jwt.verify(token, secret);     // This
        id = await UserModel.find({ _id: data.id });// This
        role = data.roles;
    }

    let errors = [];

    // if (prodDescription === '' || prodName === ''|| prodPrice === '') {
    //     errors.push({msg: "Please fill in all fields!"})
    // }
    // if (errors.length > 0) {
    //     res.render('offerProduct', {
    //         errors,
    //         prodName,
    //         prodDescription,
    //         prodPrice,
    //         ID: id,
    //         Role : role,
    //     })
    // } else {
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
            } else {
                //console.log(id);
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
                    console.log(req.body.name);
                    const newProduct = new productModel({
                        image: {
                            data: req.file.filename,
                            contentType: 'image/png'
                        },
                        ownerID: id[0]._id,
                        productName: req.body.name,
                        description: req.body.description,
                        price: req.body.price,

                    })
                    newProduct
                        .save()
                        .then(() => console.log('image has been uploaded'))
                        .catch(err => console.log(err))
                }
            }
        })

    //}
})

module.exports = router;