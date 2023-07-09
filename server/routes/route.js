const express = require('express');
const router = express.Router();
const {registerTutor,loginteacher,courseaddition} = require("../controller/tutorController.js");
const { addnewcoursehere, showcourses, getCourseData, getallcourses } = require('../controller/courseController.js');
const { uploadImage, getImage } = require('../controller/image-controller.js');
const {upload, uploadtutorfile} = require('../utils/upload.js');
const { uploadFile, getFile } = require('../controller/file-controller.js');
const { registerstudent, loggedstudentinn } = require('../controller/studentController.js');

router.post('/joinasteacher', registerTutor);
router.post('/teacherlogin',loginteacher)
// router.get('/courseaddition',courseaddition)//here was authenticate
router.post('/addnewcourse',addnewcoursehere)
router.get('/showyourcourses',showcourses)
router.get('/courseinfo/:courseID',getCourseData);
router.get('/showallcourses',getallcourses)
//image
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

// router.post('/coursefiles/upload', uploadfile.single('file'), uploadFile);
router.post('/uploadedfile/uploadtutorfile', uploadtutorfile.single('file'), uploadFile);

router.get('/uploadedfile/:filename',getFile );


//student section....

router.post('/joinasstudent',registerstudent);
router.post('/studentlogin',loggedstudentinn);
module.exports = router;