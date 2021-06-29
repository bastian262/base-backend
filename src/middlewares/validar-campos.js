const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const validarCampos = (req,res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    next();
    
}

const correoExiste = async (correo = "") => {

    const existEmail = await Usuario.findOne({correo});

    if( existEmail ){
        throw new Error("Este correo ya fue registrado");
    }
    
}
module.exports = {
    validarCampos,
    correoExiste
}