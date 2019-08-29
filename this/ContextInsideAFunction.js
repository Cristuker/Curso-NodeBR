// context inside a function
//- não pega o this global, mas se não estiver no modo estrito, sim!
// no node já estamos no mode estrito
this.name = 'Cristian';

function sayMyName(){
    console.log(this.name);
    
}

sayMyName();