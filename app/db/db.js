const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URI);
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://barkleys:fn3FP!UW9JfqVe5@ds257698.mlab.com:57698/heroku_jlhrjp4x',{
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://jora:OjoEHwrKqsLhimdo@cluster0-8jnyu.mongodb.net/barkleys?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to database successfully'))
.catch((err) => console.log('Failed to connect to database',JSON.stringify(err, undefined, 3)));

module.exports = {mongoose};