const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const PasswordHelper = require('./../helpers/passwordHelper');

const failAction = (req, headers, error) => {
    throw error;
}

const USER = {
    username:'etbilu',
    password:'123'
}

class authRoutes extends BaseRoute{

    constructor(secret, db){
        super();
        this.secret = secret;
        this.db = db
    }

    login(){
        return{
            path:'/login',
            method: 'POST',
            config:{
                auth: false,
                tags: ['api'],
                description:'Obter token',
                notes: 'Fazer o login usando JWT para autenticar',
                validate:{
                    failAction,
                    payload:{
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) =>{
                const { username, password } = request.payload;

                const [ usuario ] = await this.db.read({
                    username: username.toLowerCase()
                })
                
                
                if(!usuario){
                    return Boom.unauthorized('O usuario informado não existe');
                }

                const match = await PasswordHelper.comparePassword(password,usuario.password);

                if(!match){
                    return Boom.unauthorized('Usuario ou senha invalida');
                }

                const token = Jwt.sign({
                    username: username,
                    id: usuario.id
                }, this.secret)

                return {
                    token
                }
            }
        }
    }
}

module.exports = authRoutes;