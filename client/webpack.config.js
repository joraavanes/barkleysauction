const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: './src/app.js'
    },
    output:{
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].[contentHash].bundle.js'
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
                test: /\.(jpg|png|gif|svg|ttf|woff|eot)/,
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
    mode: 'development',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        port:4000,
        open: true,
        watchContentBase: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Barkley\'s Store',
            filename: '../index.html',
            template: './src/index.html',
            excludeChunks: ['adminApp']
        })
    ]
}