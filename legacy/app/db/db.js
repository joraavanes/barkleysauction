const mongoose = require('mongoose');
const {bgGreen, bgRed, black} = require('colors');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/barkelysstore', {
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log(bgGreen(black('Connected to MongoDb successfully'))))
.catch((err) => console.log(bgRed('Failed to connect to MongoDb',JSON.stringify(err, undefined, 3))));
    
module.exports = {mongoose};