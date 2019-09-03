const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinifier = require('html-minifier');

module.exports = {
    entry: {
        main: './src/app.js'
    },
    output:{
        path: path.join(__dirname, 'public/js'),
        filename: '[name].[contentHash].bundle.js'
    },
    module:{
        rules:[
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    mode: 'development',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        port:4000,
        open: true,
        watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Barkley\'s Store',
            filename: '../index.html',
            excludeChunks: ['adminApp']
        })
    ]
}