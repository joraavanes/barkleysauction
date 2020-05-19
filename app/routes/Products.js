const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {Product} = require('../models/Product');
const multer = require('../middleware/productFileUpload');
const authenticate = require('../middleware/authenticate');
const { removeFile } = require('../util/fileHelper');
// const items = require('./products.json');

const productsController = require('../controllers/productController');

// GET: /products
router.get('/', productsController.getItems);

// GET: /products/:title/:uuid
router.get('/:title/:uuid', productsController.getItem);

// POST: /products
router.post('/', authenticate, multer.single('imageUrl'), productsController.postItem);

// PUT: /products/alter
router.put('/alter', authenticate, multer.single('imageUrl'), productsController.putItem);

// DELETE: /products/:_id
router.delete('/remove/:_id', authenticate, productsController.deleteItem);

// router.get('/', (req, res) => {
//     Product.find()
//         .then(products => res.send(products))
//         .catch(e => res.send({}));
// });

// router.get('/:title', (req,res) => {
//     const title = req.params.title;
//     // const model = items.filter(x=> x.title.includes(text));
//     Product.find({"title": { "$regex": title, "$options": "i"}}, (err, items)=>{

//         res.send(items);
//     });
// });

// router.get('/:id', (req, res) => {
//     const id = req.params.id;

//     if(!ObjectID.isValid(id)){
//         res.send({error: 'Something went wrong'});
//     }

//     Product.findById(id)
//         .then(product => res.send(product))
//         .catch(() => res.send({ error: 'the product you are looking for is not found'}));
// });

module.exports = router;