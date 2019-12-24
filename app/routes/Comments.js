const express = require('express');
const router = express.Router();
const comments = require('../mock/comments.json');

router.get('/', (req, res) => {
    res.send(comments);
});

module.exports = router;