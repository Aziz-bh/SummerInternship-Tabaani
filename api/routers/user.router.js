const express = require("express");
const Userouter = express.Router();

const {
  SubscribeToCourse,
  verifyUserCompletion,
  MoveToNextChapter,
  GenerateCertificate,
} = require("../Controllers/userController");

Userouter.post("/subscribe", SubscribeToCourse);
Userouter.post("/move-to-next-chapter", MoveToNextChapter);
Userouter.get("/verify/:userId/:courseId", verifyUserCompletion);
Userouter.post("/generate-certificate", GenerateCertificate);

module.exports = Userouter;
