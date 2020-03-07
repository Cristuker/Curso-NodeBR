/* 
*npm i hapi
*npm i vision inert hapi-swagger
*npm i hapi-auth-jwt2
*npm i bcrypt
*/
const Hapi = require('hapi');
const HapiSwagger =  require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const HapiJWT = require('hapi-auth-jwt2');

const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoute = require('./routes/heroRoutes');
const AuthRoute = require('./routes/authRoutes');
const Postgres = require('./db/strategies/postgres/postgres');
const UserSchema = require('./db/strategies/postgres/schemas/userSchema');


const JWT_SECRET = 'segredo123';

const app = new Hapi.Server( { port: 5000 } );

const mapRoutes = (instance, methods) => {
    return methods.map(method => instance[method]());
}

const main = async () => {

    const connectionMongoDB = MongoDB.connect();
    const context = new Context(new MongoDB(connectionMongoDB, HeroiSchema));

    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, UserSchema);
    const contextPostgres = new Context(new Postgres(connectionPostgres, model));


    const SwaggerOptions = {
        info:{
            title: 'API - Herois - #CursoNodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }

    await app.register([
        HapiJWT,
        Vision,
        Inert,
        {
            plugin: HapiSwagger, 
            options: SwaggerOptions
        }
    ])

    

    app.auth.strategy('jwt','jwt',{
        key: JWT_SECRET,
        validate: async (dado,request) =>{
            const [result] = await contextPostgres.read({
                username:dado.username.toLowerCase()
            })
        
            
            if(!result){
                return {
                    isValid: false
                }
            }
            //verificar no bd se o user ta ativo
            //verificar se o user continua pagando
            return{
                isValid: true //caso não valido, false
            } 
        }      
    })

    app.auth.default('jwt')
    
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
    ])

        await app.start();

        console.log(`Servidor rodando na porta ${app.info.port}`);

        return app;
        
}

module.exports = main();