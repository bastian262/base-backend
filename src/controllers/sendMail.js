const nodemailer = require("nodemailer");
const { emailGira } = require("../utils/templates");
const stulzelEmail = process.env.USERMAIL;
const passwordEmail = process.env.PASSWORDMAIL;

const transporter = nodemailer.createTransport({
    servide: "Gmail",
    auth: {
        user: stulzelEmail,
        pass: passwordEmail
    },
    tls: {
        rejectUnauthorized: false
    }
})


const sendMailGira = (req, res) => {
    const { url, email, name } = req.body

    const mailOptions = {
        from: `STULZEL ${stulzelEmail}}`,
        to: email,
        subject: "Gira Stulzel",
        text: "Gracias por inscribirte en esta gira de stulzel",
        html: emailGira(name, url)
    }

    transporter.sendMail(mailOptions, (err, info) => {
        console.log(err)
        console.log(info)
        if (err) return res.status(500).json({ ok: false, message: "Error al enviar correo" })
        return res.status(200).json({ ok: true, message: "Correo enviado exitosamente!" })
    })

}

module.exports = {
    sendMailGira
}