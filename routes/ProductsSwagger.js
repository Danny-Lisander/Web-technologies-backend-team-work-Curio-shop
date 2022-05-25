const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              - productName
 *              - price
 *              - currency
 *              - ownerID
 *              - description
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the product
 *              productName:
 *                  type: string
 *                  description: The product title
 *              price:
 *                  type: number
 *                  description: The product price
 *              currency:
 *                  type: string
 *                  description: currency
 *              ownerID:
 *                  type: string
 *                  description: The product owner
 *              description:
 *                  type: string
 *                  description: The product description
 *              date:
 *                  type: date
 *                  description: Date when product was uploaded
 *              approved:
 *                  type: boolean
 *                  description: Product is approved
 *              imgSrc:
 *                  type: string
 *                  description: Product image
 *          example:
 *              productName: Sony Playstation PS One
 *              price: 42500
 *              currency: KZT
 *              ownerID: 7897fb467a396440b775124
 *              description: Sony PSOne (PS1) Console SCPH-101 /94015
 *              date: 2022.05.11
 *              approved: true
 *              imgSrc: https://m.media-amazon.com/images/I/416GAQ5G26L._SX425_.jpg
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: The products managing API
 */

/**
 * @swagger
 * /productsSwagger:
 *  get:
 *      summary: Returns the list of all the products'
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: The list of the books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *
 */

router.get("/", async (req,res) => {
    try {
        const products = await ProductModel.find({ approved: true });
        res.json(products);
    }
    catch(err) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * @swagger
 * /productsSwagger/{id}:
 *  get:
 *      summary: Get the product by id
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The product id
 *      responses:
 *          200:
 *              description: The product description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: The product is not found
 */


router.get("/:id", async (req,res) =>{
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json(product);
    }
    catch(err) {
        res.sendStatus(404)
    }
})

/**
 * @swagger
 * /productsSwagger:
 *  post:
 *      summary: Create a new product
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: The product was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          500:
 *              description: Some server error
 */

router.post("/", async (req,res) => {
    const product = new ProductModel ({
        productName: req.body.productName,
        price: req.body.price,
        currency: req.body.currency,
        ownerID: req.body.ownerID,
        description: req.body.description,
        approved: req.body.approved,
        imgSrc: req.body.imgSrc
    });

    try {
        const newProduct = await product.save()
        res.status(200).json(newProduct)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

/**
 * @swagger
 * /productsSwagger/{id}:
 *  put:
 *      summary: Update the product by the id
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The product id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: The product was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: The product was not found
 *          500:
 *              description: Some error happened
 */

router.put("/:id", async (req,res) => {
    try {
        await ProductModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then(async data => {
            if (!data) {
                res.sendStatus(404)
            } else {
                const product = await ProductModel.findById(req.params.id);
                res.status(200).json(product);
            }
        });
    }
    catch (err) {
        res.status(500);
    }
})

/**
 * @swagger
 *  /productsSwagger/{id}:
 *      delete:
 *          summary: Remove the product by id
 *          tags: [Products]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The product id
 *          responses:
 *              200:
 *                  description: The product was deleted
 *              404:
 *                  description: THe product was not found
 */

router.delete("/:id", (req,res) => {
    ProductModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    }).catch(err => {
        res.status(500);
    });
})


module.exports = router;