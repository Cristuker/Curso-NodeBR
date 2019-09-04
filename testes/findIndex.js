let nomes = ['cristian', 'joão','carlos','jovem']

const existe = nomes.findIndex(item => item === 'jovem')

console.log(existe)

/**
 * retorna -1 se não achar o item da comparação,
 * se achar o item retorna o indice do mesmo dentro da array
 */

 let carro ={
     marca: ' porsche',
     ano: 1999
 }

 let dono ={
     nome: 'Cristian',
     status: 'rico pra caralho'
 }

 let motorista ={
     ...carro,
     ...dono
 }

 console.log(motorista)