const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const items = require('./products.json');

router.get('/', (req,res) =>{
    res.send(items);
});

router.get('/:name/:id', (req,res)=>{
    const id = req.params.id;
    const item = items.filter(item=> item.id === id);
    res.send(item);
});

module.exports = router;