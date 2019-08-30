const { deepEqual, ok } = require('assert')

const DEFAULT_ITEM_CADASTRAR ={
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const database = require('./database')

describe('Suite de manipulação de Herois', () =>{
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)

    })


    // it('deve cadastrar um heroi, usando arquivos', async () =>{
    //     const expected = DEFAULT_ITEM_CADASTRAR

    //     ok(null, expected)
    // })
})