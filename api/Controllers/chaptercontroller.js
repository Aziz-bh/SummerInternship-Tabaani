"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const chapter = require("../models/chapter.model");

/****************************************************** */
const addchapter = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { title, description, lessons } = req.body;
    if (!title || !description) {
      res.status(400).send("Invalid chapter data");
      return;
    }

    const chapterData = {
      title,
      description,
      lessons: lessons || [],
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
    chapterData.chapterId = chapterId;
    res.send(chapterData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllChapters = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const courseRef = firestore.collection("courses").doc(courseId);
    const chaptersCollection = courseRef.collection("chapters");
    const snapshot = await chaptersCollection.get();

    const chapters = [];
    snapshot.forEach((doc) => {
      const chapterData = doc.data();
      chapterData.chapterId = doc.id;
      chapters.push(chapterData);
    });

    res.send(chapters);
  } catch (error) {
    res.status(400).send(error.message);
  }};

module.exports = {
  addchapter,
  deletechapter,
  updatechapter,
  getchapter,
  getAllChapters
};
