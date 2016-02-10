var mongoose = require('mongoose');
var uuid = require('node-uuid');

var schema = mongoose.Schema({
    _id: { type: String, default: uuid.v4, index: true },
    userId: { type: String, index: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

var model = mongoose.model('Token', schema);

module.exports = model;
