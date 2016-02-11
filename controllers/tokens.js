var User = require('../models/user');
var Token = require('../models/token');
var postUserSchema = require('../schemas/post-user');
var async = require('async');
var TokenValidator = require('../core/tokenValidator');

exports.getToken = (req, res, next) => {
    var tokenId = req.params.id;

    if (tokenId === req._token._id){
        return res.send(req._token);
    }

    async.waterfall([
        (cb) => {
            Token.findOne({
                _id: tokenId
            }, cb);
        }, (token, cb) => {
            if (!token){
                return cb({
                    status: 404,
                    message: 'No token found',
                    params: { tokenId: tokenId }
                });
            }

            if (token.userId !== req._token.userId){
                return cb({
                    status: 403,
                    message: 'Forbidden',
                    params: { tokenId: tokenId }
                });
            }

            return (null, token)
        }
    ], (err, result) => {
        return err ? next(err) : res.send(result);
    });
}
