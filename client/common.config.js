const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/app.js'
    },
    module:{
        rules:[
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|svg|ttf|woff|eot)$/,
                use: {
                    loader:'file-loader',
                    options:{
                        name: '[name].[hash].[ext]',
                        outputPath: '../images'
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Barkley\'s Store | Where you feel like shopping',
            filename: '../index.html',
            template: './src/assets/index.html',
            excludeChunks: ['adminApp']
        })
    ]
};