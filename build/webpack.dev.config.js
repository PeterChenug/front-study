/**
 * Created by peter on 16/12/5.
 */
var config = require('./webpack.config')
var webpack = require('webpack')

config.plugins.push(new webpack.DefinePlugin({
    __ENV__: JSON.stringify({resource: ''})
}))

module.exports = config;
