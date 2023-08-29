const express = require("express");
const Userouter = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");

const {
  SubscribeToCourse,
  GenerateCertificate,
  GetUserSubscribedCourses,
  GetUsers,
  GetAllUsers,
  getUserRole,
  GetCertificatesForUser,
} = require("../Controllers/userController");

Userouter.post("/subscribe", SubscribeToCourse);
Userouter.post("/generate-certificate", GenerateCertificate);
Userouter.get("/certificates/user/:userId", GetCertificatesForUser);
Userouter.get("/user/:userId/subscribed-courses", GetUserSubscribedCourses);
Userouter.get("/users", GetUsers);
Userouter.get("/All/users", GetAllUsers);
Userouter.get("/get-user-role/:uid", getUserRole);

module.exports = Userouter;
