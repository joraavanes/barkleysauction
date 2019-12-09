const express = require('express');
const router = express.Router();

const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

router.post('/register', (req, res) =>{
    const {name, surname, email, password } = req.body;
    let user = new User({name, surname, email, password});

    user.register()
        .then(user => user.generateAuthToken())
        .then(user => res.header('x-auth',user.token).send(user))
        .catch(err => res.status(403).send(err));
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = new User({email, password});

    user.login()
        .then(user=> user.generateAuthToken())
        .then(user => res.header('x-auth', user.token).send(user))
        .catch(() => res.status(401).send({err: 'Email or password is incorrect'}));
});

router.post('/logout', authenticate, (req,res) => {
    const token = req.header('x-auth');
    User.removeToken(token)
        .then(user => res.send({msg: 'Logged out successfully', user}))
        .catch(() => res.status(401).send('Invalid token'));
});

router.get('/verifyToken', authenticate, (req, res) => {

    res.send(`Hello dear ${req.user.name} ${req.user.surname}. You are verified!`);
});

module.exports = router;