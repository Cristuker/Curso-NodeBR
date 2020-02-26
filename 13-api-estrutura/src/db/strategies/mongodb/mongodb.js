const ICrud = require('../interfaces/interfaceCrud');


const Mongoose = require('mongoose');

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado'
}
class MongoDB extends ICrud {

    constructor(connection, schema) {
        super()
        this._schema = schema;
        this._connection = connection;
    }

    async isConneted() {
        const state = STATUS[this._connection.readyState]
        
        if(state === 'Conectado') return state;

        if(state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve,1000))

        return STATUS[this._connection.readyState]
    }

    static connect() {
        Mongoose.connect('mongodb://cristuker:136crcc12@localhost:27017/herois', { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
            if (error) {
                console.log(`Falha na conexão ${error}`);
            }
            return;
        });

        const connection = Mongoose.connection;
        connection.once('open', () => {
            console.log(`Database connect!`);
        })
        
        return connection;
    }

    async create(novoHeroi) {
        return this._schema.create(novoHeroi);

    }

    read(item, skip = 0, limit = 10){
        return this._schema.find(item).skip(skip).limit(limit);
    }

    update(id, payload){
        return this._schema.updateOne({_id: id},{$set: payload});
    }

    delete(id){
        return this._schema.deleteOne({_id: id});
    }

}

module.exports = MongoDB;