"use strict";
const firebase = require("../db");
const Course = require("../models/course.model");
const firestore = firebase.firestore();

/****************************************************** */
const addCourse = async (req, res) => {
  try {
    const { title, description, instructor, level, price, done } = req.body;
    if (
      !title ||
      !instructor ||
      !description ||
      !level ||
      !price ||
      typeof done !== "boolean"
    ) {
      res.status(400).send("Invalid course data");
      return;
    }
    const courseData = {
      title,
      instructor,
      description,
      level,
      price,
      done,
    };
    await firestore.collection("courses").doc().set(courseData);
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

    const chapters = [];
    chaptersSnapshot.forEach((chapter) => {
      chapters.push(chapter.data());
    });

    const courseWithChapters = {
      id: courseId,
      ...courseData,
      chapters: chapters,
    };

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
