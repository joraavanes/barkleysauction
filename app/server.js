const path = require('path');
const express = require('express');

const printIp = require('./middleware/printIp');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../client/public');

app.use(express.json());
app.use(express.static(publicPath));
app.use(printIp);

app.all('*', (req, res) => {
    res.status(404).send('The page you are looking for didn\'t exist');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});