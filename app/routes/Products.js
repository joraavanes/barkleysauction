const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {Product} = require('../models/Product');
// const items = require('./products.json');

router.get('/', (req,res) =>{
    Product.find((err, items) => {
        if(!err){
            res.send(items);
        }
    });
});

// router.get('/', (req, res) => {
//     Product.find()
//         .then(products => res.send(products))
//         .catch(e => res.send({}));
// });

router.get('/:title', (req,res) => {
    const title = req.params.title;
    // const model = items.filter(x=> x.title.includes(text));
    Product.find({"title": { "$regex": title, "$options": "i"}}, (err, items)=>{

        res.send(items);
    });
});

router.get('/:title/:uuid', (req,res)=>{
    const {uuid,title} = req.params;
    Product.findOne({uuid,title}, (err, item) => {
        if(!item){
            return res.status(404).send({err: 'The product was not found'});
        }

        res.send(item);
    });
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

router.put('/alter', (req, res, next) => {
    const body = _.pick(req.body, ['_id', 'title', 'startingBid', 'description', 'imageUrl', 'thumbnail'])
    console.log(body);
    if(!ObjectID.isValid(body._id)){
        return res.send('Id is not valid');
    }

    Product.findOneAndUpdate({_id:body._id},{ $set: body}, {new: true},(err, item) => {
        console.log('error: ', err);
        console.log('item: ', item);

        if(item){
            res.send('update done');
        }else{
            res.send('Update failed');
        }
    });
});

module.exports = router;