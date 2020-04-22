const {v4} = require('uuid');
const {Product} = require('./../models/Product');
const {ObjectID} = require('mongodb');

// GET: /comments/:_id
exports.getComments = (req, res, next) => {
    const {_id} = req.params;

    Product.findById(_id)
            .then(doc => {
                const comments = doc.comments.sort((a, b) => b.dateIssued - a.dateIssued);
                res.send(comments);
            })
            .catch(err => res.sendStatus(400));
};

// POST: Post a comment for the product
exports.postComment = (req, res, next) => {
    const {_id} = req.params;
    const {userName, comment} = req.body;

    Product.findById(_id)
            .then(product => {
                product.comments.push({
                    uuid: v4(),
                    _userId: new ObjectID(req.user._id.toString()),
                    dateIssued: new Date().valueOf(),
                    userName,
                    comment,
                });

                return product.save();
            })
            .then(updatedProduct => res.sendStatus(200))
            .catch(err => res.sendStatus(400));
};

exports.editComment = (req, res, next) => {
    const {_productId, _commentuuid} = req.params;
    const {userName, comment} = req.body;

    Product.findById(_productId)
            .then(product => {
                const commentToUpdate =  product.comments.find(comment=> comment.uuid == _commentuuid);
                const commentIndex = product.comments.findIndex(comment => comment.uuid == _commentuuid);
                
                commentToUpdate.userName = userName;
                commentToUpdate.comment = comment;
                commentToUpdate.dateIssued = new Date().getTime();
                
                product.comments.splice(commentIndex, 1, commentToUpdate);

                return product.save();
            })
            .then(updatedProduct => res.sendStatus(200))
            .catch(err => res.sendStatus(400));
};

exports.removeComment = (req, res, next) => {
    const {_productId, _commentId: _commentuuid} = req.params;

    Product.findById(_productId)
            .then(product => {
                product.comments = product.comments.filter(comment => comment.uuid != _commentuuid);

                return product.save();
            })
            .then(updatedProduct => res.sendStatus(200))
            .catch(err => res.sendStatus(400));
};