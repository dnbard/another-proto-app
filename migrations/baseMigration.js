function Migration(id, name, handler){
    this.id = id;
    this.name = name;
    this.handler = handler;
}

Migration.prototype.apply = function(){
    console.log(`Applying migration #${this.id} - ${this.name}`);
}

module.exports = Migration;
