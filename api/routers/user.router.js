const express = require("express");
const Userouter = express.Router();

const {
  SubscribeToCourse,
  verifyUserCompletion,
  MoveToNextChapter,
} = require("../Controllers/userController");

Userouter.post("/subscribe", SubscribeToCourse);
Userouter.post("/move-to-next-chapter", MoveToNextChapter);
Userouter.get("/verify/:userId/:courseId", verifyUserCompletion);

module.exports = Userouter;
