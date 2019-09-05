const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){

    Commander
        .version('v1')
        
    //Opções
        .option('-n, --nome [value]','Nome do Heroi')
        .option('-p, --poder [value]','Poder do Heroi')
        
    //Opções para o CRUD
        .option('-c, --cadastrar','Cadastrar um Heroi')
        .option('-l, --listar','Listar um Heroi')
        .option('-r, --remover [value]','Remover um Heroi pelo id')
        .parse(process.argv)
        const heroi = new Heroi(Commander)


        try{
            if(Commander.cadastrar){

                const resultado = await Database.cadastrar(heroi)
                if(!resultado){
                    console.error('Heroi não foi cadastrado!')
                    return;
                }
                console.log('Heroi cadastrado com sucesso!!')
                
            }

            if(Commander.listar){
                const resultado = await Database.listar(heroi.id)
                console.log(resultado)
                return;
            }



        }
        catch(error){
            console.error(`Erro: ${error}`)
        }
}

main()

//11:39