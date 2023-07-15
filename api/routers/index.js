const express = require("express");
const router = express.Router();
// ==============================|| Imported routes ||============================== //
const courseroutes = require("./course.router");
const quizreoutes = require("./quiz.router");

router.use("/api", courseroutes);
router.use("/api", quizreoutes);

module.exports = router;
