const commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){

    commander

        .version('v1')
        .option('-n, --nome [value]','Nome do Heroi')
        .option('-p, --poder [value]','Poder do Heroi')
        .option('-i, --id [value]','Id do Heroi')

    //Opções para o CRUD
        .option('-c, --cadastrar','Cadastrar um Heroi')
        .option('-l, --listar [value]','Listar um Heroi')
        .option('-r, --remover [value]','Remover um Heroi pelo id')
        .option('-a, --atualizar [value]','Atualizar Heroi')
        .parse(process.argv)
        const heroi = new Heroi(commander)


        try{
            if(commander.cadastrar){
                await Database.cadastrar(heroi);
                console.log('item cadastrado com sucesso!');
                return;
                
            }

            if(commander.listar){
                
                const id = commander.listar;
                const result = await Database.listar(id);
                console.log(result);
                console.log('id',id)
                return;
            }
            
            if(commander.remover){
                const id = commander.remover;
                await Database.remover(id);
                console.log('item removido com sucesso!');
                return;
            }

            if(commander.atualizar){
                const id = commander.atualizar;
                console.log('id', id);
                await Database.atualizar(id, heroi);
                console.log('item atualizado com sucesso!');
                return;
            }
 

        }
        catch(error){
            console.error(`Erro: ${error}`)
            return;
        }
}

main()

