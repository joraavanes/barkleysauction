const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../client/public');

app.use(express.json());
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Server is running on port: ${port}`));