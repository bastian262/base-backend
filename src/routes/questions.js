const express = require("express");
const QuestionController = require("../controllers/question");

const api = express.Router();

api.post("/", QuestionController.makeQuestion);
api.get("/", QuestionController.getQuestions);
api.delete("/:id", QuestionController.deleteQuestion);

module.exports = api;