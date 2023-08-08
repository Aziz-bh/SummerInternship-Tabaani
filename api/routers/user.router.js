const express = require("express");
const Userouter = express.Router();

const {
  SubscribeToCourse,
  verifyUserCompletion,
  MoveToNextChapter,
  GenerateCertificate,
  GetUserSubscribedCourses,
} = require("../Controllers/userController");

Userouter.post("/subscribe", SubscribeToCourse);
Userouter.post("/move-to-next-chapter", MoveToNextChapter);
Userouter.get("/verify/:userId/:courseId", verifyUserCompletion);
Userouter.post("/generate-certificate", GenerateCertificate);
Userouter.get("/user/:userId/subscribed-courses", GetUserSubscribedCourses);

module.exports = Userouter;
