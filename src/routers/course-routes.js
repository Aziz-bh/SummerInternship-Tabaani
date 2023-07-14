const express = require('express');
const { addCourse,getAllcourses,getcourse,updatecourse ,deletecourse} = require('../Controllers/coursecontroller');
const { addchapter, deletechapter, updatechapter} = require('../Controllers/chaptercontroller');
const router = express.Router();

router.post('/course', addCourse);
router.get('/courses', getAllcourses);
router.get('/course/:id',getcourse);
router.put('/course/:id',updatecourse);
router.delete('/course/:id',deletecourse);
router.post('/course/:courseId/add-chapter', addchapter);
router.delete('/course/:courseId/deletechapter/:chapterId',deletechapter);
router.put('/course/:courseId/updatechapter/:chapterId',updatechapter);

module.exports = {
  routes: router
};
