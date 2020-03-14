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

router.get('/', (req,res) =>{
    Product.find({},null, { sort: {dateIssued: -1} }, (err, items) => {
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

router.post('/', authenticate, multer.single('imageUrl'), (req, res) => {
    const file = req.file;

    let imageUrl = undefined;
    if(!file){
        return res.status(400).send({errors: { imageUrl: {message: 'The product file must be an image'}}});
    }else{
        imageUrl = `/media/${file.filename}`;
    }

    const {title, startingBid, description, thumbnail} = req.body;
    let product = new Product({ uuid: v4(), title, startingBid, description, imageUrl, thumbnail });

    product.save()
        .then((doc) => res.sendStatus(201))
        .catch(err => {
            removeFile(imageUrl, (error, result)=>{

                res.status(400).send({errors: err.errors});
            });
        });
});

router.put('/alter', authenticate, multer.single('imageUrl'), (req, res, next) => {
    const body = _.pick(req.body, ['_id', 'title', 'startingBid', 'description', 'imageUrl', 'thumbnail'])
    if(!ObjectID.isValid(body._id)){
        return res.send('Id is not valid');
    }

    if(req.file){
        body.imageUrl = `/media/${req.file.filename}`;
    }

    Product.findOneAndUpdate({_id:body._id},{ $set: body}, {new: false},(err, item) => {
        if(err){
            return res.status(400).send('update failed');
        }

        if(req.file){
            removeFile(item.imageUrl, (err, result) =>{
                res.sendStatus(200);            
            });
        }else{
            res.sendStatus(200);
        }
    });
});

router.delete('/remove/:_id', authenticate, (req, res, next) => {
    const {_id} = req.params;
    if(!ObjectID.isValid(_id)){
        return res.status(400).send('Invalid object id');
    }

    Product.findOneAndDelete({_id}, (err, doc) => {
        if(err){
            return res.status(400).send('Failed to remove');
        }

        removeFile(doc.imageUrl, (err) => {
            res.status(202).send('Item removed');
        });
    }); 
});

module.exports = router;