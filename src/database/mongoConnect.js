const mongoose = require('mongoose');
const connectString = process.env.MONGODB_URL;

async function connectMongo() {
   // Chamada da string de conexão do mongoose
    const db = await mongoose.connect(connectString, {useUnifiedTopology: true, useNewUrlParser: true});
    // Pega o STATUS da conexão
    const conectStatus = db.connection._readyState;
    
    return conectStatus;
}

module.exports = connectMongo();