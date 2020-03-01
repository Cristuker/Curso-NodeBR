const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

const failAction = (req, headers, error) =>{
    throw error;
}

class HeroRoutes extends BaseRoute{
    constructor(db){
        super();
        this.db = db;
    }

    list(){
        return{
            path: '/herois',
            method: 'GET',
            config:{
                validate:{
                    failAction: failAction,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }   
                }
            },
            handler: (req, res) =>{
                try{
                    
                    const { 
                        skip, 
                        limit, 
                        nome 
                    } = req. query
                    
                    const query = nome ? { nome : {$regex: `.*${nome}*.`} } : {} ;


                    return this.db.read(nome ? query : {}, skip , limit);

                }catch(error){
                    
                    console.log(`Erro interno ${error}`);
                    
                    return 'Vish';
                }
            }
        }
    }

    create(){
        return {
            path:'/herois',
            method: 'POST',
            config:{
                validate:{
                    failAction: failAction,
                    payload:{
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(50),
                        isAlive: Joi.bool().default(true)

                    }
                }
            },
            handler: async (request) => {
                try{
                    
                    const { nome, poder, isAlive } = request.payload
                    
                    const result = await this.db.create({nome, poder, isAlive});
                                        
                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }

                }catch(error){
                    console.error('Azedo', error);
                }
            }
        }
    }
    
    update(){
        return {
            path:"/herois/{id}",
            method: 'PATCH',
            config:{
                validate:{
                    params:{
                        id: Joi.required(),

                    },
                    payload:{
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(50),
                        isAlive: Joi.boolean()
                    }
                }

            },
            handler: async (request) =>{
                try{

                    const { id } = request.params;
                    
                    const { payload } = request;
                    
                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString);

                    const result = await this.db.update(id, dados);
                    
                    if (result.nModified != 1) return { message: 'Deu ruim!' }

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }


                }catch(error){
                    console.log('Azedo',error);
                    
                }
            }        
        }
    }
}

module.exports = HeroRoutes;