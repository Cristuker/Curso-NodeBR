const ICrud = require('../interfaces/interfaceCrud');

class ContextStrategy extends ICrud{
  
  constructor(strategy){
    super();
    return this._database = strategy;    
  }

  create(item){
    return this._database.create(item);
  }

  read(item){
    return this._database.read(item);
  }

  update(id,item){
    return this._database.update(id,item);
  }

  delete(id){
    return this._database.delete(id);
  }

  isConneted(){
    return this._database.isConneted();
  }
}

module.exports = ContextStrategy;