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
    
    const {nombre, correo, telefono, direccion} = req.body;
    const user = new Usuario({nombre, telefono, correo, direccion});
    user.rol = "USER_ROLE";
    console.log(user);
    try{
        await user.save((err, userStored) => {
            if(err){
                res.status(400).send({ok:false, message:"El correo ya fue registrado"});
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
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Curso WhatsApp</title>
                            </head>
                            <body style="margin: 0px;">
                                <table style="width:100%; max-width:700px; margin: 0 auto; border-spacing: 0px; border-collapse:collapse; box-sizing:content-box; background-color: black; background-size: cover;">
                                    <tr>
                                        <th style="width: 100%;">
                                            <!-- <a href="https://stulzel.com/categoria-producto/ofertas/" style="margin: 0;"> -->
                                                <img src="https://stulzel.com/wp-content/uploads/2021/07/headerMail.jpg" alt="" style="width: 100%; max-width: 700px; margin: 0 auto;">
                                            <!-- </a> -->
                                        </th>
                                    </tr>
                                </table>
                                <table style="width:100%; max-width:700px; margin: 0 auto 0; border-spacing: 0px; background-image: url(https://stulzel.com/wp-content/uploads/2021/07/MAILING-INSCRITO-1.jpg); background-size: cover;">
                                    <tr style="width: 100%; max-width: 700px;">
                                        <td style="width: 100%;">
                                            <img src="https://stulzel.com/wp-content/uploads/2021/07/MAILING-INSCRITO-1.jpg" alt="" style="width: 100%; max-width: 700px; margin: 0 auto;">
                                        </td>
                                    </tr>
                                </table>
                                <table style="width:100%; max-width:700px; margin: 0 auto 0; border-spacing: 0px; background-image: url(https://stulzel.com/wp-content/uploads/2021/07/MAILING-INSCRITO-2.jpg); background-size: cover;">
                                    <tr style="width: 100%; max-width: 700px;">
                                        <td style="width: 100%;">
                                            <img src="https://stulzel.com/wp-content/uploads/2021/07/MAILING-INSCRITO-2.jpg" alt="" style="width: 100%; max-width: 700px; margin: 0 auto;">
                                        </td>
                                    </tr>
                                </table>
                                <table style="width:100%; max-width:700px; margin: 0 auto 0; border-spacing: 0px; background-image: url(https://stulzel.com/wp-content/uploads/2021/07/MAILING-INSCRITO-3.jpg);background-size: cover;">
                                    <tr style="width: 100%; max-width: 700px;">
                                        <td style="width: 100%;">
                                            <img src="https://stulzel.com/wp-content/uploads/2021/07/MAILING-INSCRITO-3.jpg" alt="" style="width: 100%; max-width: 700px; margin: 0 auto;">
                                        </td>
                                    </tr>
                                </table>
                                <table style="width:100%; max-width:700px; margin: 0 auto; border-spacing: 0px; background-color: black;">
                                    <tr>
                                        <th style="width: 100%;">
                                            <img src="https://stulzel.com/wp-content/uploads/2021/06/unnamed.jpg" alt="" style="width: 100%; max-width: 700px; margin: 0 auto;">
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

async function signIn(req, res)  {

    let { correo } = req.body;
    let contador = 0;
    correo = correo.toString().toLowerCase();
    // const signInTime = moment().subtract(3, 'hours').format('LLL');
    const resultado = await Usuario.find();
    resultado.forEach((element,index) => {
        if(correo == element.correo.toString().toLowerCase()){
            contador = contador + 1;
            res.status(200).send({
                ok: true,
                user:element
            });
        }
    });
    if(contador == 0){
        res.status(404).send({ ok: false, message: "No se ha encontrado el usuario"});
    }
    // Usuario.findOne({$toLower: correo}, (err, userStored) => {
    //     if (err) {
    //         res.status(500).send({ ok: false, message: "Error del servidor"});
    //     } else {
    //         if (!userStored) {
    //             res.status(404).send({ ok: false, message: "Usuario no encontrado"});
    //         } else {
    //                 userStored.signInTime = signInTime;
    //                 Usuario.findByIdAndUpdate({ _id: userStored.id }, userStored, (err, userUpdate) => {
    //                     if (err) {
    //                         res.status(500).send({ ok: false, message: "Error del servidor"});
    //                     } else {
    //                         if (!userUpdate) {
    //                             res.status(404).send({ ok: false, message: "No se ha encontrado el usuario"});
    //                         } else {
    //                             res.status(200).send({
    //                                 ok: true,
    //                                 user:userUpdate
    //                             });
    //                         }
    //                     }
    //                 });
    //         }
    //     }
    // });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    signIn
}