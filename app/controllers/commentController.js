const {v4} = require('uuid');
const {Product} = require('./../models/Product');
const {ObjectID} = require('mongodb');

// GET: /comments/:_id
exports.getComments = (req, res, next) => {
    const {_id} = req.params;

    Product.findById(_id)
            .then(doc => {
                const comments = doc.comments.sort((a, b) => b.dateIssued - a.dateIssued);

                const refinedComments = comments.map((comment, index) => {
                    return {
                        comment: comment.comment,
                        dateIssued: comment.dateIssued,
                        published: comment.published,
                        email: comment.email,
                        userName: comment.userName,
                        uuid: comment.uuid,
                        // _id: comment._id
                    }
                });

                res.send(refinedComments);
            })
            .catch(err => res.sendStatus(400));
};

// POST: /comments  Post a comment for the product
exports.postComment = (req, res, next) => {
    const {_id} = req.params;
    const {userName, comment} = req.body;

    Product.findById(_id)
            .then(product => {
                product.comments.push({
                    uuid: v4(),
                    _userId: new ObjectID(req.user._id.toString()),
                    email: req.user.email,
                    dateIssued: new Date().valueOf(),
                    userName,
                    comment,
                });

                return product.save();
            })
            .then(updatedProduct => res.sendStatus(200))
            .catch(err => res.sendStatus(400));
};

// PATCH: /comments/:_productId/:_commentuuid
exports.editComment = (req, res, next) => {
    const {_productId, _commentuuid} = req.params;
    const {userName, comment} = req.body;

    Product.findById(_productId)
            .populate('comments._userId')
            .then(product => {
                const commentToUpdate =  product.comments.find(comment=> comment.uuid == _commentuuid);
                const commentIndex = product.comments.findIndex(comment => comment.uuid == _commentuuid);
    
                if(commentToUpdate._userId._id.toString() !== req.user._id.toString()){
                    return Promise.reject();
                }

                commentToUpdate.userName = userName;
                commentToUpdate.comment = comment;
                commentToUpdate.dateIssued = new Date().getTime();                

                product.comments.splice(commentIndex, 1, commentToUpdate);

                return product.save();
            })
            .then(updatedProduct => res.sendStatus(200))
            .catch(err => res.sendStatus(400));
};

// DELETE: /comments/:_productId/:_commentuuid
exports.removeComment = (req, res, next) => {
    const {_productId, _commentuuid} = req.params;

    Product.findById(_productId)
            .then(product => {
                product.comments = product.comments.filter(comment => comment.uuid != _commentuuid);

                return product.save();
            })
            .then(updatedProduct => res.sendStatus(200))
            .catch(err => res.sendStatus(400));
};