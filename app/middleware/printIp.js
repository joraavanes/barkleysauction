
module.exports = (req, res, next) => {
    console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    next();
};