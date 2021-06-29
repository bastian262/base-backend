const { response, request } = require('express');
const Usuario = require('../models/usuario')

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: stulzelEmail,
//         pass: passwordEmail
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

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
                    // const mailOptions = {
                    //     from: `Health Tech Latam <${stulzelEmail}>`,
                    //     to: userStored.email,
                    //     subject: 'Prueba mail',
                    //     text: 'PruebaMail',
                    //     html: `
                    //     <html>
                    //         <head>
                    //             <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap" rel="stylesheet">
                    //             <title>Stulzel!</title>
                    //         </head>
                    //         <body style="background:#f6f6f6;">
                               
                    //             <h1> PRUEBA </h1>
                    //         </body>
                    //     </html>
                    //     `
                    // };
                    // transporter.sendMail(mailOptions, function(error, info){
                    //     if(error){
                    //         res.status(500).send({ ok: false, message: "Error del servidor"});
                    //     } else {
                            res.status(200).send({ ok: true, message: "usuario Agregado correctamente ", user: user });
                    //     }
                    // });
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




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
}