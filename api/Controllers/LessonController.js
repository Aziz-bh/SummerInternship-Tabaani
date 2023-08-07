const firebase = require("../db");
const Course = require("../models/course.model");
const firestore = firebase.firestore();

const addLessonToChapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;
    const { title, content, video } = req.body;

    if (!title || !content || !video) {
      res.status(400).send("Invalid lesson data");
      return;
    }

    const lessonData = {
      title,
      content,
      video,
    };

    const courseRef = firestore.collection("courses").doc(courseId);
    const chapterRef = courseRef.collection("chapters").doc(chapterId);
    const lessonsCollectionRef = chapterRef.collection("lessons"); // Subcollection for lessons

    const chapterSnapshot = await chapterRef.get();
    if (!chapterSnapshot.exists) {
      res.status(404).send("Chapter not found");
      return;
    }

    // Add the lesson document to the lessons subcollection
    await lessonsCollectionRef.add(lessonData);

    res.send("Lesson saved and added to chapter successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addLessonToChapter,
};
