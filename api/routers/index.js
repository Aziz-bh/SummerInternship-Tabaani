const express = require("express");
const router = express.Router();
// ==============================|| Imported routes ||============================== //
const courseroutes = require("./course.router");
const quizreoutes = require("./quiz.router");
const useroutes = require("./user.router");

router.use("/api", courseroutes);
router.use("/api", quizreoutes);
router.use("/api", useroutes);

module.exports = router;
