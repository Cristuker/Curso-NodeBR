const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function(callback){

    const lista = []
    for(index in this){
        const item = this[index]
        const result = callback(item,index,this)
        //0 , "",null, undefined === false
        if(!result) continue;
        lista.push(item)
    }
    return lista;
}


async function main(){
    try{
        
        const { results } = await obterPessoas('a')

        // const familiaLars =  results.filter(function(item){
        //     // por padrao precisa retorna um booleana 
        //     // para informar se deve manter na lista ou não
        //     // false -> remove da lista
        //     // true -> mantem na lista
        //     // usando esse emtodo vc n remove definitivamente da lista
        //     // vc apenas devolve um array novo com os objetos filtrados
        //     // não encontrou = -1
        //     // encontrou = posição no Array
            
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1
            
        //     return result
        // })
        const familiaLars = results.meuFilter((item,index,lista) => {
            console.log(`index: ${index}`,lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })
            
        const names = familiaLars.map(pessoa => pessoa.name)
        console.log(names)
    }catch(error){
        console.error('deu ruim',error)
    }
}

main()