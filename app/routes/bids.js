const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');

router.get('/:uuid', bidController.getBids);

router.post('/:uuid', bidController.postBid);

module.exports = router;

