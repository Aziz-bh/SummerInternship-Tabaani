const express = require("express");
const router = express.Router();
// ==============================|| Imported routes ||============================== //
const courseroutes = require("./course.router");
const quizreoutes = require("./quiz.router");
const useroutes = require("./user.router");
const evalutionRoutes = require("./evaluation.router");

router.use("/api", courseroutes);
router.use("/api", quizreoutes);
router.use("/api", useroutes);
router.use("/api", evalutionRoutes);

module.exports = router;
