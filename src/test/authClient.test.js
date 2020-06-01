const assert = require('assert');
const server = require('../../index');
let app = {};
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilh1eGFkYXNpbHZhIiwiaWQiOiI1Y2YzYzk0YThiZmVjZTE3NjBmNDhlNmMiLCJpYXQiOjE1NTk0ODE4NzN9.-HXY_jhC8GSOOWEejt3TEYJzxX2KkCAcuZ8_kXO-p6A"
const headers = {
    Authorization: TOKEN
};
const USER = {
    username: 'Xuxadasilva',
    password: 'gustavo@123',
    email: 'gusttavo212@gmail.com',
}

const USER_CADASTRO = {
    username: 'josepCad',
    password: '3332',
    email: 'maria@gmail.com',
}
const USER_DB = {
   ...USER,
   password: '$2b$04$o6I2lMZuUJAUtu7lXoeIaOfd65au787.IaSD68fE2wkPKUlJa1xJS',
} 

const Mongo = require('../database/mongoConnect');
const userCrud = require('../database/CRUD/userCrud');

describe('Suite de testes de Autenticação', function () {
    this.beforeAll(async () => {
        app = await server;

        const mongoREsult = await Mongo;
        
        // Tenta criar se já existe atualiza
        try {
            await userCrud.create(USER);
            result = await userCrud.create(USER);
        } catch (error) {
            result = await userCrud.update(null, USER, true);
        }
                
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER,
        })      
        const dados = JSON.parse(result.payload);
       
        assert.deepEqual(result.statusCode, 200);
        assert.ok(dados.token.length > 10);
    }),

    it('Deve cadastrar um usuario', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/cadastrar',
            payload: USER_CADASTRO,
        })       
        const statusCode = result.statusCode;
        const { 
            message,
            _id
        } = JSON.parse(result.payload);
        
        // If não cadastrado
        if(statusCode === 200) {
            assert.ok(statusCode === 200);
            assert.notStrictEqual(_id, undefined);
            assert.deepEqual(message, 'Usuario cadastrado com sucesso!')
        // Se já cadastrado um email igual
        }else if(statusCode === 500) {           
            assert.ok(statusCode === 500);           
            assert.deepEqual(message, 'An internal server error occurred')
        }
       
    })
    
})