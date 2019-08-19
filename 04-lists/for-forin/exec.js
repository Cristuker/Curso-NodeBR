const mostrarNome = require('./callback')

mostrarNome((nome,idade)=>{
    idade = idade+1
    console.log(`Nome: ${nome} - Idade: ${idade}`)
})