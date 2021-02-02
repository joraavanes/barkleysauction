const {v4} = require('uuid');
const {Product} = require('../models/Product');

exports.getBids = async (req, res, next) => {
    const {uuid} = req.params;

    const product = await Product.findOne({uuid});
    res.send(product)
};

exports.postBid = async (req, res, next) => {
    const {uuid} = req.params;
    const {bidPrice} = req.body;

    let product;
    try {
        product = await Product.findOne({uuid});
        product.bids.push({
            uuid:  v4(),
            user: req.user,
            bidPrice
        });
        await product.save();

    } catch (error) {
        res.status(400).send();
    }

    res.send(product);
};