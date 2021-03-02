const User = require('../models/User');

// GET: /users/all
exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.state(400).send());
};

// GET: /users/verify
exports.verify = (req, res, next) => {
    const {token} = req.body;
    
    res.send({
        email: req.user.email,
        name: req.user.name,
        token
    });
};

// POST: /users/register
exports.register = (req, res) => {
    const {name, surname, email, password } = req.body;
    let user = new User({name, surname, email, password});

    user.register()
        .then(user => user.generateAuthToken())
        .then(user => res.header('x-auth',user.token).send(user))
        .catch(err => res.status(403).send({errors: err.errors}));
};

// POST: /users/login
exports.login = (req, res) => {
    const {email, password} = req.body;
    const user = new User({email, password});

    user.login()
        .then(user=> user.generateAuthToken())
        .then(user => res.header('x-auth', user.token).send(user))
        .catch(err => res.status(401).send({errors: err}));
};

// POST: /users/logout
exports.logout =  (req,res) => {
    const {token} = req.body;
    User.removeToken(token)
        .then(user => res.send({msg: 'Logged out successfully', user}))
        .catch(() => res.status(401).send('Invalid token'));
};

// GET: /users/verifyToken
exports.verifyToken = (req, res) => {
    res.send(`Hello dear ${req.user.name} ${req.user.surname}. You are verified!`);
};