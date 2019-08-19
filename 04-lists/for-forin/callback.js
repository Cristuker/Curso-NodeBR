function mostrarNome(callback){
    setTimeout(()=>{
      callback('Cristian',20)
    },2000)
}

module.exports = mostrarNome
