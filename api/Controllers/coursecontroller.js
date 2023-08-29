"use strict";
const firebase = require("../db");
const Course = require("../models/course.model");
const firestore = firebase.firestore();
const multer = require("multer");

/****************************************************** */

const addCourse = async (req, res) => {
  try {
    let image = null;
    const { title, level, instructorId, price, description, imageURL } = req.body;

    const instructorRef = firestore.collection("users").doc(instructorId);
    
    const instructorSnapshot = await instructorRef.get();
    console.log(instructorSnapshot.data())
    if (!instructorSnapshot.exists) {
      return res.status(404).send("Instructor not found");
    }

    const instructorData = instructorSnapshot.data();

    const courseData = {
      title,
      level,
      description,
      instructor: {
        id: instructorId,
        fullName: instructorData.displayName,
        userpic: instructorData.photoURL,
      },
      price,
      image :imageURL,
    };

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
const path = require("path");

const getImage = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "..", "uploads", imageName);
    console.log("tessstt");

    console.log("imagePath:", imagePath); // Add this line for debugging

    res.sendFile(imagePath, (error) => {
      if (error) {
        console.error("Error sending image:", error);
        res.status(404).send("Image not found.");
      }
    });
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

    for (const chapterDoc of chaptersSnapshot.docs) {
      const chapterData = chapterDoc.data();

      // Fetch lessons for the current chapter
      const lessonsRef = chapterDoc.ref.collection("lessons");
      const lessonsSnapshot = await lessonsRef.get();
      const lessons = lessonsSnapshot.docs.map((lessonDoc) => {
        const lessonData = lessonDoc.data();
        return {
          id: lessonDoc.id,
          ...lessonData,
        };
      });

      chapters.push({
        ...chapterData,
        lessons: lessons,
      });
    }

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
  getImage,
};
