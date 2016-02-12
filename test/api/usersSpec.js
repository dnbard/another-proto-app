var assert = require('assert');
var uuid = require('node-uuid');
var request = require('../request');
var faker = require('faker');

describe('API - Users', function () {
    describe('create', function () {
        it('should create an user', function (done) {
            request.post('/users')
                .send({
                    email: faker.internet.email(),
                    password: 'qwerty123'
                }).end((err, data) => {
                    assert.equal(err, null);
                    assert.equal(data.status, 200);
                    assert.equal(!!data.body.userId, true);
                    assert.equal(!!data.body.tokenId, true);

                    done();
                });
        });

        it('should create a token', function(done){
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

        it('should return error on empty data', function(done){
            request.post('/users')
                .send().end((err, data) => {
                    assert.equal(err.name, 'Error');
                    assert.equal(data.body.name, 'Validation Error');

                    done();
                });
        });

        it('should return error on invalid email', function(done){
            request.post('/users')
                .send({
                    email: '123',
                    password: '32321321321'
                }).end((err, data) => {
                    assert.equal(err.name, 'Error');
                    assert.equal(data.body.name, 'Validation Error');

                    done();
                });
        });

        it('should return error on invalid password', function(done){
            request.post('/users')
                .send({
                    email: faker.internet.email(),
                    password: ''
                }).end((err, data) => {
                    assert.equal(err.name, 'Error');
                    assert.equal(data.body.name, 'Validation Error');

                    done();
                });
        });
    });

    describe('get', function(){
        it('should return 404 on invalid ID', function(done){
            request.get(`/users/${uuid.v4()}`)
                .end((err) => {
                    assert.equal(err.status, 404);

                    done();
                });
        });

        it('should return an user', function(done){
            request.post('/users')
                .send({
                    email: faker.internet.email(),
                    password: '123123123123'
                }).end((err, data) => {
                    var id = data.body.userId;
                    assert.equal(id !== undefined, true);

                    request.get(`/users/${id}`).end((err, data)=>{
                        assert.equal(err, null);
                        assert.equal(data.status, 200);
                        assert.equal(data.body._id, id);

                        done();
                    });
                });
        });

        it('should not return sensible information', function(done){
            request.post('/users')
                .send({
                    email: faker.internet.email(),
                    password: '123123123123'
                }).end((err, data) => {
                    var id = data.body.userId;
                    assert.equal(id !== undefined, true);

                    request.get(`/users/${id}`).end((err, data)=>{
                        assert.equal(err, null);
                        assert.equal(data.status, 200);
                        assert.equal(data.body.hash, undefined);
                        assert.equal(data.body.secret, undefined);

                        done();
                    });
                });
        });
    });
});
