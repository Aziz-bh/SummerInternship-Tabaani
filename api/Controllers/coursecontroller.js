"use strict";
const firebase = require("../db");
const Course = require("../models/course.model");
const firestore = firebase.firestore();

/****************************************************** */

const difficulties = ["Beginner", "Intermediate", "Hard"];

const addCourse = async (req, res) => {
  try {
    let image = null;
    let userpic = null;

    if (req.files) {
      // Assuming you are using 'image' and 'userpic' as the field names for the images in the form
      if (req.files.image) {
        console.log("Image details:", req.files.image);
        image = req.files.image[0].filename;
      }

      if (req.files.userpic) {
        console.log("Userpic details:", req.files.userpic);
        userpic = req.files.userpic[0].filename;
        console.log("userpic"+userpic)
      }}
    const { title, level,instructor, price, chaptersnumber,  description } = req.body;

    const courseData = {
      title,
      level,
      userpic,
      chaptersnumber,
      description,
      instructor,
      price,
      image // Utilisez le nom de fichier généré par Multer (avec l'extension)
    };

    // Enregistrez courseData dans Firestore
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
const path = require('path');

const getImage = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);
    console.log("tessstt")

    console.log('imagePath:', imagePath); // Add this line for debugging

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
  getImage
};
