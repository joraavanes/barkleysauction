const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');
const userController = require('../controllers/userController');

router.get('/all', authenticate, userController.getAllUsers);

router.post('/verify', authenticate, userController.verify);

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', authenticate, userController.logout);

router.get('/verifyToken', authenticate, userController.verifyToken);

module.exports = router;