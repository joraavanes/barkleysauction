const {Schema, model, Mongoose} = require('mongoose');
const {ObjectID} = require('mongodb');

const ProductSchema = new Schema({
    uuid:{
        required: true,
        type: String
    },
    title: {
        required: [true, 'Please enter your product name'],
        type: String,
        minlength: ['5', 'Too short for title'],
        trim: true,
        lowercase: true
    },
    description:{
        required: [true, 'Please enter some details'],
        type: String,
        trim: true,
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
    thumbnail:{
        required: false,
        type: String,
        default: '-'
    },
    imageUrl:{
        required: [true, 'Add some photos'],
        type: String
    },
    wishlist:{
        required: true,
        type: Boolean,
        default: false
    },
    dateIssued:{
        required: true,
        type: Number,
        default: 0
    },
    bids: [{
        uuid:{
            type: String,
            required: true
        },
        bidDate: {
            type: Number,
            required: true,
            // default: new Date().valueOf()
        },
        bidPrice:{
            type: Number,
            required: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    comments: [{
        uuid:{
            required: true,
            type: String
        },
        userName: {
            required: true,
            type: String
        },
        email: {
            type: String,
            required: true
        },
        comment: {
            required: true,
            type: String,
            minlength: 1,
            maxlength: 100
        },
        dateIssued:{
            type: Number,
            required: true,
            default: new Date().getTime()
        },
        published: {
            type: Boolean,
            required: true,
            default: false
        },
        _userId: {
            type: ObjectID,
            required: true,
            ref: 'User'
        }
    }]
});

const Product = model('Product', ProductSchema);

Product.watch().on('change', (doc)=>{
    console.log(doc, ' has been changed');
});

module.exports = {Product};