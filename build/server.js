/**
 * Created by peter on 16/11/17.
 */

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack');

const config = require('./webpack.dev.config')


const proxyTable = require('./proxy')
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    contentBase: "/",
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    },
    //proxy: proxyTable,
})

server.listen(8889, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:8889\n')
})
