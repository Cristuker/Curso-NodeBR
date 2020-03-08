const assert = require('assert');
const api = require('./../app/api');
const Context = require('./../db/strategies/base/contextStrategy');
const Postgres = require('./../db/strategies/postgres/postgres');
const UserSchema = require('./../db/strategies/postgres/schemas/userSchema');

let app = {};

const user ={
    username:'etbilu',
    password:'123'
}

const user_db = {
    username: user.username.toLocaleLowerCase(),
    password: '$2b$04$ycTie.J2cKyAg7k2xuUPheBR6WDvk/Fy6rNN/FTQZ3DOyXmkfFRcG'
}

describe('Suite de teste para autenticação', async function (){
    this.beforeAll(async () =>{
        app = await api;

        const connectionPostgres = await Postgres.connect();
        const model = await Postgres.defineModel(connectionPostgres, UserSchema);
        const postgres = new Context(new Postgres(connectionPostgres, model))
        const result = await postgres.update(null, user_db, true);
    })

    it('Deve obter um token', async()=>{
        const result = await app.inject({
            method: 'POST',
            url:'/login',
            payload:user
        })
        
        
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    })

    it('Deve retornar não autorizado ao tentar obter um login errado', async () =>{
        const result = await app.inject({
            method: 'POST',
            url:'/login',
            payload:{
                username:'joazinho',
                password: 'numsei'
            }
        })

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 401);
        assert.deepEqual(dados.error, "Unauthorized")
    })
})