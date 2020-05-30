//Pacotes .env
const {
    config
} = require('dotenv');
const {
    join
} = require('path');
const {
    ok
} = require('assert');
//###########################  CONFIG .ENV ##################################
const env = process.env.NODE_ENV || 'dev'
ok(env === 'prod' || env === 'dev', 'a env é invalida, ou dev ou prod');

const configPatch = join(__dirname, './config', `.env.${env}`);
config({
    path: configPatch
})
//###########################################################################
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const hapiJwt = require('hapi-auth-jwt2');
const hapiCors = require('hapi-cors');

const mongoConnect = require('./src/database/mongoConnect');
const authRoute = require('./src/routes/authRoutes');

// Criar o servidor com suas configurações
const server = Hapi.Server({
    port: process.env.PORT
});

//Função que conecta o servidor
async function connectServer() {
    // Rotas
    server.route(authRoute.login());
    server.route(authRoute.cadastrar());


    // Config do Swagger
    const swaggerOptions = {
        info: {
            title: 'UNI-MAPS',
            version: 'v2.0',
        },
        lang: 'pt',
    };
    // Plugins Hapi
    await server.register([
        hapiCors,
        hapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },

    ]);
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        options: {
            expiresIn: 3600
       },
       //Recbe o dado discriptografado e a request
       validate: (dados, request) => {
           //Verificar no banco se o usuario continua ativo ou continua pagando
           // Se sim retorna true
           return {
               isValid: true // caso não false
           }
       }
    })
    // Usar a authenticação jwt criada
    server.auth.default('jwt');
    // Conectar o mongodb
    await mongoConnect;
    // Iniciar o servidor
    await server.start();

    console.log('Servidor rodando na porta', server.info.port);
    return server;
};

module.exports = connectServer();