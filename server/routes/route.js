const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NT9nND0FISafXCSwu0Uh5RngcSUa04DnNVzFZF6SYes4CTGrKAC2w7w6YH90wMeuKtX6zZIKGvJz5rN9XwmiZki00Jlg9rJk4');
const {registerTutor,loginteacher,courseaddition} = require("../controller/tutorController.js");
const { addnewcoursehere, showcourses, getCourseData, getallcourses, showcoursesfordetail, getdataofpurchasedcourse, findCoursesByIDs, findpurchasedcoursebyid } = require('../controller/courseController.js');
const { uploadImage, getImage } = require('../controller/image-controller.js');
const {upload, uploadtutorfile} = require('../utils/upload.js');
const { uploadFile, getFile } = require('../controller/file-controller.js');
const { registerstudent, loggedstudentinn } = require('../controller/studentController.js');
const Payment = require('../model/payment.js');

router.post('/process-payment', async (req, res) => {
  try {
    const { amount, token, courseID,studentName } = req.body;
    console.log( amount, token, courseID,studentName )
    // Create a charge using the Stripe API
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'cad',
      description: 'Payment for Course',
      source: token,
    });
    if(charge){
      const paymentinfo = {  token, courseID,studentName };
      const payment = new Payment(paymentinfo);
      await payment.save();
      return res.status(200).json({ message: 'Payment successful' });
    }
    else{
      return res.status(200).json({ message: 'Additional actions required..' });
    }

    // Handle the successful payment response
    // Send a success message or perform any additional actions

    
  } catch (error) {
    // Handle any errors that occurred during payment processing
    // Send an error response back to the front-end
    console.log(error);
    res.status(500).json({ error: 'Payment processing failed' });
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

router.get('/findpurchasedcoursebyid',findpurchasedcoursebyid)
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