var mongoose = require('mongoose');
var uuid = require('node-uuid');

var schema = mongoose.Schema({
    _id: { type: String, default: uuid.v4, index: true },
    email: { type: String, index: true },
    hash: String,
    secret: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

var model = mongoose.model('User', schema);

module.exports = model;
