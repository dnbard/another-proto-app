function Migration(id, name, handler){
    this.id = id;
    this.name = name;
    this.handler = handler;
}

Migration.prototype.apply = function(cb){
    console.log(`Applying migration #${this.id} - ${this.name}`);
    this.handler(cb);
}

module.exports = Migration;
