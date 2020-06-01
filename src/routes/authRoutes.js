const joi = require('@hapi/joi');
const boom = require('boom');
const jwt = require('jsonwebtoken');

const PasswordHelper = require('../helpers/passwordHelper');
const UserCrud = require('../database/CRUD/userCrud');

const failAction = (request, headers, erro) => {
    throw erro;
};
const USER = {
    username: 'xuxadasilva',
    email: 'gusttavo212@gmail.com',
    password: 'gustavo@123',
}

const headers = joi.object({
    authorization: joi.string().required(),
}).unknown();

module.exports = {

    login() {
        return {
            path: '/login',
            method: 'POST',
            options: {
                auth: false,
                tags: ['api'],
                description: 'Obter Token',
                notes: 'Faz login com user e senha do banco',                    
                validate: {
                    failAction,
                    payload: joi.object({
                        username: joi.string(),
                        password: joi.string().required(),
                        email: joi.string().required(),
                    })
                }
            },
            handler: async (request) => {
                const {
                    email,
                    password,
                } = request.payload;

                const [user] = await UserCrud.read({
                    email: email
                })


                if (!user) {
                    return boom.unauthorized('O Email informado não existe');
                }

                const match = await PasswordHelper.comparePassword(password, user.password)
                if (!match) {
                    return boom.unauthorized('O Usuario ou a Senha invalido');
                }

                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.JWT_SECRET)
                return {
                    token
                }

            }

        }
    },

    cadastrar() {
        return {
            path: '/cadastrar',
            method: 'POST',
            options: {
                // Não precisa de token pois ele cadastra
                auth: false,
                tags: ['api'],
                description: 'Cadastro no banco',
                notes: 'Faz o cadastro com os dados informados',                  
                validate: {
                    failAction,
                    payload: joi.object({
                        username: joi.string().required().min(3).max(100),
                        password: joi.string().required().min(3).max(100),
                        email: joi.string().required().min(3).max(100).email(),
                    })
                }
            },
            handler: async (request) => {
                try {
                    const {  
                        username, 
                        email,
                        password,
                    } = request.payload;
                   
                    const hashPass = await PasswordHelper.hashPassword(password);

                    const newUser = {
                        username: username,
                        email: email,
                        password: hashPass,
                    }                  
                   
                    const result = await UserCrud.create(newUser);
                  
                    return {
                        message: 'Usuario cadastrado com sucesso!',
                        _id: result._id
                    };
                    
                } catch (error) {  
                    console.log("error", error);
                    
                    return error
                }

            }
        }
    }
}