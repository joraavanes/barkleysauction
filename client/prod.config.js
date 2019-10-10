const path = require('path');
const webpackMerge = require('webpack-merge');
const common = require('./common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = webpackMerge(common, {
    output:{
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].[contentHash].js'
    },
    module:{
        rules:[
            {
                test: /\.css$|\.scss$/,
                use:[
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new TerserWebpackPlugin(),
        new MiniCssExtractPlugin({
        filename: '../css/[name].[hash].css'
    })],
    mode: 'production'
});