import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { sendtutordata } from '../../app/features/tutorReducer';
import { useSelector } from 'react-redux';
import { Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/material/styles';

import './addcourses.css'
import LockIcon from '@mui/icons-material/Lock';
import StripeCheckout from 'react-stripe-checkout';

import { sendStudentdata } from '../../app/features/studentReducer';

function Availablecoursesbyid() {
  const navigate=useNavigate();
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);
  const studeentdata=useSelector(sendStudentdata)
  const [isLoading, setIsLoading] = useState(true);

  console.log(studeentdata)
  const {courseID}=useParams();
  
  useEffect(() => {
    fetchCourseData();
  }, [courseID]);
  const [courseData,setCourseData]=useState({});
 //use courdata for gett data
  const  fetchCourseData = async () => {
    try {
      setIsLoading(true)
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
      setIsLoading(false)
      
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      
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
          studentName: studeentdata.findusername.username,
          studentEmail:studeentdata.findusername.email
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

{isLoading ? ( // Show loader while data is being fetched
      <div className="loader">
        <CircularProgress />
      </div>
    ):isPaymentSuccessful ? (
      navigate('/purchasedCourses')
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
            panelLabel="Buy Now"
            email={studeentdata.findusername.email}
            billingAddress={false}
            shippingAddress={false}
           
          >            <Button className='avail_maininbutton' variant="contained"><LockIcon className='lock_icon'  style={{fontWeight:"bold"}}/> Buy Now ${courseData.price} CAD </Button>
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