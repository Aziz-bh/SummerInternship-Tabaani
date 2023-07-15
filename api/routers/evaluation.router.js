const express = require("express");
const evaluationRouter = express.Router();
const evaluationController = require("../Controllers/evaluationController");

evaluationRouter.post('/evaluations', evaluationController.createEvaluation);
evaluationRouter.get('/evaluations/:id', evaluationController.getEvaluationById);
evaluationRouter.get('/evaluations', evaluationController.getAllEvaluations);
evaluationRouter.put('/evaluations/:id', evaluationController.updateEvaluation);
evaluationRouter.delete('/evaluations/:id', evaluationController.deleteEvaluation);


  module.exports = evaluationRouter;