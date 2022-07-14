const express = require("express");
const MailerController = require("../controllers/mailer");
const SendMailController = require("../controllers/sendMail");

const api = express.Router();

api.post("/", MailerController.postSuscriptorVenta);
api.post("/sendMail", SendMailController.sendMailGira);

module.exports = api;