const path = require('path');
const express = require('express');

// Adding Middlewares
const printIp = require('./middleware/printIp');
const cors = require('./middleware/cors');

// Adding Database
const {mongoose} = require('./db/db');

// Routes
const mockRouter = require('./routes/mock');
const productRouter = require('./routes/Products');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../client/dist');

app.use(express.json());
app.use(express.static(publicPath));
app.use(cors);
app.use(printIp);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Server routes
app.use('/items', mockRouter);
app.use('/products', productRouter);

app.all('*', (req, res) => {
    // res.status(404).send('The page you are looking for didn\'t exist');
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});