var bodyParser = require('body-parser');
var usersController = require('./controllers/users');

exports.init = (app) => {
    app.use(bodyParser.json()); //parse JSON in body


    app.post('/users', usersController.createUser);

    app.get('/users/:id', usersController.getUser);


    app.use(function (err, req, res, next) {
        console.error(typeof err === 'object' && err.toString === 'function' ?
                      err.toString() : err);

        res.status(err.status || 500)
            .send(err);
    });
}
