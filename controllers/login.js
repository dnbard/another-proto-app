var User = require('../models/user');
var Token = require('../models/token');
var postUserSchema = require('../schemas/post-user');
var async = require('async');
var SHA256 = require('crypto-js/sha256');

exports.default = (req, res, next) => {
    postUserSchema.validate(req.body, (err, value)=>{
        if (err){
            return next({
                status: 400,
                name: 'Validation Error',
                params: req.body
            });
        }

        async.waterfall([
            (cb) => {
                User.findOne({
                    email: req.body.email
                }, (err, user) => {
                    if (err){
                        return cb({
                            status: 500,
                            message: err,
                            params: req.body
                        });
                    }

                    if (!user){
                        return cb({
                            status: 404,
                            message: 'User not found',
                            params: { userEmail: req.body.email }
                        });
                    }

                    cb(null, user);
                });
            },
            (user, cb) => {
                var secret = user.secret;
                var hash = SHA256(req.body.password + secret);

                if (hash == user.hash){
                    var token = new Token({
                        userId: user._id
                    });

                    return cb(null, {
                        userId: user._id,
                        tokenId: token._id
                    });
                } else {
                    return cb({
                        status: 401,
                        message: 'Password Incorrect'
                    });
                }
            }
        ], (err, result)=>{
            return err ? next(err) : res.send(result);
        });
    });
}
