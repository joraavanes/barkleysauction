const lodash = require('lodash');
const {v4} = require('uuid');
const {Product} = require('../models/Product');

exports.getBids = async (req, res, next) => {
    const {uuid} = req.params;

    const {bids} = await Product.findOne({uuid});
    res.send(bids);
};

exports.postBid = async (req, res, next) => {
    const {uuid} = req.params;
    const {bidPrice} = req.body;

    let product;
    try {
        product = await Product.findOne({uuid});

        if(product.startingBid >= bidPrice){
            throw new Error('You must bid higher than starting bid');
        }

        const prevBids = product.bids.map(bid => bid.bidPrice);
        if(Math.max(...prevBids) >= bidPrice){
            throw new Error('You must bid higher than current one');
        }
        product.bids.push({
            uuid:  v4(),
            user: req.user,
            bidPrice
        });
        await product.save();
        res.send(product);

    } catch (error) {
        res.status(400).send(error.message);
    }
};