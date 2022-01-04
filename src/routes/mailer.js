const express = require("express");
const MailerController = require("../controllers/mailer");

const api = express.Router();

api.post("/", MailerController.postSuscriptorVenta);

module.exports = api;