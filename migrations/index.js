var Migration = require('./baseMigration');
var async = require('async');

var migrations = [
    new Migration(1, 'Test Migration', function(cb){
        cb();
    })
];

exports.apply = function(cb){
    async.series(migrations.map(m => m.apply.bind(m)), cb);
}
