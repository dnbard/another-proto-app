var Migration = require('./baseMigration');
var Setting = require('../models/setting');
var async = require('async');

var migrations = [
    new Migration(1, 'Set Migration Counter Setting', function(cb){
        var migrationCounter = new Setting({
            _id: 'migration-counter',
            value: '0'
        });

        migrationCounter.save(cb);
    })
];

exports.apply = function(cb){
    Setting.findOne({
        _id: 'migration-counter'
    }, (err, counter)=>{
        var migrationNumber = parseInt(counter.value);

        async.series(
            migrations.filter(m => m.id > migrationNumber)
                .map(m => m.apply.bind(m)), cb);
    });
}
