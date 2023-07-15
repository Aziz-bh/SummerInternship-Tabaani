const express = require("express");
const router = new express.Router();
const quizController = require("../Controllers/quizController");

router.post("/quizzes", quizController.addQuiz);
router.get('/quizzes/:id', quizController.getQuizById);
router.get('/quizzes', quizController.getAllQuizzes);
router.delete('/quizzes/:id', quizController.deleteQuiz);
router.put('/quizzes/:id', quizController.updateQuiz);
module.exports = {
    routes: router,
  };
  