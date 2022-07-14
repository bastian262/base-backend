const nodemailer = require("nodemailer");
const { emailGira } = require("../utils/templates");
const stulzelEmail = "mailingstulzel@gmail.com";
const passwordEmail = "Stulzel385#";

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
    try {
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
            if (err) return res.status(500).json({ ok: false, message: "Error al enviar correo", err })
            return res.status(200).json({ ok: true, message: "Correo enviado exitosamente!" })
        })
    } catch (err) {
        return res.status(500).json({ ok: false, message: "Error al enviar correo", err })
    }

}

module.exports = {
    sendMailGira
}