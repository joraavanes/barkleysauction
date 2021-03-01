const lodash = require('lodash');
const moment = require('moment');
const {v4} = require('uuid');
const {Product} = require('../models/Product');

// GET: /bids/:uuid
exports.getBids = async (req, res, next) => {
    const {uuid} = req.params;

    let {bids} = await Product.findOne({uuid}).populate('bids.user');
    bids = bids.sort((a, b) => b.bidPrice - a.bidPrice);
    res.send(bids);
};

exports.postBid = async (req, res, next) => {
    const {uuid} = req.params;
    const {bidPrice} = req.body;
    const bidDate = moment().valueOf();

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
            bidPrice,
            bidDate
        });
        await product.save();
        res.send(product);

    } catch (error) {
        res.status(400).send(error.message);
    }
};