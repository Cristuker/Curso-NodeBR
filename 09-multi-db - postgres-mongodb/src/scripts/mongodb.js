//docker exec -it 268661efb07e mongo -u cristuker -p 136crcc12 --authenticationDatabase herois
//show dbs -> todos os bancos q pode usar
//use herois -> mudando contexto database herois
//show collections -> pra visualizar as tabelas
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()
db.herois.findOne()
db.herois.count()
db.herois.find().limit(1000).sort({nome: -1})

for(let i = 0; i <= 50; i++){
    db.herois.insert({
        nome:`Clone do Batman-${i}`,
        poder:`Dinheiro`,
    })    
}

db.herois.find({}, {poder:1, _id:0})
//create

db.herois.insert({
    nome:`Clone do Batman-${}`,
    poder:`Dinheiro`,
})

//read
db.herois.find()

//update
db.herois.update({_id:ObjectId("5e13d225fdb7549a767162f1")},
{nome:'Mulher Maravilha'})

db.herois.update({_id:ObjectId("5e13d225fdb7549a767162f1")},
{$set: {nome:'Lanterna  Verde'}})

//delete
db.herois.remove({})
db.herois.remove({nome:'Mulher Maravilha'})