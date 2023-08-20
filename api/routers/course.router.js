const express = require("express");
const Courserouter = express.Router();
const multer = require('multer');

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
  addLesson,
  getLesson
} = require("../Controllers/chaptercontroller");

//const upload = multer({ dest: 'temp/' }); // Specify your temp storage path
 const upload = require("../multerconfig");

//Courserouter.post('/course', upload.single('file'), addCourse);
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
Courserouter.post("/course/:courseId/chapter/:chapterId/add-lesson", addLesson);
Courserouter.get("/course/:courseId/chapter/:chapterId/getlesson", getLesson);
Courserouter.get("/course/:courseId/getchapter", getAllChapters);
module.exports = Courserouter;
