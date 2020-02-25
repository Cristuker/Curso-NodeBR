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

  isConneted(){
    throw new notImplementedException();
  }

  connect(){
    throw new notImplementedException();
  }

}


module.exports = ICrud;