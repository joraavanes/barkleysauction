const express = require('express');
const router = express.Router();

router.get('/products', (req,res) =>{
    res.send([
        {name: 'carpet',price: 1120, sold:false, img:'bag.jpg'},
        {name: 'bike',price: 5410, sold:false, img:'bag.jpg'},
        {name: 'toaster',price: 112, sold:false, img:'bag.jpg'},
        {name: 'shover',price: 112, sold:false, img:'bag.jpg'},
        {name: 'Handbag',price: 1120, sold:false, img:'bag.jpg'},
        {name: 'bike',price: 5410, sold:false, img:'bag.jpg'},
        {name: 'toaster',price: 112, sold:false, img:'bag.jpg'},
        {name: 'shover',price: 112, sold:false, img:'bag.jpg'},
        {name: 'Handbag',price: 1120, sold:false, img:'bag.jpg'},
        {name: 'bike',price: 5410, sold:false, img:'bag.jpg'},
        {name: 'toaster',price: 112, sold:false, img:'bag.jpg'},
        {name: 'baggage',price: 112, sold:false, img:'bag.jpg'},
        {name: 'Handbag',price: 1120, sold:false, img:'bag.jpg'},
        {name: 'bike',price: 5410, sold:false, img:'bag.jpg'},
        {name: 'toaster',price: 112, sold:false, img:'bag.jpg'},
        {name: 'shover',price: 112, sold:false, img:'bag.jpg'},
        {name: 'Handbag',price: 1120, sold:false, img:'bag.jpg'},
        {name: 'bike',price: 5410, sold:false, img:'bag.jpg'},
        {name: 'toaster',price: 112, sold:false, img:'bag.jpg'},
        {name: 'shover',price: 112, sold:false, img:'bag.jpg'},
        {name: 'Handbag',price: 1120, sold:false, img:'bag.jpg'},
        {name: 'bicycle',price: 5410, sold:false, img:'bag.jpg'},
        {name: 'toaster',price: 112, sold:false, img:'bag.jpg'},
        {name: 'shover',price: 112, sold:false, img:'bag.jpg'},
        {name: 'baggage',price: 112, sold:false, img:'bag.jpg'}
    ]);
});

module.exports = router;