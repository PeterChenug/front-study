/**
 * Created by peter on 16/11/17.
 */
"use strict";

const utils = require('./utils')
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const _root = path.resolve(process.cwd())
const _viewPath = path.resolve(_root, 'views')

//获取入口文件
const entry = (() => {
    let entryFiles = glob.sync(_viewPath + '/**/*.{js, jsx}')

    let entry = {}
    //公共入口文件
    entryFiles.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        entry[filename] = ['babel-polyfill', filePath]
    })

    //加入hot reload
    entry['devServerClient'] = 'webpack-dev-server/client?http://0.0.0.0:8888'
    return entry
})()

//获取所有的静态页面
const plugins = (() => {
    let viewFiles = glob.sync(_viewPath + '/**/*.{html, jade}')
    let plugins = []
    viewFiles.forEach((filePath) => {
        let fileReal = filePath.replace(_root + '/views/', '')
        fileReal = fileReal.replace('/index', '')
        let filename = fileReal.substring(fileReal.lastIndexOf('\/') + 1, fileReal.lastIndexOf('.'))
        plugins.push(new HtmlWebpackPlugin({
            filename: filename === 'index' ? fileReal : fileReal.replace('.html', '/index.html'),
            template: filePath,
            inject: 'body',
            chunks: [filename],
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
                removeAttributeQuotes: true,
            }
        }))
    })

    plugins.push(new ExtractTextPlugin(utils.assetsPath('css/[name].[hash].css')))
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }))

    /*
    plugins.push(new CopyWebpackPlugin([{
        from: path.resolve(_root, 'assets/lib'),
        to: 'script'
    }]))*/

    plugins.push(new webpack.optimize.OccurenceOrderPlugin())
    plugins.push(new webpack.NoErrorsPlugin())

    return plugins
})()

module.exports = {
    entry: entry,
    output: {
        path:  path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: utils.assetsPath('js/[name].[hash].js'),
    },

    resolve: {
        root: [_root],
        extensions: ['', '.js', '.html', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },

    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                compact: false
            }
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style!css")
        }, {
            test: /\.less$/,
            //"style-loader!css-loader!less-loader"
            loader: ExtractTextPlugin.extract("css!less")
        }, {
            test: /\.(png|jpe?g|gif|svg|swf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('images/[name].[hash].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash].[ext]')
            }
        }]
    },

    vue: {
        loaders: {
            less: "vue-style-loader!css-loader!less-loader"
        }
    },
    devtool: '#eval',
    plugins: plugins,

}
