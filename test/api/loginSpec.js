var assert = require('assert');
var uuid = require('node-uuid');
var request = require('../request');
var faker = require('faker');

describe('API - Login', function () {
    describe('default', function () {
        it('should receive new token', function (done) {
            var password = 'qwerty123',
                login = faker.internet.email();

            request.post('/users').send({
                email: login,
                password: password
            }).end((err, data) => {
                var oldData = data;

                assert.equal(err, null);

                request.post('/login').send({
                    email: login,
                    password: password
                }).end((err, data) =>{
                    assert.equal(err, null);
                    assert(oldData.body.tokenId !== data.body.tokenId, true);

                    done();
                });
            });
        });
    });
});
