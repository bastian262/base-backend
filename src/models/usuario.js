
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
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
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:String,
        default:"DISPONIBLE",
    },
    signUp:{
        type:Date,
        default: Date.now
    }
})

UsuarioSchema.methods.toJSON = function () {
    const { password, __v, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model ( 'Usuario', UsuarioSchema );