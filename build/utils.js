/**
 * Created by peter on 16/11/17.
 */

const path = require('path')

exports.assetsPath = function (_path) {
    return path.posix.join('static', _path)
}
