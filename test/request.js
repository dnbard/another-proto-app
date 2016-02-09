var request = require('superagent');
var config = require('./config');

exports.get = (url) => {
    return request.get(config.serverPath + url);
}

exports.post = (url) => {
    return request.post(config.serverPath + url);
}
