const express = require('express');
const { addCourse,getAllcourses,getcourse,updatecourse ,deletecourse} = require('../Controllers/coursecontroller');
const router = express.Router();

router.post('/course', addCourse);
router.get('/courses', getAllcourses);
router.get('/course/:id',getcourse);
router.put('/course/:id',updatecourse);
router.delete('/course/:id',deletecourse);

module.exports = {
  routes: router
};
