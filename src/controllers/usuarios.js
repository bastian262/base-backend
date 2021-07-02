const { response, request } = require('express');
const Usuario = require('../models/usuario');
const nodemailer = require('nodemailer');
const moment = require("moment");
require('moment/locale/es');
const stulzelEmail = process.env.userMail;
const passwordEmail = process.env.passwordMail;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "mailingstulzel1@gmail.com",
            pass: "Stulzel385#"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { desde = 0 } = req.query;
    try{
        const user = await Usuario.find()
        .skip(Number(desde));
    
        res.json({
            ok:true,
            msg: 'Listado correctamente',
            user
        });
    }catch(err){
        throw err;
    }
}

const usuariosPost = async (req, res = response) => {
    
    const {nombre, correo, telefono} = req.body;
    const user = new Usuario({nombre, telefono, correo});
    user.rol = "USER_ROLE";
    try{
        await user.save((err, userStored) => {
            if(err){
                res.status(400).send({ok:fakse, message:"El correo ya fue registrado"});
            }else{
                if(!userStored){
                    res.status(500).send({ ok: false, message: "Error al crear el usuario" });
                }else{
                    const mailOptions = {
                        from: `STULZEL <${stulzelEmail}>`,
                        to: userStored.correo,
                        subject: "¡Registro exitoso!",
                        text: 'Gracias por participar en este increible webinar!',
                        html: `
                        <html lang="en">
                            <head>
                                <title>Stulzel</title>
                            </head>
                            <body style="margin: 0px;">
                                <table style="width:100%; max-width:700px; margin: 0 auto;border-spacing: 0px;">
                                    <tr>
                                        <th style="width: 100%;">
                                            <a href="https://stulzel.com/webinar/">
                                                <img src="https://stulzel.com/wp-content/uploads/2021/06/MAILING-APOYO-PYMES-REGISTRO.jpg" alt="" style="width: 100%; max-width: 700px; margin: 0 auto;">
                                            </a>
                                            <img src="https://stulzel.com/wp-content/uploads/2021/06/unnamed.jpg" alt="" style="width: 100%; max-width: 700px; margin: 0 auto; transform: translateY(-3px);">
                                        </th>
                                    </tr>
                                </table>
                            </body>
                        </html>
                        `
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            res.status(500).send({ ok: false, message: "Error del servidor de correo"});
                        } else {
                            res.status(200).send({ ok: true, message: "Usuario agregado correctamente ", user: user });
                        }
                    });
                }
            }
        });
    }catch(err){
        throw err;
    }
}

// const usuariosPut = async (req, res = response) => {

//     const { id } = req.params;
//     const { password, google, ...resto } = req.body;

//     if(password){
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync(password, salt);
//     }
//     const user = await Usuario.findByIdAndUpdate(id, resto);
//     const user2 = await Usuario.findById(id);

//     res.json({
//         ok:true,
//         msg: 'Usuario actualizado correctamente',
//         id,
//         user2
//     });
// }

// const usuariosPatch = (req, res = response) => {
//     res.json({
//         msg: 'patch API - usuariosPatch'
//     });
// }

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    try{
        const user = await Usuario.findByIdAndDelete(id);
        res.json({
            msg: 'Usuario Eliminado Correctamente!'
        });

    
    }catch(err){
        throw err;
    }

}

function signIn(req, res) {
    let { correo } = req.body;

    correo = correo.toString().toLowerCase();
    const signInTime = moment().subtract(3, 'hours').format('LLL');

    Usuario.findOne({correo}, (err, userStored) => {
        if (err) {
            res.status(500).send({ ok: false, message: "Error del servidor"});
        } else {
            if (!userStored) {
                res.status(404).send({ ok: false, message: "Usuario no encontrado"});
            } else {
                    userStored.signInTime = signInTime;
                    Usuario.findByIdAndUpdate({ _id: userStored.id }, userStored, (err, userUpdate) => {
                        if (err) {
                            res.status(500).send({ ok: false, message: "Error del servidor"});
                        } else {
                            if (!userUpdate) {
                                res.status(404).send({ ok: false, message: "No se ha encontrado el usuario"});
                            } else {
                                res.status(200).send({
                                    ok: true,
                                    user:userUpdate
                                });
                            }
                        }
                    });
            }
        }
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    signIn
}