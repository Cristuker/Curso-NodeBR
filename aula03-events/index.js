/**
 * meuEmissor.on() -> Ele esta observando os eventos que acontecem
 * extends basicamente serve para extender os metodos de EventEmitter para o MeuEmissor que posteriormente é passado para meuEmissor
 * meuEmissor.emit() -> serve ara disparar um "evento"
 * A diferença para a promisse é que ele é executado enquanto receber eventos
 * Promise -> ações que são executadas uma unica vez
 * EventEmitter -> ações que são executadas varias vezes
 * 
 * 
 */

const EventEmitter = require('events')

class MeuEmissor extends EventEmitter{

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function(click){
    console.log('um usuario clicou', click)
})



// meuEmissor.emit(nomeEvento, 'na barra de rolagem')

// let count =0
// setInterval(function(){
//     meuEmissor.emit(nomeEvento, 'no Ok '+ (count++))
// })

/**
 * stdin.addListener() -> ta ouvindo os eventos que acontecem dentro da pasta
 * process -> variavel interna do node
 * data é o evento que vc esta ouvindo e o segundo parametro 
 * é uma função e dentro dela vc manipula o data pego por value
 * 
 */
const stdin = process.openStdin()

function main(){
    return new Promise(function (resolve,reject){
        stdin.addListener('data', function(value){
            //console.log(`Você digitou: ${value.toString().trim()}`)
            return resolve(value)
    })
       
})

}



main().then(function(resultado){
    console.log('resultado',resultado.toString())
})