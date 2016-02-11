var Tokens = require('../models/token');

exports.default = (req, res, next) => {
    var tokenId = (req.get('Authorization') || '').replace('Bearer ', '');

    console.log(`Token ${tokenId}`);

    Tokens.findOne({
        _id: tokenId
    }, (err, token) => {
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

        req._token = token;

        next();
    });
}
