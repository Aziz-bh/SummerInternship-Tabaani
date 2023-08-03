const express = require("express");
const Lessonrouter = express.Router();

const { addLessonToChapter } = require("../Controllers/LessonController");

Lessonrouter.post(
  "/courses/:courseId/chapters/:chapterId/lessons",
  addLessonToChapter
);

module.exports = Lessonrouter;
