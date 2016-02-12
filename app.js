var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var migrations = require('./migrations');

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect(config.mongodb);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
    console.log('Connected to MongoDB');

    require('./models').init();

    migrations.apply((err) => {
        app.use(express.static('public'));

        app.listen(port, function () {
            console.log(`Application listening on port ${port}!`);
        });

        require('./routing').init(app);
    });
});
