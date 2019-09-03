
module.exports = (req, res, next) => {
    console.log(req.connection.remoteAddress || req.headers['x-forwarded-for']);
    next();
};