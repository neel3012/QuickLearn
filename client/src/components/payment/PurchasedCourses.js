import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { checkStudentAuthentication } from '../../app/features/studentReducer'
import { useNavigate } from 'react-router-dom';

function PurchasedCourses() {
  const navigate=useNavigate()
  const [courseData,setCourseData]=useState({});
  const isstudentstillpresent=useSelector(checkStudentAuthentication);
  useEffect(()=>{
    fetchCourseData()
  },[])
  console.log('after purchase',courseData)
  const  fetchCourseData = async () => {
    try {
     
      const response = await fetch(
        `http://localhost:5000/findpurchasedcoursebyid`,
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
  // console.log(isstudentstillpresent)
  return (
    <>
        {isstudentstillpresent ? (
           <div>purchasedCourses</div>
           
           ): 
        
        
        navigate('/joinasstudent')}
    </>
   
  )
}

export default PurchasedCourses

