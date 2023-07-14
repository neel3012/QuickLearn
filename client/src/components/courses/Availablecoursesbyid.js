import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendtutordata } from '../../app/features/tutorReducer';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import './addcourses.css'
import LockIcon from '@mui/icons-material/Lock';
import shop from '../../assets/shop.png'
//this page is main
//because i want to make user to see pdf available here after the payment done and also 
//related videos section undwr the main part
function Availablecoursesbyid() {
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
  return (
    <>
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
       <h3 className='view_hoursetting'>It will take your <span className='view_hours'>{courseData.approximateHours}</span> Hours to finish!</h3>
       
      

        <div className='avail_pricesection'>
          <div>
          <p className='avail_inn'>Affordable online courses for everyone</p>
            <p className='avail_innn'>Go and make it yours!</p>
          </div>
          
            <Button variant="contained" className='avail_maininbutton'><LockIcon className='lock_icon'/> Buy this course </Button>
            <div className='p_avail'>
            <p>Premium access of course includes course related work, where you'll have hands on</p>
            <p>PDFs and related videos for course...</p>
            </div>
           
        </div>
      </div>
    </div>
    </>
  )
}

export default Availablecoursesbyid