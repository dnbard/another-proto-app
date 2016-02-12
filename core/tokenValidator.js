var Tokens = require('../models/token');

var TOKEN_INTERVAL = 60 * 1000 * 60;
var TOKEN_HALF_INTERVAL = 60 * 1000 * 5;

exports.default = (req, res, next) => {
    var tokenId = (req.get('Authorization') || '').replace('Bearer ', ''),
        now = new Date();

    Tokens.findOne({
        _id: tokenId
    }, (err, token) => {
        var now = new Date(),
            lastUpdatedIn, tokenTimestamp;

        if (err){
            return next({
                status: 400,
                name: 'No auth token or invalid',
                params: { tokenId: tokenId }
            });
        }

        if (!token){
            return next({
                status: 401,
                name: 'No auth token or invalid',
                params: { tokenId: tokenId }
            });
        }

        lastUpdatedIn = now - new Date(token.updatedAt)

        if (lastUpdatedIn > TOKEN_INTERVAL ){
            return next({
                status: 401,
                name: 'Auth token expired',
                params: { tokenId: tokenId }
            });
        }

        if (!token.active){
            return next({
                status: 401,
                name: 'Auth inactive',
                params: { tokenId: tokenId, active: token.active }
            });
        }

        if (lastUpdatedIn > TOKEN_HALF_INTERVAL){
            token.updatedAt = now.toString();
            token.save((err) => {
                console.error(err);
            });
        }

        req._token = token;

        next();
    });
}
