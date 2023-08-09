const express = require("express");
const Courserouter = express.Router();

const {
  addCourse,
  getAllcourses,
  getcourse,
  updatecourse,
  deletecourse,
  getImage,
} = require("../Controllers/coursecontroller");
const {
  addchapter,
  deletechapter,
  updatechapter,
  getchapter,
  getAllChapters,
} = require("../Controllers/chaptercontroller");
const upload = require("../multerconfig");
const { addLessonToChapter } = require("../Controllers/LessonController");

Courserouter.post('/course', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'userpic', maxCount: 1 }
]), addCourse);
Courserouter.get("/image/:imageName",getImage)
Courserouter.get("/courses", getAllcourses);
Courserouter.get("/course/:id", getcourse);
Courserouter.put("/course/:id", updatecourse);
Courserouter.delete("/course/:id", deletecourse);
Courserouter.post("/course/:courseId/add-chapter", addchapter);
Courserouter.delete("/course/:courseId/deletechapter/:chapterId",deletechapter);
Courserouter.put("/course/:courseId/updatechapter/:chapterId", updatechapter);
Courserouter.get("/course/:courseId/getchapter/:chapterId", getchapter);
Courserouter.get("/course/:courseId/getchapter", getAllChapters);
module.exports = Courserouter;
