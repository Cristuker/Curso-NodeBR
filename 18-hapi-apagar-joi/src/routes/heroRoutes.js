const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');

const failAction = (req, headers, error) => {
    throw error;
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction: failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (req, res) => {
                try {

                    const {
                        skip,
                        limit,
                        nome
                    } = req.query

                    const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {};


                    return this.db.read(nome ? query : {}, skip, limit);

                } catch (error) {
                    Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction: failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(50),
                        isAlive: Joi.bool().default(true)

                    }
                }
            },
            handler: async (request) => {
                try {

                    const { nome, poder, isAlive } = request.payload

                    const result = await this.db.create({ nome, poder, isAlive });

                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }

                } catch (error) {
                    Boom.internal();
                }
            }
        }
    }

    update() {
        return {
            path: "/herois/{id}",
            method: 'PATCH',
            config: {
                validate: {
                    params: {
                        id: Joi.required(),

                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(50),
                        isAlive: Joi.boolean()
                    }
                }

            },
            handler: async (request) => {
                try {

                    const { id } = request.params;

                    const { payload } = request;

                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString);

                    const result = await this.db.update(id, dados);

                    if (result.nModified != 1) return Boom.preconditionFailed('ID não encontrado no banco');

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }

                } catch (error) {
                    Boom.internal();

                }
            }
        }
    }

    delete() {
        return {
            path: `/herois/{id}`,
            method: 'DELETE',
            config: {
                validate: {
                    failAction: failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const result = await this.db.delete(id);

                    if (result.n != 1) return Boom.preconditionFailed('ID não encontrado no banco');

                    return {
                        message: 'Heroi removido com sucesso!'
                    }
                } catch (error) {
                    Boom.internal();
                }

            }
        }
    }
}

module.exports = HeroRoutes;