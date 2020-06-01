const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,             
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});
//userSchema.plugin(uniqueValidator); // Retornar erro se um campo unico tentar ser usado
module.exports = mongoose.model('userSchema', userSchema);