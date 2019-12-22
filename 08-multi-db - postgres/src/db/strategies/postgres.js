const ICrud = require('../strategies/interfaces/interfaceCrud');
const Sequelize = require('sequelize');


class Postgres extends ICrud{
  
   constructor(){
      super();
      this._driver = null;
      this._herois = null;
      this._connect();
   }

   async isConneted(){
      try{
         await this._driver.authenticate();
         return true;

      }
      catch (error){
         console.log('====================================');
         console.log('Falha na conexão',error);
         console.log('====================================');
      }
      return false;
   }

   _connect(){
      this._driver = new Sequelize(
         'heroes',
         'Cristuker',
         '136crcc12',{
         host: 'localhost',
         dialect: 'postgres',
         quoteIdentifiers: false,
         operatorAliases: false
      }
      )
   }

   async defineModel(){
      this._herois = driver.define('herois',{
         id:{
           type: Sequelize.INTEGER,
           required: true,
           primaryKey: true,
           autoIncrement: true
         },
         nome: {
           type: Sequelize.STRING,
           required: true
         },
         poder:{
           type: Sequelize.STRING,
           required: true
         }
       },{
         tableName: 'TB_HEROIS',
         freezeTableName: false,
         timestamps:false
         })
     
       await Herois.sync();
   }

   create(item){
      console.log('====================================');
      console.log('O item foi salvo no Postgres');
      console.log('====================================');
   }

}

module.exports = Postgres;