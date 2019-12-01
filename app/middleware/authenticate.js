const User = require('../models/User');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    User.findUserByToken(token)
        .then(user =>{
            
            req.user = user;
            req.token = token
            res.header('x-auth', token);
            next();
        })
        .catch(err => res.status(401).send({err: 'User not authorized'}));
};

module.exports = authenticate;