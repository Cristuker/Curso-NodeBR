class notImplementedException extends Error {
  
  constructor(){
    super("Not implemented exception!");
  }

}

class ICrud{
  
  create(item){
    throw new notImplementedException();
  }

  read(query){
    throw new notImplementedException();
  }

  update(id,item){
    throw new notImplementedException();
  }

  delete(id){
    throw new notImplementedException();
  }

}

class MongoDB extends ICrud{
  
  constructor(){
    super()
  }

  create(item){
    console.log('====================================');
    console.log('O item foi salvo no mongoDB');
    console.log('====================================');
  }

}

class Postgres extends ICrud{
  
  constructor(){
    super();
  }

  create(item){
    console.log('====================================');
    console.log('O item foi salvo no Postgres');
    console.log('====================================');
  }

}

class ContextStrategy{
  
  constructor(strategy){
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
}

