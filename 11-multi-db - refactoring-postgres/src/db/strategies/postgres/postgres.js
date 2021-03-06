const Sequelize = require('sequelize');
const ICrud = require('../interfaces/interfaceCrud');



class Postgres extends ICrud {

	constructor(connection, schema) {
		super();
		this.connection = connection;
		this.schema = schema;

	}

	async isConneted() {
		try {
			await this.connection.authenticate();
			return true;

		}
		catch (error) {
			console.log('====================================');
			console.log('Falha na conexão', error);
			console.log('====================================');
		}
		return false;
	}

	static async connect() {
		const connection = new Sequelize(
			'heroes',
			'Cristuker',
			'136crcc12', {
			host: 'localhost',
			dialect: 'postgres',
			quoteIdentifiers: false,
			operatorAliases: false,
			logging: false
		})
		return connection;
	}

	static async defineModel(connection,schema) {

		const model = connection.define(
			schema.name, schema.schema, schema.options
		)

		await model.sync();

		return model;
	}

	async create(item) {
		const { dataValues } = await this.schema.create(item);

		return dataValues;
	}

	async read(item = {}) {
		return this.schema.findAll({ where: item, raw: true });
	}

	async update(id, item) {

		return this.schema.update(item, { where: { id: id } })
	}

	async delete(id) {
		const query = id ? { id } : {}

		return this.schema.destroy({where: query})
	}
}

module.exports = Postgres;