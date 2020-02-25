const assert = require('assert');
const Postgres = require('../db/strategies/postgres/postgres');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroiSchema');

const MOCK_HEROI_CADASTRAR = {
	nome: 'Doutor Estranho',
	poder: 'Estranhices'
}

const MOCK_HEROI_ATUALIZAR = {
	nome: 'Batman',
	poder: 'Dinheiro'
}

let context = {};

describe('Postgres Strategy', function () {

	this.timeout(Infinity);

	this.beforeAll(async () => {

		const connection = await Postgres.connect();
		const model = await Postgres.defineModel(connection, HeroiSchema);
		context = new Context(new Postgres(connection, model));

		await context.delete();
		await context.create(MOCK_HEROI_ATUALIZAR);
		

	})

	it('Postgres Connection', async () => {

		const result = await context.isConneted();
		assert.equal(result, true);

	})

	it('cadastrar', async () => {

		const result = await context.create(MOCK_HEROI_CADASTRAR);
		delete result.id
		assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
	})

	it('listar', async () => {
		const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
		delete result.id;
		assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
	})

	it('atualizar', async () =>{
		const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
		const novoItem = {
			...MOCK_HEROI_ATUALIZAR,
			nome:'Mulher Maravilha'
		}

		const [result] = await context.update(itemAtualizar.id, novoItem)

		const [resultRead] = await context.read({id: itemAtualizar.id})
		
		delete resultRead.id

		assert.deepEqual(result, 1)
		assert.deepEqual(resultRead, novoItem)
		//assert.deepEqual(result, 1)
		/**
		 * No JS temos uma tecnica chamada rest/spread que é um metodo usado
		 * para mergear objetos ou separa-lo
		 * {
		 * 	nome:'Batman',
		 * 	poder:'DInheiro
		 * }
		 * 
		 * {
		 * 	dataNasc:'11/01/1999'
		 * }
		 * //final
		 * {
		 * 	nome:'Batman',
		 * 	poder:'DInheiro,
		 * dataNasc:'11/01/1999'
		 * }
		 */
	})

	it('remover por id', async() =>{
		const [item] = await context.read({})

		const result = await context.delete(item.id)

		assert.deepEqual(result, 1)
	})


})