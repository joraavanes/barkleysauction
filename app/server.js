const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const multer = require('multer');
const {bgGreen, black} = require('colors');

// Adding Middlewares
const printIp = require('./middleware/printIp');
const cors = require('./middleware/cors');

// Adding Database
const {mongoose} = require('./db/db');

// Routes
const mockRouter = require('./routes/mock');
const bidRouter = require('./routes/bids');
const userRouter = require('./routes/Users');
const productRouter = require('./routes/Products');
const commentRouter = require('./routes/Comments');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../client/dist');

// Using middlewares
app.use(helmet.hidePoweredBy({setTo: 'PHP/5.4.0'}));
app.use(helmet());
app.use(compression());
// app.use(multer({    
//         storage: multer.diskStorage({
//             destination: 'client/dist/media'            
//         }) 
//     }).single('imageUrl'));
app.use(express.json());
app.use(express.static(publicPath));
app.use(cors);
app.use(printIp);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Server routes
app.use('/products', productRouter);
app.use('/bids', bidRouter);
app.use('/users', userRouter);
// app.use('/items', productRouter);
app.use('/comments', commentRouter);

// let the react handle the miscellaneous urls
app.use((req, res, next) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log(bgGreen(black(`Server is running on port: ${port}`))));