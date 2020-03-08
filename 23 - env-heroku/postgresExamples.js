//npm install pg-hstore pg sequelize
const Sequelize = require('sequelize');
const driver = new Sequelize(
  'heroes',
  'Cristuker',
  '136crcc12',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorAliases: false
  }
)

async function main(){
  const Herois = driver.define('herois',{
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

  await Herois.sync()
  /*await Herois.create({
    name:'Vegeta',
    poder:'Principe dos Sayajins'
  });*/
  const result = await Herois.findAll({
    raw:true
  })
  console.log('====================================');
  console.log(result);
  console.log('====================================');

}   

main();