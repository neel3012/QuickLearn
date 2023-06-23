const express = require('express');
const router = express.Router();
const {registerTutor,loginteacher,courseaddition} = require("../controller/tutorController.js");
const { addnewcoursehere, showcourses } = require('../controller/courseController.js');
// const authenticate = require('../middleware/authenticate.js');
// const cookieParser = require("cookie-parser");
// router.use(cookieParser());
router.post('/joinasteacher', registerTutor);
router.post('/teacherlogin',loginteacher)
// router.get('/courseaddition',courseaddition)//here was authenticate
router.post('/addnewcourse',addnewcoursehere)
router.get('/showyourcourses',showcourses)

module.exports = router;