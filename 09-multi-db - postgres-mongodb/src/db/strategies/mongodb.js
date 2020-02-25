const ICrud = require('../strategies/interfaces/interfaceCrud');

const Mongoose = require('mongoose');

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectado'
}
class MongoDB extends ICrud {

    constructor() {
        super()
        this._herois = null;
        this._driver = null;
    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            isAlive: {
                type: Boolean,
                default: true
            },
            insertAt: {
                type: Date,
                default: new Date()
            }
        })

        this._herois = Mongoose.model('herois', heroiSchema);
    }

    async isConneted() {
        const state = STATUS[this._driver.readyState]
        
        if(state === 'Conectado') return state;

        if(state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve,1000))

        return STATUS[this._driver.readyState]
    }

    connect() {
        Mongoose.connect('mongodb://cristuker:136crcc12@localhost:27017/herois', { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
            if (error) {
                console.log(`Falha na conexão ${error}`);
            }
            return;
        });

        const connection = Mongoose.connection;
        this._driver = connection;
        connection.once('open', () => {
            console.log(`Database connect!`);
        })
        
        this.defineModel();
    }

    async create(novoHeroi) {
        return this._herois.create(novoHeroi);

    }

    read(item, skip = 0, limit = 10){
        return this._herois.find(item).skip(skip).limit(limit);
    }

    update(id, payload){
        return this._herois.updateOne({_id: id},{$set: payload});
    }

    delete(id){
        return this._herois.deleteOne({_id: id});
    }

}

module.exports = MongoDB;