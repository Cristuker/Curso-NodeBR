const assert = require('assert');
const api = require('./../api');
const Boom = require('boom');

let app = {};

const DEFAULT_HEROI_CADASTRAR = {
    nome:'Chapolin Colorado',
    poder: 'Marreta Bionica'
}

const DEFAULT_HEROI_INICIAL = {
    nome: 'Homem-Aranha',
    poder: 'Amigo da vizinhança'
}

let ID ='';

describe('Suite de teste api heroes', function (){
    this.beforeAll( async () => {
        app = await api;

        const result_default = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(DEFAULT_HEROI_INICIAL)
        })

        const dados = JSON.parse(result_default.payload);
        ID = dados._id;
    })

    it('Listar /herois', async () =>{
        const result = await app.inject({
            method: 'GET',
            url:'/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    })

    it('listar/ herois deve retornar 10 registros', async () =>{

        const TAMANHO_LIMITE = 10;
        const SKIP = 0;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=${SKIP}&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    })

    it('Listar heroi deve retornar com erro', async () =>{

        const TAMANHO_LIMITE = 'erro';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0limit=${TAMANHO_LIMITE}`
        })

        const errorResult ={
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"skip\" fails because [\"skip\" must be a number]",
            "validation":{
                "source": "query",
                "keys": ["skip"]
            }
        }

        assert.deepEqual(result.statusCode, 400);
        assert.deepEqual(result.payload,JSON.stringify(errorResult));
    })

    it('listar GET - / herois deve filtrar um item', async () =>{

        const TAMANHO_LIMITE = 1000;
        const NAME = DEFAULT_HEROI_INICIAL.nome;
        const SKIP = 0;

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=${SKIP}&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome, NAME);
    })

     it('cadastrar POST - /herois', async () =>{

         const result = await app.inject({
             method: 'POST',
             url: `/herois`,
             payload: DEFAULT_HEROI_CADASTRAR
         })

         const { message, _id }= JSON.parse(result.payload);
         const statusCode = result.statusCode;
         
         assert.ok(statusCode === 200);
         assert.notStrictEqual(_id, undefined);
         assert.deepEqual(message,"Heroi cadastrado com sucesso!");
     })
     
     it('Atualizar PATCH - /herois/:id', async () =>{
        const _id = ID ;
        const expected = {
            poder: 'SuperGado'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode, 200);
        assert.deepEqual(dados.message,'Heroi atualizado com sucesso!');
     })

     it('Atualizar PATCH - /herois/:id - não deve atualizar', async () =>{
        const _id = `5e5c04af1d27584ff2344888` ;
        const expected = {
            poder: 'SuperGado'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })
        
        
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        const expectedError = { 
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco' 
        }
        
        assert.ok(statusCode, 412);
        assert.deepEqual(dados, expectedError);
     })
     
     it('deletar heroi /heroi/:id', async() =>{

        const _id = ID ;

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
        })

        const statusCode =  result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!');

     })

     it('deletar heroi /heroi/:id, deve dar erro', async() =>{

        const _id = `5e5c04af1d27584ff2344888` ;

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
        })

        const statusCode =  result.statusCode;
        const dados = JSON.parse(result.payload);
        const expected = { 
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco' 
        }
        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected);

     })
})