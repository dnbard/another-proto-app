var assert = require('assert');
var uuid = require('node-uuid');
var request = require('../request');
var faker = require('faker');

describe('Static - index.html', function () {
    it('should be available', function (done) {
        request.get('/')
            .end((err, data) => {
                assert.equal(err, null);
                assert.equal(data.status, 200);
                done();
            });
    });
});
