"use strict";
const firebase = require("../db");
const Course = require("../models/course.model");
const firestore = firebase.firestore();

/****************************************************** */

const difficulties = ["Beginner", "Intermediate", "Hard"];

const addCourse = async (req, res) => {
  try {
    {
      /*let thumbnail = null;
    if (req.file) {
      console.log("File details:", req.file);
      thumbnail = req.file.path;
    }*/
    }
    const {
      title,
      thumbnail,
      description,
      instructor,
      courseDifficulty,
      chapters,
    } = req.body;

    if (!difficulties.includes(courseDifficulty)) {
      return res.status(400).send("Invalid difficulty level");
    }

    const courseData = {
      title,
      description,
      instructor,
      students: 0,
      chapters: chapters || [],
      price: 0,
      difficulty: courseDifficulty,
      thumbnail,
    };
    {
      /*thumbnail: req.file ? req.file.path : null,*/
    }

    await firestore.collection("courses").add(courseData);
    res.send("Course saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/***************************************************** */

const getAllcourses = async (req, res, next) => {
  try {
    const coursesRef = firestore.collection("courses");
    const coursesSnapshot = await coursesRef.get();

    if (coursesSnapshot.empty) {
      res.status(404).send("No courses found");
      return;
    }

    const coursesArray = [];

    for (const courseDoc of coursesSnapshot.docs) {
      const courseId = courseDoc.id;
      const courseData = courseDoc.data();
      const chaptersRef = coursesRef.doc(courseId).collection("chapters");
      const chaptersSnapshot = await chaptersRef.get();
      const chaptersArray = [];
      chaptersSnapshot.forEach((chapterDoc) => {
        const chapterData = chapterDoc.data();
        chaptersArray.push(chapterData);
      });

      const courseWithChapters = {
        id: courseId,
        ...courseData,
        chapters: chaptersArray,
      };

      coursesArray.push(courseWithChapters);
    }

    res.send(coursesArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/********************************************************* */

const getcourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const courseRef = firestore.collection("courses").doc(courseId);
    const courseSnapshot = await courseRef.get();

    if (!courseSnapshot.exists) {
      res.status(404).send("Course not found");
      return;
    }

    const courseData = courseSnapshot.data();

    const chaptersRef = courseRef.collection("chapters");
    const chaptersSnapshot = await chaptersRef.get();

    const courseWithChapters = {
      id: courseId,
      ...courseData,
      chapters: [],
    };

    const chapterPromises = chaptersSnapshot.docs.map(async (chapterDoc) => {
      const chapterData = chapterDoc.data();

      const lessonsRef = chapterDoc.ref.collection("lessons");
      const lessonsSnapshot = await lessonsRef.get();

      const lessonsPromises = lessonsSnapshot.docs.map(async (lessonDoc) => {
        const lessonData = lessonDoc.data();

        const quizzesRef = lessonDoc.ref.collection("quizzes");
        const quizzesSnapshot = await quizzesRef.get();

        const quizzes = quizzesSnapshot.docs.map((quizDoc) => quizDoc.data());

        const lessonWithQuizzes = {
          id: lessonDoc.id,
          ...lessonData,
          quizzes: quizzes,
        };

        return lessonWithQuizzes;
      });

      const lessonsWithQuizzes = await Promise.all(lessonsPromises);

      const chapterWithLessons = {
        id: chapterDoc.id,
        ...chapterData,
        lessons: lessonsWithQuizzes,
      };

      return chapterWithLessons;
    });

    const chaptersWithLessons = await Promise.all(chapterPromises);
    courseWithChapters.chapters = chaptersWithLessons;

    res.send(courseWithChapters);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/******************************************** */
const updatecourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const course = await firestore.collection("courses").doc(id);
    await course.update(data);

    res.send("course updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
/**************************************************** */
const deletecourse = async (req, res, next) => {
  try {
    const id = req.params.id;

    await firestore.collection("courses").doc(id).delete();

    res.send("course deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addCourse,
  getAllcourses,
  getcourse,
  updatecourse,
  deletecourse,
};
