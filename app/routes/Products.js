const express = require('express');
const router = express.Router();
const multer = require('../middleware/productFileUpload');
const authenticate = require('../middleware/authenticate');
const {Product} = require('../models/Product');
// const items = require('./products.json');

const productsController = require('../controllers/productController');

// GET: /products
router.get('/all/:skip/:quantity', productsController.getItems);

// GET: /products/:title
router.get('/:title', productsController.searchItem);

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