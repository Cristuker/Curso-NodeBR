// function.call(this, arg1, arg2)
//call do inglês chamar
// retornar o this do contexto que enviar
 this.name = 'João'
this.age = 25
 function sayMyName(age){
     this.age = arguments[0]
     console.log(this.name,this.age);
     
 }

 const dev = {
     name: 'Isabela'
 }

//  sayMyName.call(this,12);
//  sayMyName.call(dev,32);

//  console.log(this.age);
//  console.log(dev.age);
 
// function.apply(this, arg1, arg2)
//retorna o this do contexto q eu enviar

sayMyName.apply(this,[18])


