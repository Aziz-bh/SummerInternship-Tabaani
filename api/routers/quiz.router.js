const express = require("express");
const quizrouter = express.Router();

const {
  addQuiz,
  getQuizById,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz,
  findByLessonId,
  checkAnswer,
  addQuizT_F,
} = require("../Controllers/quizController");

quizrouter.post(
  "/quizzes/:idCourse/chapters/:idChapter/lessons/:idLesson/add",
  addQuiz
);
quizrouter.post("/quizzes/add/:idChapter", addQuiz);
quizrouter.get("/quizzes/byId/:id", getQuizById);
quizrouter.get("/quizzes", getAllQuizzes);
quizrouter.get("/quizzes/chapter/:lessonId", findByLessonId);
quizrouter.delete("/quizzes/delete/:id", deleteQuiz);
quizrouter.put("/quizzes/update/:id", updateQuiz);
quizrouter.post("/quizzes/checker", checkAnswer);

//mouhib

module.exports = quizrouter;
