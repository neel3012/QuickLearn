const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NT9nND0FISafXCSwu0Uh5RngcSUa04DnNVzFZF6SYes4CTGrKAC2w7w6YH90wMeuKtX6zZIKGvJz5rN9XwmiZki00Jlg9rJk4');
const {registerTutor,loginteacher,courseaddition} = require("../controller/tutorController.js");
const { addnewcoursehere, showcourses, getCourseData, getallcourses, showcoursesfordetail } = require('../controller/courseController.js');
const { uploadImage, getImage } = require('../controller/image-controller.js');
const {upload, uploadtutorfile} = require('../utils/upload.js');
const { uploadFile, getFile } = require('../controller/file-controller.js');
const { registerstudent, loggedstudentinn } = require('../controller/studentController.js');
router.post('/create-payment-intent', async (req, res) => {
    try {
      const { courseId, amount } = req.body;
  
      // Create a payment intent using the Stripe API
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        description: `Payment for Course ${courseId}`,
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the payment intent' });
    }
  });

router.post('/joinasteacher', registerTutor);
router.post('/teacherlogin',loginteacher)
// router.get('/courseaddition',courseaddition)//here was authenticate
router.post('/addnewcourse',addnewcoursehere)
router.get('/showyourcourses',showcourses)
router.get('/courseinfo/:courseID',getCourseData);   
router.get('/findbyidandshow',showcoursesfordetail); //this page is before payment
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