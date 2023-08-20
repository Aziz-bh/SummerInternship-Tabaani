"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const chapter = require("../models/chapter.model");

/****************************************************** */
const addchapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { title, description } = req.body;

    if (!title || !description ) {
      res.status(400).send("Invalid chapter data");
      return;
    }

    const chapterData = {
      title,
      description,
    };
    

    const courseRef = firestore.collection("courses").doc(courseId);
    const courseSnapshot = await courseRef.get();

    if (!courseSnapshot.exists) {
      res.status(404).send("Course not found");
      return;
    }
    const chaptersCollection = courseRef.collection("chapters");
    await chaptersCollection.add(chapterData);
    

    res.send("Chapter saved and added to course successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addLesson = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;
    const { LessonTitle, LessonDescription, lessonVideo } = req.body;

    const courseRef = firestore.collection("courses").doc(courseId);
    const chapterRef = courseRef.collection("chapters").doc(chapterId);

    const lessonData = {
      LessonTitle,
      lessonVideo,
      LessonDescription,
    };

    const lessonRef = await chapterRef.collection("lessons").add(lessonData);

    // Récupérer l'ID de la leçon nouvellement ajoutée
    const newLessonId = lessonRef.id;

    // Inclure l'ID dans la réponse
    res.send({ message: "Lesson added successfully", lessonId: newLessonId });
    console.log("hh"+newLessonId)
  } catch (error) {
    res.status(400).send(error.message);
  }
};




/********************************************************/

const deletechapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;

    const courseRef = firestore.collection("courses").doc(courseId);

    const chapterRef = courseRef.collection("chapters").doc(chapterId);

    await chapterRef.delete();

    res.send("Chapter deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
/******************************************************* */

const updatechapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;

    const data = req.body;

    const courseRef = firestore.collection("courses").doc(courseId);

    const chapterRef = courseRef.collection("chapters").doc(chapterId);

    await chapterRef.update(data);

    res.send("chapter updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
/***************************************************** */
const getchapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;

    const courseRef = firestore.collection("courses").doc(courseId);

    const chapterRef = courseRef.collection("chapters").doc(chapterId);

    const chapterSnapshot = await chapterRef.get();

    if (!chapterSnapshot.exists) {
      res.status(404).send("Chapter not found");
      return;
    }

    const chapterData = chapterSnapshot.data();

    res.send(chapterData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllChapters = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    //const chapterId =req.params.chapterId;
    const courseRef = firestore.collection("courses").doc(courseId);
    const chaptersCollection = courseRef.collection("chapters");
    const snapshot = await chaptersCollection.get();

    const chapters = [];
    snapshot.forEach((doc) => {
      const chapterData = doc.data();
      const chapterId = doc.id; // Get the ID of the document
      chapters.push({ id: chapterId, ...chapterData }); // Include the id in the chapter object
      console.log(chapterId);
      
    });

    res.send(chapters);
  } catch (error) {
    res.status(400).send(error.message);
  }};
  const getLesson = async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const chapterId = req.params.chapterId;
  
      const courseRef = firestore.collection("courses").doc(courseId);
      const chapterRef = courseRef.collection("chapters").doc(chapterId);
  
      const lessonsCollection = chapterRef.collection("lessons");
      const snapshot = await lessonsCollection.get();
  
      const lessons = [];
      snapshot.forEach((doc) => {
        const lessonData = doc.data();
       
        const lessonId = doc.id; // Get the ID of the document
        lessons.push({ id: lessonId, ...lessonData });
       
      });
     
  
      res.send(lessons);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  

module.exports = {
  getLesson,
  addchapter,
  deletechapter,
  updatechapter,
  getchapter,
  getAllChapters, 
  addLesson
};
