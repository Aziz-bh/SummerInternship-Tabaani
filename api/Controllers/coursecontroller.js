"use strict";
const { __asyncDelegator } = require("tslib");
const firebase = require("../db");
const Course = require("../models/course");
const firestore = firebase.firestore();

const addCourse = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("courses").doc().set(data);
    res.send("Course saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllcourses = async (req, res, next) => {
  try {
    const courses = await firestore.collection("courses");
    const data = await courses.get();
    const coursesArray = [];
    if (data.empty) {
      res.status(400).send("no courses found");
    } else {
      data.forEach((doc) => {
        const course = new Course(
          doc.id,
          doc.data().title,
          doc.data().description,
          doc.data().level,
          doc.data().done
        );
        coursesArray.push(course);
      });
      res.send(coursesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getcourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const course = await firestore.collection("courses").doc(id);
    const data = await course.get();
    if (!data.exists) {
      res.status(404).send("course not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
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
