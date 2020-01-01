const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    uuid:{
        required: true,
        type: String
    },
    title: {
        required: [true, 'Please enter your product name'],
        type: String,
        trim: true
    },
    description:{
        required: [true, 'Please enter some details'],
        type: String,
        maxlength: [2000, 'Description is so long! Please insert some gist'],
        minlength: [20, 'It\'s so short.. add some details']
    },
    startingBid:{
        required: [true, 'Starting bid is needed to run the auction'],
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