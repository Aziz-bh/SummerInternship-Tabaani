const firebase = require("../db");
const Course = require("../models/course.model");
const firestore = firebase.firestore();

const addLessonToChapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;
    const { title, content, video, quizzes } = req.body;
    if (!title || !content || !video) {
      res.status(400).send("Invalid lesson data");
      return;
    }

    const lessonData = {
      title,
      content,
      video,
      quizzes: quizzes || [],
    };

    const courseRef = firestore.collection("courses").doc(courseId);
    const chapterRef = courseRef.collection("chapters").doc(chapterId);

    const chapterSnapshot = await chapterRef.get();
    if (!chapterSnapshot.exists) {
      res.status(404).send("Chapter not found");
      return;
    }

    // Update the chapter document to include the lessons array
    const lessonsArray = chapterSnapshot.data().lessons || [];
    lessonsArray.push(lessonData);

    await chapterRef.update({ lessons: lessonsArray });

    res.send("Lesson saved and added to chapter successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addLessonToChapter,
};
