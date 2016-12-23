/**
 * Created by peter on 16/11/17.
 */
require('shelljs/global');

var webpack = require('webpack')
var config = require('./webpack.prod.config')
var path = require('path')
config.output.publicPath = '//static.idevent.cn/custom_case/'
var assetsPath = path.join(__dirname, '../dist')
rm("-rf", assetsPath)
webpack(config, function (err) {
    if (err) {
        throw err
    }
})

