const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authenticate = require('../middleware/authenticate');

router.get('/:uuid', bidController.getBids);

router.post('/:uuid', authenticate, bidController.postBid);

module.exports = router;

