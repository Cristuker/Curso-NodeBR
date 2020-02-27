const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');


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
                    failAction:(req, headers, error) =>{
                        throw error;
                    },
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

}

module.exports = HeroRoutes;