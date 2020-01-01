const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const {ObjectID} = require('mongodb');
const {Product} = require('../models/Product');

router.get('/', (req, res) => {
    Product.find()
        .then(products => res.send(products))
        .catch(e => res.send({}));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.send({error: 'Something went wrong'});
    }

    Product.findById(id)
        .then(product => res.send(product))
        .catch(() => res.send({ error: 'the product you are looking for is not found'}));
});

router.post('/', (req, res) => {
    const {name, startingBid, description} = req.body;
    let product = new Product({ uuid: uuid(), name, startingBid, description });

    product.save()
        .then((doc) => res.send(doc))
        .catch(err => res.send(err));
    
});

module.exports = router;