const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb/mongodb');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroisSchema');

const heroi = {
    nome: 'Venom',
    poder: 'Gado'
}

const heroi_default = {
    nome: `Homem-Aranha ${new Date}`,
    poder: 'Aranhudo'
}

const heroi_atualizar = {
    nome: `Vegeta`,
    poder: 'Principe das saias jeans'
}

let heroi_id;

let context = {};

describe('Suite de testes do MongoDB', function (){
    
    

    this.beforeAll(async () =>{
        const connection = MongoDB.connect();
        
        context = new Context(new MongoDB(connection, HeroiSchema));
        await context.create(heroi_default)
        
        const result = await context.create(heroi_atualizar);
        heroi_id = result._id;

    })
    
    it('verificar conexão', async () =>{
        
        const result = await context.isConneted()

        const expected = 'Conectado';

        assert.deepEqual(result, expected);
        
    })

    it('cadastrar heroi', async () => {

        const { nome, poder} = await context.create(heroi);

        const expected =  heroi;

        assert.deepEqual({nome, poder},expected);
    })

    it('listar herois', async () =>{
                
        const [{ nome, poder }] = await context.read({nome: heroi_default.nome});

        const result = { nome, poder };

        assert.deepEqual(result,heroi_default);

    })

    it('atualizar', async () =>{
        const result = await context.update(heroi_id,{
            poder: 'bixão'
        });

        assert.deepEqual(result.nModified, 1);
    })

    it('deletar', async () =>{
        const result = await context.delete(heroi_id);
    
        assert.deepEqual(result.n, 1)
    })
})