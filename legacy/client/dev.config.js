const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./common.config');

module.exports = merge(common, {
    output:{
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    // devtool:'none',
    module:{
        rules:[
            {
                test: /\.scss$|\.css$/,
                use: [
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
    mode: 'development',
    devtool: 'cheap-module-source-map'
});