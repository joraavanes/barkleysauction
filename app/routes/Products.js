const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const {ObjectID} = require('mongodb');
const {Product} = require('../models/Product');
const items = require('./products.json');

router.get('/', (req,res) =>{
    res.send(items);
});

// router.get('/', (req, res) => {
//     Product.find()
//         .then(products => res.send(products))
//         .catch(e => res.send({}));
// });

router.get('/:text', (req,res) => {
    const text = req.params.text;
    const model = items.filter(x=> x.name.includes(text));
    res.send(model);
});

router.get('/:name/:id', (req,res)=>{
    const id = req.params.id;
    const model = items.filter(item=> item.id === id);
    res.send(model);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.send({error: 'Something went wrong'});
    }

    Product.findById(id)
        .then(product => res.send(product))
        .catch(() => res.send({ error: 'the product you are looking for is not found'}));
});1

router.post('/', (req, res) => {
    const {title, startingBid, description, imageUrl, thumbnail} = req.body;
    let product = new Product({ uuid: uuid(), title, startingBid, description, imageUrl, thumbnail });

    product.save()
        .then((doc) => res.send(doc))
        .catch(err => res.status(400).send({errors: err.errors}));
});

module.exports = router;