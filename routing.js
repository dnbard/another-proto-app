var bodyParser = require('body-parser');
var usersController = require('./controllers/users');
var tokensController = require('./controllers/tokens');
var tokenValidator = require('./core/tokenValidator');
var morgan = require('morgan');

exports.init = (app) => {
    app.use(bodyParser.json()); //parse JSON in body
    app.use(morgan('tiny', {
        skip: function (req, res) {
            return res.statusCode < 400;
        }
    }));

    app.post('/users', usersController.createUser);

    app.get('/users/:id', usersController.getUser);

    app.get('/tokens/:id', tokenValidator.default, tokensController.getToken);


    app.use(function (err, req, res, next) {
        console.error(typeof err === 'object' && err.toString === 'function' ?
                      err.toString() : err);

        res.status(err.status || 500)
            .send(err);
    });
}
