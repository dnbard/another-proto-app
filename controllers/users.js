var User = require('../models/user');
var postUserSchema = require('../schemas/post-user');

exports.createUser = (req, res, next) => {
    postUserSchema.validate(req.body, (err, value)=>{
        if (err){
            return next({
                status: 400,
                name: 'Validation Error',
                params: req.body
            });
        }

        var newUser = new User({
            email: req.body.email,
            hash: '123'
        });

        newUser.save((err, user) => {
            if (err){
                return next(err);
            }

            res.send(user);
        });
    });
}

exports.getUser = (req, res, next) => {
    var id = req.params.id;

    User.findOne({
        _id: id
    }, {
        hash: false,
        __v: false
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
