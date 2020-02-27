const BaseRoute = require('./base/baseRoute');

class HeroRoutes extends BaseRoute{
    constructor(db){
        super();
        this.db = db;
    }

    list(){
        return{
            path: '/herois',
            method: 'GET',
            handler: (req, res) =>{
                try{
                    
                    const { skip, limit, nome } = req. query
                    
                    let query = {};

                    if(nome){
                        query.nome = nome;
                    }

                    if(isNaN(skip)){
                        throw Error('O tipo de Skip está errado')
                    }

                    if(isNaN(limit)){
                        throw Error('O tipo de limit está errado')
                    }

                    return this.db.read( 
                        query, 
                        parseInt(skip), 
                        parseInt(limit) 
                    );

                }catch(error){
                    
                    console.log(`Erro interno ${error}`);
                    
                    return 'Vish';
                }
            }
        }
    }

}

module.exports = HeroRoutes;