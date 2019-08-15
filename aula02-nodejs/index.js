/*
Funções assincronas

0 Obter usuario
1 Obter numero de telefone a partir de seu id
2 Obter o endereço a partir do Id
*/

//importamos um modulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

//quando der algum problema => reject (ERRO)
//quando sucess => resolv


function obterUsuario(){
    return new Promise(function resolvePromise(resolve,reject){
        setTimeout(()=>{
            // return reject(new Error('DEU RUIM DE VDDD'))
                return resolve({
                    id:1,
                    nome: 'Aladin',
                    dataNascimento: new Date()
                })
            },1000)
        }) 
}


function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve,reject){
        setTimeout(()=>{
            return resolve({
                numero: '2434234234',
                ddd: '13'
            })
        })
    }) 
}

function obterEndereco(idUsuario,callback){
        setTimeout(()=>{
            return callback(null,{
                rua: 'dos bobos',
                numero: 0
            })
        },2000) 
}

/*
add palavra async na função -> atuomaticamente ela retorna uma promise
*/
main()
async function main(){
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.numero}
            Endereço: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    }catch(error){
        console.error('deu merda',error)
    }
}








/* const usuarioPromise = obterUsuario()


//para manipular o sucesso usamos a função .then()
//para manipular erros, usamos o .cathc()
// usuario -> telefone -> telefone -> endereco
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result  
            }
            
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return{
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
        Nome: ${resultado.usuario.nome}
        Endereço: ${resultado.endereco.rua} - ${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
        `)
    })
    .catch(function(error){
        console.error('DEU RUIM', error)
    })
 */


//  obterUsuario(function resolverUsuario(error, usuario){
//      if(error){
//         console.error('DEU RUIM USUARIO', error)
//         return;
//         }
//         obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//             if(error1){
//                 console.error('DEU RUIM USUARIO', error)
//                 return;
//                 }
//                 obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//                     if(error2){
//                         console.error('DEU RUIM USUARIO', error)
//                         return;
//                         }
//                         console.log(`
//                         Nome: ${usuario.nome},
//                         Endereco: ${endereco.rua},${endereco.numero}
//                         Telefone: (${telefone.ddd}) ${telefone.numero}

//                         Objetos------------
//                         Usuario: ${usuario}
//                         Telefone: ${telefone}
//                         Endereço: ${endereco}

//                         Erros: ${error}, ${error1}, ${error2}
//                         `)
//                 })
//         })
//  })


