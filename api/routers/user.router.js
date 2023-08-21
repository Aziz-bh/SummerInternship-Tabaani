const express = require("express");
const Userouter = express.Router();

const {
  SubscribeToCourse,
  verifyUserCompletion,
  MoveToNextChapter,
  GenerateCertificate,
  GetUserSubscribedCourses,
  GetUsers,
  GetAllUsers,
  getUserRole,
} = require("../Controllers/userController");

Userouter.post("/subscribe", SubscribeToCourse);
Userouter.post("/move-to-next-chapter", MoveToNextChapter);
Userouter.get("/verify/:userId/:courseId", verifyUserCompletion);
Userouter.post("/generate-certificate", GenerateCertificate);
Userouter.get("/user/:userId/subscribed-courses", GetUserSubscribedCourses);
Userouter.get("/users", GetUsers);
Userouter.get("/All/users", GetAllUsers);
Userouter.get("/get-user-role/:uid", getUserRole);

module.exports = Userouter;
