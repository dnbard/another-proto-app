var mongoose = require('mongoose');
var uuid = require('node-uuid');

var schema = mongoose.Schema({
    _id: { type: String, default: uuid.v4, index: true },
    userId: { type: String, index: true, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

var model = mongoose.model('CardTemplate', schema);

module.exports = model;
