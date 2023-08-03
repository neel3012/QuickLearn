const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NT9nND0FISafXCSwu0Uh5RngcSUa04DnNVzFZF6SYes4CTGrKAC2w7w6YH90wMeuKtX6zZIKGvJz5rN9XwmiZki00Jlg9rJk4');
const {registerTutor,loginteacher,courseaddition} = require("../controller/tutorController.js");
const { addnewcoursehere, showcourses, getCourseData, getallcourses, showcoursesfordetail, getdataofpurchasedcourse, findCoursesByIDs, findpurchasedcoursebyid, deletecourse } = require('../controller/courseController.js');
const { uploadImage, getImage } = require('../controller/image-controller.js');
const {upload, uploadtutorfile, uploadvideofile} = require('../utils/upload.js');
const { uploadFile, getFile } = require('../controller/file-controller.js');
const { registerstudent, loggedstudentinn } = require('../controller/studentController.js');
const Payment = require('../model/payment.js');
const { getVideo, uploadVideo } = require('../controller/videoController.js');
const nodemailer = require('nodemailer');
const { paymentprocess } = require('../controller/paymentprocess.js');


router.post('/joinasteacher', registerTutor);
router.post('/teacherlogin',loginteacher)
// router.get('/courseaddition',courseaddition)//here was authenticate
router.post('/addnewcourse',addnewcoursehere)
router.get('/showyourcourses',showcourses)
router.get('/courseinfo/:courseID',getCourseData);   
router.get('/findbyidandshow',showcoursesfordetail); //this page is before payment
router.get('/showallcourses',getallcourses)

router.get('/findpurchasedcoursebyid',findpurchasedcoursebyid)
//image

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

// router.post('/coursefiles/upload', uploadfile.single('file'), uploadFile);
router.post('/uploadedfile/uploadtutorfile', uploadtutorfile.single('file'), uploadFile);

router.get('/uploadedfile/:filename',getFile );
router.post('/video/upload', uploadvideofile.single('video'), uploadVideo);
router.get('/uploadedvideo/:filename', getVideo);//student section....
router.delete('/items/:courseID',deletecourse)
router.post('/joinasstudent',registerstudent);
router.post('/studentlogin',loggedstudentinn);
router.post('/process-payment',paymentprocess);


module.exports = router;