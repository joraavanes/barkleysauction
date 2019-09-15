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
            },{
                test: /\.scss$|\.css$/,
                use: ['style-loader','css-loader','sass-loader']
            },{
                test: /\.(jpg|png|gif|svg|ttf|woff|eot)$/,
                use: {
                    loader:'file-loader',
                    options:{
                        name: '[name].[hash].[ext]',
                        outputPath: path.join('..', 'images')
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Barkley\'s Store | Where you feel like shopping today',
            filename: '../index.html',
            template: './src/index.html',
            excludeChunks: ['adminApp']
        })
    ]
};