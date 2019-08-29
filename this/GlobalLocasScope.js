//global scope

this.name = 'Cristian'

function sayMyName(){
    //local scope
    console.log(this.name); //undefined
    
}

sayMyName()