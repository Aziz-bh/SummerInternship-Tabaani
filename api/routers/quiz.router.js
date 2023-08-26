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
  addFinalTest,
  deleteFinalTest,
  getAllFinalExamsByCourseId
} = require("../Controllers/quizController");

quizrouter.post(
  "/quizzes/:idCourse/chapters/:idChapter/lessons/:idLesson/add",
  addQuiz
);
quizrouter.post("/quizzes/add/:LessonId", addQuiz);
quizrouter.get("/quizzes/byId/:id", getQuizById);
quizrouter.get("/quizzes", getAllQuizzes);
quizrouter.post("/quizzes/addt_f/:idChapter", addQuizT_F);
quizrouter.get("/quizzes/chapter/:lessonId", findByLessonId);
quizrouter.delete("/quizzes/delete/:id", deleteQuiz);
quizrouter.put("/quizzes/update/:id", updateQuiz);
quizrouter.post("/quizzes/checker", checkAnswer);
quizrouter.post("/finalexam/add/:CourseId", addFinalTest);
quizrouter.delete("/finalexam/delete/:ExamId", deleteFinalTest);
quizrouter.get("/finalexam/byId/:CourseId", getAllFinalExamsByCourseId);



module.exports = quizrouter;
