const ICrud = require('../strategies/interfaces/interfaceCrud');


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

module.exports = Postgres;