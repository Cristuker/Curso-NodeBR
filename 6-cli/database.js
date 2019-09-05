const {
    readFile, 
    writeFile,
    
} = require('fs');

const {
    promisify
} = require('util');


const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
//outra forma de obtor dados do json
// const dadosJson = require('./herois.json')
class Database{

    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
       //his.NOME_ARQUIVO = 'heroes.json'
    }

    async obterArquivo(){

        const arquivo = await readFileAsync(this.NOME_ARQUIVO,'utf8');
        
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO,JSON.stringify(dados)) 
        return true;
    }

    async cadastrar(heroi){
        const dados = await this.obterArquivo();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const heroiComId = {
      ...heroi,
      id,
    };

    return await this.escreverArquivo([...dados, heroiComId]);
    }

    async listar(id){
        const dados = await this.obterArquivo();
        // se nao passar o id, traz tudo

        if(id){
            return dados.filter(item => (id ? item.id == id : true));
        }
        return dados
        
    }

    async atualizar(id,atualizacoes){
        const dados = await this.obterArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1) {
            throw Error('heroi não existe!');
        }

        const atual = dados[indice];
        dados.splice(indice, 1);

        //workaround para remover valores undefined do objeto
        const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
        const dadoAtualizado = Object.assign({}, atual, objAtualizado);

        return await this.escreverArquivo([...dados, dadoAtualizado]);
    }

    async remover(id){
        if(!id){
            await this.escreverArquivo([])
            return true;
        }

        const dados = await this.obterArquivo()
        
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1){
            throw Error('O heroi não existe')
        }
        
        dados.splice(indice, 1);
        await this.escreverArquivo(dados);
        return true;
    } 
}

module.exports = new Database()