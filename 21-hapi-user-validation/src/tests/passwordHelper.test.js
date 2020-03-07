const assert = require('assert');
const PasswordHelper = require('./../helpers/passwordHelper');

const senha = '123dijfsihdfiud'
const hash = '$2b$04$MlokMrYIrP6pmAEhkPKCieGccrbdFhbc9odMjt0OMGET3gqM/Z9f2'

describe('UserHelper test suite', () =>{
    it('Deve gerar um hash a partir de uma senha', async() =>{
        
        const result = await PasswordHelper.hashPassword(senha);
        console.log(result);
        
        assert.ok(result.length > 10)
    })

    it('Deve validar a senha', async() =>{
        
        const result = await PasswordHelper.comparePassword(senha, hash);

        assert.ok(result)
    })
})