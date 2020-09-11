const express = require('express');
const { v4 } = require('uuid');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {Product} = require('../models/Product');
const multer = require('../middleware/productFileUpload');
const authenticate = require('../middleware/authenticate');
const { removeFile } = require('../util/fileHelper');

// GET: /products
exports.getItems = (req,res) =>{
    const {skip, quantity} = req.params;

    Product.find()
        .sort({dateIssued: -1})
        .skip(parseInt(skip))
        .limit(parseInt(quantity))
        .then(products => {
            res.send(products);
        })
        .catch(err => {
            res.sendStatus(400);
        });
};

// GET: /products/:title
exports.searchItem = (req,res) => {
    const title = req.params.title;
    // const model = items.filter(x=> x.title.includes(text));
    Product.find({"title": { "$regex": title, "$options": "i"}}, (err, items)=>{

        res.send(items);
    });
};

// GET: /products/:title/:uuid
exports.getItem = (req,res)=>{
    const {uuid,title} = req.params;

    Product.findOne({uuid,title})
        .then(item => {
            // if(!item){
            //     return res.status(404).send({err: 'The product was not found'});
            // }

            // Remove _id from comments then sends to user
            if(item.comments.length > 0)
                item.comments = _.map(item.comments, comment => _.pick(comment, ['uuid', 'email', 'userName', 'comment', 'dateIssued']))
                                .sort((a, b) => b.dateIssued - a.dateIssued);

            // if(item.comments.length > 0)
            //     item.comments = item.comments.sort((a, b) => b.dateIssued - a.dateIssued);

            res.send(item);
        })
        .catch(err => res.status(404).send({err: 'The product was not found'}));
};

// POST: /products
exports.postItem = (req, res) => {
    const file = req.file;

    let imageUrl = undefined;
    if(!file){
        return res.status(400).send({errors: { imageUrl: {message: 'The product file must be an image'}}});
    }else{
        imageUrl = `/media/${file.filename}`;
    }

    const {title, startingBid, description, thumbnail} = req.body;
    let product = new Product({ uuid: v4(), title, startingBid, description, imageUrl, thumbnail, dateIssued: new Date().getTime() });

    product.save()
        .then((doc) => res.sendStatus(201))
        .catch(err => {
            removeFile(imageUrl, (error, result)=>{

                res.status(400).send({errors: err.errors});
            });
        });
};

// PUT: /products/alter
exports.putItem = (req, res, next) => {
    const body = _.pick(req.body, ['_id', 'title', 'startingBid', 'description', 'imageUrl', 'thumbnail']);
    body.dateIssued = new Date().getTime();

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
};

// DELETE: /products/:_id
exports.deleteItem = (req, res, next) => {
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
};