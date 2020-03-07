const Mongoose = require('mongoose');

Mongoose.connect('mongodb://cristuker:136crcc12@localhost:27017/herois',{ useUnifiedTopology: true, useNewUrlParser: true }, (error) =>{
    if(error){
        console.log(`Falha na conexão ${error}`);
    }
    return;
});

const connection = Mongoose.connection;

connection.once('open', () =>{
    console.log(`Database connect!`);
})

// setTimeout(()=>{
//     const state = connection.readyState;
//     console.log(`Estados da conexão:\n0:Desconectado \n1:Conectado \n2:Conectado \n3:Desconectado\n---------------------- \nEstado atual: ${state}`);

// },1000)

const heroiSchema = new Mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    poder:{ 
        type: String,
        required: true
    },
    isAlive:{
        type:Boolean,
        default: true
    },
    insertAt:{
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema);

async function main(){
    const resultCadastrar = await model.create({
        nome: 'Goku',
        poder:'Ki',
        
    })
    console.log('result cadastrar', resultCadastrar);

    const listItens = await model.find()

    console.log('result ListItens', listItens);
    
}

main();