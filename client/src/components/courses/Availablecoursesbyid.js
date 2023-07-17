import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendtutordata } from '../../app/features/tutorReducer';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import './addcourses.css'
import LockIcon from '@mui/icons-material/Lock';
import StripeCheckout from 'react-stripe-checkout';

import shop from '../../assets/shop.png'
import { sendStudentdata } from '../../app/features/studentReducer';
//this page is main
//because i want to make user to see pdf available here after the payment done and also 
//related videos section undwr the main part
function Availablecoursesbyid() {
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);
  const studeentdata=useSelector(sendStudentdata)
  console.log(studeentdata)
  const {courseID}=useParams();
  
  useEffect(() => {
    fetchCourseData();
  }, [courseID]);
  const [courseData,setCourseData]=useState({});
 //use courdata for gett data
  const  fetchCourseData = async () => {
    try {
     
      const response = await fetch(
        `http://localhost:5000/findbyidandshow?_id=${courseID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCourseData(data);
      
    } catch (error) {
      console.log(error);
      
    }
  };
  const handlePaymentSuccess = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: courseData.price * 100,
          token: token.id,
          courseID: courseData._id,
          studentName: studeentdata.findusername.username
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPaymentSuccessful(true);
        console.log(data);
        //redirect and ahead login on successful payment write code here...
      } else {
        // Handle payment error
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     {isPaymentSuccessful ? (
      <div>
        <h1>Payment Successful!</h1>
        <p>Thank you for purchasing the course.</p>
        {/* Render additional content, such as PDFs and related videos */}
      </div>
    ) : (
     <div className="view_main">
      <div className="view_imagesection">
        <img
          src={courseData?.picture}
          className="view_mainimage"
          alt="courseImage"
        />
      </div>
      <div className="view_mainbody">
        <div className="view_head">
          <h1>{courseData?.title}</h1>
          <p>Author: {courseData?.addedBy}</p>
        </div>
        <div className="view_description_n1">{courseData.description}</div>
       <h3 className='view_hoursetting'>It will take your <span className='view_hours'>{courseData.approximateHours}</span>  to finish!</h3>
       
      

        <div className='avail_pricesection'>
          <div>
          <p className='avail_inn'>Affordable online courses for everyone</p>
            <p className='avail_innn'>Go and make it yours!</p>
          </div>
          <StripeCheckout
            stripeKey="pk_test_51NT9nND0FISafXCStjimCrV8Xzuvw5zshen0R69KmnOSubnKIZU0a2H2LcIkVkLNaA0Ah84HMq1YizJu5zNWOtmd002e2ti6q6"
            token={handlePaymentSuccess}
            amount={courseData.price*100}
            currency="CAD"
            name="QuickLearn Tutoring"
            description={`Payment for ${courseData.title}`}
            panelLabel="Buy This Course"
            email={studeentdata.findusername.email}
            billingAddress={false}
            shippingAddress={false}
          >            <Button variant="contained" className='avail_maininbutton'><LockIcon className='lock_icon' style={{fontWeight:"bold"}}/> Buy Now ${courseData.price} CAD </Button>
</StripeCheckout>
            <div className='p_avail'>
            <p>Premium access of course includes course related work, where you'll have hands on</p>
            <p>PDFs and related videos for course...</p>
            </div>
           
        </div>
      </div>
    </div>)}
    </>
  )
}

export default Availablecoursesbyid