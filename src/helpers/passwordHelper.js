// Gera a senha para trabalhar com o hash dos dados
const Bcrypt = require('bcrypt');
const {
    promisify
} = require('util');

// Transformar callBack em promisse
const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = 3;

module.exports = {
    // Recebe a String da senha e retorna o HASH dela
    hashPassword (pass) {
        return hashAsync(pass, SALT);
    },
    // Compara um HASH e uma SENHA
    comparePassword (pass, hash) {
        return compareAsync(pass, hash);
    }    
}