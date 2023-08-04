"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const chapter = require("../models/chapter.model");

/****************************************************** */
const addchapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { title, description } = req.body;
    if (!title || !description) {
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

module.exports = {
  addchapter,
  deletechapter,
  updatechapter,
};
