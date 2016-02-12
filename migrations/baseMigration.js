var Setting = require('../models/setting');


function Migration(id, name, handler){
    this.id = id;
    this.name = name;
    this.handler = handler;
}

Migration.prototype.apply = function(cb){
    console.log(`Applying migration #${this.id} - ${this.name}`);
    this.handler((err, value) => {
        if (err){
            console.log(err);
        }

        Setting.findOne({
            _id: 'migration-counter'
        }, (err, counter)=>{
            counter.value = this.id+'';
            counter.save(cb);
        });
    });
}

module.exports = Migration;
