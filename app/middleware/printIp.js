
module.exports = (req, res, next) => {
    console.log(req.headers['x-forwarded-for']);
    // console.log(req.connection.remoteAddress || req.headers['x-forwarded-for']);
    next();
};