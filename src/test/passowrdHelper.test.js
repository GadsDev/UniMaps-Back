const assert = require('assert');

const PasswordHelper = require('../helpers/passwordHelper');
const SENHA = 'gustavo@123';
const HASH = '$2b$04$OJ1/08rf/idzWrvWMcPi4eKTokv7/rRtacsNZjjn9vWHumHT8OpkC';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU1Njc0MjMyM30.SYZs4yDN_UyZsmnPIky7wuv1hXI-pUroJfSuvj6gbk8"
const headers = {
    Authorization: TOKEN
};

describe('UserHelper test suit', function () {
    it('Deve gerar um hash apartir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);
        
        assert.ok(result.length > 10);
    });

    it('Deve comparar a senha e o hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH);
        console.log('result', result);
        assert.ok(result);
    });
})