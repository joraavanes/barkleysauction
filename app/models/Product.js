const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    uuid:{
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String,
        trim: true
    },
    description:{
        required: true,
        type: String,
        maxlength: 2000,
        minlength:20
    },
    startingBid:{
        required: true,
        type: Number
    },
    sold:{
        type: Boolean,
        default: false,
    },
    price:{
        required:false,
        type: Number
    },
    img:{
        required:true,
        type: String,
        default:'-'
    },
    wishlist:{
        required: true,
        type: Boolean,
        default: false
    }
});

const Product = model('Product', ProductSchema);

module.exports = {Product};