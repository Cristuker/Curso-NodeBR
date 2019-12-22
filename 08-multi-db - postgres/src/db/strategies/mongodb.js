const ICrud = require('../strategies/interfaces/interfaceCrud');

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

module.exports = MongoDB;