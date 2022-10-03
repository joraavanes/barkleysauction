const express = require('express');
const router = express.Router();
const authenticate = require('./../middleware/authenticate');
const {getComments, postComment, editComment, removeComment} = require('./../controllers/commentController');
// const comments = require('../mock/comments.json');

// Get comments of an product item
router.get('/:_id', getComments);

// Post comment for a product
router.post('/:_id', authenticate, postComment);

// Patch the comment 
router.patch('/:_productId/:_commentuuid', authenticate, editComment);

// Remove the comment from the product
router.delete('/:_productId/:_commentuuid', authenticate, removeComment);

module.exports = router;