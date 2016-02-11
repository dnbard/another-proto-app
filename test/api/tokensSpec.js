var assert = require('assert');
var uuid = require('node-uuid');
var request = require('../request');
var faker = require('faker');

describe('API - Tokens', function () {
    describe('get', function () {
        it('should get a token', function(done){
            request.post('/users')
                .send({
                    email: faker.internet.email(),
                    password: 'qwerty123'
                }).end((err, data) => {
                    request.get(`/tokens/${data.body.tokenId}`)
                        .set('Authorization', `Bearer ${data.body.tokenId}`)
                        .end((err, data) => {
                            assert.equal(err, null);
                            assert.equal(data.status, 200);
                            done();
                        });
                });
        });
    });
});
