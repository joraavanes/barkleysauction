const express = require('express');
const router = express.Router();
const multer = require('../middleware/productFileUpload');
const authenticate = require('../middleware/authenticate');
const {Product} = require('../models/Product');
// const items = require('./products.json');

const productsController = require('../controllers/productController');

// GET: /products/all/:timestamp/:quantity
router.get('/all/:timestamp/:quantity', productsController.getItems);

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

module.exports = router;