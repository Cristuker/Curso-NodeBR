// context inside a method
//- não pega o this global, somente do objeto.
//independete se esta no modo estrito ou não

this.name = 'Astrogildo'

const dev ={
    name: 'Zacarias',
    age: 20,
    sayMyName: function(){
        console.log(this.name) //Zacarias
    }
}

dev.sayMyName()