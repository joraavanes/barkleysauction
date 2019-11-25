const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', (req, res) =>{
    const {name, surname, email, password } = req.body;
    let user = new User({name, surname, email, password});

    user.register()
        .then(doc => res.send(doc))
        .catch(err => res.status(403).send(err));
});

module.exports = router;