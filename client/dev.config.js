const path = require('path');
const webpackMerge = require('webpack-merge');
const common = require('./common.config');

module.exports = webpackMerge(common, {
    output:{
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    module:{
        rules:[
            {
                test: /\.scss$|\.css$/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    mode: 'development'
});