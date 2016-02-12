var User = require('../models/user');
var Token = require('../models/token');
var postUserSchema = require('../schemas/post-user');
var async = require('async');
var AES = require('crypto-js/aes');
var uuid = require('node-uuid').v4;

exports.createUser = (req, res, next) => {
    postUserSchema.validate(req.body, (err, value)=>{
        if (err){
            return next({
                status: 400,
                name: 'Validation Error',
                params: req.body
            });
        }

        var hashSecret = uuid();
        var hash = AES.encrypt(req.body.password, hashSecret);

        var newUser = new User({
            email: req.body.email,
            hash: hash,
            secret: hashSecret
        });

        var newToken = new Token({
           userId: null
        });

        async.waterfall([
            (cb) => {
                newUser.save((err, user) => {
                    cb(err, user);
                });
            },
            (user, cb) => {
                var newToken = new Token({
                   userId: user._id
                });
                newToken.save((err, token) => {
                    cb(err, {
                        token: token,
                        user: user
                    });
                });
            }
        ], (err, result) => {
            if (err){
                return next(err);
            }

            res.send({
                userId: result.user._id,
                tokenId: result.token._id
            });
        });
    });
}

exports.getUser = (req, res, next) => {
    var id = req.params.id;

    User.findOne({
        _id: id
    }, {
        hash: false,
        __v: false,
        secret: false
    }, (err, user)=>{
        if (err){
            return next(err);
        }

        if (!user){
            return next({
                name: 'Entity not found',
                status: 404,
                params: {
                    id: req.params.id
                }
            });
        }

        res.send(user);
    });
}
