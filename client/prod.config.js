const path = require('path');
const webpackMerge = require('webpack-merge');
const common = require('./common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
                    // // MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    // 'css-loader',
                    // 'sass-loader'
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options:{
                            modules: {
                                localIdentName: "[name]_[local]___[hash:base64]",
                                getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                                    if(loaderContext.resourcePath.includes('node_modules') || loaderContext.resourcePath.includes('custom'))
                                        return localName;
                                }
                            },														
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    optimization:{
        minimizer:[
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    },
    plugins:[
        // new MiniCssExtractPlugin({
        //     filename: '../css/[name].[hash].css'
        // })
    ],
    mode: 'production'
});