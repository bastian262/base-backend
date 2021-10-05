const {Schema, model} = require("mongoose");


const {Schema, model} = require('mongoose');

const BarberoSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    telefono:{
        type:String,
        required:[true, 'El telefono es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    direccion:{
        type:String,
        required:[true, 'La dirección es obligatoria']
    },
    url:{
        type:String
    },
    estado:{
        type:Boolean,
        default:true,
    },
    signUp:{
        type:Date,
        default: Date.now
    }
})

BarberoSchema.methods.toJSON = function () {
    const {  __v, ...barbero } = this.toObject();
    return barbero;
}

module.exports = model ( 'Barbero', BarberoSchema );