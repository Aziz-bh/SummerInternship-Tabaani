const express = require("express");
const quizrouter = express.Router();

const {
  addQuiz,
  getQuizById,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz,
} = require("../Controllers/quizController");

quizrouter.post("/quizzes", addQuiz);
quizrouter.get("/quizzes/:id", getQuizById);
quizrouter.get("/quizzes", getAllQuizzes);
quizrouter.delete("/quizzes/:id", deleteQuiz);
quizrouter.put("/quizzes/:id", updateQuiz);

module.exports = quizrouter;
