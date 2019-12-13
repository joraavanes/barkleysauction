const User = require('../models/User');

const authenticate = (req, res, next) => {
    const {token} = req.body;

    User.findUserByToken(token)
        .then(user =>{            
            if(!user)
                return Promise.reject();

            req.user = user;
            req.token = token
            res.header('x-auth', token);
            next();
        })
        .catch(() => res.status(401).send({err: 'User not authorized'}));
};

module.exports = authenticate;