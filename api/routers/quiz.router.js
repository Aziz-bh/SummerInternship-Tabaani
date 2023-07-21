const express = require("express");
const quizrouter = express.Router();

const {
  addQuiz,
  getQuizById,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz,
  findByChapterId,
  checkAnswer,
  addQuizT_F
} = require("../Controllers/quizController");

quizrouter.post("/quizzes/add/:idChapter", addQuiz);
quizrouter.post("/quizzes/addt_f/:idChapter", addQuizT_F);
quizrouter.get("/quizzes/byId/:id", getQuizById);
quizrouter.get("/quizzes", getAllQuizzes);
quizrouter.get("/quizzes/chapter/:chapterId", findByChapterId);
quizrouter.delete("/quizzes/delete/:id", deleteQuiz);
quizrouter.put("/quizzes/update/:id", updateQuiz);
quizrouter.post("/quizzes/checker", checkAnswer);
module.exports = quizrouter;
