const express = require("express");
const Courserouter = express.Router();

const {
  addCourse,
  getAllcourses,
  getcourse,
  updatecourse,
  deletecourse,
} = require("../Controllers/coursecontroller");
const {
  addchapter,
  deletechapter,
  updatechapter,
} = require("../Controllers/chaptercontroller");

Courserouter.post("/course", addCourse);
Courserouter.get("/courses", getAllcourses);
Courserouter.get("/course/:id", getcourse);
Courserouter.put("/course/:id", updatecourse);
Courserouter.delete("/course/:id", deletecourse);
Courserouter.post("/course/:courseId/add-chapter", addchapter);
Courserouter.delete(
  "/course/:courseId/deletechapter/:chapterId",
  deletechapter
);
Courserouter.put("/course/:courseId/updatechapter/:chapterId", updatechapter);

module.exports = Courserouter;