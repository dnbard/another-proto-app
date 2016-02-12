var mongoose = require('mongoose');
var uuid = require('node-uuid');

var schema = mongoose.Schema({
    _id: { type: String, index: true },
    value: String
});

var model = mongoose.model('Setting', schema);

module.exports = model;
