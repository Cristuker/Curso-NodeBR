"use strict"

this.name = 'Cristian'

function sayMyName(){
    console.log(this.name);
    
}

const user ={
    name: 'Diego',
    sayMyName: function(){
        console.log(this.name)
    }
}

user.sayMyName()